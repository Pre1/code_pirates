import React, { Component } from "react";
import { connect } from "react-redux";
class LevelOne extends Component {
  state = {
    active: "",
    head: "",
    title: "",
    buildingBlocks: []
  };

  levelSearchTree = (block, name) => {
    if (block.name === name) {
      return block;
    } else if (block.children.length) {
      let i;
      let result = null;
      for (i = 0; result == null && i < block.children.length; i++) {
        result = this.levelSearchTree(block.children[i], name);
      }
      return result;
    }
    return null;
  };

  setTag = (bb, name) => {
    if (!this.state.buildingBlocks.find(block => block.name === name)) {
      return this.levelSearchTree(bb, name);
    }
  };

  setView = () => {
    this.props.buildingBlocks.map(bb => {
      let html, body, head, title;

      html = this.setTag(bb, "html");
      body = this.setTag(bb, "body");
      head = this.setTag(bb, "head");
      title = this.setTag(bb, "title");

      if (html) {
        this.setState({
          head: "head",
          active: "border"
        });
      }

      if (body) {
        this.setState({
          active: "waves"
        });
      } else if (!body) {
        this.setState({
          active: ""
        });
      }

      if (title) {
        this.setState({
          title: this.levelSearchTree(bb, "text").text
        });
      } else if (!title) {
        this.setState({
          title: ""
        });
      }
    });
    if (!this.props.buildingBlocks.length) {
      this.setState({
        head: "",
        active: "",
        title: ""
      });
    }
  };

  componentDidMount = () => {
    this.setState({
      buildingBlocks: this.props.buildingBlocks
    });
    this.setView();
  };

  componentDidUpdate = prevProps => {
    if (prevProps.buildingBlocks !== this.props.buildingBlocks) {
      this.setState({ buildingBlocks: this.props.buildingBlocks });
      this.setView();
    }
  };

  render() {
    return (
      <div>
        <div className={this.state.head}>
          <p
            className="p-3 text-dark"
            style={{ marginRight: "240px", fontSize: "12px" }}
          >
            {this.state.title}
          </p>
        </div>
        <div className={this.state.active}>
          {/* <button className="btn btn-danger" onClick={this.htmlClick}>
            html
          </button>
          <button className="btn btn-warning" onClick={this.headClick}>
            head
          </button>
          <button className="btn btn-dark" onClick={this.handelClick}>
            body
          </button> */}
          {/* <div className="cloud"> */}
          {/* <img src={cloud} alt={cloud} width="100px" height="100px" />
        </div> */}

          {/* <div className="boat">
          <div className="Pirate">
            <img src={Pirate} alt="Pirate" />
          </div>
        </div> */}
          {/* <div className="">
          <img width="510px" height="520px" />
        </div> */}
          {/* <div className="box">
            <div className="wave lightblue" />
          </div> */}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    // buildingBlocks: state.mainReducer.buildingBlocks
  };
};
export default connect(mapStateToProps)(LevelOne);
