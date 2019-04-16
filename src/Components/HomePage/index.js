import React, { Component } from "react";

import { connect } from "react-redux";
import * as actionCreators from "../../store/actions";
import Playarea from "../PlayArea";

class HomePage extends Component {
  render() {
    const { msg } = this.props;
    return (
      <div className="my-4">
        {/* <h1>state : {msg}</h1>
        <br />
        <button
          onClick={() => this.props.sayHi("pirate")}
          className="btn btn-info"
        >
          Click Me
        </button> */}
        <Playarea />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    msg: state.mainReducer.msg
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sayHi: name => dispatch(actionCreators.sayHi(name))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
