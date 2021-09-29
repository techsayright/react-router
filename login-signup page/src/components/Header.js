import React, { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink, useHistory } from "react-router-dom";
import styles from "./css/Header.module.css";

export default function Header({auth}) {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("auth")==='1')
  const history = useHistory();

  const btnHandler = () => {
    localStorage.removeItem("auth");
    setIsAuth(localStorage.getItem('auth')==='1');
    history.replace('/login')
  };

  console.log(isAuth);
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>Time-Pass</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link>
            <NavLink
              className={styles.anchor}
              activeClassName={styles.active}
              to="/home"
            >
              Home
            </NavLink>
          </Nav.Link>
          {isAuth||auth ? (
            <Nav.Link onClick={btnHandler}>Logout</Nav.Link>
          ) : (
            <>
              <Nav.Link>
                <NavLink
                  className={styles.anchor}
                  activeClassName={styles.active}
                  to="/login"
                >
                  Login
                </NavLink>
              </Nav.Link>
              <Nav.Link>
                <NavLink
                  className={styles.anchor}
                  activeClassName={styles.active}
                  to="/signup"
                >
                  SignUp
                </NavLink>
              </Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
