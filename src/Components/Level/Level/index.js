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
    await this.setState({
      buildingBlocks: this.props.buildingBlocks
    });

    this.setView();
  };

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
                <img src={island} width="390px" height="290px" />
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
          <div className="levelEl">{level()}</div>
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
