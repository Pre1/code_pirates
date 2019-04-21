import React, { Component } from "react";
import { Droppable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import Block from "./Block";
import * as Blocks from "../../../Library/PiratesCode";
class BuildingBoard extends Component {
  state = {
    tags: this.props.tags
  };
  componentDidUpdate = prevProps => {
    if (prevProps.tags !== this.props.tags) {
      this.setState({ tags: this.props.tags });
    }
  };
  searchTreeText = (block, blockID, newText) => {
    console.log("TCL: BuildingBoard -> searchTreeText -> searchTreeText");
    if (block.id === blockID) {
      block.children.splice(
        block.children.indexOf(block.children.find(c => c.name === "text")),
        1,
        newText
      );
      switch (block.name) {
        case "p":
          block = new Blocks.PBlock(
            block.children,
            `child-${block.name}-${block.children.length}`
          );
          break;
        case "h1":
          block = new Blocks.H1Block(
            block.children,
            `child-${block.name}-${block.children.length}`
          );
          break;
        default:
          console.error(`block.name: ${block.name} is NOT working!!`);
      }
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
        {this.state.tags.map((tag, index) => (
          <Block
            searchTreeText={this.searchTreeText}
            tag={tag}
            index={index}
            tags={this.state.tags}
          />
        ))}
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {};
};
export default connect(
  null,
  mapDispatchToProps
)(BuildingBoard);
