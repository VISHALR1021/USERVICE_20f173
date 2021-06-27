import React, { Component } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import constants from "../constants/constants";
import MyProjectCard from "../components/MyProjectCard/MyProjectCard";
import BeatLoader from "react-spinners/BeatLoader";

class AppliedProjects extends Component {
  constructor(props) {
    super(props);
    this.state = { projects: [], name: "", loading: false };
    this.getMyProjects = this.getMyProjects.bind(this);
  }
  componentDidMount() {
    this.getMyProjects();
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
  getMyProjects() {
    axios
      .get(
        constants.backend_url +
          "/project/get-applied-projects/" +
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
  }
  render() {
    return (
      <div style={{ marginTop: "40px", width:"100%" }}>
        <Container>
          <h4 className="text-center mt-5 text-uppercase">
            Requested Projects
          </h4>

          <br></br>

          {this.state.loading ? (
            <div>
              {this.state.projects &&
                this.state.projects.map((item) => {
                  return (
                    <MyProjectCard 
                       style={{width:"100%"}}                      name={this.state.name}
                      type={"requested-projects"}
                      project={item}
                      //deleteProject={this.deleteProject}
                      key={item._id}
                    />
                  );
                })}
            </div>
          ) : (
            <div className="text-center" style={{ marginTop: "10%" }}>
              <BeatLoader color={"#0052d4"} loading={true} size={100} />
            </div>
          )}

          <br></br>
        </Container>
      </div>
    );
  }
}

export default AppliedProjects;
