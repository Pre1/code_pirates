import React, { Component, useEffect } from "react";
import ListOfTags from "../ListOfBlock";
import BuildingBoard from "../BuildingBoard";
import PreviewBorad from "../PreviewBoard";
import { DragDropContext } from "react-beautiful-dnd";
import * as Blocks from "../../../Library/PiratesCode";

import { Link } from "react-router-dom";

import Instruction from "../Instruction";
import Tutorial from "./Tutorial";

// Connection with redux centeral store
import * as actionCreators from "../../../store/actions";
import { connect } from "react-redux";

import styled from "styled-components";
import ReactAudioPlayer from "react-audio-player";
import wildForest from "../../../../src/assets/sounds/wildForest.mp3";

let Overlay = styled.div`
  position: fixed; /* Sit on top of the page content */
  visibility: ${props => (props.overlay ? "visible" : "hidden")};
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 2;
  cursor: pointer;
`;

class PlayArea extends Component {
  state = {
    overlay: true,
    level: null,
    tags: [],
    allTags: []
  };

  // puts tag back after it's deleted
  putTagBack = tag => {
    console.log("TCL: PlayArea -> tags", this.state.allTags);
    this.setState({
      tags: this.state.tags.concat(this.state.allTags.find(t => t.id === tag))
    });
  };

  // the meat
  onDragEnd = result => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let newBlock;
    const texters = ["p", "h1", "title"];
    newBlock = new Blocks.ChildBlock(draggableId.split("-")[0], draggableId);
    if (texters.includes(newBlock.name)) {
      newBlock.addChild(newBlock.id, new Blocks.TextBlock());
    }
    if (newBlock) {
      if (destination.droppableId === "building") {
        const noNos = ["title", "text", "body", "head"];
        if (!noNos.includes(newBlock.name)) {
          // remove the tag from the tags list
          this.state.tags.splice(
            this.state.tags.indexOf(
              this.state.tags.find(tag => tag.id === draggableId.split("-")[0])
            ),
            1
          );

          // add block
          this.props.onAddBlock(newBlock);
        }
      } else {
        let newBB = this.props.buildingBlocks.slice();
        // let BB = { children: [...newBB], id: "building" };
        let building = new Blocks.ChildBlock("building", "building");
        building.children = newBB;
        building.addChild(destination.droppableId, newBlock);
        // this.searchTree();
        console.log(
          "anas TCL: PlayArea -> case title droppableId -> BB",
          destination.droppableId,
          building
        );

        // remove the tag
        this.state.tags.splice(
          this.state.tags.indexOf(
            this.state.tags.find(tag => tag.id === draggableId.split("-")[0])
          ),
          1
        );
        // reset the list
        this.props.onSetBB(building.children);

        console.log(
          "TCL: PlayArea -> case title this.props.buildingBlocks",
          this.props.buildingBlocks
        );
      }
    }
  };

  handleDroppingBlock = newBlock => {
    console.log(
      "TCL: PlayArea -> handleDroppingBlock -> handleDroppingBlock",
      newBlock
    );
  };

  toggleOverlay = () => {
    this.setState(prevState => ({ overlay: !prevState.overlay }));
  };

  componentDidMount = () => {
    const selectedCourseId = this.props.match.params.courseID;
    const selectedLevelId = this.props.match.params.levelID;

    const currentCourse = this.props.courses.find(
      course => course.id === +selectedCourseId
    );

    const currentLevel = currentCourse.levels.find(
      level => level.id === +selectedLevelId
    );
    const tags = [...currentLevel.tags];
    // console.log("TCL: PlayArea -> componentDidMount -> tags", tags);
    this.setState({
      level: currentLevel,
      tags: [...tags],
      allTags: [...tags]
    });
  };

  componentDidUpdate = prevProps => {
    const selectedCourseId = this.props.match.params.courseID;
    const selectedLevelId = this.props.match.params.levelID;

    const currentCourse = this.props.courses.find(
      course => course.id === +selectedCourseId
    );

    const currentLevel = currentCourse.levels.find(
      level => level.id === +selectedLevelId
    );

    const tags = [...currentLevel.tags];

    if (
      prevProps.match.params.courseID !== selectedCourseId ||
      prevProps.match.params.levelID !== selectedLevelId
    ) {
      this.setState({
        level: currentLevel,
        tags: [...tags],
        allTags: [...tags]
      });
    }

    if (prevProps.buildingBlocks.length && !this.props.buildingBlocks.length) {
      this.setState({
        tags: [...tags]
      });
    }
  };
  render() {
    const selectedCourseId = this.props.match.params.courseID;
    const selectedLevelId = this.props.match.params.levelID;

    const currentCourse = this.props.courses.find(
      course => course.id === +selectedCourseId
    );

    const currentLevel = currentCourse.levels.find(
      level => level.id === +selectedLevelId
    );

    // const tags = currentLevel.tags;

    return (
      <div className="play">
        <ReactAudioPlayer
          style={{ display: "none" }}
          src={wildForest}
          autoPlay
          loop
          controls
          volume={(0, 0.1)}
        />

        <div className=" container mt-5">
          <div className=" play-header pt-5 pb-5 mt-2 ">
            <Link
              style={{ textDecorationLine: "none" }}
              to={`/course/${selectedCourseId}`}
            >
              <h1 className="text-light"> {currentLevel.name}</h1>
            </Link>
          </div>
          <DragDropContext onDragEnd={this.onDragEnd}>
            <div className="col-12 main-content card  text-center">
              <Overlay overlay={this.state.overlay}>
                <Tutorial toggleOverlay={this.toggleOverlay} />
              </Overlay>

              <div className="row  justify-content-center">
                <div className="col-2 ml-2 instructions-board ">
                  <Instruction
                    toggleOverlay={this.toggleOverlay}
                    overlay={this.state.overlay}
                  />
                </div>
                <div className="col-10 list-of-blocks-board badage ">
                  <h2 className=" p-1 tool mb-5 ">منطقة الأدوات</h2>

                  <ListOfTags tags={this.state.tags} />
                </div>
              </div>
              <hr />
              <div className="row justify-content-center ">
                <div className="col-6 building-board-area my-3 mr-2 card">
                  <h2 className="p-1 tool">منطقة البناء</h2>
                  <BuildingBoard
                    putTagBack={this.putTagBack}
                    blocks={this.props.buildingBlocks}
                  />
                </div>
                <div className="col-6 preview-borad-area my-3 ml-2 card">
                  <h2 className="p-1 tool">شاشة العرض</h2>
                  {this.state.level && (
                    <PreviewBorad
                      tags={this.state.allTags}
                      level={this.state.level}
                      buildingBlocks={this.props.buildingBlocks}
                    />
                  )}
                </div>
              </div>
            </div>
          </DragDropContext>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  buildingBlocks: state.mainReducer.buildingBlocks,
  textObj: state.mainReducer.textObj,
  courses: state.coursesReducer.courses
});

