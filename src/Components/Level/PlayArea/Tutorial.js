import React, { Component } from "react";
import { Carousel, Button } from "react-bootstrap";

import tutorial_1 from "../../../assets/images/tutorial/1.png";
import building from "../../../assets/images/tutorial/building.gif";
import preview from "../../../assets/images/tutorial/preview.gif";
import guide from "../../../assets/images/tutorial/guide.gif";

export default class Tutorial extends Component {
  render() {
    let toggle = this.props.toggleOverlay;

    return (
      <div className="Container my-5">
        <Carousel>
          <Carousel.Item>
            <img className=" w-50" src={tutorial_1} alt="First slide" />
            <Carousel.Caption>
              <div style={{ marginTop: "50px" }}>
                <h3>First slide label</h3>
                <p style={{ color: "black" }}>
                  Nulla vitae elit libero, a pharetra augue mollis interdum.
                  Nulla vitae elit libero, a pharetra augue mollis interdum.
                  Nulla vitae elit libero, a pharetra augue mollis interdum.
                  Nulla vitae elit libero, a pharetra augue mollis interdum.
                  Nulla vitae elit libero, a pharetra augue mollis interdum.
                </p>
              </div>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img className="w-25" src={building} alt="Third slide" />

            <Carousel.Caption className="my-2">
              <h3>Second slide label</h3>
              <p style={{ color: "black" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img className="w-50" src={preview} alt="Third slide" />

            <Carousel.Caption className="my-5">
              <h3>Third slide label</h3>
              <p style={{ color: "black" }}>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img className="w-25" src={guide} alt="Third slide" />

            <Carousel.Caption className="my-5">
              <h3>Fourth slide label</h3>
              <p style={{ color: "black" }}>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>

        <Button onClick={() => toggle()} variant="dark my-4">
          بعدين يا شيخ
        </Button>
      </div>
    );
  }
}
