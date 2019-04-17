import * as actionTypes from "../actions/types";

const initialState = {
  tags: [
    { id: "p", content: "<p> </p>", class: "PBlock" },
    { id: "h1", content: "<h1> </h1>", class: "H1Block" },
    { id: "img", content: "<img />", class: "ImgBlock" }
  ],
  buildingBlocks: [],
  textObj: { class: "TextBlock" }
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default mainReducer;
