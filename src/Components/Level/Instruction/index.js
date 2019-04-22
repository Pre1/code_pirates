import React, { Component } from "react";

import { withRouter, Link } from "react-router-dom";
import { findDOMNode } from "react-dom";
import { Button } from "react-bootstrap";

import ReactTooltip from "react-tooltip";
import assistant from "../../../assets/images/pirateBird.png";
import lightImg from "../../../assets/images/lightbulb.svg";

import * as actionCreators from "../../../store/actions";

import { connect } from "react-redux";
// import Sound from "react-sound";

Array.prototype.getRandom = function() {
  return this[Math.floor(Math.random() * this.length)];
};

const compactWhitespace = str => str.replace(/\s{2,}/g, " ");

class Instruction extends Component {
  state = {
    toolTip: false,

    instruct: [
      "أهلا بالقرصان الصغير",
      "ابدا اللعبة",
      " ضع القطع المناسبة في مكانها!"
    ],

    critics: [
      "حاول ان ترى تأثير بنائك على شاشة العرض",
      "رائع!",
      "آآآآرررررّّ",
      "وشرايك تضغط على الزر السفلي؟ آآررر",
      "غلطططط... امزح"
    ],

    // for level-specific instrucions
    lvlInstruct: [],

    currentInstruct: 0,
    next: false
  };

  async componentDidMount() {
    const selectedCourseId = this.props.match.params.courseID;
    const selectedLevelId = this.props.match.params.levelID;

    await this.props.getGoals(selectedCourseId, selectedLevelId);

    // Set level's goals
    let goals = this.props.goals;

    console.log("TCL: Instruction -> componentDidMount -> goals", goals);
    console.log(
      "TCL: Instruction -> componentDidMount -> coursId",
      this.props.coursId
    );
    console.log(
      "TCL: Instruction -> componentDidMount -> levelId",
      this.props.levelId
    );

    if (!this.props.overlay) {
      ReactTooltip.show(findDOMNode(this.refs.instruct));
      setTimeout(() => {
        ReactTooltip.hide(findDOMNode(this.refs.instruct));

        this.setState(prevState => ({
          currentInstruct: prevState.currentInstruct,
          next: !prevState.next
        }));
      }, 4000);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    let prevBuildingBlks = prevProps.buildingBlocks;
    let currentBuildingBlks = this.props.buildingBlocks;

    let prevStrHTML = compactWhitespace(
      prevBuildingBlks.map(elm => elm.compile()).join("")
    );
    let curStrHTML = compactWhitespace(
      currentBuildingBlks.map(elm => elm.compile()).join("")
    );

    let { overlay } = this.props;
    let { instruct, currentInstruct, next } = this.state;

    let goals = compactWhitespace(this.props.goals);
    if (prevStrHTML !== curStrHTML && goals !== curStrHTML) {
      let { critics } = this.state;
      let say = critics.getRandom();
      this.setState({
        instruct: [say],
        currentInstruct: 0
      });
    }

    if (goals) {
      if (goals === curStrHTML) {
        this.props.resetGoals();

        this.setState({
          instruct: ["آحسنت لقد اجتزت المرحلة!"],
          currentInstruct: 0
        });
      }
    }

    // check if the overlay is dism
    if (!overlay && !next) {
      this.setState({ next: true });
    }

    // The initial Instructions for the Level
    // or you if you want to pass multiple sentences in
    if (
      next &&
      instruct[currentInstruct] &&
      currentInstruct <= instruct.length
    ) {
      ReactTooltip.show(findDOMNode(this.refs.instruct));

      setTimeout(() => {
        ReactTooltip.hide(findDOMNode(this.refs.instruct));

        this.setState(prevState => ({
          currentInstruct: prevState.currentInstruct + 1,
          next: true
        }));
      }, 3000);
    }

    // for testing
    if (prevBuildingBlks.length !== currentBuildingBlks.length) {
      //   let newStruct = instruct.slice();
      //   newStruct.splice(currentInstruct, 0, "add a new Block yay");
      //   this.setState({
      //     instruct: ["add a new Block yay"],
      //     currentInstruct: 0
      //   });
    }
  }

  toggleTip = () => {
    let { toolTip } = this.state;
    if (toolTip) ReactTooltip.hide(findDOMNode(this.refs.instruct));
    else {
      ReactTooltip.show(findDOMNode(this.refs.instruct));
    }

    this.setState({ toolTip: !toolTip });
  };
  render() {
    let { buildingBlocks } = this.props;
    let { instruct, currentInstruct } = this.state;
    const selectedCourseId = this.props.match.params.courseID;
    const selectedLevelId = this.props.match.params.levelID;
    return (
      <div>
        {/* <Button variant="dark" onClick={this.toggleTip}>
          debug
        </Button> */}
        <div onClick={() => this.props.toggleOverlay()}>
          <img
            id="instructBird"
            src={assistant}
            style={{ width: "100%", marginTop: "15%" }}
            data-tip={instruct[currentInstruct]}
            alt="pirateBird-instruct"
            ref="instruct"
            data-place="top"
            data-event="focus"
            data-for="instructBird"
          />
          <ReactTooltip
            id="instructBird"
            afterShow={e => console.log("img img img", e)}
            afterHide={e => console.log("img img img", e)}
          />

          {/* <Button
            className="flex"
            style={{
              width: "20px",
              height: "20%",
              marginTop: "-20px",
              postion: "absolute"
            }}
          >

          </Button> */}
          <div style={{ position: "absolute", left: "5px", bottom: "5px" }}>
            <Link
              to={`/course/${selectedCourseId}/level/${selectedLevelId}/content`}
              style={{ color: "#fff", textDecoration: "none" }}
            >
              <button className="col-12 btn-light">
                <img src={lightImg} alt="light" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    buildingBlocks: state.mainReducer.buildingBlocks,
    buildingBlocks: state.mainReducer.buildingBlocks
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getGoals: (courseId, levelId) =>
      dispatch(actionCreators.getLevelGoals(courseId, levelId)),
    setGoals: (courseId, levelId, goals) =>
      dispatch(actionCreators.setLevelGoals(courseId, levelId, goals)),
    resetGoals: () => dispatch(actionCreators.resetLevelGoals())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Instruction)
);
