import React, { Component } from "react";
import { Link } from "react-router-dom";

// Images
import topic01Img from "../../assets/images/topic01.png";

import lockImg from "../../assets/images/lockedLevel.png";
import lightImg from "../../assets/images/lightbulb.svg";

import topic_1_Img from "../../assets/images/topic01.png";

class LevelCard extends Component {
  render() {
    const { courseId, level } = this.props;
    return (
      <div className=" img-level col-3 mr-3">
        <div className="image m-3 animatedCard">
          <img
            className="card-img-top img-fluid"
            style={{ width: "70%" }}
            src={level.isAvailable ? level.imageUrl : lockImg}
            alt={level.name}
          />
        </div>
        <div className="card-body">
          <div className="row justify-content-center">
            {level.isAvailable ? (
              <button className="col-5 btn green-btn ml-4">
                <Link
                  to={
                    level.isAvailable && `/course/${courseId}/level/${level.id}`
                  }
                  style={{ color: "#fff", textDecoration: "none" }}
                >
                  <img src={lightImg} />
                </Link>
              </button>
            ) : (
              <button className="col-5 btn bg-light ml-4" disabled>
                مغلق
              </button>
            )}

            <button className="col-2 btn btn-warning">
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
