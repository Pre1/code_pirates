import React, { Component } from "react";
import Parser from "html-react-parser";
// import * as data from "./data";

// Our beutiful library
import * as Blocks from "../../../Library/PiratesCode";

import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";
import LevelOne from "../LevelOne";

class PreviewBoard extends Component {
  state = {
    buildingBlocks: this.props.buildingBlocks,
    answer: []
  };

  componentDidUpdate = prevProps => {
    if (prevProps.buildingBlocks !== this.props.buildingBlocks) {
      this.setState({ buildingBlocks: this.props.buildingBlocks });
    }
  };
  // goes somewhere
  levelSearchTree = (block, name) => {
    if (block.name === name) {
      this.setState({ answer: this.state.answer.concat(name) });
      // return obj
      return block;
    } else if (block.children.length) {
      let i;
      let result = null;
      for (i = 0; result == null && i < block.children.length; i++) {
        result = this.levelSearchTree(block.children[i], name);
      }
      return result;
    }
    return null;
  };

  setTag = (bb, name) => {
    // check if  the block is already added
    if (!this.state.buildingBlocks.find(block => block.name === name)) {
      return this.levelSearchTree(bb, name);
    }
  };

  render() {
    // let level = <LevelOne />;
    let level;
    switch (this.props.level.id) {
      case 1:
        level = (
          <LevelOne
            buildingBlocks={this.props.buildingBlocks}
            setTag={this.setTag}
            levelSearchTree={this.levelSearchTree}
          />
        );
        break;

      default:
        level = <></>;
    }
    return <div className="">{level}</div>;
  }
}

const mapStateToProps = state => {
  return {
    // buildingBlocks: state.mainReducer.buildingBlocks
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // func: arg => dispatch(actionCreators.func(arg)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PreviewBoard);
