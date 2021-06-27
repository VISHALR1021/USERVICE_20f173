import React, { useContext, Component, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import userContext from "../../context/userContext";
import BeforeSignUp from "./BeforeLoginUpNav";
import AfterLoginNav from "./AfterLoginNav";

const NavBar = () => {
  const [token, setToken] = useState();
  useEffect(() => {
    setToken(localStorage.getItem("auth-token"));
  });
  return (
    <div>
      <div>{token ? <AfterLoginNav /> : <BeforeSignUp />}</div>
    </div>
  );
};

export default NavBar;
