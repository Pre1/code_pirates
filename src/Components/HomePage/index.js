import React, { Component } from "react";
import Treasure from "../../assets/images/Treasure Map.png";

class HomePage extends Component {
  render() {
    return (
      <div className="">
        <h1>هل أنت مستعد لرحلة البحث عن الكنز؟</h1>
        <div class="sailboat">
          <img
            class="pirate"
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/2127168/css-animation-techniques-tricks-tips-effects.png"
          />
        </div>
      </div>
    );
  }
}

export default HomePage;
