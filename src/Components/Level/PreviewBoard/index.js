import React, { Component } from "react";
import Parser from "html-react-parser";
// import * as data from "./data";

// Our beutiful library
import * as Blocks from "../../../Library/PiratesCode";

import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";
import Level from "../Level";

class PreviewBoard extends Component {
  state = {
    buildingBlocks: this.props.buildingBlocks,
    level: this.props.level,
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
    } else if (block.children && block.children.length) {
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
    return this.levelSearchTree(bb, name);
  };

  render() {
    return (
      <div className="">
        <Level
          addInstruction={this.props.addInstruction}
          level={this.props.level}
          tags={this.props.tags}
          buildingBlocks={this.props.buildingBlocks}
          setTag={this.setTag}
          levelSearchTree={this.levelSearchTree}
          undoStep={this.props.undoStep}
          clearUndo={this.props.clearUndo}
        />
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
    // func: arg => dispatch(actionCreators.func(arg)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PreviewBoard);
