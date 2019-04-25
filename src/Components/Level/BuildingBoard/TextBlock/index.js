import React, { Component } from "react";
import { connect } from "react-redux";

import * as actionCreators from "../../../../store/actions";
import * as Blocks from "../../../../Library/PiratesCode";

function mapStateToProps(state) {
  return {
    buildingBlocks: state.mainReducer.buildingBlocks
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSetBB: newBB => dispatch(actionCreators.setBuildingBlocks(newBB))
  };
}
class TextBlock extends Component {
  handleChange = event => {
    let newBB = this.props.buildingBlocks.slice();
    let building = new Blocks.ChildBlock("building", "building");
    building.children = newBB;
    building.changeText(
      this.props.block.id,
      new Blocks.TextBlock(event.target.value)
    );
    this.props.onSetBB(building.children);
  };
  render() {
    const { provided, block, index } = this.props;
    return (
      <div>
        <input
          name={`text-${block.name}-${index}`}
          type="text"
          //   value={this.state[`text-${block.name}-${index}`]}
          onChange={this.handleChange}
        />
        <label> النص</label>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TextBlock);
