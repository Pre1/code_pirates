import React, { Component } from "react";
import { Badge } from "react-bootstrap";
import { Draggable, Droppable } from "react-beautiful-dnd";
class ListOfBlock extends Component {
  render() {
    return (
      <Droppable droppableId="list" direction="horizontal">
        {provided => (
          <div
            className="col-12 mt-3 list-tags-container"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {this.props.initalState.map((tag, index) => (
              <Draggable draggableId={tag} index={index} key={tag}>
                {provided => (
                  <div
                    className="mb-3 mr-2 tag-block"
                    style={{ minWidth: "200px", maxWidth: "400px" }}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                  >
                    {tag}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    );
  }
}

export default ListOfBlock;
