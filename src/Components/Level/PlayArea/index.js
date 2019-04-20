import React, { Component } from "react";
import ListOfBlock from "../ListOfBlock";
import BuildingBoard from "../BuildingBoard";
import PreviewBorad from "../PreviewBoard";
import { DragDropContext } from "react-beautiful-dnd";
import * as Blocks from "../../../Library/PiratesCode";
import ReactTooltip from "react-tooltip";
import assistant from "../../../assets/images/pirateBird.png";

// Connection with redux centeral store
import * as actionCreators from "../../../store/actions";
import { connect } from "react-redux";
import Sound from "react-sound";

class PlayArea extends Component {
  onDragEnd = result => {
    // gets the destination ({droppableId:"", index:""}), source ({droppableId:"", index:""}), draggableId
    const { destination, source, draggableId } = result;

    //check if im not dropping in a place that's not a droppable
    if (!destination) {
      //stops anything from happening by exiting the function early
      return;
    }
    if (destination.droppableId === source.droppableId) {
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

    console.log("TCL: PlayArea -> draggableId", draggableId);
    let newBlock;
    switch (draggableId) {
      case "p":
        newBlock = new Blocks.PBlock([new Blocks.TextBlock("صغير بس فنان")]);
        break;
      case "h1":
        newBlock = new Blocks.H1Block([new Blocks.TextBlock("رهييب")]);
        break;
      case "img":
        newBlock = new Blocks.ImgBlock();
        break;

      default:
        console.error(`draggableId: ${draggableId} is NOT Implemented!!`);
    }

    //checks if the place im dropping the draggable in is the outer (buildingboard) or an element inside.
    if (destination.droppableId === "building") {
      //pretty clear
      console.log("TCL: PlayArea -> clear");

      this.props.onAddBlock(newBlock);
    } else {
      //make a copy of the buildingBlocks
      let newBB = this.props.buildingBlocks.slice();

      //find the object im droping into
      let BB = newBB.find(
        (bb, index) => `${bb.name}-${index}` === destination.droppableId
      );

      //replace it in the list with the block inserted in the children
      newBB.splice(newBB.indexOf(BB), 1, {
        ...BB,
        children: BB.children.concat(newBlock),
        compile: BB.compile
      });

      console.log("TCL: PlayArea -> newBBBBBBBB", newBB);
      this.props.onSetBB(newBB);
    }
  };

  handleDroppingBlock = newBlock => {
    console.log(
      "TCL: PlayArea -> handleDroppingBlock -> handleDroppingBlock",
      newBlock
    );
  };
  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className="col-12 main-content">
          <h1>قراصنة البرمجة</h1>
          <div className="row mt-4 justify-content-center">
            <div className="col-10 mr-2 list-of-blocks-board">
              <h2 className="mt-3">منطقة الأدوات</h2>
              <ListOfBlock />
            </div>
            <div className="col-2 ml-2 instructions-board">
              <img
                src={assistant}
                style={{ width: "100%", marginTop: "15%" }}
                data-tip="أهلا بالقرصان الصغير"
              />
              <ReactTooltip />
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-6 building-board-area my-3 mr-2">
              <h2 className="mt-3">منطقة البناء</h2>
              <BuildingBoard tags={this.props.buildingBlocks} />
            </div>
            <div className="col-6 preview-borad-area my-3 ml-2 waves">
              {/* <h2 className="mt-3">شاشة العرض</h2> */}
              <PreviewBorad buildingBlocks={this.props.buildingBlocks} />
            </div>
          </div>
        </div>
      </DragDropContext>
    );
  }
}

const mapStateToProps = state => ({
  tags: state.mainReducer.tags,
  buildingBlocks: state.mainReducer.buildingBlocks,
  textObj: state.mainReducer.textObj
});

const mapDispatchToProps = dispatch => ({
  onAddBlock: block => dispatch(actionCreators.addBuildingBlock(block)),
  onSetBB: newBB => dispatch(actionCreators.setBuildingBlocks(newBB))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayArea);
