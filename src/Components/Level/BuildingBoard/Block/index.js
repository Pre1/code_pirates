import React, { Component } from "react";
import { connect } from "react-redux";
import { Droppable } from "react-beautiful-dnd";
import TextBlock from "../TextBlock";
import * as actionCreators from "../../../../store/actions";

class Block extends Component {
  state = {
    bb: this.props.buildingBlocks
  };
  componentDidUpdate = prevProps => {
    if (prevProps.buildingBlocks !== this.props.buildingBlocks) {
      this.setState({ bb: this.props.buildingBlocks });
    }
  };
  deleteBlock = block => {
    console.log(
      "TCL: Block -> this.props.buildingBlocksssss",
      this.props.buildingBlocks
    );
    let newBB = this.props.buildingBlocks.slice();
    console.log("TCL: Block -> newBB", newBB);
    let BB = { children: newBB, id: "building" };
    console.log("TCL: Block -> BB", BB);
    this.props.searchTreeDelete(BB, block.id);
    console.log("TCL: Block -> newBBA AFTER", newBB);
    this.props.onSetBB(newBB);

    // this.props.onDeleteBlock(block);
  };

  render() {
    const { block, index, blocks, searchTreeText } = this.props;

    return (
      <div
        className="card-body"
        style={{
          maxWidth: "300px",
          backgroundColor: "#ba6c01",
          border: "2px solid rgb(109, 64, 1)",
          borderRadius: "10px"
        }}
      >
        <Droppable key={index} droppableId={`${block.name}-${index}`}>
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
                onClick={() => this.deleteBlock(block)}
              >
                <span>X</span>
              </button>
              <p
                className="card-text"
                style={{ color: "white", fontSize: "20px" }}
              >
                {"<" + block.name + ">"}
                <br />

                {block.children.map((child, cindex) => {
                  if (child.name === "text") {
                    return (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="card-body"
                        style={{
                          maxWidth: "300px",
                          backgroundColor: "gray",
                          border: "2px solid rgb(109, 64, 1)"
                        }}
                      >
                        <TextBlock
                          searchTreeText={searchTreeText}
                          blocks={blocks}
                          block={block}
                          index={cindex}
                        />
                      </div>
                    );
                  }
                  return <div />;
                })}
              </p>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        {block.children.map((child, cindex) => {
          if (child.name !== "text") {
            return (
              <Block
                onSetBB={this.props.onSetBB}
                buildingBlocks={this.props.buildingBlocks}
                searchTreeDelete={this.props.searchTreeDelete}
                searchTreeText={searchTreeText}
                block={child}
                blocks={block.children}
                index={cindex}
              />
            );
          }
        })}
        <p style={{ color: "white", fontSize: "20px" }}>
          {"</" + block.name + ">"}
        </p>
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
)(Block);
