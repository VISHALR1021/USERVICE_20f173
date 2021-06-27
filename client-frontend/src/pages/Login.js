import React, { useState, useEffect, useContext } from "react";
import Input from "../components/Input";
import loginBack from "../img/1.jpg";
import { Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Axios from "axios";
import UserContext from "../../src/context/userContext";
import constants from "../constants/constants";
import "../css/login.css";
import login_img from "../img/login.svg"

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const { setUserData } = useContext(UserContext);
  const [backendError, setBackendError] = useState();
  const history = useHistory();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    let email = values.email;
    let password = values.password;
    try {
      const loginRes = await Axios.post(
        constants.backend_url + "/users/login",
        { email, password }
      );
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      localStorage.setItem("auth-id", loginRes.data.user.id);
      history.push("/my-profile");
    } catch (err) {
      err.response.data.msg && setBackendError(err.response.data.msg);
    }
  };
  return (
    <div className="container">
      <div className="card" style={{ marginTop: "70px", borderRadius:"10px", border:"none", boxShadow: "-10px 10px 45px #d4d4d4" }}>
        <div className="row">
        <img src={login_img} style={{display:"flex", height:"480px", margin:"0", padding:"50px 50px"}} />
          <div className="col">
            <div style={{ paddingTop: "5vh", width: "50%", alignContent:"center",  justifyContent:"center" }}>
              <h3 className="text-center" style={{ paddingBottom: "10px", fontFamily:"poppins", fontWeight:"600", color:"#7e27cf" }}>
                Login
              </h3>
              <div className="conatiner text-center">
                <p className="text-danger">{backendError}</p>
              </div>
              <Input
                name="email"
                onChange={(e) => handleChange(e)}
                lable="Email"
                type="text"
                placeholder="Enter Your Email..."
              ></Input>
              <Input
                name="password"
                onChange={(e) => handleChange(e)}
                lable="Password"
                type="password"
                placeholder="Enter Your Password..."
              ></Input>
              <Button
                onClick={onSubmit}
                style={{ width: "100%" }}
                type="submit"
                style={{ width:"100%", backgroundColor:"#7e27cf", fontFamily:"poppins", fontWeight:"600", fontSize:"10pt", border:"none", outline:"none", borderRadius:"20px"}}
              >
                Login
              </Button>
              <section className="text-center">
                <p className="mt-4 mb-2  copyright-text">
                  Don't have an account?&nbsp;
                  <Link to="/signup" style={{color:"#7e27cf", fontFamily:"poppins", fontWeight:"600", fontSize:"10pt"}}>Sign Up</Link>
                </p>
                <p className="mt-5 mb-3 text-muted copyright-text">
                  Copyright © 2021 All Rights Reserved by &nbsp;
                  <Link to="/" style={{color:"#7e27cf", fontFamily:"poppins", fontWeight:"600", fontSize:"10pt"}}>USERVICE</Link>
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
