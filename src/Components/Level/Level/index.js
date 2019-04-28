import React, { Component } from "react";

import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";
import styled from "styled-components";
import island from "../../../assets/images/island.png";
import pirate from "../../../assets/images/Pirate 2.png";
import * as styles from "./styles";
import * as Blocks from "../../../Library/PiratesCode";

import boat from "../../../assets/images/Pirate Ship.png";

class Level extends Component {
  state = {
    /***** to be removed ******/
    active: "",
    head: "",
    title: "",
    /***** ************** *****/

    // comes as props
    buildingBlocks: [],
    isPass: this.props.level.isPass,
    help: "",
    say: [
      "أعتقد أن هناك شخص ما؟",
      "أسمع صوتاً!!!",
      "ماهذا الصوت!!!",
      "أعتقد أنني أتخيل",
      "هل هناااااك احددددددد؟"
    ],

    // comes from the backend i added expected to tell us what type of tag we're expecting
    // instructions: [
    //LEVEL ONE
    // { content: ["ضع <html> في منطقة البناء"], expected: "[[html]]" },
    // { content: ["ضع <head> في <html>"], expected: "[[html]][[head]]" },
    // { content: ["ضع <body> في <html>"], expected: { "html": { "head": {}, "body": {} } } },
    // { content: ["ضع <title> في <head>"], expected: "title",
    // { content: [" لقد فزت!!"], expected: null }
    //LEVEL TWO
    // { content: ["ضع <h6> في منطقة البناء"], expected: "h6" },
    // { content: ["ضع <h5> لمساعدة القرصان في النداء "], expected: "h5" },
    // { content: ["ضع <h4> ليرتفع صوته"], expected: "h4" },
    // { content: ["ضع <h3> ليرتفع صوته "], expected: "h3" },
    // { content: ["ضع <h2> ليرتفع صوته "], expected: "h2" },
    // { content: ["ضع <h1> ليرتفع صوته "], expected: "h1" },
    // { content: [" لقد فزت!!"], expected: null }
    // ],
    // currentInstruction: [],
    // userSteps: [],
    //LEVEL ONE
    // expectedSteps: ["html", "head", "body", "title"]

    //LEVELTWO
    expectedSteps: ["h6", "h5", "h4", "h3", "h2", "h1"]
  };

  // loops over tags then loops over BBs calls setTags then sends the returned obj to makeChanges
  setView = () => {
    const BB = new Blocks.ChildBlock("building", "building");
    BB.children = this.props.buildingBlocks;
    this.props.tags.forEach(tag => {
      let block;
      block = this.props.setTag(BB, tag.id);
      if (block) {
        let say = this.state.say.getRandom();
        this.setState({ help: [say] });
        this.props.addInstruction(block);
      }
    });
  };

  componentDidMount = async () => {
    // const instructions = this.props.level.instructions;
    // console.log("instructions ", instructions);
    await this.setState({
      buildingBlocks: this.props.buildingBlocks
      // instructions: instructions,
      // currentInstruction: instructions[0]
    });

    // this.props.onSetInstruction(instructions[0].content);
    // console.log("instruct", instructions[0].content);

    // const levelJSX = new Blocks.ChildBlock("level", "level");
    // let list = [
    //   { name: "img", className: "boat", children: [] },
    //   {
    //     name: "div",
    //     className: "PirateBubble",
    //     children: [
    //       {
    //         name: "h6",
    //         className: "text-dark",
    //         children: [{ name: "text", text: "", children: [] }]
    //       }
    //     ]
    //   },
    //   {
    //     name: "div",
    //     className: "",
    //     children: [
    //       { name: "img-1", className: "", children: [] },
    //       { name: "img-2", className: "", children: [] }
    //     ]
    //   }
    // ];
    // list.map((el, index) =>
    //   levelJSX.addChild(
    //     levelJSX.id,
    //     new Blocks.ChildBlock(el.name, `${el.name}-${index}`)
    //   )
    // );

    /********* @ abdullah here ********/
    // const levelDisgn = this.props.level.LevelContainer;
    // let parse = new DOMParser();
    // let objj = parse.parseFromString(levelDisgn, "text/html");
    // let bb = objj.body;
    // console.log("anas obj ", bb.children);
    // let obj = new Blocks.ChildBlock("body", "body");
    // let resultBlock = this.turnHTMLIntoBlock(obj, bb, null);

    // console.log("anas ", resultBlock);
    /********* @ abdullah here ********/

    this.setView();
  };

  /********* @ abdullah here ********/
  // turnHTMLIntoBlock = (obj, DOMobj, block) => {
  //   if (block) {
  //     obj.addChild(
  //       block.id,
  //       new Blocks.ChildBlock(DOMobj.localName, DOMobj.localName)
  //     );
  //   }
  //   block = new Blocks.ChildBlock(DOMobj.localName, DOMobj.localName);

  //   if (DOMobj.childElementCount === 0) {
  //     // add to children
  //     return obj;
  //   } else if (DOMobj.childElementCount > 0) {
  //     let i;
  //     let result = null;
  //     for (i = 0; result == null && i < DOMobj.children.length; i++) {
  //       result = this.turnHTMLIntoBlock(obj, DOMobj.children[i], block);
  //     }
  //     return result;
  //   }
  //   return null;
  // };
  /********* @ abdullah here ********/

  componentDidUpdate = prevProps => {
    if (prevProps.buildingBlocks !== this.props.buildingBlocks) {
      this.setState({
        buildingBlocks: this.props.buildingBlocks
      });
      // if(this.props.buildingBlocks)
      this.setView();
    }
  };

  render() {
    const Container = styled.div`
      ${styles.levelStyles}
    `;
    const level = () => {
      switch (this.props.level.id) {
        case 1:
          return;
        case 2:
          return (
            <div>
              <img className="boat" src={boat} />
              <div className="PirateBubble">
                <h6 className="text-dark">{this.state.help}</h6>
              </div>
              <div className="island">
                <img
                  className="boy"
                  src={pirate}
                  width="150px"
                  height="150px"
                />
                <img src={island} width="360px" height="180px" />
              </div>
            </div>
          );
        default:
          return;
      }
    };
    // const
    return (
      <Container>
        <div className={this.props.level.classNameForBody}>
          <div className="playTags">
            {" "}
            <div className="bubble">
              {this.props.level.classNameForTag &&
                this.props.buildingBlocks.map(bb =>
                  bb.jsxCompile(
                    this.props.level.classNameForTag[bb.name],
                    this.props.level.classNameForTag
                  )
                )}
            </div>{" "}
          </div>
          <div className="levelEl">{level()}</div>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    // buildingBlocks: state.mainReducer.buildingBlocks
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSetInstruction: instruction =>
      dispatch(actionCreators.setLevelInstruction(instruction))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Level);
