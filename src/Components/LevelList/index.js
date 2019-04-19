import React, { Component } from "react";
import { connect } from "react-redux";
import pirateBird from "../../assets/images/pirateBird.png";
// Components
import LevelCard from "./LevelCard";

class LevelList extends Component {
  render() {
    let levels = this.props.levels;

    console.log("TCL: LevelList -> render -> levels", levels);

    const levelCards = levels.map(lvl => (
      <LevelCard key={lvl.id} level={lvl} name={lvl.name} />
    ));

    return (
      <div className="my-2">
        <h2 className="mb-4" style={{ color: "#c5c5c5", fontSize: "60px" }}>
          جـزيـرة HTML
        </h2>
        <div className="row justify-content-center">{levelCards}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    levels: state.levelReducer.levels
  };
};

export default connect(mapStateToProps)(LevelList);
