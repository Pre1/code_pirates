import React, { Component } from "react";

import { withRouter, Link } from "react-router-dom";
import { findDOMNode } from "react-dom";

import ReactTooltip from "react-tooltip";

// images
import assistant from "../../../assets/images/parrot.png";
import lightImg from "../../../assets/images/lightbulb.svg";

import { connect } from "react-redux";
// import Sound from "react-sound";

Array.prototype.getRandom = function() {
  return this[Math.floor(Math.random() * this.length)];
};

const compactWhitespace = str => str.replace(/\s{2,}/g, " ");

class Instruction extends Component {
  state = {
    toolTip: false,

    instruct: ["أهلا بالقرصان الصغير"],

    critics: [
      "حاول ان ترى تأثير بنائك على شاشة العرض",
      "جوووعااان!",
      "آآآآرررررّّ",
      "وشرايك تضغط على الزر السفلي؟ آآررر",
      "غلطططط... امزح",
      "هل القراصنة يشربون القهوة؟ آآررر",
      "اسمي روكو بالمناسبة، هل قلت هذا مسبقا؟ آررر",
      "لكل اداة مهمة، حاول ان تعرف ماهي"
    ],

    // for level-specific instrucions
    lvlInstruct: [],

    currentInstruct: 0
  };

  async componentDidMount() {
    let { overlay, lvlInstruction } = await this.props;

    if (!overlay) {
      this.setState({
        instruct: lvlInstruction,
        currentInstruct: 0
      });

      ReactTooltip.show(findDOMNode(this.refs.instruct));

      // setTimeout(() => {
      //   ReactTooltip.hide(findDOMNode(this.refs.instruct));

      //   this.setState({
      //     instruct: lvlInstruction,
      //     currentInstruct: 0
      //   });
      // }, 4000);
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    let prevBuildingBlks = prevProps.buildingBlocks;
    let currentBuildingBlks = this.props.buildingBlocks;

    let curStrHTML = currentBuildingBlks.map(elm => elm.instruct()).join("");
    console.log("TCL: zerozero", curStrHTML);

    console.log(
      "TCL: Instruction -> componentDidUpdate -> currentBuildingBlks",
      currentBuildingBlks
    );

    let { overlay, lvlInstruction } = await this.props;
    let { instruct, currentInstruct } = this.state;

    console.log("TCL: Instruction -> componentDidUpdate -> instruct", instruct);

    // === Trigger 1 ===
    if (prevProps.lvlInstruction[0] !== lvlInstruction[0]) {
      console.log(
        "Instruction ================================== Trigger 1 ==="
      );

      console.log(
        "TCL: Instruction -> componentDidUpdate -> prevProps.lvlInstruction[0]",
        prevProps.lvlInstruction[0]
      );
      console.log(
        "TCL: Instruction -> componentDidUpdate -> lvlInstruction",
        lvlInstruction
      );
      console.log(
        "Instruction ================================== Trigger 1 ==="
      );

      ReactTooltip.show(findDOMNode(this.refs.instruct));
      this.setState({
        instruct: lvlInstruction,
        currentInstruct: 0
      });
    }
    // The initial Instructions for the Level
    // or you if you want to pass multiple sentences in
    if (!overlay) {
      if (instruct[currentInstruct] && currentInstruct <= instruct.length) {
        ReactTooltip.show(findDOMNode(this.refs.instruct));

        setTimeout(() => {
          // if you want to manully hide it, use this carrrrrfuly please!
          // ReactTooltip.hide(findDOMNode(this.refs.instruct));

          this.setState({
            currentInstruct: currentInstruct + 1
          });
        }, 3000);
      } else {
        let { critics } = this.state;
        let randomSay = critics.getRandom();
        setTimeout(() => {
          this.setState({
            instruct: [randomSay, ...lvlInstruction],
            currentInstruct: 0
          });
        }, 3000);

        ReactTooltip.show(findDOMNode(this.refs.instruct));
      }
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
    let courseID = this.props.match.params.courseID;
    let levelID = this.props.match.params.levelID;

    let { buildingBlocks, lvlInstruction } = this.props;
    // console.log("TCL: Instruction -> render -> lvlInstruction", lvlInstruction);
    let { instruct, currentInstruct } = this.state;

    return (
      <div>
        {/* <Button variant="dark" onClick={this.toggleTip}>
          debug
        </Button> */}
        {/* onClick={() => this.props.toggleOverlay()} */}
        <div>
          <img
            id="instructBird"
            src={assistant}
            style={{ width: "120%", top: "130%", left: "80%", botto: "30%" }}
            data-tip={instruct[currentInstruct]}
            alt="pirateBird-instruct"
            ref="instruct"
            data-place="right"
            data-offset="{'left': 40, 'top': 50}"
            data-for="instructBird"
            className="animatedCardBird"
            data-effect="solid"
            onClick={() => this.props.toggleOverlay()}
          />
          <ReactTooltip
            id="instructBird"
            // afterShow={}
            // afterHide={}
            // place="left"
            // offset={{ left: -50, top: 110 }}

            // getContent={[
            //   () => {
            //     return ["أهلا بالقرصان الصغير"];
            //   },
            //   1000
            // ]}
          />

          <div style={{ position: "absolute", left: "-30px", bottom: "-30px" }}>
            <Link
              to={`/course/${courseID}/level/${levelID}/content`}
              style={{ color: "#fff", textDecoration: "none" }}
            >
              <button className="col-10 btn btn-warning rounded-pill mt-3 ">
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
    lvlInstruction: state.levelsReducer.currentInstruction
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // getGoals: id => dispatch(actionCreators.getLevelGoals(id)),
    // setGoals: (id, goals) => dispatch(actionCreators.setLevelGoals(id, goals)),
    // resetGoals: () => dispatch(actionCreators.resetLevelGoals())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Instruction)
);
