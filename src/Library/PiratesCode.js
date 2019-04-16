class Block {
  constructor(children = []) {
    this.children = children;
  }
  compile() {
    console.log("Implement me!!");
  }
}

class PBlock extends Block {
  constructor(children) {
    super(children);
    this.name = "p";
  }

  compile() {
    let res = `<p>${this.children.map(child => child.compile()).join("")}</p>`;
    return res;
  }
}

class H1Block extends Block {
  constructor(children) {
    super(children);
    this.name = "h1";
  }

  compile() {
    let res = `<h1>${this.children
      .map(child => child.compile())
      .join("")}</h1>`;
    return res;
  }
}

class ImgBlock extends Block {
  constructor(children, attr = [{ src: "#" }, { alt: "sampleImage" }]) {
    super(children);
    this.name = "img";
    this.attr = attr;
  }
  compile() {
    return `<img ${this.attr
      .map(at => `${Object.keys(at)[0]}="${Object.values(at)[0]}" `)
      .join("")}/>`;
  }
}

class TextBlock extends Block {
  constructor(text = "Sample") {
    super([]);
    this.text = text;
  }

  compile() {
    return this.text;
  }
}

export { TextBlock, PBlock, H1Block, ImgBlock };
