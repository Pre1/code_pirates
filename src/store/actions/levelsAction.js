import * as actionTypes from "./types";

export const finishLvl = id => {
  return {
    type: actionTypes.FINISH_LVL,
    payload: id
  };
};
