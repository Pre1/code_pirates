import React, { Component } from "react";
import { connect } from "react-redux";
/**
 * AzizCR: remove dead imports before merging
 */
import pirateBird from "../../assets/images/pirateBird.png";

// Components
import LevelCard from "./LevelCard";

class LevelList extends Component {
  render() {
    let levels = this.props.levels;

    /**
     * AzizCR: clean up debugging before merging code
     */
    console.log("TCL: LevelList -> render -> levels", levels);

    const levelCards = levels.map(lvl => (
      <LevelCard key={lvl.id} level={lvl} name={lvl.name} />
    ));

    return (
      <div className="my-2">
        <h2
          className="mb-4"
          style={{
            color: `${this.props.lang[0].titleColor}`,
            /**
             * AzizCR: Inline styling is great for dynamic styling
             * but use CSS or stlying objects for static styles.
             */
            fontSize: "60px"
          }}
        >
          {this.props.lang[0] && this.props.lang[0].name}
        </h2>
        <div className="row justify-content-center">{levelCards}</div>
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
