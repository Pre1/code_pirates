import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import "./App.css";
// Bootstrap Setup
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import "@atlaskit/css-reset";

import style from "./assets/css/style.css";

// Components
import HomePage from "./Components/HomePage";
import Playarea from "./Components/Level/PlayArea";
import LevelList from "./Components/LevelList";
class App extends Component {
  render() {
    return (
      <div className="container text-center">
        <div className="row justify-content-center mt-4">
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/level/:levelID" component={Playarea} />
            <Route path="/levels" component={LevelList} />
            <Redirect path="/levels" />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
