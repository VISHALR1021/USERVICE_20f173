import React, { useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { Link, NavLink, useHistory } from "react-router-dom";
import logo from "../../img/logo.png";
import "./navbar.css";

const BeforeSignUp = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [status, setStatus] = useState(false);
  const history = useHistory();

  const handleKeyDown=(e) =>{

    if (e.key === 'Enter') {
      history.push("/search/"+e.target.value);
    }
  }
  return (
    <div>
      <Navbar
        collapseOnSelect
        fixed="top"
        expand="lg"
        variant="dark"
        style={{ zIndex: "20" }}
        className="NavStyle"
      >
        <Container fluid>
          <Link className="navbar-brand" to="/">
            <img
              alt="logo"
              src={logo}
              width="auto"
              height="25"
              className="d-inline-block align-top"
            />
          
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto"></Nav>
            <Nav>

              <Form inline >
                <FormControl
                  style={{ backgroundColor:"#474745", color:"white" , height:"32px", width:"400px", border:"none", borderRadius:"25px", outline:"none", textDecoration:"none"}}
                  type="text"
                  placeholder="Search..."
                  className="mr-sm-2"
                  onChange={(e) => {
                    setSearchKeyword(e.target.value);
                    setStatus(true);
                  }}
                  onKeyPress={handleKeyDown}
                />
              </Form>

              {/*<li className="nav-item">*/}
              {/*  <NavLink to={"/search/" + searchKeyword} className="nav-link">*/}
              {/*    <button className="btn fa fa-search"  disabled={!status}></button>*/}
              {/*    &nbsp;*/}
              {/*  </NavLink>*/}
              {/*</li>*/}
              <li className="nav-item">
                <NavLink to="/explore" className="nav-link">
                  <i className="fa fa-globe" />
                  &nbsp; Explore
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/login" className="nav-link">
                  <i className="fa fa-sign-in"></i>&nbsp; Log In
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/signup" className="nav-link">
                  <i className="fa fa-user-plus"></i>&nbsp; Sign Up
                </NavLink>
              </li>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default BeforeSignUp;
