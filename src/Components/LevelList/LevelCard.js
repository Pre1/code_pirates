import React, { Component } from "react";
import { Link } from "react-router-dom";
import lockImg from "../../assets/images/lockedLevel.png";
import lightImg from "../../assets/images/lightbulb.svg";

class LevelCard extends Component {
  render() {
    const { level, name } = this.props;
    return (
      <div className="card img-level col-4 mt-3 mr-3">
        <div className="image m-3">
          <img
            className="card-img-top img-fluid"
            style={{ width: "90%" }}
            src={level.isAvailable ? level.imageUrl : lockImg}
            alt={name}
          />
        </div>
        <div className="card-body">
          <div className="row justify-content-center">
            {level.isAvailable ? (
              <Link to={level.isAvailable && `/level/${level.id}`}>
                <button className="col-10 btn-light green-btn ml-4">
                  ابدأ التحدي
                </button>
              </Link>
            ) : (
              <button className="col-10 btn-light green-btn my-4" disabled>
                مغلق
              </button>
            )}

            <button className="col-2 btn-light ml-4">
              <Link
                to={level.isAvailable && `/level/content`}
                style={{ color: "#fff", textDecoration: "none" }}
              >
                <img src={lightImg} />
              </Link>
            </button>
          </div>
          <br />

          <h5 className="card-title">
            <h2>{name}</h2>
          </h5>
        </div>
      </div>
    );
  }
}

export default LevelCard;
