import React, { Component } from "react";

class index extends Component {
  render() {
    return (
      <div
        style={{ border: "5px solid black", height: "300px" }}
        className="m-3"
      >
        <p>Building:</p>
        <div class="card text-center">
          <div class="card-header" />
          <div class="card-body">
            <p class="card-text">Empty card</p>
          </div>
          <div class="card-footer text-muted" />
        </div>
      </div>
    );
  }
}

export default index;
