import React, { Component } from "react";
import "./App.css";
// Bootstrap Setup
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import "@atlaskit/css-reset";

import style from "./assets/css/style.css";

// Components
import HomePage from "./Components/HomePage";

class App extends Component {
  render() {
    return (
      <div className="App">
        <HomePage />
      </div>
    );
  }
}

export default App;
