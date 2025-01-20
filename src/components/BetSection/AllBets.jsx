import React, { useState } from "react";

import { formateTime } from "../../utility/helper";
import AllBetsDetails from "./AllBetsDetails";


function AllBets({ allBetData }) {
  const [allDetails, setAllDetails] = useState(false);
  const [singleBetData, setSingleBetData] = useState({});

  const handleAllBetsDetails = (item) => {
    setAllDetails((prv) => !prv);
    setSingleBetData(item);
  };

  return (
    <>
      <div className="bet-content">
        <div className="tab-container">
          <div className="bet-titles">
            <div className="single-title p-left">Player</div>
            {/* <div className="single-title m-center ">Player</div> */}
            <div className="single-title m-center m-none">Time</div>
            <div className="single-title m-center ">Bet Amount</div>
            <div className="single-title m-center">Multiplier</div>
            <div className="single-title p-right">Payout</div>
          </div>
          <div className="bet-separator"></div>
          <div className="bet-rows">
            {allBetData.map((singleBetData, index) => (
              <div
                key={index}
                className="bet-row"
                onClick={() => handleAllBetsDetails(singleBetData)}
              >
                <div className="g-data ">
                  {/* <div className="icon-ball"></div> */}
                  {singleBetData.urNm}
                </div>
                {/* <div className="g-mult g-center ">{singleBetData.urNm}</div> */}
                <div className="g-mult g-center m-none">
                  {formateTime(singleBetData.timeStamps)}
                </div>
                <div className="g-mult g-center ">
                  {singleBetData.betAmt.toFixed(2)}
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
      <AllBetsDetails
        setAllDetails={setAllDetails}
        singleBetData={singleBetData}
        allDetails={allDetails}
        handleAllBetsDetails={handleAllBetsDetails}
      ></AllBetsDetails>
    </>
  );
}

export default AllBets;
