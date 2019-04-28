import React, { Component } from "react";
// import boat from "../assets/images/Pirate Ship.png";
import boat from "../assets/images/boat.png";

class Block {
  constructor(name, id, description = "") {
    this.description = description;
    this.id = id;
    this.name = name;
  }

  compile() {
    console.log("Implement me!!");
  }

  jsxCompile() {
    return this.compile();
  }

  instruct(tab = 0) {
    return "NOPE";
  }
}

class ChildBlock extends Block {
  constructor(name, id, description = "") {
    super(name, id, description);
  }
  children = [];

  // put inside library
  addChild = (blockID, newBlock) => {
    if (this.id === blockID) {
      // add to children
      this.children.push(newBlock);
      return this;
    } else if (this.children.length) {
      let i;
      let result = null;
      for (i = 0; result == null && i < this.children.length; i++) {
        result = this.children[i].addChild(blockID, newBlock);
      }
      return result;
    }
    return null;
  };

  deleteChild = blockID => {
    const blockObj = this.children.find(c => c.id === blockID);
    if (blockObj) {
      this.children.splice(this.children.indexOf(blockObj), 1);
      return this;
    } else if (this.children.length) {
      let i;
      let result = null;
      for (i = 0; result == null && i < this.children.length; i++) {
        result = this.children[i].deleteChild(blockID);
      }
      return result;
    }
    return null;
  };

  // move to lib
  changeText = (blockID, newText) => {
    if (this.id === blockID) {
      this.children.splice(
        this.children.indexOf(this.children.find(c => c.name === "text")),
        1,
        newText
      );
      return this;
    } else if (this.children.length) {
      let i;
      let result = null;
      for (i = 0; result == null && i < this.children.length; i++) {
        if (this.children[i].changeText) {
          result = this.children[i].changeText(blockID, newText);
        }
      }
      return result;
    }
    return null;
  };

  // instruct(tab = 0) {
  //   let tabLvl = [...Array(tab)].map(_ => "\t").join("");
  //   return (
  //     `\n${tabLvl}[[${this.name}]]` +
  //     this.children.map(elm => elm.instruct(tab + 1)).join("")
  //   );
  // }

  instruct() {
    return `"${this.name}":{${this.children
      .map(elm => elm.instruct())
      .join("")}},`;
  }

  compile(className = "PiratesCode", childClassNames) {
    const noNos = ["html", "head", "body", "title"];
    // let block;
    if (!noNos.includes(this.name)) {
      return `
      <${this.name} className="${className}">
          ${this.children
            .map(child =>
              child.compile(childClassNames[child.name], childClassNames)
            )
            .join("")}
      </${this.name}>`;
    } else {
      return `
      <div className="${className}">
          ${this.children
            .map(child =>
              child.compile(childClassNames[child.name], childClassNames)
            )
            .join("")}
      </div>`;
    }
  }

  jsxCompile(className = "PiratesCode", childClassNames) {
    const noNos = ["html", "head", "body", "title"];
    let block;
    if (!noNos.includes(this.name)) {
      block = React.createElement(
        `${this.name}`,
        { className: `${className}` },
        this.children.map(child =>
          child.jsxCompile(childClassNames[child.name], childClassNames)
        )
      );
    } else {
      block = React.createElement(
        `div`,
        { className: `${className}` },
        this.children.map(child =>
          child.jsxCompile(childClassNames[child.name], childClassNames)
        )
      );
    }
    return block;
  }
}

class ImgBlock extends Block {
  // TODO: put boat back
  constructor(
    jsxAttr = { src: `${boat}`, alt: "سفينة" },
    id,
    description = ""
  ) {
    super([], id, description);
    this.description = description;
    this.id = id;
    this.name = "img";
    this.jsxAttr = jsxAttr;
  }

