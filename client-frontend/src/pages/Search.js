import React, { Component } from "react";
import PropTypes from "prop-types";
import { Col, Container, Row } from "react-bootstrap";
import MyCard from "../components/Card/Card";
import mern from "../img/mern.jpg";
import MyPagination from "../components/Pagination/Pagination";
import constants from "../constants/constants";
import Axios from "axios";
import Alert from "react-bootstrap/Alert";
import BeatLoader from "react-spinners/BeatLoader";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
      projectList: [],
      loading: false,
    };
    this.onSearch = this.onSearch.bind(this);
  }
  componentDidMount() {
    this.setState({
      keyword: this.props.match.params.keyword,
    });
    this.onSearch(this.props.match.params.keyword);
  }
  onSearch(keyword) {
    Axios.get(constants.backend_url + "/project/onSearch/" + keyword)
      .then((response) => {
        console.log(response.data);
        this.setState({
          projectList: response.data,
        });
        this.setState({
          loading: true,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    return (
      <div style={{ marginTop: "30px" }}>
        <Container>
          <h3 className="text-center">
            Search Results For "{this.state.keyword}"
          </h3>
          <br></br>

          {this.state.loading ? (
            [
              this.state.projectList.length != 0 ? (
                <Row className="justify-content-md-center">
                  {this.state.projectList &&
                    this.state.projectList.map((item) => {
                      return <MyCard data={item} />;
                    })}
                </Row>
              ) : (
                <div>
                  <br />
                  <br />
                  <center>
                    <Alert variant="warning">
                      <h4>No Available Projects!!</h4>
                    </Alert>
                  </center>
                </div>
              ),
            ]
          ) : (
            <div className="text-center" style={{ marginTop: "20%" }}>
              <BeatLoader color={"#474747"} loading={true} size={20} />
            </div>
          )}

          <br></br>

          <br></br>
          {/*<MyPagination></MyPagination>*/}
        </Container>
      </div>
    );
  }
}

Search.propTypes = {};

export default Search;
