import flat from "../../../assets/images/flat_chrome.png";

import island from "../../../assets/images/island.png";
export const levelStyles = `
${
  "" /* the classes that has movement and animation can be handled here this is gonna be by getting these classes from the courseReducer */
}
.secondLevelBody {
  background: #1c6588;
  height: 595px;
  background-size: 470px;
  animation: bg-move 5s ease-in infinite;
}
.firstLevel {
  background: red;
  height: 595px;

}
.firstLevelHTML {
width: 100%;
height: 70px;
background-image: url(${flat});
background-repeat: no-repeat;
}
.firstLevelHead {
  background: blue;
  width: 100px;
  height: 100px;
}
.firstLevelBody {
  background: green;
  width: 100px;
  height: 100px;
}
.firstLevelTitle {
  background: pink;
  width: 100px;
  color: yellow;
  height: 100px;
}
.secondLevelH1 {

}
.lastLevelP{
    left: 0;
    top: 0;
    color: pink;
}
@keyframes bg-move {
  0% {
    background-position: 100% -220px;
  }
  100% {
    background-position: -250% -220px;
  }
}
`;
