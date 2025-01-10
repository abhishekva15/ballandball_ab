import React from "react";
import "../game/Game.css";
import Canvas from "./canvas/Canvas";

function BallSlot({ spin, setSpin, resultData, socket }) {
  
  return (
    <div className="chart">
      <div className="chart-inner">
        {/* <Canvas setSpin={setSpin} resultData={resultData} socket={socket} /> */}
        <div className="dividers">
          <div className="divider"></div>
          <div className="divider"></div>
          <div className="divider"></div>
          <div className="divider"></div>
        </div>
        <div className="canvas-container" id="canvas-container" />
        <Canvas socket={socket} />
      </div>
    </div>
  );
}

export default BallSlot;
