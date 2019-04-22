import * as actionTypes from "../actions/types";

const initialState = {
  buildingBlocks: []
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_BLOCK:
      return {
        ...state,
        buildingBlocks: state.buildingBlocks.concat(action.payload)
      };
    case actionTypes.DELETE_BLOCK:
      return {
        ...state,
        buildingBlocks: state.buildingBlocks.filter(bb => bb !== action.payload)
      };
    case actionTypes.SET_BB:
      return {
        ...state,
        buildingBlocks: action.payload
      };
    default:
      return state;
  }
};

export default mainReducer;
