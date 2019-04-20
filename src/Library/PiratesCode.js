import React, { Component } from "react";
import boat from "../assets/images/Pirate Ship.png";
// import boat from "../assets/images/boat.png";

class Block {
  constructor(children = []) {
    this.children = children;
  }
  compile() {
    console.log("Implement me!!");
  }

  jsxCompile() {
    return this.compile();
  }
}

class PBlock extends Block {
  constructor(children) {
    super(children);
    this.name = "p";
  }

  compile(className = "PiratesCode") {
    return `
      <p className=${className}>
        ${this.children.map(child => child.compile()).join("")}
      </p>`;
  }

  jsxCompile(className = "PPiratesCode") {
    return (
      <p className={className}>
        {this.children.map(child => child.jsxCompile())}
      </p>
    );
  }
}

class H1Block extends Block {
  constructor(children) {
    super(children);
    this.name = "h1";
  }

  compile(className = "HeadPiratesCode") {
    return `
      <h1 className=${className}>
          ${this.children.map(child => child.compile()).join("")}
      </h1>`;
  }

  jsxCompile() {}
}

class HBlock extends Block {
  constructor(children, lvl = 1) {
    super(children);
    this.lvl = lvl;
    this.name = `h${this.lvl}`;
  }

  compile(className = "HeadPiratesCode") {
    return `
      <${this.name} className=${className}>
        ${this.children.map(child => child.compile()).join("")}
      </${this.name}>`;
  }

  // React.createElement(component, props, ...children)
  jsxCompile(className = "HeadPiratesCode") {
    let heading = React.createElement(
      `${this.name}`,
      { className: `${className}` },
      `${this.children.map(child => child.jsxCompile())}`
    );
    return heading;
  }
}

class ImgBlock extends Block {
  constructor(jsxAttr = { src: `${boat}`, alt: "سفينة" }) {
    super([]);
    this.name = "img";
    this.jsxAttr = jsxAttr;
  }

  compile(className = "boat") {
    let attr = Object.entries(this.jsxAttr);

    let imgBlock = `
    <img className=${className} 
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
  constructor(text = "Sample") {
    super([]);
    this.text = text;
    this.name = "text";
  }

  compile() {
    return this.text;
  }

  jsxCompile() {
    return this.compile();
  }
}

class ListBlock extends Block {
  constructor(children, ordered = false) {
    super(children);
    this.name = ordered ? "ol" : "ul";
  }

  compile(className = "ListPiratesCode") {
    return `
      <${this.name} className=${className}>
          ${this.children.map(child => child.compile()).join("")}
      </${this.name}>`;
  }

  jsxCompile(className = "ListPiratesCode") {
    let list = React.createElement(
      `${this.name}`,
      { className: `${className}` },
      this.children.map(child => child.jsxCompile())
    );
    return list;
  }
}

class ListItemBlock extends Block {
  constructor(children, key = "") {
    super(children);
    this.name = "li";
    this.key = key;
  }

  compile(className = "ListItemPiratesCode") {
    return `
      <li className=${className}>
          ${this.children.map(child => child.compile()).join("")}
      </li>`;
  }

  jsxCompile(className = "ListItemPiratesCode") {
    return (
      <li className={className} key={this.key}>
        {this.children.map(child => child.jsxCompile())}
      </li>
    );
  }
}
export {
  TextBlock,
  PBlock,
  H1Block,
  ImgBlock,
  HBlock,
  ListBlock,
  ListItemBlock
};
