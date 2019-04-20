import React, { Component } from "react";

import ReactTooltip from "react-tooltip";
import assistant from "../../../assets/images/pirateBird.png";
import barrel from "../../../assets/images/barrel.png";
import { connect } from "react-redux";
// import Sound from "react-sound";

class Instruction extends Component {
  state = {
    trigger: false
  };

  componentDidUpdate(prevProps, prevState) {
    console.log(
      "TCL: Instruction -> componentDidUpdate -> prevProps",
      prevProps
    );
    console.log(
      "TCL: Instruction -> componentDidUpdate -> this.props",
      this.props
    );
  }

  render() {
    let { buildingBlocks } = this.props;

    console.log("TCL: Instruction -> render -> buildingBlocks", buildingBlocks);

    return (
      <div onClick={() => this.props.toggleOverlay()}>
        <p data-tip="hello world">Tooltip</p>
        <img
          src={assistant}
          style={{ width: "100%", marginTop: "15%" }}
          data-tip="أهلا بالقرصان الصغير"
          alt="pirateBird-instruct"
        />
        <ReactTooltip />

        <img
          src={barrel}
          className="flex"
          style={{
            width: "20px",
            height: "20%",
            marginTop: "-20px",
            postion: "absolute"
          }}
          data-tip="أهلا بالقرصان الصغير"
          alt="pirateBird-instruct"
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    buildingBlocks: state.mainReducer.buildingBlocks
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Instruction);
