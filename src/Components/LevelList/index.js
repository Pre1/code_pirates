import React, { Component } from "react";
import { connect } from "react-redux";
// import pirateBird from "../../assets/images/pirateBird.png";

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
      <div className="my-2 levels">
        <div className="">
          <h2
            className=" mt-4"
            style={{
              color: `${this.props.lang[0].titleColor}`,
              fontSize: "90px"
            }}
          >
            {this.props.lang[0] && this.props.lang[0].name}
          </h2>
        </div>

        <div className="row justify-content-center animatedCard">
          {levelCards}
        </div>
        <br />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    lang: state.languagesReducer.lang,
    levels: state.levelsReducer.levels
  };
};

export default connect(mapStateToProps)(LevelList);
