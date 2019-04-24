import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";

import "./App.css";
// Bootstrap Setup
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import "@atlaskit/css-reset";

// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import style from "./assets/css/style.css";

// Components
import HomePage from "./Components/HomePage";
import Playarea from "./Components/Level/PlayArea";
import LevelList from "./Components/LevelList";
// import Content from "./Components/Level/CoursesContent";
import Content from "./Components/Level/CoursesContent/CoursesContentMD";

class App extends Component {
  render() {
    return (
      <div className="container text-center">
        <div className="row justify-content-center mt-4">
          <Switch>
            <Route exact path="/" component={HomePage} />

            <Route
              exact
              path="/course/:courseID/level/:levelID/content"
              component={Content}
            />
            {/* ***** Should delete the following Route ***** */}
            <Route exact path="/level/content" component={Content} />

            <Route
              path="/course/:courseID/level/:levelID"
              component={Playarea}
            />
            {/* ***** Should delete the following Route ***** */}
            <Route path="/level/:levelID" component={Playarea} />

            <Route path="/course/:courseID" component={LevelList} />
            {/* ***** Should delete the following Route ***** */}
            <Route path="/levels" component={LevelList} />

            <Redirect to="/" />
            {/* ***** Should delete the following Route ***** */}
            <Redirect to="/levels" />
          </Switch>
        </div>
        <div className="row my-5 justify-content-center">
          <span className="footer"> صنع بـ </span>
          <FontAwesomeIcon className="footer footer-heart" icon={faHeart} />
          <span className="footer">
            {" "}
            بواسطة فريق السعادة في معسكر طويق البرمجي | 2019
          </span>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
