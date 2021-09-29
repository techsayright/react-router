import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import { SignUp } from "./components/SignUp";
import { Redirect, Route } from "react-router";
import { useState } from "react";

function App() {
  console.log("app");
  const [auth, isAuth]= useState();

  const onAuth=(val)=>{
    console.log(val);
    isAuth(val);
  }
  return (
    <div >
      <Header auth={auth}/>
      <Route exact path="/">
        <Redirect to="/home" />
      </Route>
      <Route path="/home" render={()=><Home onAuth={onAuth}/>} />
      <Route path="/login" render={()=><Login onAuth={onAuth}/>} />
      <Route path="/signup" component={SignUp} />
    </div>
  );
}

export default App;
