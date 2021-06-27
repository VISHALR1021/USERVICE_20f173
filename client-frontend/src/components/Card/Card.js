import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./card.css";
import constants from "../../constants/constants";

export default function MyCard({ data }) {
  return (
    <Link to={"/project-overview/" + data._id}>
      <div className="p-3">
        <Card style={{ width: "302px", borderRadius:"10px", boxShadow: "-10px 10px 25px #d4d4d4", outline: "none", border:"none"}}>
          <Card.Img
            style={{ width: "300px", height: "200px", borderRadius:"10px"}}
            variant="top"
            src={constants.backend_url + `/project/photo/${data._id}`}
          />

          <Card.Body>
            <Card.Title className="text-center" style={{fontWeight:"700", color:"#3b3b3b"}}>{data.title}</Card.Title>
            {/*  <Card.Text className="text-center">{data.description}</Card.Text> */}
            <Card.Footer>
              <Row>
                <Col>
                  <i className="fa fa-heart" aria-hidden="true" style={{color:"#7e27cf"}} />
                </Col>
                <Col style={{fontWeight:"500", color:"#3b3b3b"}}>Price: $ {data.price}</Col>
              </Row>
            </Card.Footer>
          </Card.Body>
        </Card>
      </div>
    </Link>
  );
}
