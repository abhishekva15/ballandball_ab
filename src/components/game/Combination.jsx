import React, { useState } from "react";
import "../game/Game.css";

function Combination({ amount, resultData }) {
  const [profit, setProfit] = useState(0);

  const handleMouseEnter = (multiplier) => {
    setProfit(amount * multiplier);
  };

  const handleMouseLeave = () => {
    setProfit(0);
  };

  let multiplier = resultData?.winCombo?.multiplier;

  return (
    <div className="combinations">
      <div className="combinations-list">
        <div className="combination-item-wrapper">
          <button
            onMouseEnter={() => handleMouseEnter(77)}
            onMouseLeave={handleMouseLeave}
            className={`${
              multiplier === 77
                ? "combination-list-item_77"
                : "combination-list-item"
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
            onMouseEnter={() => handleMouseEnter(10)}
            onMouseLeave={handleMouseLeave}
            className={`${
              multiplier === 10
                ? "combination-list-item_10"
                : "combination-list-item"
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
            onMouseEnter={() => handleMouseEnter(5)}
            onMouseLeave={handleMouseLeave}
            className={`${
              multiplier === 5
                ? "combination-list-item_5"
                : "combination-list-item"
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
            onMouseEnter={() => handleMouseEnter(3)}
            onMouseLeave={handleMouseLeave}
            className={`${
              multiplier === 3
                ? "combination-list-item_3"
                : "combination-list-item"
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
            onMouseEnter={() => handleMouseEnter(1.4)}
            onMouseLeave={handleMouseLeave}
            className={`${
              multiplier === 1.4
                ? "combination-list-item_14"
                : "combination-list-item"
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
            onMouseEnter={() => handleMouseEnter(0.1)}
            onMouseLeave={handleMouseLeave}
            className={`${
              multiplier === 0.1
                ? "combination-list-item_01"
                : "combination-list-item"
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
          <button className="combination-list-item">
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
            Profit:
            {profit ? (
              profit.toFixed(2)
            ) : (
              <span className="thin-text">0.00</span>
            )}
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
