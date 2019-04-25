import React, { Component } from "react";

import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";
import styled from "styled-components";
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
    const { currentInstruction } = this.state;
    if (block) {
      if (
        !this.state.userSteps.includes(currentInstruction) &&
        currentInstruction.expected === block.name
      ) {
        // here i would call this.props.[name of the fuction that changes the tooltip] and make it go to the next step
        this.setState({
          userSteps: this.state.userSteps.concat(currentInstruction),
          currentInstruction: this.state.instructions[
            this.state.instructions.indexOf(currentInstruction) + 1
          ]
        });
        this.props.onSetInstruction(
          this.state.instructions[
            this.state.instructions.indexOf(currentInstruction) + 1
          ].content
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
    this.setState({
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
  };

  render() {
    const Container = styled.div`
      background: grey;
      ${styles.levelStyles}
    `;
    console.log(
      " anas TCL: Level -> render -> this.props.buildingBlocks",
      this.props.buildingBlocks
    );
    // const
    return (
      <Container>
        {/* find a way to make this done with search tree */}
        {this.props.buildingBlocks.map(bb =>
          bb.nestedJsxCompile(
            this.props.level.classNameForTag[bb.name],
            this.props.level.classNameForTag
          )
        )}
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
