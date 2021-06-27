import React from "react";

import onlineIcon from "../icons/onlineIcon.png";
import closeIcon from "../icons/closeIcon.png";
import { Link, useHistory } from "react-router-dom";

import "./InfoBar.css";

const InfoBar = ({ room }) => {
  const history = useHistory();

  const handleClose = () => {
    history.goBack();
  };
  return (
    <div className="infoBar">
      <div className="leftInnerContainer">
        <img className="onlineIcon" src={onlineIcon} alt="online icon" />
        <h3>{room}</h3>
      </div>
      <div className="rightInnerContainer">
        <img onClick={handleClose} src={closeIcon} alt="close icon" />
      </div>
    </div>
  );
};

export default InfoBar;
