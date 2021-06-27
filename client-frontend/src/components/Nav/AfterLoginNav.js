import React, { useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  Form,
  FormControl,
} from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import logo from "../../img/logo.png";
import "./navbar.css";
import { useHistory } from "react-router-dom";

const AfterLoginNav = () => {
  const history = useHistory();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [status, setStatus] = useState(false);

  const logout = () => {
    console.log("logout: ");
    localStorage.setItem("auth-token", "");
    localStorage.setItem("auth-id", "");
    history.push("/");
    window.location.reload();
    console.log("logout2: ");
  };
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
              <Form >
                <FormControl
                 style={{ backgroundColor:"#474745", color:"white" , height:"32px", width:"400px", border:"none", borderRadius:"25px", outline:"none", textDecoration:"none"}}
                  type="text"
                  placeholder="Search"
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
                <NavLink to="/my-profile" className="nav-link">
                  <i className="fa fa-user-plus"></i>&nbsp; My Account
                </NavLink>
              </li>
              <li className="nav-item" onClick={() => logout()}>
                <NavLink to="/login" className="nav-link">
                  <i className="fa fa-sign-in"></i>&nbsp; Log Out
                </NavLink>
              </li>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default AfterLoginNav;
