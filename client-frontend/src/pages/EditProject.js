import React, { Component } from "react";
import axios from "axios";
import Chip from "../components/Chip/Chip";
import PropTypes from "prop-types";
import constants from "../constants/constants";
import SkillSet from "../constants/skills";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

class EditProject extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeSkills = this.onChangeSkills.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      //state used to like create variable and store data. here is like initialising all the attributes with initial values, like (let username = ' ';)
      title: "",
      description: "",
      skills: [],
      price: "0",
      fixedOptions: [SkillSet[2]],
    };
  }

  //getting current project details by id
  componentDidMount() {
    axios
      .get(
        "http://localhost:5008/project/get-details/" +
          this.props.match.params.id
      )
      .then((res) => {
        this.setState({
          title: res.data[0].title,
          description: res.data[0].description,
          price: res.data[0].price,
          skills: res.data[0].skills,
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  onChangeTitle(e) {
    //setting the title that entered in the text box (here target is textbox)
    this.setState({ title: e.target.value });
  }

  onChangeDescription(e) {
    //setting the descriptionthat entered in the text box (here target is textbox)
    this.setState({ description: e.target.value });
  }

  onChangeSkills(e) {
    //setting the skills that entered in the text box (here target is TagInput)
    this.setState({ skills: e.target.value });
  }

  onChangePrice(e) {
    //setting the price that entered in the text box (here target is textbox)
    this.setState({ price: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const project = {
      title: this.state.title,
      description: this.state.description,
      skills: this.state.skills,
      price: this.state.price,
      seller_id: localStorage.getItem("auth-id"),
    };

    console.log(project);

    //sending data to the mongodb dtabase with axios
    axios
      .post(
        "http://localhost:5008/project/update/" + this.props.match.params.id,
        project
      )
      .then((res) => console.log(res.data));

    window.location = "/my-projects";
  }

  render() {
    return (
      <div>
        <div>
          <div
            class="container-lg shadow p-3 mb-5 bg-body rounded text-dark "
            style={{ marginTop: "5%", backgroundColor: "white" }}
          >
            <h3 className="text-center">EDIT PROJECT</h3>
            <br></br>
            <div class="container-sm   text-dark ">
              <form onSubmit={this.onSubmit}>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    <h4>Project Title</h4>
                  </label>
                  <input
                    required
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    value={this.state.title}
                    onChange={this.onChangeTitle}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    <h4>Required Skills</h4>
                  </label>
                  {/* <input
                    type="text"
                    className="form-control"
                    id="exampleInputPassword1"
                    value={this.state.skills}
                    onChange={this.onChangeSkills}
                  /> */}
                  {this.state.skills &&
                    this.state.skills.map((item) => {
                      return <Chip skill={item} key={item._id} />;
                    })}
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
                        placeholder="Required Skills"
                      />
                    )}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    <h4>Project Description</h4>
                  </label>
                  <div class="mb-3">
                    <textarea
                      required
                      class="form-control"
                      id="exampleFormControlTextarea1"
                      rows="3"
                      value={this.state.description}
                      onChange={this.onChangeDescription}
                    ></textarea>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    <h4>Price</h4>
                  </label>
                  <input
                    required
                    type="number"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    value={this.state.price}
                    onChange={this.onChangePrice}
                  />
                </div>

                <br></br>
                <button type="submit" className="btn btn-primary ">
                  Edit Project
                </button>
              </form>
              <br></br>
            </div>
          </div>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
        </div>
      </div>
    );
  }
}

export default EditProject;
