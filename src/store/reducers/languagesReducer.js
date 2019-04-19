import * as actionTypes from "../actions/types";

const initialState = {
  lang: [
    {
      id: 1,
      name: "</ جزيرة HTML >",
      isAvailable: true,
      isPass: false
    },
    {
      id: 2,
      name: "< CSS جزيرة />",
      isAvailable: false,
      isPass: false
    },
    {
      id: 3,
      name: "< JavaScript جزيرة />",
      isAvailable: false,
      isPass: false
    }
  ]
};

const languagesReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default languagesReducer;
