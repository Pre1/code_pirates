import React, { Component } from "react";

// Markdown setup
import ReactMarkdown from "react-markdown";
import CodeBlock from "./CodeBlock";
import * as Contents from "./contentData";
import CourseHeader from "./CourseHeader";
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

    return (
      <div className="col-12 content-container mt-5">
        <CourseHeader
          courseId={selectedCourseId}
          levelId={selectedLevelId}
          level={currentLevel}
        />
        <div className="col-12 mt-4">
          <div className="row justify-content-center">
            <div className="col-11 text-right">
              <ReactMarkdown
                className="markdownPB"
                source={Contents.mdContentOne}
                renderers={{ code: CodeBlock }}
              />
            </div>
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

export default connect(mapStateToProps)(CoursesContent);
