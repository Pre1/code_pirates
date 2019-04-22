import React, { Component } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";

import ReactTooltip from "react-tooltip";

class ListOfTags extends Component {
  render() {
    const tags = this.props.tags;

    return (
      <Droppable droppableId="list" direction="horizontal">
        {provided => (
          <div
            className="col-12 mt-5 list-tags-container"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tags.map((tag, index) => (
              <Draggable draggableId={tag.id} index={index} key={tag.id}>
                {provided => (
                  <div
                    className="alert alert-primary tags-block mr-2 "
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
    );
  }
}

export default ListOfTags;
