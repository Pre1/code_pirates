import React, { Component } from "react";
import ListOfBlock from "../ListOfBlock";
import BuildingBoard from "../BuildingBoard";
import PreviewBorad from "../PreviewBoard";
import Instructions from "../Instructions";
import { DragDropContext } from "react-beautiful-dnd";
import * as Blocks from "../../Library/PiratesCode";

// Connection with redux centeral store
import * as actionTypes from "../../store/actions";
import { connect } from "react-redux";

const initalState = {
  tags: ["p", "h1", "img"]
};
class PlayArea extends Component {
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
        newBlock = new Blocks.H1Block([new Blocks.TextBlock()]);
        break;
      case "img":
        newBlock = new Blocks.ImgBlock();
        break;

      default:
        // I'll added it to you anas, arrgggg
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
        <div className="row justify-content-center mt-4">
          <div className="col-12 main-content">
            <h1>قراصنة البرمجة</h1>
            <div className="row mt-4">
              <div className="col-12 list-of-blocks-board">
                <p className="mt-3">منطقة الأدوات</p>
                <ListOfBlock />
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-6 building-board-area my-3 mr-2">
                <p className="mt-3">منطقة البناء</p>
                <BuildingBoard tags={this.state.buildingBlocks} />
              </div>
              <div className="col-6 preview-borad-area my-3 ml-2">
                <p className="mt-3">خريطتي</p>
                <PreviewBorad buildingBlocks={this.state.buildingBlocks} />
              </div>
            </div>
            <div className="row">
              <div className="col-12 instructions-board">
                <p className="mt-3">ماذا يقول كبير القراصنة</p>
                <Instructions />
              </div>
            </div>
          </div>
        </div>
      </DragDropContext>
    );
  }
}

const mapStateToProps = state => ({
  tags: state.mainReducer.tags,
  buildingBlocks: state.mainReducer.buildingBlocks
});

export default connect(mapStateToProps)(PlayArea);
