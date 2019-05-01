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
          <Link
            to={
              level.isAvailable &&
              `/course/${courseId}/level/${level.id}/content`
            }
            style={{
              color: "#fff",
              textDecoration: "none"
            }}
          >
            <img
              src={lightImg}
              style={{
                marginTop: "-20px",
                marginRight: "90px",
                boxShadow: "10px 10px 5px 0px rgba(0,0,0,0.1)",
                backgroundColor: "rgb(241, 188, 47)",
                padding: "10px",
                borderRadius: "26px"
              }}
            />
          </Link>
          <Link
            to={level.isAvailable && `/course/${courseId}/level/${level.id}`}
            style={{ color: "#fff", textDecoration: "none" }}
          >
            <img
              className="card-img-top img-fluid"
              style={{ width: "70%" }}
              src={level.isAvailable ? level.imageUrl : lockImg}
              alt={level.name}
            />
            <h5 className="card-title">
              <h2 style={{ color: "whitesmoke" }}>{level.name}</h2>
            </h5>
          </Link>
        </div>
      </div>
    );
  }
}

export default LevelCard;
