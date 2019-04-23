import React, { Component } from "react";

import { withRouter, Link } from "react-router-dom";
import { findDOMNode } from "react-dom";

import ReactTooltip from "react-tooltip";

// images
import assistant from "../../../assets/images/parrot.png";
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
    let id = this.props.match.params.levelID;
    ReactTooltip.rebuild();

    await this.props.getGoals(id);

    console.log(
      "TCL: Instruction -> lvlInstruct",
      this.props.currentInstruction
    );

    let goals = this.props.goals;

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

    return (
      <div>
        {/* <Button variant="dark" onClick={this.toggleTip}>
          debug
        </Button> */}
        <div onClick={() => this.props.toggleOverlay()}>
          <img
            id="instructBird"
            src={assistant}
            style={{ width: "120%", top: "130%", left: "80%", botto: "30%" }}
            // data-tip="أهلا بالقرصان الصغير"
            data-tip={instruct[currentInstruct]}
            alt="pirateBird-instruct"
            ref="instruct"
            data-place="top"
            // data-offset="{'left': -30, 'top': -50}"
            data-event="focus"
            data-for="instructBird"
            // data-tip
            className="animatedCardBird"
          />
          <ReactTooltip
            id="instructBird"
            afterShow={e => console.log("img img img", e)}
            afterHide={e => console.log("img img img", e)}
            // place="left"
            // offset={{ left: -50, top: 110 }}

            // getContent={[
            //   () => {
            //     return ["أهلا بالقرصان الصغير"];
            //   },
            //   1000
            // ]}
          />

          <div style={{ position: "absolute", left: "1px", bottom: "2px" }}>
            <Link
              to={`/level/content`}
              style={{ color: "#fff", textDecoration: "none" }}
            >
              <button className="col-8 btn btn-warning rounded-pill mt-5 ">
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
    goals: state.levelsReducer.currentGoals,
    currentInstruction: state.levelsReducer.currentInstruction
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getGoals: id => dispatch(actionCreators.getLevelGoals(id)),
    setGoals: (id, goals) => dispatch(actionCreators.setLevelGoals(id, goals)),
    resetGoals: () => dispatch(actionCreators.resetLevelGoals())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Instruction)
);
