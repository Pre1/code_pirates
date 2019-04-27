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
  left: 5%;
  bottom: 40%;
}

.PirateBubble 
{
position: relative;
width: 140px;
max-height: 35px;
min-height:35px
padding: 0px;
top:8%
right:33%;
background:rgba(255, 255, 255, 0.5);
-webkit-border-radius: 12px;
-moz-border-radius: 12px;
border-radius: 12px;
}

.PirateBubble:after 
{
content: '';
position: absolute;
border-style: solid;
border-width: 15px 0 5px 11px;
border-color: transparent rgba(255, 255, 255, 0.5);
display: block;
width: 0;
z-index: 1;
right: -11px;
top: 20%;
}


.secondLevelBody {
  background: rgb(66, 106, 123);
  height: 630px;

  background-size: 450px;
  animation: bg-move 5s ease-in infinite;
  .playTags {
    width: 100%;
    top: 60%;
    z-index: 20;
    position: absolute;
  }  
  .bubble 
    {
    position: relative;
    min-height: 70px;
    width:120px
    max-width: 180px;
    max-height: auto;
    right:35%;
    top:25%;

    padding: 0px;
    background: rgba(255, 255, 255, 0.5);
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
      border-color: transparent  rgba(255, 255, 255, 0.5);
      display: block;
      max-width: 0;
      z-index: 1;
      left: -18px;
      top: 29px;
    }
  


}

// .firstLevelHTML {
// width: 100%;
// height: 70px;
// background-image: url(${flat});
// background-repeat: no-repeat;
// }
.firstLevelHead {
  width: 100%;
height: 70px;
background-image: url(${flat});
background-repeat: no-repeat;
}
.firstLevelBody {
  background: #1c6588 url(${island}) repeat-x 15% -100px;
  height: 595px;
  background-size: 470px;
  -webkit-animation: bg-move 5s ease-in infinite;
}
.firstLevelTitle {
  width: 100px;
  padding-top:3%;
  margin-right:60%;

  color: balck;
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
.secondLevelH1{
  color:white;
}
.secondLevelH2{
  color:white;
}
.secondLevelH3{
  color:white;
}
`;
