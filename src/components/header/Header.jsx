import React, { useContext, useEffect, useState } from "react";
import "../header/Header.css";
import { MdOutlineVolumeOff, MdOutlineVolumeUp } from "react-icons/md";
import { IoIosArrowBack, IoMdSettings } from "react-icons/io";
import SettingModal from "../modals/SettingModal";
import Limits from "../modals/Limits";
import RulesModal from "../modals/RulesModal";
import { SoundContext } from "../../context/SoundContext";
import { playSound, pauseSound } from "../../utility/gameSettings";

import { Link } from "react-router-dom";

function Header({ info, resultData, queryParams }) {
  const { sound, setSound } = useContext(SoundContext);
  const [settingModal, setSettingModal] = useState(false);
  const [openLimits, setOpenLimits] = useState(false);
  const [openRules, setOpenRules] = useState(false);
  const [payoutClass, setPayoutClass] = useState("");
  const [payoutData, setPayoutData] = useState("");

  const handleSetting = () => {
    setSettingModal((prv) => !prv);
  };

  const handleLimits = () => {
    setOpenLimits((prv) => !prv);
    setSettingModal(false);
  };

  const handleRules = () => {
    setOpenRules((prv) => !prv);
    setSettingModal(false);
  };

  const toggleSound = () => {
    if (sound) {
      // Turn off all sounds
      setSound(0);
      pauseSound();
    } else {
      // Turn on all sounds
      setSound(10);
      playSound();
    }
  };

  useEffect(() => {
    if (resultData?.payout !== undefined) {
      const newClass = resultData.payout > 0 ? "animatedup" : "animateddown";
      setPayoutClass(newClass);
      setPayoutData(resultData.payout);

      setTimeout(() => {
        setPayoutClass("");
        setPayoutData("");
      }, 1500);
    }
  }, [resultData]);

  return (
    <>
      <div className="game-header">
        <div className="game-header-back">
          <Link to={`https://lobby.unicon.vip/?id=${queryParams.id}`}>
            <IoIosArrowBack style={{color:"#fff", fontWeight:"bold"}} />
          </Link>
        </div>
        <div className="game-header-logo"></div>
        <div className="game-header-balance-title">Balance:</div>
        <div className="game-header-balance">
          <div className="game-header-balance-text">{info?.bl}</div>
          <div className={`game-header-balance-delta ${payoutClass}`}>
            {payoutData === 0 ? "-" : "+"}
            {payoutData}
          </div>
        </div>

        <div className="game-header-buttons">
          <div className="game-header-button">
            <div className="game-header-btton-inner" onClick={toggleSound}>
              {sound ? (
                <MdOutlineVolumeUp style={{ height: "20px", width: "20px" }} />
              ) : (
                <MdOutlineVolumeOff style={{ height: "20px", width: "20px" }} />
              )}
            </div>
          </div>
          <div className="game-header-button">
            <div className="game-header-btton-inner" onClick={handleSetting}>
              <IoMdSettings style={{ height: "20px", width: "20px" }} />
            </div>
            {settingModal && (
              <SettingModal
                info={info}
                handleRules={handleRules}
                handleSetting={handleSetting}
                handleLimits={handleLimits}
              ></SettingModal>
            )}
          </div>
        </div>
      </div>
      {openLimits && <Limits handleLimits={handleLimits}></Limits>}
      {openRules && <RulesModal handleRules={handleRules}></RulesModal>}
    </>
  );
}

export default Header;
