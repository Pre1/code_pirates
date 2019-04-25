import React, { Component } from "react";
import island from "../../assets/images/floating-island-lowpoly-mountains.png";
import island3 from "../../assets/images/Low-Poly-Island-Winter.png";
import mainisland from "../../assets/images/floating-island (1).png";
import { Link } from "react-router-dom";
import ReactAudioPlayer from "react-audio-player";
import homesound from "../../assets/sounds/homesound.mp3";

class HomePage extends Component {
  render() {
    return (
      <div className="background">
        <ReactAudioPlayer
          style={{ display: "none" }}
          src={homesound}
          autoPlay
          controls
          volume={(0, 0.3)}
        />
        {/* <h1 className="text-light pt-5">هل أنت مستعد لرحلة البحث عن الكنز؟</h1> */}
        <div id="islandContainer" class="animated">
          <img
            src="http://www.dejanlukac.com/test/_img/small-cloud.png"
            class="cloudSmall animated"
            alt=""
          />
          <img
            src="http://www.dejanlukac.com/test/_img/big-cloud.png"
            class="cloudBig animated"
            alt=""
          />
          <Link to={`/levels`}>
            {/* <img
              class="pirate"
              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/2127168/css-animation-techniques-tricks-tips-effects.png"
            /> */}

            <img src={island} class="island2" alt="" />
            <img src={island3} class="island3" alt="" />
            <img src={mainisland} class="island" alt="" />
          </Link>
        </div>
      </div>
    );
  }
}

export default HomePage;
