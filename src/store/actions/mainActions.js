import * as actionTypes from "./types";

export const addBuildingBlock = block => {
  return {
    type: actionTypes.ADD_BLOCK,
    payload: block
  };
};

export const deleteBlock = block => {
  return {
    type: actionTypes.DELETE_BLOCK,
    payload: block
  };
};

export const setBuildingBlocks = newBB => {
  return {
    type: actionTypes.SET_BB,
    payload: newBB
  };
};
