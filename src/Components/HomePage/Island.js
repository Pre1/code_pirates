import React, { Component } from "react";
import { Link } from "react-router-dom";

class Island extends Component {
  render() {
    const course = this.props.course;
    console.log("Ayman => render => course", course);
    return (
      <div id={`course-${course.id}`} className=" animated">
        <Link to={`course/${course.id}`}>
          <img
            className="island"
            src={`${course.imageUrl}`}
            alt={`${course.name}`}
            style={{
              width: "500px",
              opacity: `${course.isAvailable === true ? 1 : 0.5}`
            }}
          />
        </Link>
        <div className="text-center justify-content-center">
          <h1
            style={{
              color: `${course.titleColor}`,
              opacity: `${course.isAvailable === true ? 1 : 0.5}`,
              fontSize: "35px"
            }}
          >
            {course.name}
          </h1>
        </div>
      </div>
    );
  }
}

export default Island;
