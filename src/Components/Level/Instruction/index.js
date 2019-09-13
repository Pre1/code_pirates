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

    currentInstruct: 0,

    show: true
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
    let { overlay, lvlInstruction } = await this.props;
    let { instruct, currentInstruct } = this.state;

    const selectedCourseId = this.props.match.params.courseID;
    const selectedLevelId = this.props.match.params.levelID;

    const currentCourse = this.props.courses.find(
      course => course.id === +selectedCourseId
    );

    const currentLevel = currentCourse.levels.find(
      level => level.id === +selectedLevelId
    );

    if (
      +prevProps.match.params.courseID !== +selectedCourseId ||
      +prevProps.match.params.levelID !== +selectedLevelId
    ) {
      let name = currentLevel.name;
      this.setState({
        instruct: [`اهلا بك في مرحلة ${name}.. آآآآررررر`],
        currentInstruct: 0
      });
    }

    if (prevProps.overlay !== overlay) {
      this.setState({
        instruct: lvlInstruction,
        currentInstruct: 0
      });
    }

    // === Trigger 1 ===
    if (!overlay && prevProps.lvlInstruction[0] !== lvlInstruction[0]) {
      // ReactTooltip.show(findDOMNode(this.refs.instruct));
      this.setState({
        instruct: lvlInstruction,
        currentInstruct: 0
      });

      this.showToolTip();
    }
    // The initial Instructions for the Level
    // or you if you want to pass multiple sentences in
    if (!overlay) {
      if (instruct[currentInstruct] && currentInstruct <= instruct.length) {
        ReactTooltip.show(findDOMNode(this.refs.instruct));

        // setTimeout(() => {
        //   // ReactTooltip.hide(findDOMNode(this.refs.instruct));

        //   this.setState({
        //     currentInstruct: currentInstruct + 1
        //   });
        // }, 6000);

        // this.setState({
        //   currentInstruct: currentInstruct + 1
        // });
      }
      // else {
      //   let { critics } = this.state;
      //   let randomSay = critics.getRandom();
      //   // setTimeout(() => {
      //   //   this.setState({
      //   //     instruct: [randomSay, ...lvlInstruction],
      //   //     currentInstruct: 0
      //   //   });
      //   // }, 3000);

      //   this.setState({
      //     instruct: lvlInstruction,
      //     currentInstruct: 0
      //   });
      //   ReactTooltip.show(findDOMNode(this.refs.instruct));
      // }
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

  showToolTip = () => {
    let show = this.state.show;

    if (show) ReactTooltip.show(findDOMNode(this.refs.instruct));

    this.setState({ show: true });
  };

  render() {
    let courseID = this.props.match.params.courseID;
    let levelID = this.props.match.params.levelID;
    let { lvlInstruction } = this.props;
    let { instruct, currentInstruct } = this.state;
    return (
      <div>
        {/* <Button variant="dark" onClick={this.toggleTip}>
          debug
        </Button> */}
        <div>
          <img
            id="instructBird"
            src={assistant}
            style={{ width: "60%", top: "30%", left: "30%" }}
            data-tip={instruct[currentInstruct]}
            alt="pirateBird-instruct"
            ref="instruct"
            data-place="right"
            data-offset="{'left': 20, 'top': 5}"
            data-for="instructBird"
            className="animatedCardBird"
            data-effect="solid"
            onClick={() => this.props.toggleOverlay()}
          />
          <ReactTooltip
            id="instructBird"
            className="RocoSay"
            delayHide={1000}
            effect="solid"
            // afterShow={}
            afterHide={e => {
              console.log("ZERO TCL: Instruction -> e", e);
              // ReactTooltip.show(findDOMNode(this.refs.instruct));
            }}
            getContent={[
              dataTool => {
                console.log("ZERO TCL: Instruction -> dataTool", dataTool);
                let { critics } = this.state;
                let randomSay = critics.getRandom();
                let result = [
                  randomSay,
                  dataTool,
                  dataTool,
                  dataTool,
                  dataTool
                ].getRandom();
                return result;
              },
              5000
            ]}
          />

          <div style={{ position: "absolute", left: "-5px", bottom: "-1px" }}>
            <Link
              to={`/course/${courseID}/level/${levelID}/content`}
              style={{ color: "#fff", textDecoration: "none" }}
            >
              <button className="col-10 btn btn-warning rounded-pill mt-1 ">
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
    lvlInstruction: state.levelsReducer.currentInstruction,
    courses: state.coursesReducer.courses
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Instruction)
);
