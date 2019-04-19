import React, { Component } from "react";
import { connect } from "react-redux";
import pirateBird from "../../assets/images/pirateBird.png";

// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

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
          {this.props.lang[0] && this.props.lang[0].name}
        </h2>
        <div className="row justify-content-center">{levelCards}</div>
        <br />

        <div className="row my-5 justify-content-center">
          {/* <h3 style={{ color: "#c5c5c5" }}>
            صنع بـ بواسطة فريق السعادة من معسكر طويق الأول
          </h3> */}
          <span className="footer"> صنع بـ </span>
          <FontAwesomeIcon className="footer footer-heart" icon={faHeart} />
          <span className="footer">
            {" "}
            بواسطة فريق السعادة في معسكر طويق الأول
          </span>
        </div>
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
