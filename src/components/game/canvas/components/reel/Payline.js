import { BlurFilter, Container, filters, Graphics } from "pixi.js";

export class Payline extends Container {
  resData;

  scaleFactor;
  constructor(reel, app) {
    super();
    this.reel = reel;
    this.app = app;
    app.stage.addChild(this);
    const aspectRatio = this.app.view.width / this.app.view.height;
    this.scaleFactor = this.calculateScaleFactor(aspectRatio);
    // this.init();
  }
  calculateScaleFactor(aspectRatio) {
    console.log(aspectRatio);

    if (aspectRatio <= 0.36) return aspectRatio * 1.24;
    if (aspectRatio > 0.36 && aspectRatio <= 0.4) return aspectRatio * 0.85;
    if (aspectRatio > 0.4 && aspectRatio <= 0.65) return aspectRatio * 0.85;
    if (aspectRatio > 0.65 && aspectRatio <= 0.8) return aspectRatio * 0.6;
    if (aspectRatio > 0.8 && aspectRatio <= 1) return aspectRatio * 0.5;
    if (aspectRatio > 1 && aspectRatio <= 1.5) return aspectRatio * 0.45;
    if (aspectRatio > 1.5 && aspectRatio <= 1.8) return aspectRatio * 0.3;
    if (aspectRatio > 1.8 && aspectRatio <= 2.1) return aspectRatio * 0.25;
    if (aspectRatio > 2.1 && aspectRatio <= 2.5) return aspectRatio * 0.6;
    return aspectRatio * 0.6;
  }
  init(res) {
    console.log("Payline initialized");
    this.resData = res;
    console.log(this.resData);
    // Define the mapping for idx to finalIdx
    const mapping = [5, 6, 7, 8, 9];

    // Example idx array
    console.log(this.resData.winCombo);
    const idx = this.resData.winCombo?.index;
    console.log(idx);
    const clrArr = {
      0.1: "0xf5edf6",
      1.4: "0x81fcce",
      3: "0x7594d7",
      5: "0xd56bfe",
      10: "0xfd5031",
      77: "0xffd372",
    };
    const color = clrArr[this.resData.winCombo?.multiplier];
    console.log("asdasdasD", color);
    // Map idx values to finalIdx using the mapping array
    const finalIdx = idx.map((i) =>
      i >= 0 && i < mapping.length ? mapping[i] : null
    );
    console.log(finalIdx);
    // Filter out any invalid indices and create circles
    finalIdx
      .filter((i) => i !== null)
      .forEach((i) => {
        this.createCircle(i, color, true);
      });
  }

  createCircle(i, color, animated = false) {
    // console.log("circle");
    let circleWidth;
    let radius;
    if (this.app.view.width >= 381 && this.app.view.width <= 819) {
      radius = this.reel.cellWidth * 0.25;
      circleWidth = 2.5;
    } else {
      radius = this.reel.cellWidth * 0.344;
      circleWidth = 5;
    }

    const cell = this.reel.cellContainer.children[i];
    const item = new Graphics();
    item.lineStyle(circleWidth, color, 1);
    item.drawCircle(0, 0, radius);

    if (this.app.view.width >= 381 && this.app.view.width <= 819) {
      item.height = this.reel.cellHeight * 0.8;
    } else {
      item.height = this.reel.cellHeight * 0.69;
    }

    item.position.set(cell.x, cell.y - this.reel.cellHeight / 2.8);

    // Add a blur filter
    const blurFilter = new BlurFilter();
    blurFilter.blur = 3; // Adjust blur intensity as needed
    item.filters = [blurFilter];

    // if (animated) {
    //   this.app.ticker.add(() => {
    //     if (item.scale.x < 1) {
    //       item.scale.x += 0.05;
    //       item.scale.y += 0.05;
    //     } else {
    //       this.app.ticker.remove(this);
    //     }
    //   });
    // }

    this.addChild(item);
  }
  reset() {
    this.removeChildren();
    // this.removeFromParent();
  }
  // clearCircle(i) {
  //   // const item = animatedCircles[i];
  //   // if (!item) return;
  //   // item.line.alpha = 0;
  //   // item.line.stop();
  //   // item.active = false;

  //   const item = this.reel.reels[i];
  //   if (!item) return;
  //   item.line.clear();
  //   item.active = false;
  // }

  // Function to reset the reel positions

  // createCircle = (i, color = 0xfe7945, animated = false) => {
  //   // const item = animatedCircles[i];
  //   // if (!item) return;
  //   // item.line.alpha = 1;
  //   // item.line.gotoAndPlay(0);
  //   // item.active = true;

  //   const item = circles[i];
  //   if (!item) return;
  //   item.line.lineStyle(circleWidth, color, 1);
  //   // const x = i * this.reelWidth + radius + xOffset;
  //   // const y = this.height / 2 + circleWidth * 2.7;
  //   // const x = this.reelWidth / 2;
  //   // const y = this.height / 2;

  //   const x = this.reelWidth - radius * 1.55;
  //   const y = this.height / 1.18 - radius * 2;

  //   if (animated) {
  //     item.line.scale.set(0.7);
  //   }

  //   item.line.arc(x, y, radius, 0, 2 * Math.PI);

  //   if (animated) {
  //     gsap.to(item.line, {
  //       pixi: { scale: 1 },
  //       duration: 0.4,
  //     });
  //   }
  //   // gsap scale to 1;

  //   // filter.blur = 2;
  //   // item.line.filters = [filter];

  //   item.active = true;
  // };
}
