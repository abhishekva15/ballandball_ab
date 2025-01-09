import React, { useEffect, useState } from "react";
import { getCaller } from "../../utility/api";
import { formateTime } from "../../utility/helper";
import RoundDetails from "./RoundDetails";
import ApiLoader from "../loader/ApiLoader";

function MyBets({
  allBetData,
  setLoading,
  queryParams,
  activeTab,
  resultData,
}) {
  const [myBetData, setMyBetData] = useState([]);
  const [rondDetails, setRondDetails] = useState(false);
  const [singleBetData, setSingleBetData] = useState({});
  const [apiLoading, setApiLoading] = useState(false);

  const handleMyBet = async () => {
    setApiLoading(true);
    const token = queryParams.id;
    const res = await getCaller(`bet-history?token=${token}&limit=10`);
    console.log(res);
    const newMyBet = res?.result || [];
    setMyBetData(newMyBet);
    setApiLoading(false);
  };

  useEffect(() => {
    if (activeTab === 1 || resultData) {
      handleMyBet();
    }
  }, [activeTab, resultData]);

  const handleRoundDetails = (item) => {
    setRondDetails((prv) => !prv);
    setSingleBetData(item);
  };

  console.log(singleBetData)

  return (
    <>
      <div className="bet-content">
        <div className="tab-container">
          <div className="bet-titles">
            <div className="single-title">Game</div>
            <div className="single-title m-center m-none">Time</div>
            <div className="single-title m-center m-none">Bet Amount</div>
            <div className="single-title m-center">Multiplier</div>
            <div className="single-title p-right">Payout</div>
          </div>
          <div className="bet-separator"></div>
          <div className="bet-rows">
            {apiLoading ? (
              <ApiLoader />
            ) : (
              myBetData.map((singleBetData, index) => (
                <div
                  key={index}
                  className="bet-row"
                  onClick={() => handleRoundDetails(singleBetData)}
                >
                  <div className="g-data">
                    <div className="icon-ball"></div>
                    Ball & Ball
                  </div>
                  <div className="g-mult g-center m-none">
                    {formateTime(singleBetData.created_at)}
                  </div>
                  <div className="g-mult g-center m-none">
                    {singleBetData?.bet_amt.toFixed(2)}
                  </div>
                  <div className="g-mult g-center">
                    {singleBetData?.result.multiplier.toFixed(2)}x
                  </div>
                  <div className="p-data g-pay">
                    {singleBetData?.won_amt.toFixed(2)}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <RoundDetails
        setRondDetails={setRondDetails}
        singleBetData={singleBetData}
        rondDetails={rondDetails}
        handleRoundDetails={handleRoundDetails}
      ></RoundDetails>
    </>
  );
}

export default MyBets;
