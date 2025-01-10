/* eslint-disable @typescript-eslint/no-explicit-any */
// import { h } from "preact";
import { useRef, useEffect, useState } from "react";
import PixiApp from "./PixiApp";
import "./canvas.css";
// import PixiApp from "./PixiApp";
// PixiApp
// import { initDevtools } from "@pixi/devtools";
// import useStore from "src/app/store/useStore";
// import { observer } from "mobx-react-lite";
// import PixiApp from "../PixiApp";
// PixiApp;
// function isMobile() {
//   const mobileWidth = 819;

//   const windowWidth = window.innerWidth;
//   const match = navigator.userAgent.match(
//     /(iPad)|(iPhone)|(iPod)|(android)|(Android)|(webOS)/i
//   );
//   //Fix for iPad pro
//   //TODO: find better solution
//   if (windowWidth > mobileWidth && match && match.includes("iPad"))
//     return false;
//   if (windowWidth <= mobileWidth) return true;
//   return !!match;
// }
function Canvas(socket) {
  
 
  console.log(`re render `);
  
 
  

  // console.log(socket)
  const [mobile, setMobile] = useState(false);
  const [started, setStarted] = useState(false);
  const ratioRef = useRef();
  const containerRef = useRef(null);
  const appRef = useRef(null);
  const mobileWidth = 819;

  useEffect(() => {
    const windowWidth = window.innerWidth;
    const match = navigator.userAgent.match(
      /(iPad)|(iPhone)|(iPod)|(android)|(Android)|(webOS)/i
    );

    //Fix for iPad pro
    //TODO: find better solution
    if (windowWidth > mobileWidth && match && match.includes("iPad")) {
      setMobile(false);
    } else if (windowWidth <= mobileWidth) {
      setMobile(true);
    }
  }, []);
  //   return !!match;
  //   const w = useRef(0);
  //   const h = useRef(0);

  //   const isMobileDevice = isMobile();
  //   setMobile(isMobileDevice);
  //   const {
  //     store: {
  //       colors,
  //       placebetProcessing,
  //       completeItemsUpdate,
  //       resetCompletedItems,
  //       coefficient,
  //       completedItems,
  //     },
  //     audioCommon: { playAudio },
  //     uiCommon: { isMobile },
  //   } = useStore();

  const startGame = () => {
    containerRef.current = document.getElementById("canvas-container");

    if (!containerRef.current) return;
    

    appRef.current = new PixiApp({
      w: containerRef.current.offsetWidth,
      h: containerRef.current.offsetHeight,
      ratio: ratioRef.current,
      isMobile: mobile,
      completeItemsCallback: () => {}, // Add appropriate callback function
      resetCompletedItemsCallback: () => {}, // Add appropriate callback function
      playAudio: () => {}, // Add appropriate function
      socket,
    });

    if (
      appRef.current &&
      appRef.current.app.view instanceof HTMLCanvasElement
    ) {
      containerRef.current.appendChild(appRef.current.app.view);
    }
    setStarted(true);
  };

  //INIT
  useEffect(() => {
    startGame();
  }, []);

  useEffect(() => {
    if (!started) return;
    console.log("hiii");

    document.getElementById("game-canvas")?.remove();
    setTimeout(() => {
      startGame();
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mobile]);

  //   useEffect(() => {
  //     if (colors) {
  //       if (appRef.current && appRef.current.play) {
  //         appRef.current.updateGame(colors);
  //       }
  //     }
  //   }, [colors]);

  //   useEffect(() => {
  //     if (placebetProcessing) {
  //       if (appRef.current && appRef.current.play) {
  //         appRef.current.play();
  //       }
  //     }
  //   }, [placebetProcessing]);

  //   useEffect(() => {
  //     if (completedItems.length !== 5) return;
  //     if (coefficient < 1.5) return;
  //     playAudio("win");
  //   }, [completedItems, coefficient]);

  return null;
}

export default Canvas;
