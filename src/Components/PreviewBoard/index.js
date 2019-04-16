import React, { Component } from "react";
import Parser from "html-react-parser";
// import * as data from "./data";

// Our beutiful library
import * as Blocks from "../../Library/PiratesCode";

import { connect } from "react-redux";
import * as actionCreators from "../../store/actions";

class index extends Component {
  render() {
    // [H1Block(), PBlock()].map(elm => elm.compile()).join("") => HTMLString
    let test = new Blocks.H1Block([new Blocks.TextBlock()]);
    let buildingBlocks = this.props.buildingBlocks;

    console.log("=================");
    console.log("TCL: index -> render -> buildingBlocks", buildingBlocks);
    console.log("=================");

    let testObj = this.props.buildingBlocks
      .map(elm => elm.compile())
      .join("\n");

    console.log("TCL: index -> render -> testObj", testObj);

    // console.log("TCL: index -> render -> test", test);
    // console.log("TCL: index -> render -> test.compile()", test.compile());
    let data = html => {
      return {
        __html: html
      };
    };

    let htmlStr = tag => {
      return `
          <div>
            <${tag}>
                This's a test
            <${tag}>		
          </div>
      `;
    };

    return (
      <div
        style={{ border: "5px solid black", height: "300px" }}
        className="m-3"
      >
        <p>Preview:</p>
        {/* <div dangerouslySetInnerHTML={data(test.compile())} /> */}
        <div dangerouslySetInnerHTML={data(testObj)} />
        {/* {Parser(test.compile())} */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    // buildingBlocks: state.mainReducer,
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
)(index);
