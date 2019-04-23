import * as actionTypes from "../actions/types";

// for testing
import unlockedLevel from "../../assets/images/unlockedLevel.png";

const initialState = {
  levels: [
    {
      id: 1,
      name: "أساسيات الجزيرة",
      imageUrl: unlockedLevel,

      goals: `
      <p className="PiratesCode">
        <span className="textPirateBird"> صغير بس فنان </span>
      </p>`,

      goalsList: ["HTML", "Head", "Title", "Body"],

      tags: [
        { id: "html", content: "<html> </html>", tip: "الحاوية" },
        { id: "head", content: "<head> </head>", tip: "الرأس" },
        { id: "body", content: "<body> </body>", tip: "الجسم" },
        { id: "title", content: "<title> </title>", tip: "العنوان" }
      ],

      isAvailable: true,
      isPass: false
    },
    {
      id: 2,
      name: "العناوين الصارخة",
      imageUrl: unlockedLevel,

      goals: ``,

      goalsList: [],

      tags: [{ id: "p", content: "<p> </p>", tip: "الحاوية" }],
      isAvailable: false,
      isPass: false
    },
    {
      id: 3,
      name: "أدوات النجاة",
      imageUrl: unlockedLevel,

      goals: ``,

      goalsList: [],

      tags: [],
      isAvailable: false,
      isPass: false
    },
    {
      id: 4,
      name: "أوامر القبطان",
      imageUrl: unlockedLevel,

      goals: ``,

      goalsList: [],

      tags: [],
      isAvailable: false,
      isPass: false
    },
    {
      id: 5,
      name: "التجهيز للحرب",
      imageUrl: unlockedLevel,

      goals: ``,

      goalsList: [],

      tags: [],
      isAvailable: false,
      isPass: false
    }
  ],
  currentInstruction: [],
  currentGoals: ["testcurrentGoals"]
};

const levelsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_INSTRUCTION:
      return {
        ...state,
        currentInstruction: action.payload
      };
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
      let currentGoals = state.levels.find(lvl => lvl.id === +action.payload)
        .goals;
      return {
        ...state,
        currentGoals: currentGoals
      };

    case actionTypes.SET_LEVEL_GOALS:
      let { id, goals } = action.payload;
      let lvlObj = state.levels.find(lvl => lvl.id === +id);

      lvlObj.goals = goals;

      return {
        ...state,
        currentGoals: goals
      };

    case actionTypes.REST_LEVEL_GOALS:
      return {
        ...state,
        currentGoals: ""
      };

    default:
      return state;
  }
};

export default levelsReducer;
