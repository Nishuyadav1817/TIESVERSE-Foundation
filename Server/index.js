const express= require("express");
const app=express();
require("dotenv").config();
const main=require('./db');
const cookiparcer=require('cookie-parser')
app.use(express.json());
app.use(cookiparcer());
const AuthRouter=require('./UserAuth')
const Validator=require('./Validator');
const Redis=require("./redis");
// const ProblemRouter=require('./Questions/problemauth')
// const Submitproblem=require("./Submitcode/submitAuth")
const cors = require('cors'); 

const allowedOrigins = [
  "http://localhost:1234"

 
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (Postman, mobile apps)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    console.log("Blocked by CORS:", origin);
    return callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));



const InitalizeConnection = async ()=>{
    try{

        await Promise.all([main(),Redis.connect()]);
        console.log("DB Connected");
        
        app.listen(process.env.PORT, ()=>{
            console.log("Server listening at given port number: ");
        })

    }
    catch(err){
        console.log("Error: "+err);
    }
}



//Routing Handling
app.use("/user", AuthRouter);
// app.use("/problem" ,ProblemRouter);
// app.use("/submit",Submitproblem);

app.get("/", (req, res) => {
  res.send("Gig Kavach API Running");
});







InitalizeConnection()