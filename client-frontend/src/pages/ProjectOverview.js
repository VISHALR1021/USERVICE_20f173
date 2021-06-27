import React, { Component } from "react";
import { Button, Box } from "@material-ui/core";
import axios from "axios";
import Chip from "../components/Chip/Chip";
import PropTypes from "prop-types";
import constants from "../constants/constants";
import { Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

class ProjectOverview extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      //state used to like create variable and store data. here is like initialising all the attributes with initial values, like (let username = ' ';)
      title: "",
      description: "",
      skills: [],
      price: "0",
      owner_id: "",
      workers_ids: "",
      request: false,
    };
    this.requestProject = this.requestProject.bind(this);
    this.checkRequest = this.checkRequest.bind(this);
  }

  requestProject() {
    if (localStorage.getItem("auth-token") == "") {
      this.props.history.push("/login");
    } else {
      const request = axios.post(constants.backend_url + "/project/request", {
        projectId: this.props.match.params.id,
        workers_ids: localStorage.getItem("auth-id"),
      });
      window.location.reload();
    }
  }

  //getting current project details by id
  componentDidMount() {
    axios
      .get(
        constants.backend_url +
          "/project/get-details/" +
          this.props.match.params.id
      )
      .then((res) => {
        this.setState({
          owner_id: res.data[0].owner_id,
          id: res.data[0]._id,
          title: res.data[0].title,
          description: res.data[0].description,
          price: res.data[0].price,
          skills: res.data[0].skills,
          workers_ids: res.data[0].workers_ids,
        });
        this.checkRequest();
      })
      .catch(function (err) {
        console.log(err);
      });
    //console.log("work: " + res.data);
  }

  checkRequest() {
    axios
      .post(constants.backend_url + "/project/check-request", {
        projectId: this.props.match.params.id,
        workers_ids: localStorage.getItem("auth-id"),
      })
      .then((res) => {
        console.log("res: " + res.data.msg);
        if (res.data.msg === "Not requested") {
          this.setState({
            request: false,
          });
        } else {
          this.setState({
            request: true,
          });
        }
      });
  }

  render() {
    return (
      <div>
        <div>
          <div
            class="container-lg shadow p-4 mb-6 bg-body rounded text-dark "
            style={{ marginTop: "5%", width:"100%", backgroundColor: "white" }}
          >
            
            <h3 className="text-center">{this.state.title}</h3>
            <br></br>
            <div 
            style={{display:"flex", justifyContent:"space-between", width:"100%"}}
            >
              
              <Card.Img
                variant="top"
                style={{width:"45%", height:"300px"}}
                src={constants.backend_url + `/project/photo/${this.state.id}`}
              />
              <br/>
              <div class="container-lg p-6 mb-6" style={{padding:"40px 20px"}}>
              <h4>Job Description</h4>
              <p>{this.state.description}</p>
              <h4>Required Skills</h4>
              <div className="row">
                {this.state.skills &&
                  this.state.skills.map((item) => {
                    return (
                      <div className="px-1">
                        <Chip skill={item} key={item._id} />
                      </div>
                    );
                  })}
              </div>

              <h4>Job Rate</h4>
              <h1 style={{ color: "red" }}>$ {this.state.price}</h1>
              <div class="container-sm">
                <div className="row">
                  <h5 className="text-muted">No of requests recived: </h5>
                  <h5 style={{ color: "green" }} className="ml-2">
                    {this.state.workers_ids.length} {"  "}
                  </h5>
                </div>
              </div>
              <div class="container-sm">
                <div className="row">
                  <Link
                    to={"/profile-view/" + this.state.owner_id._id + "/viewer"}
                    className="text-primary"
                    style={{ textDecoration: "underline" }}
                  >
                    View owner account
                  </Link>
                </div>
              </div>
              <div style={{ width: "100%" }}>
                {this.state.owner_id._id != localStorage.getItem("auth-id") &&
                this.state.request === false ? (
                  <Box
                    onClick={this.requestProject}
                    display="flex"
                    flexDirection="row-reverse"
                    p={1}
                    m={1}
                  >
                    <Button variant="contained" style={{ color:"white", width:"25%", backgroundColor:"#7e27cf", fontFamily:"poppins", fontWeight:"600", fontSize:"10pt", border:"none", outline:"none", borderRadius:"20px"}}>Request Job</Button>
                  </Box>
                ) : (
                  [
                    this.state.request === true ? (
                      <Box
                        display="flex"
                        flexDirection="row-reverse"
                        p={1}
                        m={1}
                      >
                        <Button variant="contained" style={{ width:"25%", backgroundColor:"#7e27cf", fontFamily:"poppins", fontWeight:"600", fontSize:"10pt", border:"none", outline:"none", borderRadius:"20px"}}>Requested</Button>
                      </Box>
                    ) : null,
                    <></>,
                  ]
                )}
              </div>
              <br></br>
              <br></br>
            </div>
       
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProjectOverview;
