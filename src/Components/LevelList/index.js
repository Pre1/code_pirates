import React, { Component } from "react";
import { connect } from "react-redux";

// Components
import LevelCard from "./LevelCard";

class LevelList extends Component {
  render() {
    let selectedCourseId = this.props.match.params.courseID;
    let currentCourse = this.props.courses.find(
      course => course.id === +selectedCourseId
    );

    console.log("TCL: LevelList -> render -> currentCourse", currentCourse);

    const levelCards = currentCourse.levels.map(lvl => (
      <LevelCard key={lvl.id} level={lvl} name={lvl.name} />
    ));

    return (
      <div className="my-2">
        <h2
          className="mb-4"
          style={{
            color: `${this.props.courses[selectedCourseId - 1].titleColor}`,
            fontSize: "60px"
          }}
        >
          {this.props.courses[selectedCourseId - 1] &&
            this.props.courses[selectedCourseId - 1].name}
        </h2>
        <div className="row justify-content-center">{levelCards}</div>
        <br />
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
