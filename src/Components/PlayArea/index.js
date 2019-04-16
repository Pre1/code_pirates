import React, { Component } from "react";
import ListOfBlock from "../ListOfBlock";
import BuildingBoard from "../BuildingBoard";
import PreviewBorad from "../PreviewBoard";
import Instructions from "../Instructions";
import { DragDropContext } from "react-beautiful-dnd";

const initalState = {
  tags: ["p", "h1", "div"]
};
class index extends Component {
  state = {
    listTags: initalState.tags,
    buildingBlocks: []
  };
  onDragEnd = result => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    console.log("chiiii ", destination);
    if (
      destination.droppableId === source.droppableId ||
      destination.index === source.index
    ) {
      return;
    }
    this.setState({
      buildingBlocks: [...this.state.buildingBlocks, { child: draggableId }]
    });
    this.setState({
      buildingBlocks: this.state.buildingBlocks.concat({ element: draggableId })
    });
  };
  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div>
          <ListOfBlock initalState={this.state.listTags} />
          <div style={{ display: "inline-block" }}>
            <div style={{ float: "left", width: "700px" }}>
              <BuildingBoard tags={this.state.buildingBlocks} />
            </div>
            <div style={{ float: "right", width: "700px" }}>
              <PreviewBorad />
            </div>
          </div>

          <Instructions />
        </div>
      </DragDropContext>
    );
  }
}

export default index;
