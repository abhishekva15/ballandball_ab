import React, { useContext, useEffect, useState } from "react";
import "../game/Game.css";
import {
  playPop5Sound,
  playPopSound,
  playWinSound,
} from "../../utility/gameSettings";
import { SoundContext } from "../../context/SoundContext";

function Combination({ amount, resultData, winComboo }) {
  const [profit, setProfit] = useState(0);
  const [backComb, setBackComb] = useState(null);
  const { sound } = useContext(SoundContext);

  const handleMouseEnter = (multiplier, id) => {
    setProfit(amount * multiplier);
    setBackComb(id); // Set the hovered button id
  };

  const handleMouseLeave = () => {
    setBackComb(false);
    setProfit(0);
  };

  let multiplier = resultData?.winCombo?.multiplier;

  useEffect(() => {
    setProfit(resultData?.payout);
    if (sound) {
      if (multiplier > 0) {
        playPopSound();
        if (multiplier >= 1.5) {
          setTimeout(() => {
            playPop5Sound(); // Fix missing invocation
          }, 500);
          setTimeout(() => {
            playWinSound();
          }, 800);
        }
      }
    }
  }, [resultData]);

  return (
    <div className="combinations">
      <div className="combinations-list">
        <div className="combination-item-wrapper">
          <button
            onMouseEnter={() => {
              handleMouseEnter(7, "button_77");
            }}
            onMouseLeave={handleMouseLeave}
            className={`${
              multiplier === 7 && winComboo
                ? "combination-list-item_77"
                : "combination-list-item"
            } ${
              backComb === "button_77" ? "combination-list-item-backgrond" : ""
            }`}
          >
            <div className="combination-list-ball">
              <div className="ball">
                <div className="ball-inner ball-inner-black"></div>
              </div>
              <div className="ball">
                <div className="ball-inner ball-inner-black"></div>
              </div>
              <div className="ball">
                <div className="ball-inner ball-inner-black"></div>
              </div>
              <div className="ball">
                <div className="ball-inner ball-inner-black"></div>
              </div>
              <div className="ball">
                <div className="ball-inner ball-inner-black"></div>
              </div>
            </div>
            <div className="combination-item-text">7.00x</div>
          </button>
        </div>
        <div className="combination-item-wrapper">
          <button
            onMouseEnter={() => handleMouseEnter(5, "button_10")}
            onMouseLeave={handleMouseLeave}
            className={`${
              multiplier == 3.5 && winComboo
                ? "combination-list-item_10"
                : "combination-list-item"
            } ${
              backComb === "button_10" ? "combination-list-item-backgrond" : ""
            }`}
          >
            <div className="combination-list-ball">
              <div className="ball">
                <div className="ball-inner ball-inner-black"></div>
              </div>
              <div className="ball">
                <div className="ball-inner ball-inner-black"></div>
              </div>
              <div className="ball">
                <div className="ball-inner ball-inner-black"></div>
              </div>
              <div className="ball">
                <div className="ball-inner ball-inner-black"></div>
              </div>
              <div className="ball">
                <div className="ball-inner"></div>
              </div>
            </div>
            <div className="combination-item-text">3.50x</div>
          </button>
        </div>
        <div className="combination-item-wrapper">
          <button
            onMouseEnter={() => handleMouseEnter(2, "button_5")}
            onMouseLeave={handleMouseLeave}
            className={`${
              multiplier == 2 && winComboo
                ? "combination-list-item_5"
                : "combination-list-item"
            } ${
              backComb === "button_5" ? "combination-list-item-backgrond" : ""
            }`}
          >
            <div className="combination-list-ball">
              <div className="ball">
                <div className="ball-inner ball-inner-black"></div>
              </div>
              <div className="ball">
                <div className="ball-inner ball-inner-black"></div>
              </div>
              <div className="ball">
                <div className="ball-inner ball-inner-black"></div>
              </div>
              <div className="ball">
                <div className="ball-holed ball-inner-black"></div>
              </div>
              <div className="ball">
                <div className="ball-holed ball-inner-black"></div>
              </div>
            </div>
            <div className="combination-item-text">2.00x</div>
          </button>
        </div>
        <div className="combination-item-wrapper">
          <button
            onMouseEnter={() => handleMouseEnter(1.25, "button_3")}
            onMouseLeave={handleMouseLeave}
            className={`${
              multiplier === 1.25 && winComboo
                ? "combination-list-item_3"
                : "combination-list-item"
            } ${
              backComb === "button_3" ? "combination-list-item-backgrond" : ""
            }`}
          >
            <div className="combination-list-ball">
              <div className="ball">
                <div className="ball-inner ball-inner-black"></div>
              </div>
              <div className="ball">
                <div className="ball-inner ball-inner-black"></div>
              </div>
              <div className="ball">
                <div className="ball-inner ball-inner-black"></div>
              </div>
              <div className="ball">
                <div className="ball-inner"></div>
              </div>
              <div className="ball">
                <div className="ball-inner"></div>
              </div>
            </div>
            <div className="combination-item-text">1.25x</div>
          </button>
        </div>
        <div className="combination-item-wrapper">
          <button
            onMouseEnter={() => handleMouseEnter(0.7, "button_1.4")}
            onMouseLeave={handleMouseLeave}
            className={`${
              multiplier === 0.7 && winComboo
                ? "combination-list-item_14"
                : "combination-list-item"
            } ${
              backComb === "button_1.4" ? "combination-list-item-backgrond" : ""
            }`}
          >
            <div className="combination-list-ball">
              <div className="ball">
                <div className="ball-inner ball-inner-black"></div>
              </div>
              <div className="ball">
                <div className="ball-inner ball-inner-black"></div>
              </div>
              <div className="ball">
                <div className="ball-holed ball-inner-black"></div>
              </div>
              <div className="ball">
                <div className="ball-holed ball-inner-black"></div>
              </div>
              <div className="ball">
                <div className="ball-inner"></div>
              </div>
            </div>
            <div className="combination-item-text">0.70x</div>
          </button>
        </div>
        <div className="combination-item-wrapper">
          <button
            onMouseEnter={() => handleMouseEnter(0.25, "button_0.1")}
            onMouseLeave={handleMouseLeave}
            className={`${
              multiplier === 0.25 && winComboo
                ? "combination-list-item_01"
                : "combination-list-item"
            } ${
              backComb === "button_0.1" ? "combination-list-item-backgrond" : ""
            }`}
          >
            <div className="combination-list-ball">
              <div className="ball">
                <div className="ball-inner ball-inner-black"></div>
              </div>
              <div className="ball">
                <div className="ball-inner ball-inner-black"></div>
              </div>
              <div className="ball">
                <div className="ball-inner"></div>
              </div>
              <div className="ball">
                <div className="ball-inner"></div>
              </div>
              <div className="ball">
                <div className="ball-inner"></div>
              </div>
            </div>
            <div className="combination-item-text">0.25x</div>
          </button>
        </div>
        <div className="combination-item-wrapper">
          <button
            className={`combination-list-item ${
              !backComb ? "combination-list-item-backgrond" : ""
            }`}
          >
            <div className="combination-list-ball">
              <div className="ball">
                <div className="ball-inner"></div>
              </div>
              <div className="ball">
                <div className="ball-inner"></div>
              </div>
              <div className="ball">
                <div className="ball-inner"></div>
              </div>
              <div className="ball">
                <div className="ball-inner"></div>
              </div>
              <div className="ball">
                <div className="ball-inner"></div>
              </div>
            </div>
            <div className="combination-item-text">0.00x</div>
          </button>
        </div>
      </div>
      <div className="combination-footer">
        <div className="combination-footer-text">
          <div className="bold-text">
            Profit:{" "}
            <span className="thin-text">
              {profit ? profit.toFixed(2) : "0.00"}
            </span>
          </div>
          {/* <div></div> */}
        </div>
        {/* <div className="combination-footer-text">
          <div className="bold-text">Chance:</div>
          <div>14.99</div>
        </div> */}
      </div>
    </div>
  );
}

export default Combination;
