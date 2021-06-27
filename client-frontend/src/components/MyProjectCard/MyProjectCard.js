import React, { Component } from "react";
import { Card, Row, Col, Image, ButtonGroup, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import constants from "../../constants/constants";
import "./style.css";

let txt = "";
class MyProjectCard extends Component {
  constructor() {
    super();
    this.state = {};
  }

  iterate(value) {
    txt = txt + value + ", ";
  }

  render() {
    return (
      <div>
        {this.props.type === "my-projects" ? (
          <div className="mt-3">
            <Card style={{ minWidth: "80%", borderRadius:"10px", boxShadow: "-10px 10px 25px #d4d4d4", outline: "none", border:"none"}}>
              <Card.Header as="h5">{this.props.project.title}</Card.Header>
              <Card.Body>
                <Row>
                  <Col sm={4}>
                    <Link to={"/my-project-overview/" + this.props.project._id}>
                      <div style={{ height: "70%", width: "90%" }}>
                        <Image
                          className="productImageContainer"
                          src={
                            constants.backend_url +
                            `/project/photo/${this.props.project._id}`
                          }
                          thumbnail
                        />
                      </div>
                    </Link>
                  </Col>
                  <Col sm={8}>
                    {/* <Card.Text>
                      <h5>Description</h5>
                      {this.props.project.description}
                    </Card.Text> */}
                    <Card.Text>
                      <h5>Skills</h5>
                      <Row>
                        {this.props.project.skills.map((item) => (
                          <Col sm={2}>
                            <p
                              style={{
                                color: "green",
                                display:"flex",
                                flexDirection: "row",
                                backgroundColor: "white",
                                textAlign: "center",
                                borderRadius: "20%",
                              }}
                            >
                              {item}
                            </p>
                          </Col>
                        ))}
                      </Row>
                    </Card.Text>

                    <Card.Text>
                      <h5>Price</h5>
                      <h5 style={{ color: "red" }}>
                        $ {this.props.project.price}
                      </h5>
                    </Card.Text>
                  </Col>
                </Row>
                <br></br>
                <Link
                  className="btn btn-primary"
                  to={"/my-project-overview/" + this.props.project._id}
                >
                  Full Details
                </Link>
                &nbsp;
                <ButtonGroup>
                  <Link
                    className="btn btn-success"
                    to={"/edit-project/" + this.props.project._id}
                  >
                    <i className="fa fa-edit" />
                  </Link>
                  <Button
                    className="btn btn-danger"
                    onClick={() => {
                      this.props.deleteProject(this.props.project._id);
                    }}
                  >
                    <i className="fa fa-trash" />
                  </Button>
                  <Link
                    className="btn btn-success"
                    to={`/chat?name=${this.props.name}&room=${this.props.project.title}`}
                  >
                    <i className="fa fa-commenting" />
                  </Link>
                </ButtonGroup>
              </Card.Body>
            </Card>
          </div>
        ) : (
          <div className="mt-3">
            <Card style={{ width: "302px" }}>
              <Card.Header as="h5">{this.props.project.title}</Card.Header>
              <Card.Body>
                <Row>
                  <Col sm={4}>
                    <div style={{ height: "70%", width: "80%" }}>
                      <Image
                        style={{ width: "300px", height: "200px" }}
                        src={
                          constants.backend_url +
                          `/project/photo/${this.props.project._id}`
                        }
                        thumbnail
                      />
                    </div>
                  </Col>
                  <Col sm={8}>
                    {/* <Card.Text>{this.props.project.description}</Card.Text> */}
                    <Card.Text>
                      <h5>Skills</h5>
                      {this.props.project.skills.map((item) => (
                        <p style={{ color: "green" }}>{item}</p>
                      ))}
                    </Card.Text>

                    <Card.Text>
                      <h5>Price</h5>
                      <h5 style={{ color: "red" }}>
                        $ {this.props.project.price}
                      </h5>
                    </Card.Text>
                  </Col>
                </Row>
                <br></br>
                &nbsp;
                <ButtonGroup>
                  <Link
                    className="btn btn-primary"
                    to={"/project-overview/" + this.props.project._id}
                  >
                    Full Details
                  </Link>
                  <Link
                    className="btn btn-success"
                    to={`/chat?name=${this.props.name}&room=${this.props.project.title}`}
                  >
                    <i className="fa fa-commenting" />
                  </Link>
                </ButtonGroup>
              </Card.Body>
            </Card>
          </div>
        )}
      </div>
    );
  }
}

export default MyProjectCard;
