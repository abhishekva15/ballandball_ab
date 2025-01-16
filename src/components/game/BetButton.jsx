import React from "react";
import "../game/Game.css";


function BetButton({ handlePlacebet, isBetting }) {
  return (
    <div
      className={`game-betslip-button ${isBetting ? "all-default" : ""}`}
      onClick={handlePlacebet}
    >
      <div className="placebet-btn">
        <div className="place-btn-border">
          <div className="btn-fir-inner ">
            <div className="btn-fir-text">
              <div className="text-wrapper">
                <div className="text-wrapper">
                  <div className="text-bet">Bet</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="auto-button">
        <div className="auto-bet-list">
          {amountList.map((amount) => {
            <div className="autobet-list-item">{amount}</div>;
          })}
        </div>
        <div className="auto-bet-button">
          <div className="auto-bet-inner">A</div>
        </div>
      </div> */}
    </div>
  );
}

export default BetButton;
