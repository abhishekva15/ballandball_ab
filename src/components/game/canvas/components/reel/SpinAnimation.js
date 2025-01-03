// import { Reel } from "./Reel";
// import { app } from "../../game";
// import { PayLines } from "./PayLines";
// import SoundManager from "../../utils/SoundManager";

import { Sprite } from "pixi.js";
import eventEmitter from "../../../../../utility/eventEmiiter";

// import { PayLinesAnimation } from "./PayLinesAnimation"; // Assuming you have a PayLinesAnimation class

export class SpinAnimation {
  reel;
  running;
  tweening = [];
  symbols;
  spinStop;
  winContainer;
  soundManager;
  app;
  res;
  payLines;
  constructor(reel, app, pl) {
    this.app = app;
    this.reel = reel;
    this.payLines = pl;

    // console.log(this.payLines)
    // this.spinStop = onComplete;
    // this.winContainer = winComplete;
    // this.payLines = new PayLines(reel);
    // this.soundManager = new SoundManager();

    // this.app = app;
    // this.payLinesAnimation = payLinesAnimation;
    // this.reel.introIcons();

    // Create sprites and assign names
    const imageKeys = {
      0: Object.assign(Sprite.from("baseball.png")),
      1: Object.assign(Sprite.from("basketball.png")),
      2: Object.assign(Sprite.from("bowling.png")),
      3: Object.assign(Sprite.from("football.png")),
      4: Object.assign(Sprite.from("pool.png")),
      5: Object.assign(Sprite.from("tennis.png")),
      6: Object.assign(Sprite.from("volleyball.png")),
    };
    this.symbols = imageKeys;
    console.log("asdasdasdasda", this.symbols);
    // this.symbols = this.reel.symbols;

    this.running = false;
  }

  // Function to reset the reel positions
  reset() {
    console.log("reset");
    for (let i = 0; i < this.reel.reels.length; i++) {
      const r = this.reel.reels[i];
      console.log(r);
      // r.distroy();
      r.position = 0;
    }
  }

  reelsComplete() {
    // this.reel.addChild(this.payLines.getContainer());
    console.log(this.res);
    console.log("All reels have stopped!");
    eventEmitter.emit("reelComplete", () => {
      const reelComplete = true;
      return reelComplete
    });
    this.running = false; // Mark that spinning has stopped
    this.reset();
    if (this.res.win) {
      // this.reel.updateGameStatus("WIN");

      console.log("start");
      // console.log(this.paylines);
      this.payLines.init(this.res);

      // this.winContainer();

      // this.payLines.isLooping = true
      // this.payLines.startLooping();
      // this.payLines.highlightLines();
    } else {
      // this.reel.updateGameStatus("IDLE");
    }
    // this.spinStop();
  }

  // Tweening function for animation
  tweenTo(object, property, target, time, easing, onchange, oncomplete) {
    const tween = {
      object,
      property,
      propertyBeginValue: object[property],
      target,
      easing,
      time,
      change: onchange,
      complete: oncomplete,
      start: Date.now(),
    };

    this.tweening.push(tween);
    return tween;
  }

  onupdate() {
    console.log("onupdate");
  }

  async startPlay(data) {
    this.payLines.reset();
    console.log("start");
    this.res = data;
    // this.reel.socket.emit("BET_RESULT", (data) => {
    //   console.log(data);
    //   this.reel.getResData(data);
    // });
    if (this.running) return;

    this.running = true;
    //   console.log(this.reels);
    // console.log(data.reels);
    // this.data = [
    //   [1, 1, 1, 1, 1],
    //   [1, 1, 1, 1, 1],
    //   [5, 3, 6, 3, 6],
    //   [1, 1, 1, 1, 1],
    //   [1, 1, 1, 1, 1],
    // ];
    this.data = await data.reels;
    // console.log(this.data);

    // Ensure symbols are loaded before mapping data to outcome

    // Type assertion added to ensure TypeScript recognizes `symbolIndex` as a number
    this.outcome = this.data.map((row) =>
      row.map((symbolIndex) => this.symbols[symbolIndex])
    );

    for (let i = 0; i < this.reel.reels.length; i++) {
      const r = this.reel.reels[i];
      const extra = 0; //Math.floor(Math.random());
      // const target = r.position + 10 + i * 5 + extra;
      console.log(this.outcome[i]);

      const target = this.outcome[i].length * (3 + i * 2 + extra);
      const time = 2500 + i * 600 + extra * 600;

      this.tweenTo(
        r,
        "position",
        target,
        time,
        this.backout(0),
        () => {
          // this.soundManager.playSoundEffect("reelsMoveSound",1)
        },
        () => {
          // const soundKey = `reelStop${i + 1}Sound`; // Dynamically determine the sound key
          // this.soundManager.playSoundEffect(soundKey, 10); // Play the corresponding sound effect

          if (i === this.reel.reels.length - 1) {
            this.reelsComplete(); // Call `reelsComplete` for the last reel
          }
        }
      );
    }

    // Add ticker for animation update
    this.app.ticker.add((_delta) => {
      for (let i = 0; i < this.reel.reels.length; i++) {
        const r = this.reel.reels[i];
        r.previousPosition = r.position;

        for (let j = 0; j < r.symbols.length; j++) {
          const s = r.symbols[j];
          const prevY = s.y;

          s.y =
            ((r.position + j) % r.symbols.length) * this.reel.cellHeight -
            this.reel.cellHeight +
            this.reel.cellHeight *.15;

          // If the symbol moves off-screen, assign a new texture from the predefined outcome
          if (s.y < 0 && prevY > this.reel.cellHeight) {
            const targetRow = this.outcome[j];
            const targetSymbol = targetRow[i];
            console.log();
            if (targetSymbol && targetSymbol.texture.valid) {
              s.texture = targetSymbol.texture;
              s.x = Math.round((this.reel.cellWidth - s.width) / 2);
            } else {
              console.error("Invalid texture or symbol detected", targetSymbol);
            }
          }
        }
      }
    });

    // Listen for animate update
    this.app.ticker.add((_delta) => {
      const now = Date.now();
      const remove = [];

      for (let i = 0; i < this.tweening.length; i++) {
        const t = this.tweening[i];
        const phase = Math.min(1, (now - t.start) / t.time);

        t.object[t.property] = this.lerp(
          t.propertyBeginValue,
          t.target,
          t.easing(phase)
        );
        if (t.change) t.change(t);
        if (phase === 1) {
          t.object[t.property] = t.target;
          if (t.complete) t.complete(t);
          remove.push(t);
        }
      }

      for (let i = 0; i < remove.length; i++) {
        this.tweening.splice(this.tweening.indexOf(remove[i]), 1);
      }
    });
  }

  // Basic lerp function
  lerp(a1, a2, t) {
    return a1 * (1 - t) + a2 * t;
  }

  // Backout easing function
  backout(amount) {
    return (t) => --t * t * ((amount + 1) * t + amount) + 1;
  }
}
