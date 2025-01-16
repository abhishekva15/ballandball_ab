/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import lerp from '../../helpers/lerp';
import * as PIXI from "pixi.js";
import gsap from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";
import { initDevtools } from "@pixi/devtools";
import eventEmitter from "../../../utility/eventEmiiter";
// import backout from "../../helpers/backout";
// import smoothStep from "../../helpers/easing";
// import coefficientFromResult from 'src/app/helpers/coefficientFromResult';
// import  from 'src/app/types';
// import timeout from 'src/common/helpers/timeout';
// import {
//     reels as textureStartConfig,
//     colorsCoefficients,
// } from 'src/app/constants/colors';
// import getBallPosition from "./helpers/getBallPosition";
function lerp(start, end, t) {
  return start * (1 - t) + end * t;
}
function backout(amount) {
  return (t) => --t * t * ((amount + 1) * t + amount) + 1;
}
const mix = (a, b, weightB, t) => (1 - weightB) * a + (1 - weightB) * b;

const crossfade = (a, b, t) => (1 - t) * a + t * b;

const smoothStart = (t) => t * t;
const smoothStop = (t) => 1 - (1 - t) * (1 - t);

const smoothStep = (t) => {
  const start1 = smoothStart(t);
  const stop1 = smoothStop(t);
  return crossfade(start1, stop1, t);
};
const reels = [
  [0, 6, 5, 1, 2, 3, 4],
  [0, 6, 1, 4, 5, 2, 3],
  [0, 6, 4, 3, 2, 1, 5],
  [0, 6, 3, 2, 4, 1, 5],
  [0, 6, 4, 5, 1, 3, 2],
];
const textureStartConfig = [
  [0, 6, 5, 1, 2, 3, 4],
  [0, 6, 1, 4, 5, 2, 3],
  [0, 6, 4, 3, 2, 1, 5],
  [0, 6, 3, 2, 4, 1, 5],
  [0, 6, 4, 5, 1, 3, 2],
];
const getBallPosition = (rowIndex, i) => {
  const row = reels[rowIndex];
  // const [first, second, third, ...rest] = row.slice().reverse();
  const [three, two, one, zero, six, five, four] = row;
  const trueRow = [zero, one, two, three, four, five, six];
  // const trueRow = [...rest, first, second, third];
  return trueRow.findIndex((index) => index === i);
};
gsap.registerPlugin(PixiPlugin);
PixiPlugin.registerPIXI(PIXI);

const imgPath = "/img";

// interface PixiAppProps {
//   w;
//   h;
//   ratio;
//   isMobile;
//   completeItemsCallback: (i) => void;
//   resetCompletedItemsCallback;
//   playAudio: (level: string) => void;
// }
// interface Reel {
//   container: PIXI.Container;
//   symbols: PIXI.Sprite[];
//   symbolsContainers: PIXI.Container[];
//   position;
//   previousPosition;
//   blur: PIXI.Filter;
// }
// interface Tween {
//   index;
//   object: Reel;
//   property: string;
//   startValue;
//   target;
//   easing: (t) => number;
//   time;
//   change;
//   complete: (() => void) | null;
//   start;
//   finishing;
//   spinRound;
//   speed;
// }

// interface Circle {
//   line: PIXI.Graphics;
//   active;
// }

