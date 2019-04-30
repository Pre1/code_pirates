import * as actionTypes from "../actions/types";

// Content
import * as content from "../../Components/Level/CoursesContent/contentData.js";

// Images
import barrel from "../../assets/images/barrel.png";
import unlockedLevel from "../../assets/images/unlockedLevel.png";

const initialState = {
  courses: [
    {
      id: 1,
      name: "</ جـز يـرة HTML >",
      imageUrl: barrel,
      titleColor: "#ea6228",
      isAvailable: true,
      isPass: true,
      currentGoal: "",
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

          /*******IMPORTANT CHANGE*******/
          classNameForBody: "firstLevel",
          classNameForTag: {
            html: "firstLevelHTML",
            head: "firstLevelHead",
            body: "firstLevelBody",
            title: "firstLevelTitle"
          },
          /******************************/
          tags: [
            { id: "html", content: "<html> </html>", tip: "الحاوية" },
            { id: "head", content: "<head> </head>", tip: "الرأس" },
            { id: "body", content: "<body> </body>", tip: "الجسم" },
            { id: "title", content: "<title> </title>", tip: "العنوان" }
          ],
          content: content.mdContentOne,
          isAvailable: true,
          isPass: false,
          // instructions: [
          //   { content: ["ضع <html> في منطقة البناء"], expected: "html" },
          //   { content: ["ضع <head> في <html>"], expected: "head" },
          //   { content: ["ضع <body> في <html>"], expected: "body" },
          //   { content: ["ضع <title> في <head>"], expected: "title" },
          //   { content: [" لقد فزت!!"], expected: "end" }
          // ],
          instructions: [
            {
              content: ["ضع <html> في منطقة البناء"],
              expected: '"html":{},'
            },
            {
              content: ["ضع <head> في <html>"],
              expected: '"html":{"head":{},},'
            },
            {
              content: ["ضع <body> في <html>"],
              expected: '"html":{"head":{},"body":{},},'
            },
            {
              content: ["ضع <title> في <head>"],
              expected: '"html":{"head":{"title":{"text":{},},},"body":{},},'
            },
            { content: [" لقد فزت!!"], expected: "end" }
          ]
        },
        {
          id: 2,
          name: "العناوين الصارخة",
          imageUrl: unlockedLevel,
          goals: ``,
          goalsList: [],
          classNameForBody: "secondLevelBody",
          LevelContainer: `<div className="levelEl">
          <img className="boat" src={boat} alt="boat" />
          <div className="PirateBubble">
            <h6 className="text-dark">{this.state.help}</h6>
          </div>
          <div className="island">
            <img className="boy" src={pirate} width="150px" height="150px" alt="pirate" />
            <img src={island} width="360px" height="180px" alt="island"  />
          </div>
          </div>

        `,
          classNameForTag: {
            h1: "secondLevelH1",
            h2: "secondLevelH2",
            h3: "secondLevelH3",
            h4: "secondLevelH4",
            h5: "secondLevelH5",
            h6: "secondLevelH6",
            boat: "second"
          },
          tags: [
            { id: "h1", content: "<h1> </h1>", tip: "العنوان ١" },
            { id: "h2", content: "<h2> </h2>", tip: "العنوان ٢" },
            { id: "h3", content: "<h3> </h3>", tip: "العنوان ٣" },
            { id: "h4", content: "<h4> </h4>", tip: "العنوان ٤" },
            { id: "h5", content: "<h5> </h5>", tip: "العنوان ٥" },
            { id: "h6", content: "<h6> </h6>", tip: "العنوان ٦" }
          ],

          content: content.mdContentTwo,
          isAvailable: false,
          isPass: false,
          instructions: [
            {
              content: ["ضع <h6> في منطقة البناء"],
              expected: '"h6":{"text":{},},'
            },
            {
              content: ["ضع <h5> لمساعدة القرصان في النداء "],
              expected: '"h6":{"text":{},},"h5":{"text":{},},'
            },
            {
              content: ["ضع <h4> ليرتفع صوته"],
              expected: '"h6":{"text":{},},"h5":{"text":{},},"h4":{"text":{},},'
            },
            {
              content: ["ضع <h3> ليرتفع صوته "],
              expected:
                '"h6":{"text":{},},"h5":{"text":{},},"h4":{"text":{},},"h3":{"text":{},},'
            },
            {
              content: ["ضع <h2> ليرتفع صوته "],
              expected:
                '"h6":{"text":{},},"h5":{"text":{},},"h4":{"text":{},},"h3":{"text":{},},"h2":{"text":{},},'
            },
            {
              content: ["ضع <h1> ليرتفع صوته "],
              expected:
                '"h6":{"text":{},},"h5":{"text":{},},"h4":{"text":{},},"h3":{"text":{},},"h2":{"text":{},},"h1":{"text":{},},'
            },
            { content: [" لقد فزت!!"], expected: "end" }
          ]
        },
        {
          id: 3,
          name: "أدوات النجاة",
          imageUrl: unlockedLevel,
          goals: ``,
          goalsList: [],
          classNameForTag: {
            img: "thirdLevelImage",
            imgMove: "thirdLevelImageMove"
          },
          tags: [{ id: "img", content: "<img />", tip: "img" }],

          content: content.mdContentThree,
          isAvailable: false,
          isPass: false,
          instructions: [
            {
              content: [""],
              expected: ""
            }
          ]
        },
        {
          id: 4,
          name: "أوامر القبطان",
          imageUrl: unlockedLevel,
          goals: ["ol", "ul", "li"],
          classNameForTag: {
            ol: "FourthLevelOl",
            ul: "FourthLevelUl",
            li: "FourthLevelLi"
          },
          tags: [
            { id: "ol", content: "<ol> </ol>", tip: "ol" },
            { id: "ul", content: "<ul> </ul>", tip: "ul" },
            { id: "li", content: "<li> </li>", tip: "li" }
          ],
          content: ``,
          isAvailable: false,
          isPass: false,
          instructions: [
            {
              content: [""],
              expected: ""
            }
          ]
        },
        {
          id: 5,
          name: "التجهيز للحرب",
          imageUrl: unlockedLevel,
          goals: ["hr", "br", "em", "strong", "small"],
          classNameForTag: {
            HR: "FifthLevelHR",
            BR: "FifthLevelBR",
            EM: "FifthLevelEM",
            Strong: "FifthLevelStrong",
            Small: "FifthLevelSmall"
          },
          tags: [
            { id: "hr", content: "<hr />", tip: "hr" },
            { id: "br", content: "<br />", tip: "br" },
            { id: "em", content: "<em> </em>", tip: "em" },
            { id: "strong", content: "<strong> </strong>", tip: "strong" },
            { id: "small", content: "<small> </small>", tip: "small" }
          ],
          content: ``,
          isAvailable: false,
          isPass: false,
          instructions: [
            {
              content: [""],
              expected: ""
            }
          ]
        }
      ]
    },
    {
      id: 2,
      name: "</ جـز يـرة CSS >",
      imageUrl: barrel,
      titleColor: "#29a4d9",
      isAvailable: false,
      isPass: false,
      currentGoal: "",
      levels: []
    },
    {
      id: 3,
      name: "</ جـز يـرة JavaScript >",
      imageUrl: barrel,
      titleColor: "#f6d43c",
      isAvailable: false,
      isPass: false,
      currentGoal: "",
      levels: []
    }
  ]
};

const coursesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FINISH_LVL:
      let newLevels = state.courses
        .find(course => course.id === +action.payload.courseId)
        .levels.slice();

      let lvl = {
        ...newLevels.find(obj => obj.id === +action.payload.levelId)
      };
      let nexLvl = {
        ...newLevels.find(obj => obj.id === +action.payload.levelId + 1)
      };

      if (nexLvl.id) {
        nexLvl.isAvailable = true;
        newLevels.splice(nexLvl.id - 1, 1, nexLvl);
      }

      lvl.isPass = true;

      newLevels.splice(lvl.id - 1, 1, lvl);

      let newCourses = state.courses.slice();
      let newCourse = newCourses.find(
        course => course.id === +action.payload.courseId
      );
      newCourse.levels = newLevels;
      newCourses.splice(newCourses.indexOf(newCourses), 1, newCourse);
      return {
        courses: newCourses
      };

    case actionTypes.GET_LEVEL_GOALS:
      let currentCourse = state.courses.find(
        course => course.id === +action.payload.courseId
      );
      console.log(
        "Ayman: coursesReducer => GET_LEVEL_GOALS case => currentCourse",
        currentCourse
      );
      return {
        ...state,
        currentGoals: currentCourse
      };

    case actionTypes.SET_LEVEL_GOALS:
      let { id, goals } = action.payload;
      let lvlObj = state.levels.find(lvl => lvl.id === +id);

      lvlObj.goals = goals;

      return {
        ...state,
        currentGoals: goals
      };

    case actionTypes.SET_INSTRUCTION:
      return {
        ...state,
        currentInstruction: action.payload
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

export default coursesReducer;
