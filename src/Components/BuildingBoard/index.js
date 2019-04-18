import React, { Component } from "react";
import { Droppable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import TextBlock from "./TextBlock";
import * as actionCreators from "../../store/actions";
class BuildingBoard extends Component {
  state = {
    tags: this.props.tags
  };
  componentDidUpdate = prevProps => {
    if (prevProps.tags !== this.props.tags) {
      this.setState({ tags: this.props.tags });
    }
  };
  deleteBlock = block => {
    console.log("TCL: BuildingBoard -> block", block.target);
    this.props.onDeleteBlock(block);
  };
  render() {
    return (
      <div className="m-3">
        <Droppable droppableId="building">
          {provided => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="card text-center building-container"
            >
              <div className="card-footer text-muted building-container" />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        {this.state.tags.map((tag, index) => (
          <Droppable key={index} droppableId={`${tag.name}-${index}`}>
            {provided => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="card-body"
                style={{
                  maxWidth: "300px",
                  background: "#f08080",
                  border: "3px solid #e96565",
                  borderRadius: "10px"
                }}
              >
                <button
                  style={{
                    paddingLeft: "50%",
                    paddingRight: "50%",
                    background: "lightpink",
                    color: "white",
                    border: "3px solid #e96565",
                    borderRadius: "10px"
                  }}
                  onClick={() => this.deleteBlock(tag)}
                >
                  <span>X</span>
                </button>
                <p className="card-text" style={{ color: "white" }}>
                  {"<" + tag.name + ">"}
                  <br />
                  {/* change the way the children are displayed pls @sitah ^_^ */}
                  {tag.children.map(child => {
                    if (child.name === "text") {
                      return (
                        <TextBlock
                          tags={this.state.tags}
                          tag={tag}
                          provided={provided}
                          index={index}
                        />
                      );
                    }
                    return (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="card-body"
                        style={{
                          maxWidth: "300px",
                          background: "#e96565",
                          border: "3px solid #e96565",
                          borderRadius: "10px"
                        }}
                      >
                        {child.name}
                      </div>
                    );
                  })}
                </p>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onDeleteBlock: block => dispatch(actionCreators.deleteBlock(block))
  };
};
export default connect(
  null,
  mapDispatchToProps
)(BuildingBoard);