export default class PixiApp {
  width;
  height;
  ratio;
  isMobile;
  symbolSize;
  symbolGap;
  symbolContainerHeight;
  reelWidth;
  symbolPositionHeight;
  app;
  play;
  //Results
  gameStarted;
  newPositions;
  currentPositions;
  completedItems;
  completeItemsCallback;
  resetCompletedItemsCallback;
  //Animations
  playing;
  currentCoefficient;
  spinIteration;
  //Sound
  playAudio;
  socket;
  constructor(props) {
    this.width = props.w;
    this.height = props.h;
    this.ratio = props.ratio;
    this.isMobile = props.isMobile;
    // console.log("sadasdasdasdas",this.isMobile);
    this.reelWidth = props.w / 5;
    this.symbolPositionHeight = props.h / 3;
    this.socket = props.socket.socket;
    this.betResultCounter = 0;
    this.socket.on("BET_RESULT", (data) => {
      console.log("pixi", data);
      this.betResultCounter++;

      // Log the counter value
      console.log(
        "BET_RESULT event triggered. Counter: " + this.betResultCounter
      );

      // sp.startPlay(data);
      this.newPositions = [];
      this.newPositions = data.reels[1];
      if (this.newPositions) {
        this.play();
      }
    });
    // console.log(this.socket.socket)
    this.app = new PIXI.Application({
      width: props.w,
      height: props.h,
      // backgroundAlpha: 0.1,
      autoDensity: true,
      resolution: 2,
      antialias: true,
    });
    window.__PIXI_APP__ = this.app;
    initDevtools(this.app);

    this.app.view.id = "game-canvas";
    this.init();
    //Results
    this.gameStarted = false;

    // 1: PIXI.Texture.from("basketball"),
    // 2: PIXI.Texture.from("football"),
    // 3: PIXI.Texture.from("pool"),
    // 4: PIXI.Texture.from("tennis"),
    // 5: PIXI.Texture.from("volleyball"),
    // 6: PIXI.Texture.from("baseball"),
    // 7: PIXI.Texture.from("bowling"),

    this.newPositions = [];
    this.currentPositions = [];
    this.completedItems = [];
    this.completeItemsCallback = props.completeItemsCallback;
    this.resetCompletedItemsCallback = props.resetCompletedItemsCallback;
    //Animations
    this.playing = [];
    this.currentCoefficient = 0;
    this.spinIteration = 0;
    //Sizes
    this.symbolSize = props.isMobile ? 37 : 90;
    this.symbolGap = props.isMobile ? 10 : 40;
    this.symbolContainerHeight = props.isMobile ? 50 : 124;
    this.playAudio = props.playAudio;
  }

  updateGame(positions) {
    this.newPositions = positions;
  }

  async init() {
    const assets = [
      { key: "basketball", path: `${imgPath}/basketball.png` },
      { key: "pool", path: `${imgPath}/pool.png` },
      { key: "football", path: `${imgPath}/football.png` },
      { key: "tennis", path: `${imgPath}/tennis.png` },
      { key: "volleyball", path: `${imgPath}/volleyball.png` },
      { key: "baseball", path: `${imgPath}/baseball.png` },
      { key: "bowling", path: `${imgPath}/bowling.png` },
      // Uncomment if circle asset is required
      // { key: "circle", path: `${imgPath}/circle/circle.json?v=1` },
    ];

    // Dynamically add assets to the PIXI.Assets loader
    assets.forEach((asset) =>
      PIXI.Assets.add({ alias: asset.key, src: asset.path })
    );

    try {
      // Load all assets and wait for completion
      await PIXI.Assets.load(assets.map((asset) => asset.key));
      this.onAssetsLoaded();
    } catch (error) {
      console.error("Asset loading error:", error);
    }
  }

