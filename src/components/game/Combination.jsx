import React, { useContext, useEffect, useState } from "react";
import "../game/Game.css";
import { playPopSound, playWinSound } from "../../utility/gameSettings";
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
      const multiplier = resultData?.winCombo?.multiplier;
      console.log(multiplier, "Mltiplier");
      if (multiplier < 3 && multiplier>0) {
        playPopSound(); // Play sound for lower multiplier
      } else {
        playWinSound(); // Play sound for higher multiplier
      }
    }
  }, [resultData]);

  return (
    <div className="combinations">
      <div className="combinations-list">
        <div className="combination-item-wrapper">
          <button
            onMouseEnter={() => {
              handleMouseEnter(77, "button_77");
            }}
            onMouseLeave={handleMouseLeave}
            className={`${
              multiplier === 77 && winComboo
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
            <div className="combination-item-text">77.00x</div>
          </button>
        </div>
        <div className="combination-item-wrapper">
          <button
            onMouseEnter={() => handleMouseEnter(10, "button_10")}
            onMouseLeave={handleMouseLeave}
            className={`${
              multiplier === 10 && winComboo
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
            <div className="combination-item-text">10.00x</div>
          </button>
        </div>
        <div className="combination-item-wrapper">
          <button
            onMouseEnter={() => handleMouseEnter(5, "button_5")}
            onMouseLeave={handleMouseLeave}
            className={`${
              multiplier === 5 && winComboo
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
            <div className="combination-item-text">5.00x</div>
          </button>
        </div>
        <div className="combination-item-wrapper">
          <button
            onMouseEnter={() => handleMouseEnter(3, "button_3")}
            onMouseLeave={handleMouseLeave}
            className={`${
              multiplier === 3 && winComboo
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
            <div className="combination-item-text">3.00x</div>
          </button>
        </div>
        <div className="combination-item-wrapper">
          <button
            onMouseEnter={() => handleMouseEnter(1.4, "button_1.4")}
            onMouseLeave={handleMouseLeave}
            className={`${
              multiplier === 1.4 && winComboo
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
            <div className="combination-item-text">1.40x</div>
          </button>
        </div>
        <div className="combination-item-wrapper">
          <button
            onMouseEnter={() => handleMouseEnter(0.1, "button_0.1")}
            onMouseLeave={handleMouseLeave}
            className={`${
              multiplier === 0.1 && winComboo
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
            <div className="combination-item-text">0.10x</div>
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
