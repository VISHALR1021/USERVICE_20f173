import React, { Component } from "react";
import pic5 from "../img/back.jpg";
import bg2 from "../img/bg2.jpg";
import { Box, Grid, Paper, Typography, Button } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import Feedback from "../components/Feedback/Feedback";
import {
  Nav,
  form,
  Image,
  Col,
  Row,
  Container,
  Card,
  Modal,
} from "react-bootstrap";
import bio from "../img/bio.png";
import { alignPropType } from "react-bootstrap/esm/DropdownMenu";
import Profilepic from "../components/ProfileCircle/ProfileCircle";
import Chip from "../components/Chip/Chip";
import PropTypes from "prop-types";
import constants from "../constants/constants";
import Axios from "axios";
import { Link } from "react-router-dom";
import Photo from "../components/Photo/Photo";

export class Example extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
      img: undefined,
    };
  }

  handleModal() {
    this.setState({ show: !this.state.show });
  }

  render() {
    return (
      <div
        class="container-lg  shadow p-3 mb-5 bg-body rounded bg-light text-dark  "
        style={{ marginTop: "30px", position: "relative" }}
      >
        <img
          src={bg2} style={{ width: "97.2%", height: "20%", position: "absolute" }}></img>
        <div
          class="coloumn container-lg  shadow p-3 mb-5"
          style={{ backgroundColor: "white" }}
        >
          <div class="row">
            <p
              class=" w-100 p-3 text-white"
              style={{ textAlign: "center", position: "absolute" }}
            ></p>
          </div>
          <div class="row">
            <h2>Photo</h2>
            <Photo
              key={"60a6b8263c3d614b4cab4fe7"}
              id={"60a6b8263c3d614b4cab4fe7"}
            />
          </div>
          <div class="row">
            <div
              class="container-sm  shadow p-3 mb-5 bg-body rounded bg-light text-dark "
              style={{
                marginTop: "30px",
                width: "530px",
                marginTop: "100PX",
              }}
            ></div>
          </div>
          <div class="row">
            <div class="mx-auto" style={{ width: "370px" }}>
              <Profilepic />
            </div>
          </div>
          <h1 className="text-center" style={{ marginTop: "-35px" }}>
            dkndvndvkdk
          </h1>
          <h5 className="text-center text-muted">vdvdvdvdvdvd</h5>
          <div className="text-center my-3">
            <Link to="edit-profile">
              <Box display="flex" justifyContent="center">
                <Button variant="contained">Edit Profile</Button>
              </Box>
            </Link>
          </div>
          <div className="text-center my-3">
            <Box display="flex" justifyContent="center">
              <Button
                variant="contained"
                onClick={() => {
                  this.handleModal();
                }}
              >
                Delete Profile
              </Button>
              <Modal
                id="one"
                show={this.state.show}
                onHide={() => this.handleModal()}
              >
                <Modal.Body>
                  <h6>are you Sure?</h6>
                </Modal.Body>
                <Modal.Footer>
                  <button
                    class="btn btn-primary"
                    onClick={() => {
                      this.handleModal();
                    }}
                  >
                    close
                  </button>
                  <button type="button" class="btn btn-primary">
                    Yes
                  </button>
                </Modal.Footer>
              </Modal>
            </Box>
          </div>
          <br></br>

          <div class="row">
            <div class="mx-auto" style={{ width: "80px" }}>
              <img
                src={bio}
                class="rounded-circle "
                alt="..."
                style={{
                  width: "50px",
                  height: "50px",
                  marginLeft: "ml-6",
                  marginTop: "10px",
                  position: "absolute",
                }}
              ></img>
            </div>
          </div>

          <div class="row">
            <div
              class="container shadow-sm p-3 mb-3 bg-body rounded bg-light text-dark"
              style={{ width: "600px", marginTop: "35PX" }}
            >
              <br></br>
              dvdvdvdvd
            </div>
            <div>,</div>
          </div>
          <div className="text-center my-3">
            <Link to="my-projects">
              <Box display="flex" justifyContent="center">
                <Button variant="contained">My Projects</Button>
              </Box>
            </Link>
          </div>
          <div className="text-center my-3">
            <Link to="new-project">
              <Box display="flex" justifyContent="center">
                <Button variant="contained">Create New Projects</Button>
              </Box>
            </Link>
          </div>
          <div className="row text-center">
            <div
              className="container shadow-sm p-3 mb-5 bg-body rounded bg-light text-dark"
              style={{ width: "600px", marginTop: "5PX" }}
            >
              <h3>Skills</h3>
              <br></br>
              <Chip></Chip>
            </div>
          </div>

          <div className="row">
            <div
              className="container shadow-sm p-3 mb-5 bg-body rounded bg-light text-dark"
              style={{ width: "1000px", marginTop: "5PX" }}
            >
              <br></br>
              <h4 className="text-center">Feedbacks & Ratings</h4>
              <br></br>
              <div>
                <Feedback />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Example;
