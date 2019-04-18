import React, { Component } from "react";

import Playarea from "../PlayArea";

// for testing
import LevelList from "../LevelList";
class HomePage extends Component {
  render() {
    return (
      <div className="container">
        <LevelList />
        {/* <Playarea /> */}
      </div>
    );
  }
}

export default HomePage;
