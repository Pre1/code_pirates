import flat from "../../../assets/images/flat_chrome.png";

import island from "../../../assets/images/island.png";
import speach_bubble from "../../../assets/images/Speech_bubble.svg.png";
export const levelStyles = `
${
  "" /* the classes that has movement and animation can be handled here this is gonna be by getting these classes from the courseReducer */
}
.Tags{
  background-image:url(${speach_bubble});
  background-repeat:no-repeat;
  width: 100%;
  height: 100%;
}
.playTags {
  width: 100%;
  top: 60%;
  z-index: 20;
  position: absolute;
}
.levelEl {
  width: 100%;
  height: 100%;
}
.island {
  position: absolute;
  bottom: 5%;
  left: 10%;
}
.boy {
  position: absolute;
  left: 50%;
  bottom: 40%;
}
.bubble 
{
position: relative;
min-height: 100px;
max-width: 190px;
max-height: auto;

padding: 0px;
background: #FFFFFF;
-webkit-border-radius: 10px;
-moz-border-radius: 10px;
border-radius: 10px;
}

.bubble:after 
{
  content: '';
  position: absolute;
  border-style: solid;
  border-width: 13px 18px 13px 0;
  border-color: transparent #FFFFFF;
  display: block;
  width: 0;
  z-index: 1;
  left: -18px;
  top: 27px;
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