  onAssetsLoaded() {
    const slotTextures = {
      0: PIXI.Texture.from("bowling"),
      1: PIXI.Texture.from("basketball"),
      2: PIXI.Texture.from("football"),
      3: PIXI.Texture.from("pool"),
      4: PIXI.Texture.from("tennis"),
      5: PIXI.Texture.from("volleyball"),
      6: PIXI.Texture.from("baseball"),
    };

    // Further code to use `slotTextures`...

    const topContainerOffset = -(this.symbolSize * 2 - this.symbolGap / 4);

    const circleBlur = new PIXI.BlurFilter();
    // circleBlur.blurX = 1.5;
    // circleBlur.blurY = 1.5;
    circleBlur.blurX = 1;
    circleBlur.blurY = 1;
    circleBlur.quality = 2;
    circleBlur.resolution = 5;
    const circleWidth = this.isMobile ? 1 : 2;
    const radiusOffset = this.isMobile ? 2.5 : 0;
    const radius = this.symbolSize / 2 + radiusOffset;
    const diameter = radius * 2;
    const xOffset = (this.reelWidth - diameter) / 2;

    const circlesContainer = new PIXI.Container();
    circlesContainer.height = this.height;
    circlesContainer.position.y = topContainerOffset;

    const circles = textureStartConfig.map((_, i) => {
      // const x = i * this.reelWidth + radius + xOffset;
      // const y = this.height / 2 + circleWidth * 2.7;

      const circle = new PIXI.Graphics();
      const circleContainer = new PIXI.Container();
      circleContainer.position.x =
        i * this.reelWidth + circleWidth * 2 + (this.isMobile ? 30.5 : 65.5);
      circleContainer.position.y =
        Math.abs(topContainerOffset) + (this.isMobile ? 64.5 : 137.5);
      circleContainer.height = this.height;
      circleContainer.width = this.reelWidth;

      // circle.lineStyle(circleWidth, 0xfd5031, 1);
      // const cx = this.reelWidth - radius * 1.55;
      // const cy = this.height / 1.18 - radius * 2;

      // circle.arc(cx, cy, radius, 0, 2 * Math.PI);
      circle.pivot.x = this.reelWidth / 2;
      circle.pivot.y = this.height / 2;
      // circle.scale.set(1);

      circle.filters = [circleBlur];
      circleContainer.addChild(circle);
      circlesContainer.addChild(circleContainer);

      return { line: circle, active: false };
    });

    const clearCircle = (i) => {
      // const item = animatedCircles[i];
      // if (!item) return;
      // item.line.alpha = 0;
      // item.line.stop();
      // item.active = false;

      const item = circles[i];
      if (!item) return;
      item.line.clear();
      item.active = false;
    };

    const createCircle = (i, color = 0xfe7945, animated = false) => {
      // const item = animatedCircles[i];
      // if (!item) return;
      // item.line.alpha = 1;
      // item.line.gotoAndPlay(0);
      // item.active = true;

      const item = circles[i];
      if (!item) return;
      item.line.lineStyle(circleWidth, color, 1);
      // const x = i * this.reelWidth + radius + xOffset;
      // const y = this.height / 2 + circleWidth * 2.7;
      // const x = this.reelWidth / 2;
      // const y = this.height / 2;

      const x = this.reelWidth - radius * 1.55;
      const y = this.height / 1.18 - radius * 2;

      if (animated) {
        item.line.scale.set(0.7);
      }

      item.line.arc(x, y, radius, 0, 2 * Math.PI);

      if (animated) {
        gsap.to(item.line, {
          pixi: { scale: 1 },
          duration: 0.4,
        });
      }
      // gsap scale to 1;

      // filter.blur = 2;
      // item.line.filters = [filter];

      item.active = true;
    };

    // const resources = this.app.loader.resources;
    // const circleSprite = resources['circle'].spritesheet;
    // const animation = circleSprite?.animations['Group'];

    // if (!animation) return;
    // const animatedCircles: AnimatedCircle[] = textureStartConfig.map(
    //     (_, i) => {
    //         const x = i * this.reelWidth + radius + xOffset;
    //         const y = this.height / 2 + circleWidth * 2.7;
    //         const circle = new PIXI.AnimatedSprite(animation);
    //         circle.alpha = 0;
    //         circle.loop = false;
    //         circle.position.x = x;
    //         circle.position.y = y;
    //         // this.startImg.position.x = 0;
    //         // this.startImg.position.y = this.h - 90;
    //         circle.scale.set(0.7);
    //         circle.animationSpeed = 0.79;

    //         // circle.filters = [circleBlur];
    //         circlesContainer.addChild(circle);
    //         return { line: circle, active: false };
    //     },
    // );

    this.app.stage.addChild(circlesContainer);
    // function groupSameValues(array[])[] {
    //   return array
    //     .reduce((acc[][], num) => {
    //       const index = acc.findIndex((arr) => arr[0] === num);
    //       if (index !== -1) {
    //         acc[index].push(num);
    //       } else {
    //         acc.push([num]);
    //       }
    //       return acc;
    //     }, [])
    //     .map((v) => v.length)
    //     .sort((a, b) => b - a);
    // }
    function groupSameValues(array) {
      return array
        .reduce((acc, num) => {
          const index = acc.findIndex((arr) => arr[0] === num);
          if (index !== -1) {
            acc[index].push(num);
          } else {
            acc.push([num]);
          }
          return acc;
        }, [])
        .map((group) => group.length)
        .sort((a, b) => b - a);
    }
    function timeout(seconds) {
      return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
    }
    function coefficientFromResult(result) {
      const coefficients = [77, 10, 5, 3, 1.4, 0.1, 0];

      const groups = groupSameValues(result);
      const [first, second] = groups;

      switch (true) {
        case first === 5:
          return coefficients[0];
        case first === 4:
          return coefficients[1];

        case first === 3 && second === 2:
          return coefficients[2];

        case first === 3:
          return coefficients[3];

        case first === 2 && second === 2:
          return coefficients[4];

        case first === 2:
          return coefficients[5];

        default:
          return coefficients[6];
      }
    }

    const checkActiveCircles = (completedItems, index) => {
      const colorsCoefficients = {
        "01": 0xf5edf6,
        14: 0x81fcce,
        3: 0x7594d7,
        5: 0xd56bfe,
        10: 0xfd5031,
        77: 0xffd372,
      };
      if (!index) return;
      const items = completedItems.map((index) => this.newPositions[index]);
      const coefficient = coefficientFromResult(items);
      const coeff = String(coefficient).replace(".", "");

      const color = colorsCoefficients[coeff];
      if (!color) return;

      const ball = this.newPositions[index];
      if (!ball) return;

      for (let i = items.length - 1; i >= 0; --i) {
        const prevBall = this.newPositions[i];
        if (prevBall === ball && i !== index) {
          createCircle(i, color, true);
          createCircle(index, color, true);
          this.playAudio(coeff);
        }
        circles.forEach((circle, j) => {
          if (!circle.active) return;
          clearCircle(j);
          createCircle(j, color, true);
        });
      }
    };

    const checkFinishedCircles = () => {
      circles.forEach(({ active }, index) => {
        if (!active) {
          const { container } = reels[index];
          gsap.to(container, {
            pixi: { alpha: 0.5 },
            duration: 0.2,
          });
        }
      });
    };
    const restoreReels = () => {
      reels.forEach(({ container }) => {
        // container.alpha = 1;
        gsap.to(container, {
          pixi: { alpha: 1 },
          duration: 0.2,
        });
      });
    };

    const reelContainer = new PIXI.Container();
    const reels = textureStartConfig.map((texturesIndexes, i) => {
      const blur = new PIXI.BlurFilter();
      blur.blurX = 0;
      blur.blurY = 0;
      blur.quality = 2;
      blur.resolution = 2;

      const container = new PIXI.Container();
      container.x = i * this.reelWidth;
      container.filters = [blur];
      reelContainer.addChild(container);

      const symbols = [];
      const symbolsContainers = texturesIndexes.map((textureIndex, j) => {
        const symbolContainer = new PIXI.Container();
        symbolContainer.height = this.symbolContainerHeight;
        symbolContainer.width = this.reelWidth;
        symbolContainer.x = 0;
        symbolContainer.y = j * this.symbolContainerHeight;
        const texture = slotTextures[textureIndex];
        const symbol = new PIXI.Sprite(texture);
        // console.log(this.symbolSize, this.symbolGap);

        // this.symbolSize = props.isMobile ? 37 : 90;
        // this.symbolGap = props.isMobile ? 10 : 40;
        symbol.width = symbol.height = this.symbolSize;
        // symbol.width = symbol.height = this.symbolSize;
        symbol.x = (this.reelWidth - symbol.width) / 2;
        symbol.y = 20;

        symbolContainer.addChild(symbol);
        symbols.push(symbol);

        container.addChild(symbolContainer);

        return symbolContainer;
      });
      // const position = 0;
      const position = i * 7;
      const reel = {
        container,
        symbolsContainers,
        symbols,
        position,
        previousPosition: 0,
        blur,
      };

      return reel;
    });

    this.app.stage.addChild(reelContainer);
    // const square = new PIXI.Graphics();

    // // Set the fill color and draw a square
    // square.beginFill(0xff0000); // Red color
    // square.drawRect(200, 100, 100, 100); // x, y, width, height
    // square.endFill();

    // // Position the square (optional)
    // square.x = 200;
    // square.y = 150;
    // square.interactive = true;
    // square.on("pointerdown", () => {
    //   console.log("hii");
    //   if (this.play) {
    //     this.play();
    //   }
    // });
    // // Add the square to the stage
    // this.app.stage.addChild(square);
    reelContainer.y = topContainerOffset;
    reelContainer.x = Math.round(this.app.screen.width - this.reelWidth * 5);

    const tweening = [];

    this.play = () => {
      if (this.gameStarted) return;
      this.gameStarted = true;
      restoreReels();

      this.playing = reels.map((reel, i) => {
        // console.log(i, reels.length - 1);
        // console.log( i == reels.length - 1 ? reelsComplete : null);

        clearCircle(i);
        tweening.push(reel);
        const extra = 0;
        // const target = reel.position + 10 + i * 7 + extra;
        // const time = 1000 + i * 600 + extra + 600;

        const target = reel.position + 6 + i * 2 + extra;
        const time = 1000 + i * 300 + extra;
        const complete = i === reels.length - 1 ? reelsComplete : null;
        const speed = time / (target - reel.position);
        return {
          index: i,
          object: reel,
          property: "position",
          startValue: reel.position,
          target,
          time,
          complete,
          easing: backout(0.5),
          // easing: (t) => 1 - (1 - t) * (1 - t),
          // easing: (t) => t,
          start: Date.now(),
          finishing: false,
          spinRound: 0,
          speed,
        };
      });
    };

    const reelsComplete = async () => {
     
      this.spinIteration = 0;
      this.gameStarted = false;
      this.currentPositions = this.newPositions;
      checkFinishedCircles();
      await timeout(1);
      this.newPositions = [];
      this.completedItems = [];
      setTimeout(()=>{
        eventEmitter.emit("reelComplete", () => {
          const reelComplete = true;
          return reelComplete;
        });
      },1200)
   
      // this.resetCompletedItemsCallback();
    };

    const updateOnTick = (delta) => {
      positionsWatch();
      //Watch playing
      animateWatch();
    };

    const positionsWatch = () => {
      // const now = Date.now();
      for (let i = 0; i < reels.length; i++) {
        const reel = reels[i];
        const { symbolsContainers } = reel;
        // Update blur filter y amount based on speed.
        // This would be better if calculated with time in mind also. Now blur depends on frame rate.
        // const phase = Math.min(1, (now - start) / time);
        //@ts-ignore.
        reel.blur.blurY = (reel.position - reel.previousPosition) * 8;
        reel.previousPosition = reel.position;
        // // Update symbol positions on reel.
        for (let j = 0; j < symbolsContainers.length; j++) {
          const symbolContainer = symbolsContainers[j];
          symbolContainer.y =
            ((reel.position + j) % symbolsContainers.length) *
              this.symbolContainerHeight -
            this.symbolContainerHeight;
        }
      }
    };

    const animateWatch = () => {
      if (!this.playing.length) return;

      const now = Date.now();

      this.playing = this.playing
        .map((tween) => {
          if (!tween) return null;
          const {
            index,
            start,
            startValue,
            time,
            object,
            target,
            easing,
            // change,
            complete,
            finishing,
            spinRound,
            speed,
          } = tween;

          const phase = Math.min(1, (now - start) / time);

          const lPos = lerp(startValue, target, smoothStep(phase));
          object.position = lPos;

          const upSpin = () => {
            const extraSpin = 1;
            tween.spinRound = spinRound + 1;
            const newTime = time + speed * extraSpin;
            const newTarget = target + extraSpin;
            tween.target = newTarget;
            tween.time = newTime;
          };

          switch (true) {
            case spinRound !== this.spinIteration: {
              upSpin();
              break;
            }
            case !this.newPositions.length: {
              if (phase >= 0.7) {
                upSpin();
                this.spinIteration++;
              }
              break;
            }
            case !finishing: {
              const pos = this.newPositions[index];
              const endPos = getBallPosition(index, pos);
              // console.log(endPos);

              const diff = target % textureStartConfig[0].length;
              const trueDiff =
                textureStartConfig[0].length -
                diff +
                textureStartConfig[0].length * Math.round(index / 2);

              const truePos = target + trueDiff + endPos;
              const extraTime = ((trueDiff + endPos) * time) / target;
              tween.target = truePos;
              tween.finishing = true;
              tween.time = time;
              // tween.time = time + extraTime;
              // tween.time = extraTime;
              break;
            }
            default: {
              break;
            }
          }
          if (phase === 1) {
            updateCompletedItems(index);
            object.position = target;
            if (complete) complete();
            return null;
          }
          return tween;
        })
        .filter(Boolean);
    };

    const updateCompletedItems = (item) => {
      const items = [...this.completedItems, item];
      this.completedItems = items;
      checkActiveCircles(items, item);
      this.completeItemsCallback(item);
    };

    this.app.ticker.add(updateOnTick);
  }
}
