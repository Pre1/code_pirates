import React, { Component } from "react";

import { connect } from "react-redux";
import Island from "./Island";

import tuwaikImg from "../../assets/images/tuwaikImg.jpg";

// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

// Sounds
import ReactAudioPlayer from "react-audio-player";
import homesound from "../../assets/sounds/part1.mp3";

class HomePage extends Component {
  state = {
    courses: [],
    course: null
  };

  componentDidMount() {
    const courses =
      this.props.courses && this.setState({ courses: this.props.courses });
    this.setState({ courses: courses });
    const course = this.setState({ course: this.props.courses[0] });
    this.setState({ course: course });
  }

  nextIsland = () => {
    console.log("TCL: HomePage -> nextIsland -> newIndex", this.state);
    const newIndex = this.state.courses && this.state.course.id + 1;
    this.setState({
      course: this.state.courses[newIndex]
    });
  };

  prevIsland = () => {
    const newIndex = this.state.course.id - 1;
    this.setState({
      course: this.state.courses[newIndex]
    });
  };

  render() {
    const course = this.props.courses.map(course => (
      <Island key={course.id} course={course} />
    ));
    return (
      <div className="row justify-content-center">
        <ReactAudioPlayer
          style={{ display: "none" }}
          src={homesound}
          autoPlay
          loop
          controls
          volume={(0, 0.7)}
        />
        <div className="background container-faild">
          <div className={`cards-slider active-slide-2`}>
            <div
              className="cards-slider-wrapper"
              style={{
                transform: `translateX(-${course.id *
                  (100 / this.props.courses.length)}%)`
              }}
            >
              {course}
            </div>
          </div>
          <div id="islandContainer" class="animated">
            <img
              src="http://www.dejanlukac.com/test/_img/small-cloud.png"
              class="cloudSmall animated"
              alt="small cloud"
            />
            <img
              src="http://www.dejanlukac.com/test/_img/big-cloud.png"
              class="cloudBig animated"
              alt="big cloud"
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    courses: state.coursesReducer.courses
  };
};

export default connect(mapStateToProps)(HomePage);
