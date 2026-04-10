import react from "react";
import ReactDOM from "react-dom/client"
import Registor from "./Register";
import Login from "./Login";
import { BrowserRouter } from "react-router";
import {Routes, Route,Navigate } from "react-router";
import { useDispatch, useSelector,Provider } from 'react-redux';

import { useEffect } from "react";
import Homepage from "./Homepage"


function Index(){

const dispatch = useDispatch();
  const {isAuthenticated,user,loading} = useSelector((state)=>state.auth);

  // useEffect(() => {
  //   dispatch(checkAuth());
  // }, [dispatch]);

   
  return(
   
    <BrowserRouter>
    <Routes>
    <Route path="/" element={isAuthenticated?<Homepage></Homepage>:<Navigate to='/register'></Navigate>}></Route>
    <Route path="/register" element={isAuthenticated?<Navigate to='/'></Navigate>:<Registor></Registor>}> </Route>
    <Route path="/login"   element={ isAuthenticated?<Navigate to='/'></Navigate>:<Login></Login>}></Route>
   
   
  
 
    </Routes>
    </BrowserRouter>
   
  )
  
}

export default Index;
