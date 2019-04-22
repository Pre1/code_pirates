import React, { Component } from "react";
import { Link } from "react-router-dom";
import lockImg from "../../assets/images/lockedLevel.png";
import lightImg from "../../assets/images/lightbulb.svg";

class LevelCard extends Component {
  render() {
    const { courseId, level } = this.props;

    return (
      <div className="card img-level col-4 mt-3 mr-3">
        <div className="image m-3">
          <img
            className="card-img-top img-fluid"
            style={{ width: "90%" }}
            src={level.isAvailable ? level.imageUrl : lockImg}
            alt={level.name}
          />
        </div>
        <div className="card-body">
          <div className="row justify-content-center">
            <button className="col-5 btn-light green-btn ml-4">
              <Link
                to={
                  level.isAvailable && `/course/${courseId}/level/${level.id}`
                }
                style={{ color: "#fff", textDecoration: "none" }}
              >
                ابدأ التحدي
              </Link>
            </button>
            <button className="col-2 btn-light ml-4">
              <Link
                to={
                  level.isAvailable &&
                  `/course/${courseId}/level/${level.id}/content`
                }
                style={{ color: "#fff", textDecoration: "none" }}
              >
                <img src={lightImg} />
              </Link>
            </button>
          </div>
          <br />

          <h5 className="card-title">
            <h2>{level.name}</h2>
          </h5>
        </div>
      </div>
    );
  }
}

export default LevelCard;
