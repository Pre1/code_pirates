import * as actionTypes from "../actions/types";

// for testing
import pirateBird from "../../assets/images/pirateBird.png";
import unlockedLevel from "../../assets/images/unlockedLevel.png";

const initialState = {
  levels: [
    {
      id: 1,
      name: "أساسيات الجزيزة",
      imageUrl: unlockedLevel,
      isAvailable: true,
      isPass: false
    },
    {
      id: 2,
      name: "العناوين الصارخة",
      imageUrl: unlockedLevel,
      isAvailable: false,
      isPass: false
    },
    {
      id: 3,
      name: "أدوات النجاة",
      imageUrl: unlockedLevel,
      isAvailable: false,
      isPass: false
    },
    {
      id: 4,
      name: "أوامر القبطان",
      imageUrl: unlockedLevel,
      isAvailable: false,
      isPass: false
    },
    {
      id: 5,
      name: "التجهيز للحرب",
      imageUrl: unlockedLevel,
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
    default:
      return state;
  }
};

export default levelsReducer;
