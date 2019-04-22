import React, { Component } from "react";
import { Draggable, Droppable, DragDropContext } from "react-beautiful-dnd";

import ReactTooltip from "react-tooltip";

// Connection with redux centeral store
import * as actionTypes from "../../../store/actions";
import { connect } from "react-redux";

class ListOfBlock extends Component {
  // onDragEnd = result => {
  //   const { destination, source, draggableId } = result;

  //   if (!destination) {
  //     return;
  //   }

  //   if (destination.droppableId === source.droppableId) {
  //     return;
  //   }
  // };

  state = {
    tags: []
  };
  componentDidMount = () => {
    this.setState({
      tags: this.props.levels.find(lvl => lvl.id == this.props.levelID).tags
    });
  };
  componentDidUpdate = prevProps => {
    if (prevProps.levelID !== this.props.levelID)
      this.setState({
        tags: this.props.levels.find(lvl => lvl.id === this.props.levelID).tags
      });
  };
  render() {
    console.log("ListOfBlocks", this.props.tags);
    return (
      // <DragDropContext onDragEnd={this.onDragEnd}>
      <Droppable droppableId="list" direction="horizontal">
        {provided => (
          <div
            className="col-12 mt-5 list-tags-container"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {this.state.tags &&
              this.state.tags.map((tag, index) => (
                <Draggable draggableId={tag.id} index={index} key={tag.id}>
                  {provided => (
                    <div
                      className="alert alert-primary tag-block mr-2 "
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      data-tip={tag.tip}
                    >
                      {tag.content}
                      <ReactTooltip />
                    </div>
                  )}
                </Draggable>
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      // </DragDropContext>
    );
  }
}

const mapStateToProps = state => ({
  levels: state.levelsReducer.levels
});

export default connect(mapStateToProps)(ListOfBlock);
