import React from "react";
import { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useHistory } from "react-router";
import { useEffect } from "react/cjs/react.development";

export const SignUp = ({ setShowLogin }) => {
  const history = useHistory();
  const [data, setData] = useState();

  const [isUsernameExist, setIsUsernameExist] = useState(false);

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
    @Purpose : username Exist or not Checker
    @Parameter : {}
    @Author : DARSH
    ******************/
  const userExist = (e) => {
    let isExist = false;
    data.forEach((value) => {
      if (e.target.value === value.username) {
        isExist = true;
      }
      if (isExist) {
        setIsUsernameExist(true);
        console.log("exist");
        return;
      } else {
        setIsUsernameExist(false);
        console.log("not");
        isExist = false;
      }
    });
  };

  /******************* 
    @Purpose : post method to send data api
    @Parameter : {}
    @Author : DARSH
    ******************/
  const sendDataToJson = (username, password) => {
    let data = { username, password };

    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      console.log(res);
    });
  };

  /******************* 
    @Purpose : main signup handler
    @Parameter : {event}
    @Author : DARSH
    ******************/
  const formHandler = (event) => {
    event.preventDefault();

    const { username, password } = event.target.elements;

    if (
      username.value.trim().length === 0 ||
      password.value.trim().length === 0
    ) {
      return false;
    }

    sendDataToJson(username.value, password.value);

    alert("Data Added into JSON");

    history.push("/login");
  };

  return (
    <Container>
      <h3 className="my-5 card-header text-center" style={{ margin: "0 15%" }}>
        SignUp Here
      </h3>
      <Form onSubmit={formHandler}>
        <Alert variant={isUsernameExist? 'danger': 'dark'}> 
          {isUsernameExist
            ? "This Username is already exist...please! enter another"
            : "*****username should be unique***"}
        </Alert>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter New UserName"
            id="username"
            onBlur={userExist}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Create Password"
            id="password"
          />
        </Form.Group>

        <Button variant="warning my-2" type="submit" disabled={isUsernameExist}>
          SignUp
        </Button>
        <br />

        <h5 className="mx-2 my-2" onClick={() => history.push("/login")}>
          Already Signed Up? Login
        </h5>
      </Form>
    </Container>

    // <div>
    //     <h3>SignUp Form</h3>
    //     <form onSubmit={formHandler}>
    //         <h2>{isUsernameExist ? 'This Username is already exist...please! enter another' : 'username should be unique'}</h2>
    //         <input type="text" id="username" placeholder="Enter New UserName" onBlur={userExist}/> <br /><br />
    //         <input type="password" id="password" placeholder="Create Password" /><br /><br />
    //         <input type="submit" value="Add" disabled={isUsernameExist}/> <br /><br />
    //         <h4 onClick={()=>history.push('/login')} >Already Signed Up? Login</h4>
    //     </form>
    // </div>
  );
};
