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
      <LevelCard key={lvl.id} level={lvl} name={`lvl-${lvl.id}`} />
    ));

    return (
      <div className="my-2">
        <h3 className="my-2">Levels</h3>
        <div className="row">{levelCards}</div>
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
