import React, { Component } from "react";
import { Link } from "react-router-dom";

class Island extends Component {
  render() {
    const course = this.props.course;
    return (
      <div id={`course-${course.id}`} className="course">
        <Link to={`course/${course.id}`}>
          <img
            src={`${course.imageUrl}`}
            alt={`${course.name}`}
            style={{ width: "330px" }}
          />
        </Link>
      </div>
    );
  }
}

export default Island;
