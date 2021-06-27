import React, { Component } from "react";
import pic5 from "../img/back.jpg";
import bg2 from "../img/bg2.jpg";
import { Box, Grid, Paper, Typography, Button } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import Feedback from "../components/Feedback/Feedback";
import Paypal from "../components/Paypal/Paypal";

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
import AddFeedback from "../components/Feedback/AddFeedback";

export class ProfileView extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };
  constructor() {
    super();
    this.state = {
      values: [],
      show: false,
      type: "",
      checkout: false,
      rate: 0,
      count: 0,
    };
    this.getAccountDeatils = this.getAccountDeatils.bind(this);
    this.handleModal = this.handleModal.bind(this);
  }

  componentDidMount() {
    this.getAccountDeatils();
    this.setState({
      type: this.props.match.params.type,
    });
  }

  getRating() {
    var userId = this.props.match.params.id;
    var actualRate = 0;
    var count = 0;
    var totalRate = 0;
    Axios.get(constants.backend_url + "/rating/get-overall-rate/" + userId)
      .then((response) => {
        totalRate = response.data.total;
        count = response.data.count;
        actualRate = (totalRate / count).toFixed(1);
        //console.log("actual: " + actualRate);
        if (totalRate != 0 && count != 0) {
          this.setState({
            rate: actualRate,
            count: count,
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getAccountDeatils() {
    var userId = localStorage.getItem("auth-id");

    Axios.get(
      constants.backend_url + "/users/get-user/" + this.props.match.params.id
    )
      .then((response) => {
        this.setState({
          values: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleModal() {
    this.setState({ show: !this.state.show });
  }

  render() {
    return (
      <div
        class="container-lg  shadow p-3 mb-5 bg-body rounded bg-light text-dark  "
        style={{ marginTop: "40px", position: "relative" , borderRadius:"20%", boxShadow: "-10px 10px 25px #d4d4d4", outline: "none", border:"none"}}
      >
        <img
          src={bg2}
          style={{ width: "97%", height: "200px", position: "absolute", justifyContent:"center", alignItems:"center", borderRadius:"20px" }}
        ></img>
        {this.state.values.length > 0 && this.state.values.map((item) => {
            return (
              <div
                class="coloumn container-lg  shadow p-3 mb-5"
                style={{ backgroundColor: "white" }}
              >

                <div class="row">
                  <div
                    class="container-sm  shadow p-3 mb-5 bg-body rounded bg-light text-dark "
                    style={{
                      marginTop: "20px",
                      width: "530px",
                    }}
                  ></div>
                </div>
                <div class="row">
                  <div class="mx-auto" style={{ width: "370px", top:"20px" }}>
                    <Profilepic id={item._id} />
                  </div>
                </div>
                <h2 className="text-center" style={{ marginTop: "-35px" }}>
                  {item.name}
                </h2>
                <h4 className="text-center text-muted"> {item.email}</h4>
                <div class="row">
                  <div
                    class="container shadow-sm p-3 mb-3 bg-body rounded bg-light text-dark text-center"
                    style={{ width: "80%", marginTop: "20px" }}
                  >
                    <br></br>
                    {item.description}
                  </div>
                  <div>,</div>
                </div>
                <div className="text-center">
                  <Row className="justify-content-md-center">
                    <Col sm={1}>
                      <p className="text-muted px-1">({this.state.rate})</p>
                    </Col>
                    <Col sm={2}>
                      <Rating
                        precision={0.1}
                        sizeSmall
                        name="half-rating-read"
                        value={this.state.rate}
                        readOnly
                      />
                    </Col>
                    <Col sm={1}>
                      <p className="text-muted px-1">({this.state.count})</p>
                    </Col>
                  </Row>
                </div>
                <div className="text-center my-3">
                  {/* <Link to="edit-profile"> */}
                  {this.state.type === "worker" ? (
                    <div>
                      <Box display="flex" justifyContent="center">
                        {this.state.checkout ? (
                          <Paypal />
                        ) : (
                          <Button
                            onClick={() => {
                              this.setState({
                                checkout: true,
                              });
                            }}
                            variant="contained"
                          >
                            Pay Now!
                          </Button>
                        )}
                      </Box>
                      <AddFeedback worker_id={this.props.match.params.id} />
                    </div>
                  ) : (
                    <></>
                  )}
                  {/* </Link> */}
                </div>



                <div className="row text-center">
                  <div
                    className="container shadow-sm p-3 mb-5 bg-body rounded bg-light text-dark "
                    style={{ width: "600px", marginTop: "5PX", margin: "auto" }}
                  >
                    <h4>Skills</h4>
                    <br></br>
                    <div className="row">
                      {item.skills &&
                        item.skills.map((item, index) => {
                          return (
                            <Chip key={index} skill={item} key={item._id} />
                          );
                        })}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div
                    className="container shadow-sm p-3 mb-5 bg-body rounded bg-light text-dark"
                    style={{ width: "1000px", marginTop: "5px" }}
                  >
                    <br></br>
                    <h4 className="text-center">Feedbacks & Ratings</h4>
                    <br></br>
                    <div>
                      <Feedback id={this.props.match.params.id} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    );
  }
}

export default ProfileView;