const mapDispatchToProps = dispatch => ({
  onAddBlock: block => dispatch(actionCreators.addBuildingBlock(block)),
  onSetBB: newBB => dispatch(actionCreators.setBuildingBlocks(newBB))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayArea);

// switch (draggableId.split("-")[0]) {
//   case "p":
//     newBlock = new Blocks.PBlock(
//       [new Blocks.TextBlock("صغير بس فنان")],
//       draggableId
//     );

//     break;
//   case "h1":
//     newBlock = new Blocks.H1Block(
//       [new Blocks.TextBlock("رهييب")],
//       draggableId
//     );
//     break;
//   case "html":
//     newBlock = new Blocks.HTMLBlock([], draggableId);
//     break;
//   case "head":
//     if (destination.droppableId.split("-")[0] === "html") {
//       newBlock = new Blocks.HeadBlock([], draggableId);
//     }
//     break;
//   case "body":
//     if (destination.droppableId.split("-")[0] === "html") {
//       newBlock = new Blocks.BodyBlock([], draggableId);
//     }
//     break;
//   case "title":
//     if (destination.droppableId.split("-")[0] === "head") {
//       newBlock = new Blocks.TitleBlock(
//         [new Blocks.TextBlock()],
//         draggableId
//       );
//     }
//     break;
//   case "img":
//     newBlock = new Blocks.ImgBlock();
//     break;
//   default:
//     console.error(`draggableId: ${draggableId} is NOT Implemented!!`);
// }
