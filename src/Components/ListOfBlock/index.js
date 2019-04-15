import React, { Component } from "react";
import { Badge } from "react-bootstrap";

class index extends Component {
  render() {
    return (
      <div style={{ border: "5px solid black", height: "100px" }}>
        <p>List of Block:</p>
        <Badge variant="secondary" className="m-2">
          P Tag
        </Badge>
        <Badge variant="secondary">Div Tag</Badge>
      </div>
    );
  }
}

export default index;
