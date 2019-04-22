import React, { Component } from "react";

// Markdown setup
import ReactMarkdown from "react-markdown";
import CodeBlock from "./CodeBlock";
import * as Contents from "./contentData";
import CourseHeader from "./CourseHeader";

export default class CoursesContent extends Component {
  render() {
    return (
      <div className="col-12 content-container mt-5">
        <CourseHeader />
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
