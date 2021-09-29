import React, { useEffect, useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router";

export default function UpdatePassword({ setIsUpdate }) {
  const [username, setUsername] = useState("");
  const history = useHistory();

  /******************* 
     @Purpose : get mathod for single data for update
     @Parameter : {}
     @Author : DARSH
     ******************/
  const fetchAData = async () => {
    let pathData = localStorage.getItem("auth");
    let res = await fetch(`http://localhost:3000/users/${pathData}`);
    res = await res.json();
    setUsername(res.username);
  };

  useEffect(() => {
    if(!localStorage.getItem('auth')){
      history.replace('/login');
      return;
  } 
    fetchAData();
  }, [history]);

  /******************* 
    @Purpose : submit handler
    @Parameter : {e}
    @Author : DARSH
    ******************/
  const updateAPI = (upObj) => {
    let pathData = localStorage.getItem("auth");

    fetch(`http://localhost:3000/users/${pathData}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(upObj),
    }).then((res) => {
      console.log(res);
    });


    alert("value updated!!");
  };

  /******************* 
    @Purpose : submit handler
    @Parameter : {e}
    @Author : DARSH
    ******************/
  const updatePassHandler = (e) => {
    e.preventDefault();

    const { usernameUp, passwordUp } = e.target.elements;

    if (passwordUp.value.trim().length === 0) {
      return;
    }

    const updatedObj = {
      username: usernameUp.value,
      password: passwordUp.value,
    };

    updateAPI(updatedObj);

    console.log("updated");
  };

  return (
    <Container>
      <h3 className="my-5 card-header text-center" style={{ margin: "0 15%" }}>
      Update Your Password Here
      </h3>
      <Form onSubmit={updatePassHandler} style={{ backgroundColor: "orange" }}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your UserName"
            id="usernameUp"
            value={username}
            disabled
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Set New Password"
            id="passwordUp"
          />
        </Form.Group>

        <Row>
          <Col>
            <Button variant="primary my-2" type="submit">
              Update Password
            </Button>
          </Col>

          <Col>
            <Button
              variant="danger my-2"
              type="button"
              onClick={() => {
                history.push('/home')
              }}
            >
              close
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
