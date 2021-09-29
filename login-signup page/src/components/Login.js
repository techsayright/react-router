import React, { useEffect, useState } from "react";
import { Form, Container, Button } from "react-bootstrap";
import { useHistory } from "react-router";
import "./css/Form.css";

export default function Login({onAuth}) {
  const [data, setData] = useState();
  const history = useHistory();

  /******************* 
    @Purpose : get method api call
    @Parameter : {}
    @Author : DARSH
    ******************/
  const fetchData = async () => {
    let response = await fetch("http://localhost:3000/users");
    response = await response.json();
    setData(response);
  };

  useEffect(() => {
    if(localStorage.getItem('auth')){
        history.replace('/home');
        return;
    }  
    fetchData();
  }, [history]);

  /******************* 
    @Purpose : main login handler
    @Parameter : {}
    @Author : DARSH
    ******************/
  const onLogin = (e) => {
    e.preventDefault();

    const { usernameLg, passwordLg } = e.target.elements;

    if(usernameLg.value.trim().length===0 || passwordLg.value.trim().length===0){
        return
    }

    let isAuth = false;
    data.forEach((val) => {
      if (
        usernameLg.value === val.username &&
        passwordLg.value === val.password
      ) {
        localStorage.setItem("auth", val.id);
        isAuth = true;
      }
      if (isAuth) {
        return;
      } else {
        isAuth = false;
      }
    });

    if (isAuth) {
      console.log("authenticated");
      onAuth(true)
      history.replace("/");

    } else {
      console.log("fake user");
      alert("You are Not Authenticated");
    }
  };

  return (
    <Container>
      <h3 className="my-5 card-header text-center" style={{ margin: "0 15%" }}>
        Login Here
      </h3>
      <Form onSubmit={onLogin} style={{ backgroundColor: "pink" }}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Username:</Form.Label>
          <Form.Control type="text" placeholder="Your UserName" id='usernameLg' />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" placeholder="Your Password" id='passwordLg' />
        </Form.Group>

        <Button variant="primary my-2" type="submit">
          Login
        </Button>
        <br />

        <h5 className="mx-2 my-2" onClick={() => history.push("/signup")}>
          New User? SignUp
        </h5>
      </Form>
    </Container>
  );
}
