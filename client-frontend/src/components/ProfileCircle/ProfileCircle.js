import React, { Component } from "react";
import "../ProfileCircle/ProfileCircle.css";
import pic5 from "../../img/Profilecircle/ico.png";
import pro1 from "../../img/pro1.jpg";
import { Nav, form, Image, Col, Row, Button } from "react-bootstrap";
import constants from "../../constants/constants";


const Profilecircle = ({id}) => {
  return (
    <div class="v6_0" style={{ marginTop: "-20%" }}>
      <div class="v1_2">
        <Image
          class="mx-auto"
          src={constants.backend_url + `/users/photo/${id}`}
          style={{
            width: "190px",
            height: "190px",
            marginLeft: "10px",
            marginTop: "10px",
          }}
          roundedCircle
        />
      </div>
    </div>
  );
}
 
export default Profilecircle;