  compile(className = "boat") {
    let attr = Object.entries(this.jsxAttr);

    let imgBlock = `
      <img className="${className}" 
      ${attr.map(([k, v]) => `${k}="${v}"`).join(" ")} 
      />`;

    console.log("====================");
    console.log("TCL: compile -> imgBlock", imgBlock);
    console.log("====================");

    return imgBlock;
  }

  jsxCompile(className = "boat") {
    return <img className={className} {...this.jsxAttr} />;
  }
}

class TextBlock extends Block {
  constructor(text = "ساعدوني", id, description) {
    super([], id, description);
    this.description = description;
    this.id = id;
    this.text = text;
    this.name = "text";
  }

  // instruct(tab = 0) {
  //   let tabLvl = [...Array(tab)].map(_ => "\t").join("");
  //   return `\n${tabLvl}[[Text]]`;
  // }

  instruct() {
    return `"${this.name}":{},`;
  }

  compile(className = "textPirateBird") {
    return `<span className="${className}"> ${this.text} </span>`;
  }

  jsxCompile(className = "textPirateBird", childClassNames) {
    return <span className={className}>{this.text}</span>;
  }
}

export { ChildBlock, TextBlock, ImgBlock };

// TextBlock,
// PBlock,
// H1Block,
// ImgBlock,
// HBlock,
// ListBlock,
// ListItemBlock,
// HTMLBlock,
// BodyBlock,
// TitleBlock,
// HeadBlock

//   class ListBlock extends Block {
//     constructor(children, id, ordered = false, description = "") {
//       super(children, id, description);
//       this.description = description;
//       this.id = id;
//       this.name = ordered ? "ol" : "ul";
//     }

//     compile(className = "ListPiratesCode") {
//       return `
//       <${this.name} className="${className}">
//       ${this.children.map(child => child.compile()).join("")}
//       </${this.name}>`;
//     }

//     jsxCompile(className = "ListPiratesCode") {
//       let list = React.createElement(
//         `${this.name}`,
//         { className: `${className}` },
//         this.children.map(child => child.jsxCompile())
//         );
//         return list;
//       }
//     }

//     class ListItemBlock extends Block {
//       constructor(children, id, key = "", description = "") {
//         super(children, id, description);
//         this.description = description;
//         this.id = id;
//         this.name = "li";
//         this.key = key;
//       }

//       compile(className = "ListItemPiratesCode") {
//         return `
//         <li className="${className}">
//         ${this.children.map(child => child.compile()).join("")}
//         </li>`;
//       }

//       jsxCompile(className = "ListItemPiratesCode") {
//         return (
//           <li className={className} key={this.key}>
//         {this.children.map(child => child.jsxCompile())}
//       </li>
//     );
//   }
// }

// class HTMLBlock extends Block {
//   constructor(children, id) {
//     super(children, id);
//     this.id = id;
//     this.name = `html`;
//   }

//   compile(className = "HTMLPiratesCode") {
//     return `
//     <div className="${className}">
//     ${this.children.map(child => child.compile()).join("")}
//     </div>`;
//   }

//   /******** added this ********/
//   nestedJsxCompile(className = "HTMLPiratesCode", childClassNames) {
//     return (
//       <div className={className}>
//         {this.children.map(child =>
//           child.nestedJsxCompile(childClassNames[child.name], childClassNames)
//         )}
//       </div>
//     );
//   }

//   jsxCompile(className = "HTMLPiratesCode") {
//     return (
//       <div className={className}>
//         {this.children.map(child => child.jsxCompile())}
//       </div>
//     );
//   }
// }

// class HeadBlock extends Block {
//   constructor(children, id) {
//     super(children, id);
//     this.description = "";
//     this.id = id;
//     this.name = `head`;
//   }

//   compile(className = "HeaderPiratesCode") {
//     return `
//     <div className="${className}">
//     ${this.children.map(child => child.compile()).join("")}
//     </div>`;
//   }

//   /******** added this ********/
//   nestedJsxCompile(className = "HeaderPiratesCode", childClassNames) {
//     return (
//       <div className={className}>
//         {this.children.map(child =>
//           child.nestedJsxCompile(childClassNames[child.name], childClassNames)
//         )}
//       </div>
//     );
//   }

