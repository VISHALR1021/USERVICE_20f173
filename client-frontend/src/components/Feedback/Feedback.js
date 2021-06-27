import React, { Component } from "react";
import { Box, Grid, Paper, Typography } from "@material-ui/core";
import {
  Nav,
  form,
  Image,
  Col,
  Row,
  Button,
  Container,
  Card,
} from "react-bootstrap";
import Rating from "@material-ui/lab/Rating";
import Axios from "axios";
import constants from "../../constants/constants";
import BounceLoader from "react-spinners/BounceLoader";

class Feedback extends Component {
  constructor() {
    super();
    this.state = {
      values: [],
      loading: false,
    };
    this.getAccountDeatils = this.getAccountDeatils.bind(this);
  }
  componentDidMount() {
    this.getAccountDeatils();
  }
  getAccountDeatils() {
    var worker_id = this.props.id;

    Axios.get(constants.backend_url + "/rating/review/" + worker_id)
      .then((response) => {
        this.setState({
          values: response.data,
        });
        this.setState({
          loading: true,
        });
        var date = new Date(response.data[0]).toISOString().split("T")[0];
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    return (
      <div>
        {this.state.loading ? (
          <div>
            {this.state.values &&
              this.state.values.map((item, index) => {
                return (
                  <div style={{ width: "100%" }} className="row" key={index}>
                    <Container>
                      <Card style={{ width: "100%" }}>
                        <Card.Body>
                          <Card.Title>
                            <Row>
                              <Col sm={10}>{item.owner_id.name}</Col>
                              <Col sm={2}>{item.date.split("T")[0]}</Col>
                            </Row>{" "}
                          </Card.Title>
                          <Card.Text>{item.review}</Card.Text>
                          <Card.Footer>
                            <Typography component="legend">Rating</Typography>
                            <Rating
                              name="view-rate"
                              value={item.rating}
                              readOnly
                            />
                          </Card.Footer>
                        </Card.Body>
                      </Card>
                    </Container>
                  </div>
                );
              })}
          </div>
        ) : (
          <div className="text-center" style={{ marginTop: "-1%" }}>
            <BounceLoader color={"#0052d4"} loading={true} size={50} />
          </div>
        )}
      </div>
    );
  }
}

export default Feedback;
