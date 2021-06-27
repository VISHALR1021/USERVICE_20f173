import React from "react";
import { Card, Row, Col, Image, ButtonGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function ProjectCard(props) {
  return (
    <div>
      <Card style={{ width: "302px" }}>
        <Card.Header as="h5">{props.title}</Card.Header>
        <Card.Body>
          <Row>
            <Col sm={4}>
              <Link to="/project-overview">
                <Image
                  style={{ width: "300px", height: "200px" }}
                  src={props.image}
                  thumbnail
                />
              </Link>
            </Col>
            <Col sm={8}>
              <Link to="/project-overview">
                <Card.Text>{props.text}</Card.Text>
              </Link>
            </Col>
          </Row>
          <br></br>
          <Link className="btn btn-primary" to="/project-overview">
            Full Details
          </Link>
          &nbsp;
          <ButtonGroup>
            <Link className="btn btn-success" to="/edit-project">
              <i className="fa fa-edit" />
            </Link>
            <Link className="btn btn-danger" to="#delete">
              <i className="fa fa-trash" />
            </Link>
          </ButtonGroup>
        </Card.Body>
      </Card>
    </div>
  );
}
