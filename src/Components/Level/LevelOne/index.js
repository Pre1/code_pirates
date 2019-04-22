import React, { Component } from "react";
import { connect } from "react-redux";
class LevelOne extends Component {
  state = {
    active: "",
    head: "",
    title: "",
    buildingBlocks: []
  };

  setView = () => {
    this.props.buildingBlocks.map(bb => {
      let html, body, head, title;

      html = this.props.setTag(bb, "html");
      body = this.props.setTag(bb, "body");
      head = this.props.setTag(bb, "head");
      title = this.props.setTag(bb, "title");

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
          title: this.props.levelSearchTree(bb, "text").text
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
          <div className={this.state.active} />
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
