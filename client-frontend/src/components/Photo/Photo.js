import React from "react";
import { Card } from "react-bootstrap";
import constants from "../../constants/constants"
//
const Photo = ({ id }) => {
  return (
    <Card className="photo">
      <Card.Img
        variant="top"
        src={constants.backend_url+`/users/photos/${id}`}
        alt="Photo"
      />
    </Card>
  );
};

export default Photo;
