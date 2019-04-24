import React, { Component } from "react";

import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";

class LevelOne extends Component {
  state = {
    active: "",
    head: "",
    title: "",
    buildingBlocks: [],
    instructions: [
      ["ضع <html> في منطقة البناء"],
      ["ضع <head> في <html>"],
      ["ضع <body> في <html>"],
      ["ضع <title> في <head>"],
      [" لقد فزت!!"]
    ],
    currentInstruction: [],
    userSteps: [],
    expectedSteps: ["html", "head", "body", "title"]
  };

  setView = () => {
    this.props.buildingBlocks.map(bb => {
      let html, body, head, title;

      html = this.props.setTag(bb, "html");
      body = this.props.setTag(bb, "body");
      head = this.props.setTag(bb, "head");
      title = this.props.setTag(bb, "title");

      const { currentInstruction } = this.state;

      if (html) {
        // checks if i have the step done or not
        if (!this.state.userSteps.includes(currentInstruction)) {
          // here i would call this.props.[name of the fuction that changes the tooltip] and make it go to the next step
          this.setState({
            userSteps: this.state.userSteps.concat("html"),
            currentInstruction: this.state.instructions[1]
          });
          this.props.onSetInstruction(this.state.instructions[1]);
        }
        if (!this.props.buildingBlocks.find(bb => bb.name === "html")) {
          this.props.onSetInstruction(["NOOOO"]);
        } else {
          this.setState({
            // head: "head",
            active: "border"
          });
        }
      }

      if (head) {
        if (!this.state.userSteps.includes(currentInstruction)) {
          // here i would call this.props.[name of the fuction that changes the tooltip] and make it go to the next step
          this.setState({
            userSteps: this.state.userSteps.concat(currentInstruction),
            currentInstruction: this.state.instructions[2]
          });
          this.props.onSetInstruction(this.state.instructions[2]);
        }
        this.setState({
          head: "head"
        });
      } else if (!head) {
        this.setState({
          head: ""
        });
      }

      if (body) {
        if (!this.state.userSteps.includes(currentInstruction)) {
          // here i would call this.props.[name of the fuction that changes the tooltip] and make it go to the next step
          this.setState({
            userSteps: this.state.userSteps.concat(currentInstruction),
            currentInstruction: this.state.instructions[3]
          });
          this.props.onSetInstruction(this.state.instructions[3]);
        }
        this.setState({
          active: "waves"
        });
      } else if (!body) {
        this.setState({
          active: ""
        });
      }

      if (title) {
        console.log("TCL: LevelOne -> setView -> title", title);

        if (!this.state.userSteps.includes(currentInstruction)) {
          // here i would call this.props.[name of the fuction that changes the tooltip] and make it go to the next step
          this.setState({
            userSteps: this.state.userSteps.concat(currentInstruction),
            currentInstruction: this.state.instructions[4]
          });
          this.props.onSetInstruction(this.state.instructions[4]);
        }
        this.setState({
          title: this.props.levelSearchTree(bb, "text").text
        });
      } else if (!title) {
        this.setState({
          title: ""
        });
      }
    });

    if (!this.props.buildingBlocks.length) {
      this.setState({
        head: "",
        active: "",
        title: ""
      });
    }
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
    console.log("TCL: LevelOne -> prevProps", prevProps);

    console.log(
      "TCL: LevelOne -> this.props.buildingBlocks",
      this.props.buildingBlocks
    );
    if (prevProps.buildingBlocks !== this.props.buildingBlocks) {
      this.setState({ buildingBlocks: this.props.buildingBlocks });
      this.setView();
    }
  };

  render() {
    return (
      <div>
        <div className={this.state.head}>
          <p
            className="p-3 text-dark"
            style={{ marginRight: "240px", fontSize: "12px" }}
          >
            {this.state.title}
          </p>
        </div>
        <div className={this.state.active} />
      </div>
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
)(LevelOne);
