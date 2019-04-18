import * as actionTypes from "../actions/types";

const initialState = {
  tags: [
    { id: "p", content: "<p> </p>", tip: "صغير بس فنان" },
    { id: "h1", content: "<h1> </h1>", tip: "رهييب" },
    { id: "img", content: "<img />", tip: "حافظ على الراية" }
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
