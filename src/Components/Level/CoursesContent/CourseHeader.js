import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class CourseHeader extends Component {
  render() {
    const selectedCourseId = this.props.match.params.courseID;
    const selectedLevelId = this.props.match.params.levelID;

    const currentCourse = this.props.courses.find(
      course => course.id === +selectedCourseId
    );

    const currentLevel = currentCourse.levels.find(
      level => level.id === +selectedLevelId
    );
    return (
      <div className="col-12 content-header">
        <div className="row">
          <div className="col-6 text-right" style={{ fontSize: "40px" }}>
            {currentLevel.name}
          </div>
          <div className="col-6 text-left">
            <button className="col-5 ml-4 content-start-btn">
              <Link
                to={
                  currentLevel.isAvailable &&
                  `course/${selectedCourseId}/level/${selectedLevelId}/`
                }
                style={{ color: "#1fc997", textDecoration: "none" }}
              >
                ابدأ التحدي
              </Link>
            </button>
            <Link
              to={`/course/${selectedCourseId}`}
              style={{ color: "#16ab7f", textDecoration: "none" }}
            >
              <span
                className=" mr-4"
                style={{ fontSize: "30px", color: "#fff" }}
              >
                رجوع
              </span>
              <button className="col-1 ml-1 content-back-btn">
                <FontAwesomeIcon
                  style={{ color: "#fff", fontSize: "40px" }}
                  icon={faAngleLeft}
                />
              </button>
            </Link>
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
export default withRouter(connect(mapStateToProps)(CourseHeader));
