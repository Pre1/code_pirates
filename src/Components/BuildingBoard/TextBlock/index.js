import React, { Component } from "react";
import { connect } from "react-redux";

import * as actionCreators from "../../../store/actions";
import * as Blocks from "../../../Library/PiratesCode";

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    onSetBB: newBB => dispatch(actionCreators.setBuildingBlocks(newBB))
  };
}
class TextBlock extends Component {
  handleChange = event => {
    const ts = this.props.tags.slice();
    const i = event.target.name.split("-")[2];
    const obj = ts.find((block, index) => {
      return index === +i;
    });
    const fs = obj.children.find(child => child.name === "text");
    console.log("TCL: BuildingBoard -> fs", fs);
    if (fs.name === "text") {
      obj.children.splice(
        obj.children.indexOf(fs),
        1,
        new Blocks.TextBlock(event.target.value)
      );
    }
    console.log("TCL: BuildingBoard -> ts", ts);
    this.props.onSetBB(ts);
  };
  render() {
    const { provided, tag, index } = this.props;
    return (
      <div
        ref={provided.innerRef}
        {...provided.droppableProps}
        className="card-body"
        style={{
          maxWidth: "300px",
          background: "#e96565",
          border: "3px solid #e96565",
          borderRadius: "10px"
        }}
      >
        <input
          name={`text-${tag.name}-${index}`}
          type="text"
          //   value={this.state[`text-${tag.name}-${index}`]}
          onChange={this.handleChange}
        />
        <label> النص</label>
      </div>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(TextBlock);
