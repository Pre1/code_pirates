import * as actionTypes from "../actions/types";

// for testing
import pirateBird from "../../assets/images/pirateBird.png";
import unlockedLevel from "../../assets/images/unlockedLevel.png";

const initialState = {
  levels: [
    {
      id: 1,
      name: "أساسيات اللغة",
      imageUrl: unlockedLevel,

      goals: [],

      isAvailable: true,
      isPass: false
    },
    {
      id: 2,
      name: "العناصر الرئيسية",
      imageUrl: unlockedLevel,

      goals: [],

      isAvailable: false,
      isPass: false
    },
    {
      id: 3,
      name: "الصور",
      imageUrl: unlockedLevel,

      goals: [],

      isAvailable: false,
      isPass: false
    },
    {
      id: 4,
      name: "العناوين",
      imageUrl: unlockedLevel,

      goals: [],

      isAvailable: false,
      isPass: false
    },
    {
      id: 5,
      name: "تنسيقات الكلام",
      imageUrl: unlockedLevel,

      goals: [],

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

      if (nexLvl.id) {
        nexLvl.isAvailable = true;
        newLevels.splice(nexLvl.id - 1, 1, nexLvl);
      }

      lvl.isPass = true;

      newLevels.splice(lvl.id - 1, 1, lvl);

      return {
        levels: newLevels
      };

    case actionTypes.GET_LEVEL_GOALS:
      return state.find(lvl => lvl.id === action.payload).goals;

    case actionTypes.SET_LEVEL_GOALS:
      let { id, goals } = action.payload;
      let lvlObj = state.find(lvl => lvl.id === id);

      lvlObj.goals = goals;

      // we don't want to trigger a re-render when we set
      // lvl goals the first time
      return lvlObj;

    default:
      return state;
  }
};

export default levelsReducer;
