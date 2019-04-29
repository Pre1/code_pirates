import React, { Component } from "react";
import island from "../../assets/images/floating-island-lowpoly-mountains.png";
import island3 from "../../assets/images/Low-Poly-Island-Winter.png";
import mainisland from "../../assets/images/floating-island (1).png";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Island from "./Island";

// Sounds
import ReactAudioPlayer from "react-audio-player";
import homesound from "../../assets/sounds/homesound.mp3";
import { faAlignCenter } from "@fortawesome/free-solid-svg-icons";

class HomePage extends Component {
  state = {
    courses: [],
    course: null
  };

  componentDidMount() {
    const courses =
      this.props.courses && this.setState({ courses: this.props.courses });
    console.log("TCL: HomePage -> render -> courses", courses);
    const course = this.setState({ course: this.props.courses[0] });
    console.log("TCL: HomePage -> render -> course", course);
  }
  render() {
    const course = this.props.courses.map(course => (
      <Island key={course.id} course={course} />
    ));
    return (
      <div className="background container-faild">
        {/* //   <div className="row justify-content-center"> */}
        {/* <ReactAudioPlayer
          style={{ display: "none" }}
          src={homesound}
          autoPlay
          controls
          volume={(1, 0.3)}
        /> */}
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
        {/* </div> */}
        {/* <div id="islandContainer" class="animated">
          <img
            src="http://www.dejanlukac.com/test/_img/small-cloud.png"
            class="cloudSmall animated"
            alt=""
          />
          <img
            src="http://www.dejanlukac.com/test/_img/big-cloud.png"
            class="cloudBig animated"
            alt=""
          />
          <Link to={`course/1`}>
            <img src={island} class="island2" alt="" />
            <img src={island3} class="island3" alt="" />
            <img src={mainisland} class="island" alt="" />
          </Link>
        </div> */}
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
