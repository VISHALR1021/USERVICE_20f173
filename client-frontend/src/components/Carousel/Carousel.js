import React from "react";
import { Carousel } from "react-bootstrap";
import caro from "../../img/img1.png";
import caro1 from "../../img/5.png";
import caro2 from "../../img/caro1.jpg";

export default function MyCarousel(props) {
  return (
    <div>
      <Carousel style={{zIndex:"5" ,transition:"ease-in-out", animation:"5s ease-in-out", transitionDelay:"5s ease all", animationDelay:"5s ease all"}}>
        <Carousel.Item>
          <img
            style={{ maxHeight: "90vh" }}
            className="d-block w-100"
            src={caro}
            alt="First slide"
          />
          <Carousel.Caption>
            <h1>Projects</h1>
            <p>Best Developed Projects</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            style={{ maxHeight: "90vh" }}
            className="d-block w-100"
            src={caro1}
            alt="Second slide"
          />

          <Carousel.Caption>
            <h1>projects</h1>
            <p>Find the Best Projects and explore the world!</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            style={{ maxHeight: "90vh" }}
            className="d-block w-100"
            src={caro2}
            alt="Third slide"
          />

          <Carousel.Caption>
            <h1>projects</h1>
            <p>
              Find out the suitable Projects
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
