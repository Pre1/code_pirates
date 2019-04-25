import React, { Component } from "react";

import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";
import styled from "styled-components";

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
      { content: ["ضع <html> في منطقة البناء"], expected: "html" },
      { content: ["ضع <head> في <html>"], expected: "head" },
      { content: ["ضع <body> في <html>"], expected: "body" },
      { content: ["ضع <title> في <head>"], expected: "title" },
      { content: [" لقد فزت!!"], expected: null }
    ],
    currentInstruction: [],
    userSteps: [],
    expectedSteps: ["html", "head", "body", "title"]
  };

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
    this.setState({
      buildingBlocks: this.props.buildingBlocks,
      currentInstruction: this.state.instructions[0]
    });
    await this.props.onSetInstruction(this.state.instructions[0]);
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

      ${"" /* the classes that has movement and animation can be handled here this is gonna be by getting these classes from the courseReducer */}
      .firstLevelHTML {
        background: red;
        width: 100px;
        height: 100px;
      }
      .firstLevelHead {
        background: blue;
        width: 100px;
        height: 100px;
      }
      .firstLevelBody {
        background: green;
        width: 100px;
        height: 100px;
      }
      .firstLevelTitle {
        background: pink;
        width: 100px;
        color: yellow;
        height: 100px;
      }
    `;
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
