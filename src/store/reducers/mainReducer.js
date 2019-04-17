import * as actionTypes from "../actions/types";

const initialState = {
  tags: [
    { id: "p", content: "<p> </p>" },
    { id: "h1", content: "<h1> </h1>" },
    { id: "img", content: "<img />" }
  ],
  buildingBlocks: []
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default mainReducer;
