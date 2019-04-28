import React, { Component } from "react";
import { Carousel, Button, Card } from "react-bootstrap";

import tutorial_1 from "../../../assets/images/tutorial/1_v1.gif";
import building from "../../../assets/images/tutorial/2_v2.gif";
import preview from "../../../assets/images/tutorial/3_v2.gif";
import guide from "../../../assets/images/tutorial/4_v4.gif";

export default class Tutorial extends Component {
  state = {
    index: 0,
    direction: null
  };

  handleSelect = (selectedIndx, e) => {
    console.log("TCL: Tutorial -> handleSelect -> e", e);
    this.setState({
      index: selectedIndx,
      direction: e.direction
    });
  };

  render() {
    let toggle = this.props.toggleOverlay;
    let { index, direction } = this.state;
    let images = [tutorial_1, building, preview, guide];

    let carousel = images.map((image, indx) => {
      return (
        <Carousel.Item className="">
          <Card
            style={{
              width: "600px",
              height: "850px",
              maxHight: " 850px",
              marginRight: "35%",
              backgroundColor: "rgba(0, 0, 0, 0.1)"
            }}
          >
            <Button
              onClick={() => toggle()}
              variant="danger my-4"
              style={{
                paddingTop: "10px",
                paddingBottom: "10px",
                borderRadius: "16px"
              }}
            >
              إغلاق التعليمات
            </Button>
            <Card.Img
              variant="top"
              src={image}
              style={{
                width: "auto",
                hight: "auto",
                maxWidth: "700px",
                maxHight: "auto",
                border: "2px solid black",
                margin: "10px",
                borderRadius: "16px"
              }}
            />
            <Card.Body />
          </Card>
        </Carousel.Item>
      );
    });

    return (
      <div className="Container my-5">
        <Carousel
          className=""
          activeIndex={index}
          direction={direction}
          onSelect={this.handleSelect}
          interval="10000"
          indicators={false}
        >
          {carousel}
        </Carousel>
      </div>
    );
  }
}
