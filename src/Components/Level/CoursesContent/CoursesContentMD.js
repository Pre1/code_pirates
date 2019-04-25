import React, { Component } from "react";

// Markdown setup
import ReactMarkdown from "react-markdown";
import CodeBlock from "./CodeBlock";
import * as Contents from "./contentData";
import CourseHeader from "./CourseHeader";
import safcsp from "../../../assets/images/safcsp.svg";
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
                source={Contents.mdContentThree}
                renderers={{ code: CodeBlock }}
              />
              <br />
              <div
                style={{
                  border: "2px solid #f1f1f1",
                  borderRadius: "16px",
                  padding: "15px",
                  marginRight: "2%",
                  marginLeft: "2%"
                }}
              >
                <p>الفقرة الأولى</p>
                <br />
                <img
                  src={safcsp}
                  width="40%"
                  alt="معسكر طويق البرمجي"
                  style={{
                    border: "2px solid #f1f1f1",
                    borderRadius: "16px",
                    padding: "15px"
                  }}
                />
                <p>الفقرة الثانية</p>
              </div>
              <br />
              <br />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
