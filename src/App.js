import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";

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
import Content from "./Components/Level/CoursesContent/CoursesContentMD";

class App extends Component {
  render() {
    return (
      <div className="container text-center">
        <div className="row justify-content-center">
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route
              exact
              path="/course/:courseID/level/:levelID/content"
              component={Content}
            />
            <Route
              path="/course/:courseID/level/:levelID"
              component={Playarea}
            />
            <Route path="/course/:courseID" component={LevelList} />
            <Route path="/level/:levelID" component={Playarea} />
            <Redirect to="/course/1" />
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
