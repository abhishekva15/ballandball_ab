import React from "react";
// import { PiCopySimpleFill } from "react-icons/pi";
import { IoClose } from "react-icons/io5";
import { formatDate, formateTime } from "../../utility/helper";

function RoundDetails({
  rondDetails,
  handleRoundDetails,
  singleBetData,
  setRondDetails,
}) {
  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      setRondDetails(false);
    }
  };
  let firstReel, secondReel, thirdReel;

  if (singleBetData?.reels) {
    firstReel = singleBetData?.reels[0] || [];
    secondReel = singleBetData?.reels[1] || [];
    thirdReel = singleBetData?.reels[2] || [];
  } else {
    firstReel = secondReel = thirdReel = [];
  }

  const ballNames = [
    "b-bowling",
    "b-basketball",
    "b-football",
    "b-pool",
    "b-tennis",
    "b-volleyball",
    "b-baseball",
  ];

  const backendNumbers = [1, 2, 3, 4, 5, 6, 7];

  const selectedBallNames = backendNumbers.map((num) => ballNames[num - 1]);

  return (
    <div
      className={`round-overlay ${rondDetails ? "overlay-open" : ""} `}
      onClick={handleOutsideClick}
    >
      <div
        className={`round-render ${rondDetails ? "modal-show" : "modal-close"}`}
      >
        <div className="start-modal">
          <div className="start-modal-head">
            <div className="game-start-logo"></div>
            <div className="header_id">
              {/* 4266a75f-3ed4-479... */}
              {/* <PiCopySimpleFill /> */}
            </div>
            <div className="close-icon" onClick={handleRoundDetails}>
              <IoClose />
            </div>
          </div>

          <div className="start-modal-row">
            <div className="start-title">Match ID:</div>
            <div className="start-text">{singleBetData?.match_id}</div>
          </div>
          <div className="start-modal-row">
            <div className="start-title">User ID:</div>
            <div className="start-text">{singleBetData?.player_id}</div>
          </div>
          <div className="start-modal-row">
            <div className="start-title">Date:</div>
            <div className="start-text">
              {formatDate(singleBetData?.created_at)},{" "}
              {formateTime(singleBetData?.created_at)}
            </div>
          </div>
          <div className="start-modal-row">
            <div className="start-modal-col">
              <div className="start-modal-col-flat">
                <div className="start-modal-col-lable">Bet Amount</div>
                <div className="start-modal-col-value">
                  {singleBetData?.bet_amt?.toFixed(2)}
                </div>
              </div>
            </div>
            <div className="start-modal-col">
              <div className="start-modal-col-flat">
                <div className="start-modal-col-lable">Multiplier</div>
                <div className="start-modal-col-value">
                  x{singleBetData?.result?.multiplier}
                </div>
              </div>
            </div>
            <div className="start-modal-col">
              <div className="start-modal-col-flat">
                <div className="start-modal-col-lable">Payout</div>
                <div className="start-modal-col-value">
                  {singleBetData?.won_amt?.toFixed(2)}
                </div>
              </div>
            </div>
          </div>
          <div className="start-modal-interface">
            <div className="result-wrapper">
              <div className="ball-chart">
                <div className="ball-chart-inner">
                  <div className="ball-chart-reel">
                    <div
                      className={`single-ball-inner ${
                        firstReel[0]
                          ? selectedBallNames[firstReel[0]]
                          : "b-baseball"
                      }`}
                    ></div>
                    <div
                      className={`single-ball-inner ${
                        secondReel[0]
                          ? selectedBallNames[secondReel[0]]
                          : "b-baseball"
                      }`}
                    ></div>
                    <div
                      className={`single-ball-inner ${
                        thirdReel[0]
                          ? selectedBallNames[thirdReel[0]]
                          : "b-baseball"
                      }`}
                    ></div>
                    <div className="ball-divider"></div>
                  </div>

                  <div className="ball-chart-reel">
                    <div
                      className={`single-ball-inner ${
                        firstReel[1]
                          ? selectedBallNames[firstReel[1]]
                          : "b-baseball"
                      }`}
                    ></div>
                    <div
                      className={`single-ball-inner ${
                        secondReel[1]
                          ? selectedBallNames[secondReel[1]]
                          : "b-baseball"
                      }`}
                    ></div>
                    <div
                      className={`single-ball-inner ${
                        thirdReel[1]
                          ? selectedBallNames[thirdReel[1]]
                          : "b-baseball"
                      }`}
                    ></div>
                    <div className="ball-divider"></div>
                  </div>
                  <div className="ball-chart-reel">
                    <div
                      className={`single-ball-inner ${
                        firstReel[2]
                          ? selectedBallNames[firstReel[2]]
                          : "b-baseball"
                      }`}
                    ></div>
                    <div
                      className={`single-ball-inner ${
                        secondReel[2]
                          ? selectedBallNames[secondReel[2]]
                          : "b-baseball"
                      }`}
                    ></div>
                    <div
                      className={`single-ball-inner ${
                        thirdReel[2]
                          ? selectedBallNames[thirdReel[2]]
                          : "b-baseball"
                      }`}
                    ></div>
                    <div className="ball-divider"></div>
                  </div>
                  <div className="ball-chart-reel">
                    <div
                      className={`single-ball-inner ${
                        firstReel[3]
                          ? selectedBallNames[firstReel[3]]
                          : "b-baseball"
                      }`}
                    ></div>
                    <div
                      className={`single-ball-inner ${
                        secondReel[3]
                          ? selectedBallNames[secondReel[3]]
                          : "b-baseball"
                      }`}
                    ></div>
                    <div
                      className={`single-ball-inner ${
                        thirdReel[3]
                          ? selectedBallNames[thirdReel[3]]
                          : "b-baseball"
                      }`}
                    ></div>
                    <div className="ball-divider"></div>
                  </div>
                  <div className="ball-chart-reel">
                    <div
                      className={`single-ball-inner ${
                        firstReel[4]
                          ? selectedBallNames[firstReel[4]]
                          : "b-baseball"
                      }`}
                    ></div>
                    <div
                      className={`single-ball-inner ${
                        secondReel[4]
                          ? selectedBallNames[secondReel[4]]
                          : "b-baseball"
                      }`}
                    ></div>
                    <div
                      className={`single-ball-inner ${
                        thirdReel[4]
                          ? selectedBallNames[thirdReel[4]]
                          : "b-baseball"
                      }`}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoundDetails;
