import React, { Component } from "react";

// Markdown setup
import ReactMarkdown from "react-markdown";
import CodeBlock from "./CodeBlock";
import * as Contents from "./contentData";
import CourseHeader from "./CourseHeader";
import safcsp from "../../../assets/images/safcsp.svg";

// Connection with redux centeral store
import { connect } from "react-redux";

class CoursesContent extends Component {
  render() {
    const selectedCourseId = this.props.match.params.courseID;
    const selectedLevelId = this.props.match.params.levelID;

    const currentCourse = this.props.courses.find(
      course => course.id === +selectedCourseId
    );

    const currentLevel = currentCourse.levels.find(
      level => level.id === +selectedLevelId
    );

    console.log("TCL: CoursesContent => render => currentLevel", currentLevel);

    return (
      <div className="col-12 content-container mt-5">
        <CourseHeader />
        <div className="col-12 mt-4">
          <div className="row justify-content-center">
            <div className="col-11 text-right">
              <ReactMarkdown
                className="markdownPB"
                source={currentLevel.content}
                renderers={{ code: CodeBlock }}
              />
              <br />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  courses: state.coursesReducer.courses
});

export default connect(mapStateToProps)(CoursesContent);
