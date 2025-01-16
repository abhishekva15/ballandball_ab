import React, { useState } from "react";
import "../BetSection/BetSection.css";
import AllBets from "./AllBets";
import MyBets from "./MyBets";
// import { betData } from "../../utility/betSataticData";

function BetSection({  resultData, queryParams, allBetData }) {
  const [activeTab, setActiveTab] = useState(0);
  // const [allBetData, setAllBetData] = useState(betData);

  const handleBetTab = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <>
      <div className="border"></div>
      <ul className="tabs">
        <li className="tab-item" onClick={() => handleBetTab(0)}>
          <div
            className={`${
              activeTab === 0 ? "tab-item-inner-active" : "tab-item-inner"
            }`}
          >
            <div
              className={`${
                activeTab === 0 ? "text-all-bets-active" : "text-all-bets"
              }`}
            >
              All Bets
            </div>
          </div>
        </li>
        <li className="tab-item" onClick={() => handleBetTab(1)}>
          <div
            className={`${
              activeTab === 1 ? "tab-item-inner-active" : "tab-item-inner"
            }`}
          >
            <div
              className={`${
                activeTab === 1 ? "text-all-bets-active" : "text-all-bets"
              }`}
            >
              My Bets
            </div>
          </div>
        </li>
      </ul>
      {activeTab === 0 ? (
        <AllBets allBetData={allBetData}></AllBets>
      ) : (
        <MyBets
          resultData={resultData}
          activeTab={activeTab}
          
          queryParams={queryParams}
          
        ></MyBets>
      )}
    </>
  );
}

export default BetSection;
