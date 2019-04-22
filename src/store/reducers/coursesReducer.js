import * as actionTypes from "../actions/types";

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
      isPass: false,
      currentGoal: "",
      levels: [
        {
          id: 1,
          name: "أساسيات الجزيزة",
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
          content: `
          ## لماذا نتعلم HTML ؟
          
          HTML هي أساس كل لغات تطوير الويب، وبدونها لن نكون قادرين على التعامل مع النصوص والصور والفيديوهات على صفحات الويب. تعتبر HTML لغة وصفية لأنها تصف مكونات صفحات الويب عن طريق الوسوم Tags، وهي بداية كل شي تحتاج لتعلمه لتستطيع برمجة صفحات ويب جذابة.
          
          
          ## ماهي الوسوم Tags ؟
          
          الوسوم Tags هي مجموعة من العناصر يتم استخدامها لعرض محتوى الصفحة والتأثير عليه.
          
          
          ## الهيكل العام لصفحات الويب
          
          هكذا يبدو الهيكل العام لأي صفحة ويب على شبكة الانترنت.
          
          \`\`\`html
          <DOCTYPE html!>
          <html>
          
          <head>
          <title/>عنوان الصفحة<title>
          <head/>
          
          <body>
          <p/>أهلا وسهلا<p>
          <body/>
          
          <html/>
          \`\`\`
              
          - يقوم الوسم <DOCTYPE html!> بتعريف نوع الصفحة ليسهل على المتصفح عرض صفحات HTML عرضا صحيحا.
          - <html> </html> هو الوسم الرئيسي في كل صفحة ويب ويحتوي على جميع الوسوم Tags بداخله، بين بداية الوسم <html> ونهاية الوسم <html/>.
          - الوسم <head> </head> يحتوي على معلومات وتعاريف الصفحة كما يحتوي بداخله على الوسم <title> </title> والذي يمثل عنوان الصفحة الذي يتم عرضه في المتصفح.
          - الوسم <title> </title> يجب أن يكون مُضمّنا داخل وسم <head> </head>
          - الوسم <body> </body> يحتوي على كل العناصر المعروضة في الصفحة، ويجب إضافة كل الوسوم التي نرغب بعرضها في صفحة الويب داخل الوسم  كما فعلنا مع الوسم <p></p>
          `,
          isAvailable: true,
          isPass: false
        },
        {
          id: 2,
          name: "العناوين الصارخة",
          imageUrl: unlockedLevel,
          goals: ``,
          goalsList: [],
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
          goals: ``,
          goalsList: [],
          tags: [{ id: "img", content: "<img />", tip: "img" }],
          content: ``,
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
          content: ``,
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
