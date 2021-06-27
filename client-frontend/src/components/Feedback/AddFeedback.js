import React, { Component, useState } from "react";
import { Box, Grid, Paper, Typography, Button } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { Modal } from "react-bootstrap";
import Input from "../Input/index";
import Axios from "axios";
import constants from "../../constants/constants";
import { FilterTiltShiftSharp } from "@material-ui/icons";

class AddFeedback extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
      rate: 0,
      review: "",
    };
    this.handleModal = this.handleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleModal() {
    this.setState({ show: !this.state.show });
  }

  handleSubmit(e) {
    e.preventDefault();
    var dateUtc = new Date();

    let data = {
      owner_id: localStorage.getItem("auth-id"),
      worker_id: this.props.worker_id,
      review: this.state.review,
      rating: this.state.rate,
      date: dateUtc,
    };

    Axios.post(constants.backend_url + "/rating/add/", data)
      .then((response) => {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    this.setState({ rate: 0 });
  }

  render() {
    return (
      <div className="text-center my-3">
        <Box display="flex" justifyContent="center">
          <Button
            variant="contained"
            onClick={() => {
              this.handleModal();
            }}
          >
            Review
          </Button>
          <Modal
            id="one"
            show={this.state.show}
            onHide={() => this.handleModal()}
          >
            <Modal.Header>Add Review and Comment</Modal.Header>
            <form onSubmit={this.handleSubmit}>
              <Modal.Body>
                <Box component="fieldset" mb={3} borderColor="transparent">
                  <Typography component="legend">Rating</Typography>
                  <Rating
                    name="simple-controlled"
                    value={this.state.rate}
                    onChange={(event, newValue) => {
                      this.setState({ rate: newValue });
                    }}
                  />
                  <div className="mt-3">
                    <Typography component="legend">Review</Typography>
                    <Input
                      name="description"
                      as="textarea"
                      rows="3"
                      placeholder="Enter Review..."
                      onChange={(e) =>
                        this.setState({ review: e.target.value })
                      }
                    ></Input>
                  </div>
                </Box>
              </Modal.Body>
              <Modal.Footer>
                <button
                  onClick={() => {
                    this.handleModal();
                  }}
                  type="submit"
                  class="btn btn-primary"
                >
                  Add
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
            </form>
          </Modal>
        </Box>
      </div>
    );
  }
}

export default AddFeedback;
