import * as actionTypes from "../actions/types";

const initialState = {
  msg: "Hi from mainReducer.js file"
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAY_HI:
      alert(state.msg);
      return {
        ...state,
        msg: `Hi ${action.payload} from mainReducer.js file`
      };

    default:
      return state;
  }
};

export default mainReducer;
