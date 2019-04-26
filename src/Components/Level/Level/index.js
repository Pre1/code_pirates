import React, { Component } from "react";

import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";
import styled from "styled-components";
import island from "../../../assets/images/Island a.png";
import pirate from "../../../assets/images/Pirate 2.png";
import * as styles from "./styles";
class Level extends Component {
  state = {
    /***** to be removed ******/
    active: "",
    head: "",
    title: "",
    /***** ************** *****/

    // comes as props
    buildingBlocks: [],

    // comes from the backend i added expected to tell us what type of tag we're expecting
    instructions: [
      //LEVEL ONE
      // { content: ["ضع <html> في منطقة البناء"], expected: "html" },
      // { content: ["ضع <head> في <html>"], expected: "head" },
      // { content: ["ضع <body> في <html>"], expected: "body" },
      // { content: ["ضع <title> في <head>"], expected: "title" },
      // { content: [" لقد فزت!!"], expected: null }
      //LEVEL TWO
      // { content: ["ضع <h6> في منطقة البناء"], expected: "h6" },
      // { content: ["ضع <h5> لمساعدة القرصان في النداء "], expected: "h5" },
      // { content: ["ضع <h4> ليرتفع صوته"], expected: "h4" },
      // { content: ["ضع <h3> ليرتفع صوته "], expected: "h3" },
      // { content: ["ضع <h2> ليرتفع صوته "], expected: "h2" },
      // { content: ["ضع <h1> ليرتفع صوته "], expected: "h1" },
      // { content: [" لقد فزت!!"], expected: null }
    ],
    currentInstruction: [],
    userSteps: [],
    //LEVEL ONE
    // expectedSteps: ["html", "head", "body", "title"]

    //LEVELTWO
    expectedSteps: ["h6", "h5", "h4", "h3", "h2", "h1"]
  };

  // this function basicaly checks if the instruction has been met and changes the instruction
  makeChanges = block => {
    const { currentInstruction, userSteps, instructions } = this.state;

    if (block) {
      if (
        !userSteps.includes(currentInstruction) &&
        currentInstruction.expected === block.name
      ) {
        // TODO: we might need to move this to Play Area comompnent so we can
        // pass it around as prop to have more fine control
        // on how instructions triggers — Abdullah

        // **************************************//
        // **************************************//

        let { undoStep, clearUndo } = this.props;

        // if (undoStep) {
        //   let prevInstructIndex;
        //   let resSteps = userSteps.filter(stp => {
        //     if (stp.expected === undoStep) {
        //       prevInstructIndex = instructions.indexOf(stp);
        //     }
        //     return stp.expected !== undoStep;
        //   });

        //   this.setState({
        //     userSteps: resSteps,
        //     currentInstruction: instructions[prevInstructIndex]
        //   });

        //   this.props.onSetInstruction(instructions[prevInstructIndex].content);
        //   clearUndo();
        // }

        // **************************************//
        // **************************************//

        // here i would call this.props.[name of the fuction that changes the tooltip] and make it go to the next step
        this.setState({
          userSteps: userSteps.concat(currentInstruction),
          currentInstruction:
            instructions[instructions.indexOf(currentInstruction) + 1]
        });
        this.props.onSetInstruction(
          instructions[instructions.indexOf(currentInstruction) + 1].content
        );
      }
    }
  };

  // loops over tags then loops over BBs calls setTags then sends the returned obj to makeChanges
  setView = () => {
    this.props.tags.forEach(tag => {
      this.props.buildingBlocks.map(bb => {
        let block;
        block = this.props.setTag(bb, tag.id);
        this.makeChanges(block);
      });
    });
  };

  componentDidMount = async () => {
    const instructions = this.props.level.instructions;
    console.log("instructions ", instructions);
    await this.setState({
      buildingBlocks: this.props.buildingBlocks,
      instructions: instructions,
      currentInstruction: instructions[0]
    });
    this.props.onSetInstruction(instructions[0].content);
    this.setView();
  };

  componentDidUpdate = prevProps => {
    if (prevProps.buildingBlocks !== this.props.buildingBlocks) {
      this.setState({ buildingBlocks: this.props.buildingBlocks });
      this.setView();
    }

    let { instructions, currentInstruction } = this.state;
    console.log("TCL: Level -> instructions", instructions);
    console.log("TCL: Level -> currentInstruction", currentInstruction);
  };

  render() {
    const Container = styled.div`
      ${styles.levelStyles}
    `;

    // const
    return (
      <Container>
        <div className={this.props.level.classNameForBody}>
          {this.props.level.classNameForTag &&
            this.props.buildingBlocks.map(bb =>
              bb.jsxCompile(
                this.props.level.classNameForTag[bb.name],
                this.props.level.classNameForTag
              )
            )}
          <div>
            <img src={pirate} width="150px" height="150px" />
            <img src={island} width="360px" height="180px" />
          </div>
          {/* {this.props.level.LevelContainer} */}
        </div>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    // buildingBlocks: state.mainReducer.buildingBlocks
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSetInstruction: instruction =>
      dispatch(actionCreators.setLevelInstruction(instruction))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Level);
