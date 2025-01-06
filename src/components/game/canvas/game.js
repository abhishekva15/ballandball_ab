/* eslint-disable no-undef */
import { Application, Assets, Graphics, Sprite } from "pixi.js";
import { useEffect, useRef, useState } from "react";
import { loadAssets } from "./utils/loadAssets";
import { Reel } from "./components/reel/Reel";
import { SpinAnimation } from "./components/reel/SpinAnimation";
import { initDevtools } from "@pixi/devtools";
import BetButton from "../BetButton";
import { Payline } from "./components/reel/Payline";
import eventEmitter from "../../../utility/eventEmiiter";
// import { useBackground } from "../../context/backgroundClassProvider";
// import { loadAssets } from "../../utils/load_textue";

// import { BackGround } from "./background/background";

const Canvas = ({ setSpin, resultData, socket }) => {
  const canvasRef = useRef(null);
  const appRef = useRef(null);
  // const socket = socket;

  // const { setBackgroundClass } = useBackground();

  const [isLoading, setIsLoading] = useState(true);
  const [textures, setTextures] = useState(null);
  const [spinAnimation, setSpinAnimation] = useState(null);
  useEffect(() => {
    const fetchTexture = async () => {
      Assets.cache.reset();
      const data = await loadAssets();

      if (data) {
        setTextures(data);
        setIsLoading(false); // Set flag when textures are loaded
      }
    };
    fetchTexture();
  }, []);
  const createGradientOverlay = (app) => {
    const createGradient = (width, height, startAlpha, endAlpha) => {
      const gradient = new Graphics();

      const steps = 50; // Number of steps for smoother gradient
      const alphaStep = (endAlpha - startAlpha) / steps;
      const stepHeight = height / steps;

      for (let i = 0; i < steps; i++) {
        const currentAlpha = startAlpha + alphaStep * i;
        gradient.beginFill(0x000000, currentAlpha);
        gradient.drawRect(0, i * stepHeight, width, stepHeight);
        gradient.endFill();
      }

      return gradient;
    };

    // Create top gradient
    const topGradient = createGradient(
      app.screen.width,
      app.screen.height * 0.2,
      0.9,
      0.1
    );
    const topGradientTexture = app.renderer.generateTexture(topGradient);
    const topGradientSprite = new Sprite(topGradientTexture);
    topGradientSprite.y = 0; // Position at the top
    app.stage.addChild(topGradientSprite);

    // Create bottom gradient
    const bottomGradient = createGradient(
      app.screen.width,
      app.screen.height * 0.18,
      0.1,
      0.9
    );
    const bottomGradientTexture = app.renderer.generateTexture(bottomGradient);
    const bottomGradientSprite = new Sprite(bottomGradientTexture);
    bottomGradientSprite.y = app.screen.height - bottomGradientSprite.height; // Position at the bottom
    app.stage.addChild(bottomGradientSprite);

    // Update gradients on resize
    app.renderer.on("resize", () => {
      topGradientSprite.width = app.screen.width;
      topGradientSprite.height = app.screen.height * 0.2;

      bottomGradientSprite.width = app.screen.width;
      bottomGradientSprite.height = app.screen.height * 0.18;
      bottomGradientSprite.y = app.screen.height - bottomGradientSprite.height;
    });
  };

  const initializeGame = async (texture) => {
    if (texture) {
      console.log("Initializing game");
      const app = new Application({
        view: canvasRef.current,
        resizeTo: window,
        // backgroundColor: 0xffffff,
      });
      window.__PIXI_DEVTOOLS__ = {
        app: app,
        // If you are not using a pixi app, you can pass the renderer and stage directly
        // renderer: myRenderer,
        // stage: myStage,
      };
      initDevtools({ app });
      globalThis.__PIXI_APP__ = app;
      // window.__PIXI_APP__ = app;

      appRef.current = app;
      let reel = await new Reel(app);
      const payline = new Payline(reel, app);
      let sp = new SpinAnimation(reel, app, payline);

      // reel.createReel();
      socket.on("BET_RESULT", (data) => {
        console.log(data);
        sp.startPlay(data);
      });
      // console.log(resultData);
      // if (resultData !== undefined) {
      //   // console.log("res", data);
      //   await reel.getResData(resultData);
      //   sp.startPlay(resultData);
      //   // handleResultData(data);
      // }
      // setSpinAnimation(sp);
      // setSpin(sp);
      app.stage.addChild(reel);
      app.stage.addChild(payline);
      createGradientOverlay(app);

      // app.stage.addChild(btn);
    }
  };

  const handlePlacebet = () => {
    console.log("place bet");
    spinAnimation.startSpin();
  };
  useEffect(() => {
    if (!isLoading && textures) {
      console.log("Re-render");
      initializeGame(textures);
    }
  }, [textures]);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          background: "white",
        }}
      />
    </>
  );
};

export default Canvas;