//   jsxCompile(className = "HeaderPiratesCode") {
//     return (
//       <div className={className}>
//         {this.children.map(child => child.jsxCompile())}
//       </div>
//     );
//   }
// }

// class BodyBlock extends Block {
//   constructor(children, id) {
//     super(children, id);
//     this.description = "";
//     this.id = id;
//     this.name = `body`;
//   }

//   compile(className = "BodyPiratesCode") {
//     return `
//     <div className="${className}">
//     ${this.children.map(child => child.compile()).join("")}
//     </div>`;
//   }

//   /******** added this ********/
//   nestedJsxCompile(className = "BodyPiratesCode", childClassNames) {
//     return (
//       <div className={className}>
//         {this.children.map(child =>
//           child.nestedJsxCompile(childClassNames[child.name], childClassNames)
//         )}
//       </div>
//     );
//   }

//   jsxCompile(className = "BodyPiratesCode") {
//     return (
//       <div className={className}>
//         {this.children.map(child => child.jsxCompile())}
//       </div>
//     );
//   }
// }

// class TitleBlock extends Block {
//   constructor(children, id) {
//     super(children, id);
//     this.id = id;
//     this.name = `title`;
//   }

//   compile(className = "TitlePiratesCode") {
//     return `
//     <div className="${className}">
//     ${this.children.map(child => child.compile()).join("")}
//     </div>`;
//   }

//   /******** added this ********/
//   nestedJsxCompile(className = "TitlePiratesCode", childClassNames) {
//     return (
//       <div className={className}>
//         {this.children.map(child =>
//           child.nestedJsxCompile(childClassNames[child.name], childClassNames)
//         )}
//       </div>
//     );
//   }

//   jsxCompile(className = "TitlePiratesCode") {
//     return (
//       <div className={className}>
//         {this.children.map(child => child.jsxCompile())}
//       </div>
//     );
//   }
// }

// class PBlock extends Block {
//   constructor(children, id, description = "") {
//     super(children, id, description);
//     this.name = "p";
//     this.description = "";
//     this.id = id;
//   }

//   compile(className = "PiratesCode") {
//     return `
//       <p className="${className}">
//         ${this.children.map(child => child.compile()).join("")}
//       </p>`;
//   }

//   nestedJsxCompile(className = "PiratesCode", childClassNames) {
//     return (
//       <p className={className}>
//         {this.children.map(child =>
//           child.nestedJsxCompile(childClassNames[child.name], childClassNames)
//         )}
//       </p>
//     );
//   }

//   jsxCompile(className = "PPiratesCode") {
//     return (
//       <p className={className}>
//         {this.children.map(child => child.jsxCompile())}
//       </p>
//     );
//   }
// }

// class H1Block extends Block {
//   constructor(children, id, description = "") {
//     super(children, id, description);
//     this.name = "h1";
//     this.description = "";
//     this.id = id;
//   }

//   compile(className = "HPiratesCode") {
//     return `
//       <h1 className="${className}">
//           ${this.children.map(child => child.compile()).join("")}
//       </h1>`;
//   }

//   jsxCompile() {}
// }

// class HBlock extends Block {
//   constructor(children, id, lvl = 1, description = "") {
//     super(children, id, description);
//     this.description = "";
//     this.id = id;
//     this.lvl = lvl;
//     this.name = `h${this.lvl}`;
//   }

//   compile(className = "HeadPiratesCode") {
//     return `
//       <${this.name} className="${className}">
//         ${this.children.map(child => child.compile()).join("")}
//       </${this.name}>`;
//   }

//   // React.createElement(component, props, ...children)
//   jsxCompile(className = "HeadPiratesCode") {
//     let heading = React.createElement(
//       `${this.name}`,
//       { className: `${className}` },
//       this.children.map(child => child.jsxCompile())
//     );
//     return heading;
//   }
// }
