import React, { Component } from "react";
import { Container } from "react-bootstrap";
import ProjectCard from "../components/ProjectCard/ProjectCard";
import MyPagination from "../components/Pagination/Pagination";
import { Card, Row, Col, Image, ButtonGroup, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import mern from "../img/mern.jpg";
import constants from "../constants/constants";
import MyProjectCard from "../components/MyProjectCard/MyProjectCard";
import BeatLoader from "react-spinners/BeatLoader";

class MyProjects extends Component {
  constructor(props) {
    super(props);

    this.deleteProject = this.deleteProject.bind(this);
    this.state = { projects: [], name: "", loading: false };
    this.getUserName = this.getUserName.bind(this);
  }

  //get the list of projects from database
  componentDidMount() {
    //getting all the projects and puting in the projects array we declared in the constructor
    axios
      .get(
        constants.backend_url +
          "/project/get-my-projects/" +
          localStorage.getItem("auth-id")
      )
      .then((res) => {
        this.setState({ projects: res.data });
        this.setState({
          loading: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    this.getUserName();
  }

  getUserName() {
    var userId = localStorage.getItem("auth-id");

    axios
      .get(constants.backend_url + "/users/get-user/" + userId)
      .then((response) => {
        this.setState({
          name: response.data[0].name,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  //delete project function for delete button
  deleteProject(id) {
    axios
      .delete("http://localhost:5008/project/delete/" + id) //deleting project in particular id using axios
      .then((res) => console.log(res.data));

    //updating exercises list after deleting the excersise
    this.setState({
      projects: this.state.projects.filter((el) => el._id !== id), //when every project id does not equal to the deleted project id, that exercises will pass into the project array
    });
  }

  projectList() {
    return this.state.projects.map((currentproject) => {
      return (
        <MyProjectCard
          name={this.state.name}
          project={currentproject}
          deleteProject={this.deleteProject}
          key={currentproject._id}
          type={"my-projects"}
          style={{}}
        />
      );
    });
  }

  render() {
    return (
      <div style={{ marginTop: "40px" }}>
        <Container>
          <h4 className="text-center">My Projects</h4>
          <Link className="btn btn-success" to="/new-project">
            <i className="fa fa-plus" /> Add New Project
          </Link>
          <br></br>
          {this.state.loading ? (
            this.projectList()
          ) : (
            <div className="text-center" style={{ marginTop: "10%" }}>
              <BeatLoader color={"#0052d4"} loading={true} size={100} />
            </div>
          )}
          {/* {this.projectList()} */}
          <br></br>
        </Container>
      </div>
    );
  }
}

export default MyProjects;
