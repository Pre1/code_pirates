import * as actionTypes from "./types";

export const sayHi = name => {
  alert(`Hi ${name} from sayHi action!`);
  return {
    type: actionTypes.SAY_HI,
    payload: name
  };
};
