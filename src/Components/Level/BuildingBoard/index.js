import React, { Component } from "react";
import { Droppable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import Block from "./Block";
import * as Blocks from "../../../Library/PiratesCode";
import * as actionCreators from "../../../store/actions";
class BuildingBoard extends Component {
  state = {
    blocks: this.props.blocks
  };
  componentDidUpdate = prevProps => {
    if (prevProps.blocks !== this.props.blocks) {
      this.setState({ blocks: this.props.blocks });
    }
  };

  searchTreeDelete = (block, blockID) => {
    const blockObj = block.children.find(c => c.id === blockID);
    if (blockObj) {
      block.children.splice(block.children.indexOf(blockObj), 1);
      this.props.putTagBack(blockObj.name);
      return block;
    } else if (block.children.length) {
      let i;
      let result = null;
      for (i = 0; result == null && i < block.children.length; i++) {
        result = this.searchTreeDelete(block.children[i], blockID);
      }
      return result;
    }
    return null;
  };

  searchTreeText = (block, blockID, newText) => {
    if (block.id === blockID) {
      block.children.splice(
        block.children.indexOf(block.children.find(c => c.name === "text")),
        1,
        newText
      );
      return block;
    } else if (block.children.length) {
      let i;
      let result = null;
      for (i = 0; result == null && i < block.children.length; i++) {
        result = this.searchTreeText(block.children[i], blockID, newText);
      }
      return result;
    }
    return null;
  };

  render() {
    return (
      <div className="m-3 building-container">
        <Droppable droppableId="building">
          {provided => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="card text-center"
              style={{ backgroundColor: "aquamarine" }}
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
            searchTreeDelete={this.searchTreeDelete}
            searchTreeText={this.searchTreeText}
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
