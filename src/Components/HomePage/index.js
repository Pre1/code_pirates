import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class HomePage extends Component {
  render() {
    let courses = this.props.courses.map(course => {
      return (
        <div className="row justify-content-center my-5">
          <div>
            <Link to={`/course/${course.id}`}>
              <div class="sailboat">
                <img src={course.imageUrl} class="pirate" />
              </div>
            </Link>
          </div>
        </div>
      );
    });
    console.log("Ayman: HomePage => render => courses", courses);

    return (
      <div>
        <h1>هل أنت مستعد لرحلة البحث عن الكنز؟</h1>
        <div className="row justify-content-center my-5">
          <div className="col-12">{courses}</div>
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

export default connect(mapStateToProps)(HomePage);
