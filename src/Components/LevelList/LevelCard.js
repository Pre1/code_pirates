import React, { Component } from "react";
import { Link } from "react-router-dom";
import LockImg from "../../assets/images/lock.png";
class LevelCard extends Component {
  render() {
    const { level, name } = this.props;
    return (
      <div className="col-lg-4 col-md-6 col-12 my-1">
        <Link to={`/levels/${level.id}`} className="card">
          <div className="image">
            <img
              className="card-img-top img-fluid"
              src={level.isAvailable ? level.imageUrl : LockImg}
              alt={name}
            />
          </div>
          <div className="card-body">
            <h5 className="card-title">
              <span>{name}</span>
            </h5>
          </div>
        </Link>
      </div>
    );
  }
}

export default LevelCard;
