import * as actionTypes from "./types";

export const finishLvl = (courseId, levelId) => {
  return {
    type: actionTypes.FINISH_LVL,
    payload: { courseId: courseId, levelId: levelId }
  };
};

export const getLevelGoals = (courseId, levelId) => {
  console.log("TCL: getLevelGoals => courseId", courseId);
  return {
    type: actionTypes.GET_LEVEL_GOALS,
    payload: { courseId: courseId, levelId: levelId }
  };
};

export const setLevelGoals = (courseId, levelId, goals) => {
  return {
    type: actionTypes.SET_LEVEL_GOALS,
    payload: { courseId: courseId, levelId: levelId, goals: goals }
  };
};

export const setLevelInstruction = instruction => {
  return {
    type: actionTypes.SET_INSTRUCTION,
    payload: instruction
  };
};

export const resetLevelGoals = () => {
  return {
    type: actionTypes.REST_LEVEL_GOALS
  };
};
