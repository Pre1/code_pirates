import React, { Component } from "react";
import { Badge } from "react-bootstrap";
import { Draggable, Droppable } from "react-beautiful-dnd";
class ListOfBlock extends Component {
  render() {
    return (
      <Droppable droppableId="list">
        {provided => (
          <div
            style={{ border: "5px solid black", height: "100px" }}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <p>List of Block:</p>
            {this.props.initalState.map((tag, index) => (
              <Draggable draggableId={tag} index={index} key={tag}>
                {provided => (
                  <Badge
                    variant="secondary"
                    className="m-2"
                    style={{ minWidth: "200px", maxWidth: "400px" }}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                  >
                    {tag}
                  </Badge>
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
