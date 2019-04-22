import * as actionTypes from "../actions/types";

import unlockedLevel from "../../assets/images/unlockedLevel.png";

const initialState = {
  levels: [
    {
      id: 1,
      name: "أساسيات الجزيزة",
      imageUrl: unlockedLevel,
      goals: ["HTML", "Head", "Title", "Body"],
      tags: [
        {
          id: "html",
          content: "<html> </html>",
          tip: "HTML"
        },
        { id: "head", content: "<head> </head>", tip: "head" },
        { id: "title", content: "<title> </title>", tip: "title" },
        { id: "body", content: "<body> </body>", tip: "body" }
      ],
      content: "",
      isAvailable: true,
      isPass: false
    },
    {
      id: 2,
      name: "العناوين الصارخة",
      imageUrl: unlockedLevel,
      goals: ["h1", "h2", "h3", "h4", "h5", "h6"],
      tags: [
        { id: "h1", content: "<h1> </h1>", tip: "h1" },
        { id: "h2", content: "<h2> </h2>", tip: "h2" },
        { id: "h3", content: "<h3> </h3>", tip: "h3" },
        { id: "h4", content: "<h4> </h4>", tip: "h4" },
        { id: "h5", content: "<h5> </h5>", tip: "h5" },
        { id: "h6", content: "<h6> </h6>", tip: "h6" }
      ],
      content: "",
      isAvailable: false,
      isPass: false
    },
    {
      id: 3,
      name: "أدوات النجاة",
      imageUrl: unlockedLevel,
      goals: ["img"],
      tags: [{ id: "img", content: "<img />", tip: "img" }],
      content: "",
      isAvailable: false,
      isPass: false
    },
    {
      id: 4,
      name: "أوامر القبطان",
      imageUrl: unlockedLevel,
      goals: ["ol", "ul", "li"],
      tags: [
        { id: "ol", content: "<ol> </ol>", tip: "ol" },
        { id: "ul", content: "<ul> </ul>", tip: "ul" },
        { id: "li", content: "<li> </li>", tip: "li" }
      ],
      content: "",
      isAvailable: false,
      isPass: false
    },
    {
      id: 5,
      name: "التجهيز للحرب",
      imageUrl: unlockedLevel,
      goals: ["hr", "br", "em", "strong", "small"],
      tags: [
        { id: "hr", content: "<hr />", tip: "hr" },
        { id: "br", content: "<br />", tip: "br" },
        { id: "em", content: "<em> </em>", tip: "em" },
        { id: "strong", content: "<strong> </strong>", tip: "strong" },
        { id: "small", content: "<small> </small>", tip: "small" }
      ],
      content: "",
      isAvailable: false,
      isPass: false
    }
  ],

  currentGoals: ["testcurrentGoals"]
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

    default:
      return state;
  }
};

export default levelsReducer;
