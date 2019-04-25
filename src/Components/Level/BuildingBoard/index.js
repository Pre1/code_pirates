import React, { Component } from "react";
import { Droppable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import Block from "./Block";
import * as Blocks from "../../../Library/PiratesCode";
import * as actionCreators from "../../../store/actions";
class BuildingBoard extends Component {
  state = {
    blocks: this.props.blocks,
    enableDrop: false
  };

  componentDidUpdate = prevProps => {
    if (prevProps.blocks !== this.props.blocks) {
      this.setState({ blocks: this.props.blocks });
    }
  };

  render() {
    return (
      <div className="m-3 building-container">
        <Droppable
          droppableId="building"
          isDropDisabled={this.state.enableDrop}
        >
          {provided => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="card text-center"
              style={{ backgroundColor: "transparent", border: "transparent" }}
            >
              <div className="card-footer text-muted building-container">
                <h1>+</h1>
              </div>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        {this.state.blocks.map((block, index) => (
          <Block
            onSetBB={this.props.onSetBB}
            buildingBlocks={this.props.buildingBlocks}
            putTagBack={this.props.putTagBack}
            block={block}
            index={index}
            blocks={this.state.blocks}
          />
        ))}
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
  return {
    onDeleteBlock: block => dispatch(actionCreators.deleteBlock(block)),
    onSetBB: newBB => dispatch(actionCreators.setBuildingBlocks(newBB))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BuildingBoard);
