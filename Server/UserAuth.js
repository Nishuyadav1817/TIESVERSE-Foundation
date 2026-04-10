const express=require("express");
const User=require('./user');
const ValidateUser=require('./Validator');
const bcrypt=require('bcrypt')
const Jwt=require('jsonwebtoken')
const AuthRouter=express.Router();
const Redis=require('./redis');
const UserVerify=require('./Middlewere/usermidlewere');
const AdminVerify=require('./Middlewere/Adminmidlewere');
const { getStack, getReason } = require("./recommendationLogic");
 
//Registor
AuthRouter.post("/register", async (req, res)=>{
  console.log("hello")
    try{
      console.log("Incoming register data:", req.body); 
        ValidateUser(req.body);
        const{FullName, EmailId,password}=req.body;
    
        req.body.password=await bcrypt.hash(password,10);

    const NewUser=await User.create(req.body)

    const Token=Jwt.sign({_id:NewUser._id,EmailId:NewUser.EmailId,role:'user'},process.env.JWT_KEY,{expiresIn:60*60});
     res.cookie('Token',Token,{maxAge: 60*60*1000})
   const reply = {
            FullName: NewUser.FullName,
            emailId: NewUser.EmailId,
            _id: NewUser._id,
            role:NewUser.role,
        }
   
  res.status(200).json({ 
        user: reply, 
        message: "User registered successfully" });

    }
  
    catch(err){
          console.error("MongoDB error:", err);
         res.send("Invalid Error : "+err)
    }
   

})

//Logine

AuthRouter.post("/login" ,async(req,res) =>{
    try{

    console.log("here i am");
    const{EmailId,password}=req.body;
    
    if(!EmailId){
    return res.status(400).json({ message: "Email is required" });
    }
    if(!password){
        return res.status(400).json({ message: "password is required" });
        }
     const user=await User.findOne({EmailId});
     if(!user){
     return res.status(404).json({ message: "User not found" });
     }
       
      const match=await bcrypt.compare(password,user.password);

      if(!match){
    return res.status(401).json({ message: "Invalid password" });
        }
    const Token=Jwt.sign({_id:user._id,EmailId:user.EmailId,role:user.role},process.env.JWT_KEY,{expiresIn:60*60});
     res.cookie('Token',Token,{maxAge: 60*60*1000})

         const reply = {
            FullName: user.FullName,
            emailId: user.EmailId,
            _id: user._id,
            role:user.role
        }
     console.log(reply)
     res.status(200).json({ 
        user: reply, 
        message: "User Logined successfully" });

    }catch(err){
    res.send("Invalid Error : " +err)
    
    return res.status(500).json({ message: err.message || "Server error" });
    }

})

//logout
AuthRouter.post("/logout",UserVerify,async(req,res) =>{
     
    try{
       
    const {Token}=req.cookies;

    const payload=Jwt.decode(Token);

   
        await Redis.set(`token:${Token}`,'Blocked');
        await Redis.expireAt(`token:${Token}`,payload.exp);
    
    
    res.cookie("token",null,{expires: new Date(Date.now())});
 
    }
    catch(err){
        res.send("invalid error" +err)
    }
})
// check
AuthRouter.get('/check',UserVerify, (req,res)=>{
   
    const reply = {
        firstName: req.user.FirstName,
        emailId: req.user.EmailId,
        _id:req.user._id,
        role:req.user.role
    }
      
    res.status(200).json({
        user:reply,
        message:"Valid User"
    });
})
// Fetch Data
AuthRouter.get("/search" ,UserVerify,async (req,res)=>{
    try{

    
    const {EmailId}=req.body;
    if(!EmailId){
        throw new Error("Invalid email")
    }
   const user=await User.findOne({EmailId})
   if(!user){
    throw new Error("User not found")
   }
   res.send(user);
} catch(Err){
    res.send('Invalid Error'+Err)
}

})

AuthRouter.post("/recommend", async (req, res) => {
  try {
    console.log("lkju")
    const formData = req.body;

    const stack = getStack(formData);
    const reason = getReason(formData);
console.log("1")
    res.status(200).json({
      stack,
      reason,
    });
console.log("12")
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});







module.exports = AuthRouter;