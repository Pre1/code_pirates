import React, { Component } from "react";
import Treasure from "../../assets/images/Treasure Map.png";

class HomePage extends Component {
  render() {
    return (
      <div className="m-5">
        <h1>هل أنت مستعد لرحلة البحث عن الكنز؟</h1>
        <div>
          <img src={Treasure} alt="Treasure" width="1000px" height="800px" />
        </div>
      </div>
    );
  }
}

export default HomePage;
