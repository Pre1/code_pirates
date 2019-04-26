import React, { Component } from "react";

import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";
import styled from "styled-components";
import island from "../../../assets/images/island.png";
import pirate from "../../../assets/images/Pirate 2.png";
import * as styles from "./styles";
import boat from "../../../assets/images/Pirate Ship.png";
class Level extends Component {
  state = {
    /***** to be removed ******/
    active: "",
    head: "",
    title: "",
    /***** ************** *****/

    // comes as props
    buildingBlocks: [],
    isPass: this.props.level.isPass,
    help: "",
    say: [
      "أعتقد أن هناك شخص ما؟",
      "أسمع صوتاً!!!",
      "ماهذا الصوت!!!",
      "أعتقد أنني أتخيل",
      "هل هناااااك احددددددد؟"
    ],

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
        let say = this.state.say.getRandom();
        this.setState({
          userSteps: this.state.userSteps.concat(currentInstruction),
          currentInstruction: this.state.instructions[
            this.state.instructions.indexOf(currentInstruction) + 1
          ],
          help: [say]
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
    console.log("instruct", instructions[0].content);

    this.setView();
  };

  componentDidUpdate = prevProps => {
    if (prevProps.buildingBlocks !== this.props.buildingBlocks) {
      this.setState({
        buildingBlocks: this.props.buildingBlocks
      });
      // if(this.props.buildingBlocks)
      this.setView();
    }
  };

  render() {
    const Container = styled.div`
      ${styles.levelStyles}
    `;

    // const
    return (
      <Container>
        <div className={this.props.level.classNameForBody}>
          <div className="playTags">
            {" "}
            <div className="bubble">
              {this.props.level.classNameForTag &&
                this.props.buildingBlocks.map(bb =>
                  bb.jsxCompile(
                    this.props.level.classNameForTag[bb.name],
                    this.props.level.classNameForTag
                  )
                )}
            </div>{" "}
          </div>
          <div className="levelEl">
            <img className="boat" src={boat} />
            <div className="PirateBubble">
              <h6 className="text-dark">{this.state.help}</h6>
            </div>
            <div className="island">
              <img className="boy" src={pirate} width="150px" height="150px" />
              <img src={island} width="360px" height="180px" />
            </div>
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
