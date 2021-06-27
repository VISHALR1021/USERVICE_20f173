import React, { Component } from "react";
import Axios from "axios";
import constants from "../constants/constants";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import EditorInsertComment from "material-ui/svg-icons/editor/insert-comment";
import SkillSet from "../constants/skills";
import Chip from "@material-ui/core/Chip";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

class EditProfile extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };
  constructor(props) {
    super(props);

    this.state = {
      values: [],
      name: "",
      skills: [],
      profilePic: "",
      description: "",
      fixedOptions: [SkillSet[2]],
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.getAccountDeatils = this.getAccountDeatils.bind(this);
  }
  componentDidMount() {
    this.getAccountDeatils();
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  getAccountDeatils() {
    var userId = localStorage.getItem("auth-id");

    Axios.get(constants.backend_url + "/users/get-user/" + userId)
      .then((response) => {
        response.data.forEach((item) => {
          this.setState({
            name: item.name,
            description: item.description,
            skills: item.skills,
          });
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async onSubmit(e) {
    e.preventDefault();
    console.log("SK: " + this.state.skills);
    var userId = localStorage.getItem("auth-id");
    console.log("sub: " + this.state.skills);
    let userData = {
      name: this.state.name,
      profilePic: this.state.profilePic,
      skills: this.state.skills,
      description: this.state.description,
    };
    try {
      const loginRes = await Axios.post(
        constants.backend_url + "/users/update/" + userId,
        userData
      );
      this.props.history.push("/my-profile");
    } catch (err) {
      err.response.data.msg && console.log(err.response.data.msg);
    }
  }
  render() {
    return (
      <div>
        <div>
          <div
            class="container-lg shadow p-3 mb-5 bg-body rounded text-dark "
            style={{ marginTop: "5%", backgroundColor: "white" }}
          >
            <h3 className="text-center">EDIT PROFILE</h3>
            <br></br>
            <div class="container-sm   text-dark ">
              <form onSubmit={this.onSubmit}>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    <h4>Name</h4>
                  </label>
                  <input
                    onChange={(e) => this.handleChange(e)}
                    name="name"
                    type="text"
                    className="form-control"
                    value={this.state.name}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    <h4>Skills</h4>
                  </label>

                  {/* Set Skills */}
                  <Autocomplete
                    multiple
                    id="fixed-tags-demo"
                    value={this.state.skills}
                    onChange={(event, newValue) => {
                      this.setState({
                        skills: [
                          ...newValue.filter(
                            (option) =>
                              this.state.fixedOptions.indexOf(option) === -1
                          ),
                        ],
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
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    <h4>Description</h4>
                  </label>
                  <div class="mb-3">
                    <textarea
                      value={this.state.description}
                      onChange={(e) => this.handleChange(e)}
                      name="description"
                      class="form-control"
                      id="exampleFormControlTextarea1"
                      rows="3"
                      required
                    ></textarea>
                  </div>
                </div>
                <h4>Profile Picture</h4>
                <div className="input-group mb-3">
                  <input
                    type="file"
                    className="form-control"
                    id="inputGroupFile02"
                  />
                </div>
                <br></br>
                <div className="container">
                  <div className="row">
                    <button type="submit" className="btn btn-primary ">
                      Edit Project
                    </button>
                    <Link to="/my-profile">
                      <button className="btn btn-primary mx-3">Cancel</button>
                    </Link>
                  </div>
                </div>
              </form>
              <br></br>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditProfile;
