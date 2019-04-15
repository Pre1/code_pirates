import React, { Component } from "react";
import ListOfBlock from "../ListOfBlock";
import BuildingBoard from "../BuildingBoard";
import PreviewBorad from "../PreviewBoard";
import Instructions from "../Instructions";

class index extends Component {
  render() {
    return (
      <div>
        <ListOfBlock />
        <div style={{ display: "inline-block" }}>
          <div style={{ float: "left", width: "700px" }}>
            <BuildingBoard />
          </div>
          <div style={{ float: "right", width: "700px" }}>
            <PreviewBorad />
          </div>
        </div>

        <Instructions />
      </div>
    );
  }
}

export default index;
