import React, { Component, useEffect } from "react";
import ListOfTags from "../ListOfBlock";
import BuildingBoard from "../BuildingBoard";
import PreviewBorad from "../PreviewBoard";
import { DragDropContext } from "react-beautiful-dnd";
import * as Blocks from "../../../Library/PiratesCode";

import Modal from "react-responsive-modal";

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
  z-index: 40;
  cursor: pointer;
`;

class PlayArea extends Component {
  state = {
    overlay: true,
    level: null,
    tags: [],
    allTags: [],
    undoStep: null,
    instructions: [],
    currentInstruction: [],
    userSteps: [],
    gameFinishActive: false
  };

  // puts tag back after it's deleted
  putTagBack = tag => {
    console.log("TCL: PlayArea -> tags", this.state.allTags);
    this.setState({
      tags: this.state.tags.concat(this.state.allTags.find(t => t.id === tag)),
      undoStep: tag
    });
  };

  clearUndo = () => this.setState({ undoStep: null });

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
    const texters = ["p", "h1", "h2", "h3", "h4", "h5", "h6", "title"];
    newBlock = new Blocks.ChildBlock(draggableId.split("-")[0], draggableId);
    if (texters.includes(newBlock.name)) {
      newBlock.addChild(newBlock.id, new Blocks.TextBlock());
    }
    if (newBlock) {
      if (destination.droppableId === "building") {
        const noNos = ["title", "text", "body", "head"];
        if (!noNos.includes(newBlock.name)) {
          // remove the tag from the tags list

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

        // remove the tag
        // this.state.tags.splice(
        //   this.state.tags.indexOf(
        //     this.state.tags.find(tag => tag.id === draggableId.split("-")[0])
        //   ),
        //   1
        // );
        // reset the list
        this.props.onSetBB(building.children);
      }
    }
  };

  toggleOverlay = () => {
    this.setState(prevState => ({ overlay: !prevState.overlay }));
  };

  addInstruction = block => {
    const { currentInstruction, userSteps, instructions } = this.state;

    let tags = [...this.state.tags];
    tags.splice(
      this.state.tags.indexOf(
        this.state.tags.find(tag => tag.id === block.name)
      ),
      1
    );
    this.setState({ tags });
    let newBB = this.props.buildingBlocks.slice();
    let building = new Blocks.ChildBlock("building", "building");
    building.children = newBB;
    if (
      !userSteps.includes(currentInstruction) &&
      `"building":{${currentInstruction.expected}},` === building.instruct()
    ) {
      // let { undoStep, clearUndo } = this.props;

      // if (undoStep) {
      //   let prevInstructIndex;
      //   let resSteps = userSteps.filter(stp => {
      //     if (stp.expected === undoStep) {
      //       prevInstructIndex = instructions.indexOf(stp);
      //     }
      //     return stp.expected !== undoStep;
      //   });

      //   this. tState({
      //     userSteps: resSteps,
      //     currentInstruction: instructions[prevInstructIndex]
      //   });

      //   this.props.onSetInstruction(instructions[prevInstructIndex].content);
      //   clearUndo();
      // }

      // **************************************//
      // **************************************//

      // here i would call this.props.[name of the fuction that changes the tooltip] and make it go to the next step
      this.setState({
        userSteps: userSteps.concat(currentInstruction),
        currentInstruction:
          instructions[instructions.indexOf(currentInstruction) + 1]
      });

      if (
        instructions[instructions.indexOf(currentInstruction) + 1].expected ===
        "end"
      ) {
        this.finishLevel();
      }
      this.props.onSetInstruction(
        instructions[instructions.indexOf(currentInstruction) + 1].content
      );
    }
  };

  finishLevel = () => {
    console.log("anas done");
    this.setState({ gameFinishActive: true });
    const selectedCourseId = this.props.match.params.courseID;
    const selectedLevelId = this.props.match.params.levelID;
    this.props.onFinishLevel(selectedCourseId, selectedLevelId);
  };

  closeModal = () => {
    this.setState({ gameFinishActive: false });
    this.props.onSetBB([]);
  };

  componentDidMount = () => {
    const selectedCourseId = this.props.match.params.courseID;
    const selectedLevelId = this.props.match.params.levelID;

    console.log(
      "ZERO TCL: PlayArea -> componentDidMount -> selectedLevelId",
      selectedLevelId
    );

    const currentCourse = this.props.courses.find(
      course => course.id === +selectedCourseId
    );

    const currentLevel = currentCourse.levels.find(
      level => level.id === +selectedLevelId
    );

    if (!currentLevel.isAvailable)
      this.props.history.push(`/course/${selectedCourseId}`);

    const tags = [...currentLevel.tags];
    // console.log("TCL: PlayArea -> componentDidMount -> tags", tags);
    this.setState({
      level: currentLevel,
      tags: [...tags],
      allTags: [...tags],
      instructions: currentLevel.instructions,
      currentInstruction: currentLevel.instructions[0]
    });

    this.props.onSetInstruction(currentLevel.instructions[0].content);
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

    console.log(
      "anas TCL: PlayArea -> selectedLevelId",
      selectedLevelId,
      prevProps.match.params.levelID
    );
    if (
      +prevProps.match.params.courseID !== +selectedCourseId ||
      +prevProps.match.params.levelID !== +selectedLevelId
    ) {
      this.closeModal();
      this.setState({
        level: currentLevel,
        tags: [...tags],
        allTags: [...tags],
        instructions: currentLevel.instructions,
        currentInstruction: currentLevel.instructions[0]
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
    let { gameFinishActive } = this.state;
    return (
      <div className="play">
        {gameFinishActive && (
          <div
            className="btn peach-gradient btn-lg btn-b lock fixed-top"
            // onClick={() => this.onClose()}
          >
            <Link
              style={{ textDecorationLine: "none" }}
              to={`/course/${selectedCourseId}/level/${+selectedLevelId + 1}`}
            >
              <h1 className="text-light">
                بطل لقد اجتزت المرحلة! اضغط هنا لإنهاء المرحلة{" "}
              </h1>
            </Link>
          </div>
        )}

        <ReactAudioPlayer
          style={{ display: "none" }}
          src={wildForest}
          autoPlay
          loop
          controls
          volume={(0, 0.1)}
        />

        <div className=" play_container mt-4">
          <div className=" play-header pt-5 pb-5  ">
            <Link
              style={{ textDecorationLine: "none", fontSize: "20px" }}
              to={`/course/${selectedCourseId}`}
            >
              <h1 className="text-light"> {currentLevel.name}</h1>
            </Link>
          </div>
          <DragDropContext onDragEnd={this.onDragEnd}>
            <div className="col-12 main-content card  text-center">
              {/* onClick={() => this.toggleOverlay()} */}
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
                  <h2
                    className=" p-1 tool mb-5"
                    style={{
                      fontSize: "25px"
                    }}
                  >
                    منطقة الأدوات
                  </h2>

                  <ListOfTags tags={this.state.tags} />
                </div>
              </div>

              <div className="row justify-content-center ">
                <div className="col-6 building-board-area my-3 mr-2 card">
                  <h2
                    className="p-1 tool"
                    style={{
                      fontSize: "25px"
                    }}
                  >
                    منطقة البناء
                  </h2>
                  <BuildingBoard
                    putTagBack={this.putTagBack}
                    blocks={this.props.buildingBlocks}
                  />
                </div>
                <div className="col-9 preview-borad-area my-3 mr-3 ml-2 card ">
                  <h2
                    className="p-1 tool"
                    style={{
                      fontSize: "25px"
                    }}
                  >
                    شاشة العرض
                  </h2>
                  {this.state.level && (
                    <PreviewBorad
                      addInstruction={this.addInstruction}
                      tags={this.state.tags}
                      level={this.state.level}
                      buildingBlocks={this.props.buildingBlocks}
                      undoStep={this.state.undoStep}
                      clearUndo={this.clearUndo}
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
  onSetBB: newBB => dispatch(actionCreators.setBuildingBlocks(newBB)),
  onSetInstruction: instruction =>
    dispatch(actionCreators.setLevelInstruction(instruction)),
  onFinishLevel: (CID, LID) => dispatch(actionCreators.finishLvl(CID, LID))
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
