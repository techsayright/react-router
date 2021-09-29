import React, { useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { Route, useHistory } from "react-router";
import { Link } from "react-router-dom";
import UpdatePassword from "./UpdatePassword";

export default function Home({onAuth}) {
  const history = useHistory();

  /******************* 
    @Purpose : button handler
    @Parameter : {}
    @Author : DARSH
    ******************/
  const btnHandler = () => {
    localStorage.removeItem("auth");
    history.replace('/login')
    onAuth(false)

  };

  /******************* 
    @Purpose : delete mathod api call
    @Parameter : {}
    @Author : DARSH
    ******************/
  const deleteBtnHandler = async () => {
    let pathVal = localStorage.getItem("auth");
    await fetch(`http://localhost:3000/users/${pathVal}`, {
      method: "DELETE",
    });

    alert("You are now removed from our db");

    btnHandler();
  };

  useEffect(() => {
    if (!localStorage.getItem("auth")) {
      console.log("hello");
      history.replace("/login");
    }
  }, [history]);

  return (
    <Container>
      <h1 className="text-center mx-3 my-5">Hello, User</h1>
      <div className="text-center">
        <Button onClick={deleteBtnHandler} variant="danger" className="mx-3">
          Delete My Account
        </Button>
        
        <Route  exact path='/home'>
            <Link className="btn btn-secondary mx-3" to="/home/update">
                Update my Password
            </Link>
        </Route>

        <Button onClick={() => history.goBack()}>Go Back</Button>
      </div>

      <Route exact path="/home/update" component={UpdatePassword} />

    </Container>
  );
}
