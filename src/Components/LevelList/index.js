import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// Components
import LevelCard from "./LevelCard";

// Images
import map from "../../assets/images/map5.png";
import topic_1_Img from "../../assets/images/topic01.png";
import topic_3_Img from "../../assets/images/floating-island-lowpoly-mountains.png";
import topic_4_Img from "../../assets/images/floating-island (1).png";
import map2 from "../../assets/images/map2.png";
import lightImg from "../../assets/images/lightbulb.svg";

// import sun from "../../assets/images/sun.png";

class LevelList extends Component {
  render() {
    let selectedCourseId = this.props.match.params.courseID;
    let currentCourse = this.props.courses.find(
      course => course.id === +selectedCourseId
    );

    console.log("TCL: LevelList -> render -> currentCourse", currentCourse);

    const levelCards = currentCourse.levels.map(lvl => (
      <LevelCard key={lvl.id} courseId={selectedCourseId} level={lvl} />
    ));

    return (
      <div className="levels-container">
        <img src={map} className="levels-container" />
        <div className="levels-components">
          <div className="my-2">
            <Link
              to="/"
              style={{
                textDecoration: "none"
              }}
            >
              <h2
                className="mb-4"
                style={{
                  color: "rgba(0,0,0,0.6)",
                  fontSize: "40px"
                }}
              >
                {this.props.courses[selectedCourseId - 1] &&
                  this.props.courses[selectedCourseId - 1].name}
              </h2>
            </Link>

            <div
              className="row justify-content-center"
              style={{ marginLeft: "5%" }}
            >
              {levelCards}
            </div>
            <br />
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

export default connect(mapStateToProps)(LevelList);
