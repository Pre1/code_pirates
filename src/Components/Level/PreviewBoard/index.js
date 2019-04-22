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
    buildingBlocks: this.props.buildingBlocks
  };
  componentDidUpdate = prevProps => {
    if (prevProps.buildingBlocks !== this.props.buildingBlocks) {
      this.setState({ buildingBlocks: this.props.buildingBlocks });
    }
  };

  render() {
    // [H1Block(), PBlock()].map(elm => elm.compile()).join("") => HTMLString
    // let test = new Blocks.H1Block([new Blocks.TextBlock()]);
    let level;
    switch (this.props.levelID) {
      case "1":
        level = <LevelOne buildingBlocks={this.state.buildingBlocks} />;
        break;
      default:
        level = <></>;
    }
    return (
      <div className="">
        {/* <div dangerouslySetInnerHTML={data(testObj)} /> */}
        {/* {testObj} */}
        {/* {Parser(test.compile())} */}
        {level}
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
