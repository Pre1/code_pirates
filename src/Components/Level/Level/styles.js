import flat from "../../../assets/images/flat_chrome.png";
export const levelStyles = `
${
  "" /* the classes that has movement and animation can be handled here this is gonna be by getting these classes from the courseReducer */
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
`;
