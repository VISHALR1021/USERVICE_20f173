import React, { Component } from "react";
import { Button, Box } from "@material-ui/core";
import axios from "axios";
import Chip from "../components/Chip/Chip";
import PropTypes from "prop-types";
import constants from "../constants/constants";
import { Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";

class MyProjectOverview extends Component {
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
      loading: false,
    };
    this.requestProject = this.requestProject.bind(this);
  }

  requestProject() {
    if (localStorage.getItem("auth-token") == "") {
      this.props.history.push("/login");
    } else {
      const request = axios.post(constants.backend_url + "/project/request", {
        projectId: this.props.match.params.id,
        workers_ids: localStorage.getItem("auth-id"),
      });
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
        this.setState({
          loading: true,
        });
      })
      .catch(function (err) {
        console.log(err);
      });
    //console.log("work: " + res.data);
  }

  render() {
    return (
      <div>
        <div>
          
          <div
            class="container-lg shadow p-3 mb-5 bg-body rounded text-dark "
            style={{ marginTop: "4%", backgroundColor: "white" }}
          >
            <h3 marginTop="20px" className="text-center">PROJECT OVERVIEW</h3>
            <br></br>
            <div style={{display:"flex", flexDirection:"row"}}>
            <Card.Img
              variant="top"
              src={constants.backend_url + `/project/photo/${this.state.id}`}
              style={{maxWidth:"50%", maxHeight:"380px", borderRadius:"20px" }}
            />
            <br />
            <div class="container-sm   text-dark mt-3">
              <h4>Project Title</h4>
              <p>{this.state.title}</p>

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
              <h1 style={{ color: "red" }}>${this.state.price}</h1>
              <div class="container-sm">
                <div className="row">
                  <h5 className="text-muted">No of requests recived: </h5>
                  <h5 className="ml-2" style={{ color: "green" }}>
                    {this.state.workers_ids.length} {"  "}
                  </h5>
                </div>
              </div>
              {localStorage.setItem(
                "projectDescription",
                this.state.description
              )}
              {localStorage.setItem("projectPrice", this.state.price)}
              <div class="container-sm mt-5">
                <div className="row">
                  <h5 className="text">Requests</h5>
                </div>

                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.workers_ids &&
                      this.state.workers_ids.map((item, index) => {
                        return (
                          <tr key={item}>
                            <th scope="row">{index + 1}</th>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>
                              <Link
                                to={"/profile-view/" + item._id + "/worker"}
                                className="text-primary"
                                style={{ textDecoration: "underline" }}
                              >
                                View
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
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

export default MyProjectOverview;
