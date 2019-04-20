import React, { Component } from "react";
// import boat from "../../../assets/images/Pirate Ship & Pirates.png";
// import boat from "../../../assets/images/boat.png";
// import cloud from "../../../assets/images/Cloud blue.png";
import Pirate from "../../../assets/images/Pirate 1.png";

class LevelOne extends Component {
  render() {
    return (
      <div className="">
        {/* <div className="cloud"> */}
        {/* <img src={cloud} alt={cloud} width="100px" height="100px" />
        </div> */}

        <div className="boat">
          <div className="Pirate">
            <img src={Pirate} alt="Pirate" />
          </div>
        </div>
        <div className="">{/* <img width="510px" height="520px" /> */}</div>
      </div>
    );
  }
}

export default LevelOne;
