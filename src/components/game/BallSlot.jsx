import React, { useState, useEffect } from "react";
import "../game/Game.css";
import Canvas from "./canvas/Canvas";

function BallSlot({ socket }) {
  const [key, setKey] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      // Increment the key to force remounting
      // setTimeout(() => {
      setKey((prevKey) => prevKey + 1);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="chart">
      <div className="chart-inner">
        <div className="dividers">
          <div className="divider"></div>
          <div className="divider"></div>
          <div className="divider"></div>
          <div className="divider"></div>
        </div>
        <div className="canvas-container" id="canvas-container" />
        {/* Use the key prop to force unmount and remount */}
        <Canvas key={key} socket={socket} />
      </div>
    </div>
  );
}

export default BallSlot;
