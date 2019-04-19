import * as actionTypes from "../actions/types";

// for testing
import pirateBird from "../../assets/images/pirateBird.png";

const initialState = {
  levels: [
    {
      id: 1,
      name: "level",
      imageUrl: pirateBird,
      isAvailable: true,
      isPass: false
    },
    {
      id: 2,
      name: "level",
      imageUrl: pirateBird,
      isAvailable: false,
      isPass: false
    },
    {
      id: 3,
      name: "level",
      imageUrl: pirateBird,
      isAvailable: false,
      isPass: false
    },
    {
      id: 4,
      name: "level",
      imageUrl: pirateBird,
      isAvailable: false,
      isPass: false
    },
    {
      id: 5,
      name: "level",
      imageUrl: pirateBird,
      isAvailable: false,
      isPass: false
    }
  ]
};

const levelsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FINISH_LVL:
      let newLevels = state.levels.slice();

      let lvl = { ...newLevels.find(obj => obj.id === action.payload) };
      let nexLvl = { ...newLevels.find(obj => obj.id === action.payload + 1) };

      lvl.isPass = true;
      nexLvl.isAvailable = true;

      newLevels.splice(lvl.id - 1, 1, lvl);
      newLevels.splice(nexLvl.id - 1, 1, nexLvl);

      return {
        levels: newLevels
      };
    default:
      return state;
  }
};

export default levelsReducer;
