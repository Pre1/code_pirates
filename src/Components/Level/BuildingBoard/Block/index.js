import React, { Component } from "react";
import { connect } from "react-redux";
import { Droppable } from "react-beautiful-dnd";
import TextBlock from "../TextBlock";
import * as actionCreators from "../../../../store/actions";

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    onDeleteBlock: block => dispatch(actionCreators.deleteBlock(block))
  };
}

class Block extends Component {
  state = {
    children: this.props.tag.children
  };
  deleteBlock = block => {
    this.props.onDeleteBlock(block);
  };

  render() {
    const { tag, index, tags, searchTreeText } = this.props;

    return (
      <div
        className="card-body"
        style={{
          maxWidth: "300px",
          backgroundColor: "#ffffff",
          backgroundImage: "linear-gradient(315deg, #ffffff 0%, #82bc23 74%)",
          borderRadius: "10px"
        }}
      >
        <Droppable key={index} droppableId={`${tag.name}-${index}`}>
          {provided => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="card-body"
            >
              <button
                style={{
                  color: "white",
                  backgroundColor: "#bc6f03",
                  backgroundImage:
                    "linear-gradient(315deg, #bc6f03 0%, #874000 74%)",
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
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="card-body"
                  style={{
                    maxWidth: "300px",
                    backgroundColor: "#bc6f03",
                    backgroundImage:
                      "linear-gradient(315deg, #bc6f03 0%, #874000 74%)"
                  }}
                >
                  {tag.children.map((child, cindex) => {
                    if (child.name === "text") {
                      return (
                        <TextBlock
                          searchTreeText={searchTreeText}
                          tags={tags}
                          tag={tag}
                          index={cindex}
                        />
                      );
                    }
                    return <div />;
                  })}
                </div>
              </p>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        {tag.children.map((child, cindex) => {
          if (child.name !== "text") {
            return (
              <Block
                searchTreeText={searchTreeText}
                tag={child}
                tags={tag.children}
                index={cindex}
              />
            );
          }
        })}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Block);
