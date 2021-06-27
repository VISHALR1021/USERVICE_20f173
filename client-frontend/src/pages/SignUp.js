import React, { Component } from "react";
import Input from "../components/Input";
import { Form, Button, Modal } from "react-bootstrap";
import loginBack from "../img/1.jpg";
import { Link } from "react-router-dom";
import Axios from "axios";
import constants from "../constants/constants";
import PropTypes from "prop-types";
import "../css/login.css";
import { Box } from "@material-ui/core";

import SkillSet from "../constants/skills";
import Chip from "@material-ui/core/Chip";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { getDefaultNormalizer } from "@testing-library/dom";
import login_img from "../img/joinus.svg"

class SignUp extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      conPassword: "",
      skills: [],
      fixedOptions: [SkillSet[2]],
      profilePic: null,
      description: "",
      backendError: "",
      show: false,
      verificationCode: 0,
      correctCode: undefined,
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.hadleUpload = this.hadleUpload.bind(this);
    this.emailSend = this.emailSend.bind(this);
    this.handleModal = this.handleModal.bind(this);
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleModal() {
    this.setState({ show: !this.state.show });
  }

  emailSend(e) {
    e.preventDefault();
    try {
      const signUpRes = Axios.get(
        constants.backend_url + "/users/sendMail/" + this.state.email
      ).then((res) => {
        this.setState({ backendError: res.data.msg });
        this.setState({ correctCode: res.data.code });
      });
    } catch (err) {
      err.response.data.msg &&
        this.setState({ backendError: err.response.data.msg });
    }
  }

  hadleUpload(e) {
    this.setState({
      profilePic: e.target.files[0],
    });
  }

  async onSubmit(e) {
    e.preventDefault();
    this.setState({
      backendError: "",
    });
    if (
      this.state.name === "" ||
      this.state.email === "" ||
      this.state.password === "" ||
      this.state.conPassword === "" ||
      this.state.skills === "" ||
      this.state.skills.length === 0
    ) {
      return this.setState({
        backendError: "Not all fields have been entered.",
      });
    }
    if (this.state.profilePic === null) {
      return this.setState({
        backendError: "Please Upload a profile picture",
      });
    }
    if (this.state.password != this.state.conPassword) {
      return this.setState({
        backendError: "Please Enter the same password twice",
      });
    }

    if (this.state.correctCode != this.state.verificationCode) {
      return this.setState({
        backendError: "Invalid",
      });
    }

    const formData = new FormData();
    formData.append("name", this.state.name);
    formData.append("email", this.state.email);
    formData.append("password", this.state.password);
    formData.append("passwordCheck", this.state.conPassword);
    this.state.skills.forEach((element) => {
      formData.append("skills[]", element);
    });
    formData.append("description", this.state.description);
    formData.append("photo", this.state.profilePic);
    try {
      const signUpRes = Axios.post(
        constants.backend_url + "/users/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      ).then((res) => {
        if (res.data.msg === "Successfully Registered") {
          this.props.history.push("/login");
        } else {
          this.setState({
            backendError: "Something went wrong",
          });
        }
      });
    } catch (err) {
      err.response.data.msg &&
        this.setState({ backendError: err.response.data.msg });
    }
  }

  render() {
    return (
      <div className="container" style={{ marginBottom: "20%" }}>
        <div className="card" style={{ marginTop: "70px", borderRadius:"10px", border:"none", boxShadow: "-10px 10px 45px #d4d4d4" }}>
          <div className="row">
          <img src={login_img} style={{display:"flex", height:"480px", margin:"0", padding:"50px 50px"}} />
            <div className="col">
              <div
                style={{
                  paddingTop: "5%",
                  width: "80%",
                }}
              >
                <form>
                  <h3 className="text-center"  style={{ paddingBottom: "10px", fontFamily:"poppins", fontWeight:"600", color:"#7e27cf" }}>
                    Sign Up
                  </h3>
                  <div className="conatiner text-center">
                    <p className="text-danger">{this.state.backendError}</p>
                  </div>
                  <Input
                    name="name"
                    onChange={(e) => this.handleChange(e)}
                    lable="Name"
                    type="text"
                    placeholder="Enter Your Name..."
                  />
                  <Input
                    name="email"
                    onChange={(e) => this.handleChange(e)}
                    lable="Email"
                    type="text"
                    placeholder="Enter Your Email..."
                  ></Input>

                  {/* Set Skills */}
                  <label>Skills</label>
                  <Autocomplete
                    multiple
                    id="fixed-tags-demo"
                    value={this.state.skills}
                    onChange={(event, newValue) => {
                      this.setState({
                        skills: [...newValue],
                      });
                    }}
                    options={SkillSet}
                    getOptionLabel={(option) => option}
                    renderTags={(tagValue, getTagProps) =>
                      tagValue.map((option, index) => (
                        <Chip label={option} {...getTagProps({ index })} />
                      ))
                    }
                    style={{ width: "100%" }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label=""
                        variant="outlined"
                        placeholder="My Skills"
                      />
                    )}
                  />
                  {/* End Set Skills */}
                  <Input
                    lable="Description"
                    name="description"
                    as="textarea"
                    rows="3"
                    placeholder="Enter Description..."
                    onChange={(e) => this.handleChange(e)}
                  ></Input>

                  <Form>
                    <label>Profile Picture</label>
                    <Form.Group>
                      <input
                        required
                        type="file"
                        name="photo"
                        className="form-control"
                        aria-describedby="emailHelp"
                        onChange={this.hadleUpload}
                      />
                      {/* <Form.Control
                      type="file"
                      name="photo"
                      label="Profile Picture"
                      onChange={this.hadleUpload}
                      required
                    /> */}
                    </Form.Group>
                  </Form>
                  <section>{/* selected Image preview here */}</section>
                  <Input
                    name="password"
                    onChange={(e) => this.handleChange(e)}
                    lable="Password"
                    type="password"
                    placeholder="Enter Your Password..."
                  ></Input>
                  <Input
                    name="conPassword"
                    onChange={(e) => this.handleChange(e)}
                    lable="Re-Enter Password"
                    type="password"
                    placeholder="Re-Enter Your Password..."
                  ></Input>
                  <Button
                    style={{ width:"100%", backgroundColor:"#7e27cf", fontFamily:"poppins", fontWeight:"600", fontSize:"10pt", border:"none", outline:"none", borderRadius:"20px"}}
                    
                    onClick={() => {
                      this.handleModal();
                    }}
                  >
                    Sign Up
                  </Button>
                  <div className="my-3"></div>
                  {/* <Button
                    style={{ width: "100%" }}
                    variant="primary"
                    onClick={(e) => this.emailSend(e)}
                  >
                    Email
                  </Button> */}
                  <section className="text-center">
                    <p className="mt-4 mb-2  copyright-text">
                      Already have an account?&nbsp;
                      <Link to="/login" style={{color:"#7e27cf", fontFamily:"poppins", fontWeight:"600", fontSize:"10pt"}}>Log In</Link>
                    </p>
                    <p className="mt-5 mb-3 text-muted copyright-text">
                      Copyright © 2021 All Rights Reserved by &nbsp;
                      <Link to="/" style={{color:"#7e27cf", fontFamily:"poppins", fontWeight:"600", fontSize:"10pt"}}>USERVICE</Link>
                    </p>
                  </section>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* ***verification model*** */}
        <div className="text-center my-3">
          <Box display="flex" justifyContent="center">
            <Modal
              id="one"
              show={this.state.show}
              onHide={() => this.handleModal()}
            >
              <Modal.Header>
                <h6>Verify Your email</h6>
              </Modal.Header>
              <Modal.Body>
                <div className="conatiner text-center">
                  <p className="text-danger">{this.state.backendError}</p>
                </div>
                <Button
                  style={{ width: "100%" }}
                  variant="success"
                  onClick={(e) => this.emailSend(e)}
                >
                  Send Email
                </Button>
                <div className="my-5"></div>
                <Input
                  name="verificationCode"
                  onChange={(e) => this.handleChange(e)}
                  //lable="Name"
                  type="number"
                  placeholder="Verification code"
                />
              </Modal.Body>
              <Modal.Footer>
                <button onClick={this.onSubmit} class="btn btn-primary">
                  SignUp
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={() => {
                    this.handleModal();
                  }}
                >
                  Cancel
                </button>
              </Modal.Footer>
            </Modal>
          </Box>
        </div>
        {/* ***end model*** */}
      </div>
    );
  }
}

export default SignUp;
