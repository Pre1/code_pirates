import React, { Component } from "react";
import Treasure from "../../assets/images/Treasure Map.png";
import { Link } from "react-router-dom";

class HomePage extends Component {
  render() {
    return (
      <div className="m-5">
        <h1>هل أنت مستعد لرحلة البحث عن الكنز؟</h1>
        <Link to={`/levels`}>
          <div>
            <img src={Treasure} alt="Treasure" width="1000px" height="800px" />
          </div>
        </Link>
      </div>
    );
  }
}

export default HomePage;
