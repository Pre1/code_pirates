import React, { Component } from "react";

import ReactTooltip from "react-tooltip";
import assistant from "../../../assets/images/pirateBird.png";
import barrel from "../../../assets/images/barrel.png";
import { connect } from "react-redux";
// import Sound from "react-sound";

class Instruction extends Component {
  showOverlay = () => {
    let test = document.getElementsByClassName("overlay")[0].style.display;
    console.log("TCL: Instruction -> showOverlay -> test", test);
    document.getElementsByClassName("overlay")[0].style.display =
      test === "none" ? "block" : "none";
  };
  render() {
    return (
      <div onClick={() => this.props.toggleOverlay()}>
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
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Instruction);
