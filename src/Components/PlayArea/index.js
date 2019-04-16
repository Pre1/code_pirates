import React, { Component } from "react";
import ListOfBlock from "../ListOfBlock";
import BuildingBoard from "../BuildingBoard";
import PreviewBorad from "../PreviewBoard";
import Instructions from "../Instructions";
import { DragDropContext } from "react-beautiful-dnd";
import * as Blocks from "../../Library/PiratesCode";
const initalState = {
  tags: ["p", "h1", "img"]
};
class index extends Component {
  state = {
    listTags: initalState.tags,
    buildingBlocks: []
  };
  onDragEnd = result => {
    // gets the destination ({droppableId:"", index:""}), source ({droppableId:"", index:""}), draggableId
    const { destination, source, draggableId } = result;

    //check if im not dropping in a place that's not a droppable
    if (!destination) {
      //stops anything from happening by exiting the function early
      return;
    }

    //checks if im just putting the thing i pulled back to it's original drop point
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      //stops anything from happening by exiting the function early
      return;
    }

    /*
    here we're creating a new block object from the amazing PiratesCode library 
    (this will later be integrated in library)
    */
    let newBlock;
    switch (draggableId) {
      case "p":
        newBlock = new Blocks.PBlock([new Blocks.TextBlock()]);
        break;
      case "h1":
        newBlock = new Blocks.H1Block();
        break;
      case "img":
        newBlock = new Blocks.ImgBlock();
        break;

      default:
        // I'll added it to you anass, arrgggg
        console.log(`draggableId: ${draggableId} is NOT Implemented!!`);
    }

    //checks if the place im dropping the draggable in is the outer (buildingboard) or an element inside.
    if (destination.droppableId === "building") {
      //pretty clear
      this.setState({
        buildingBlocks: this.state.buildingBlocks.concat(newBlock)
      });
    } else {
      //log the 'id' thing im dropping into
      console.log("TCL: index -> droppableId", destination.droppableId);

      //make a copy of the buildingBlocks
      let newBB = this.state.buildingBlocks.slice();

      //find the object im droping into
      let BB = newBB.find(
        (bb, index) => `${bb.name}-${index}` === destination.droppableId
      );

      //log the obj
      console.log("TCL: index -> BB", BB);

      //replace it in the list with the block inserted in the children
      newBB.splice(newBB.indexOf(BB), 1, {
        ...BB,
        children: BB.children.concat(newBlock),
        compile: BB.compile
      });

      this.setState({
        buildingBlocks: newBB
      });
    }
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
              <PreviewBorad buildingBlocks={this.state.buildingBlocks} />
            </div>
          </div>

          <Instructions />
        </div>
      </DragDropContext>
    );
  }
}

export default index;
