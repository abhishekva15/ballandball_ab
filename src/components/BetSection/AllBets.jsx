import React from "react";

import { formateTime } from "../../utility/helper";

function AllBets({ allBetData }) {
 
  return (
    <>
      <div className="bet-content">
        <div className="tab-container">
          <div className="bet-titles">
            <div className="single-title">Game</div>
            <div className="single-title m-center m-none">Player</div>
            <div className="single-title m-center m-none">Time</div>
            <div className="single-title m-center m-none">Bet Amount</div>
            <div className="single-title m-center">Multiplier</div>
            <div className="single-title p-right">Payout</div>
          </div>
          <div className="bet-separator"></div>
          <div className="bet-rows">
            {allBetData.map((singleBetData, index) => (
              <div key={index} className="bet-row">
                <div className="g-data">
                  <div className="icon-ball"></div>
                  Ball & Ball
                </div>
                <div className="g-mult g-center m-none">
                  {singleBetData.urNm}
                </div>
                <div className="g-mult g-center m-none">
                  {formateTime(singleBetData.timeStamps)}
                </div>
                <div className="g-mult g-center m-none">
                  {singleBetData.betAmt}
                </div>
                <div className="g-mult g-center">
                  {singleBetData?.winCombo?.multiplier.toFixed(2)}x
                </div>
                <div className="p-data g-pay">
                  {singleBetData.payout.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default AllBets;
