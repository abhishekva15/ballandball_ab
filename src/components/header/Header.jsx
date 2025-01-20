import React, { useContext, useEffect, useRef, useState } from "react";
import "../header/Header.css";

import { IoIosArrowBack } from "react-icons/io";
import SettingModal from "../modals/SettingModal";
import Limits from "../modals/Limits";
import RulesModal from "../modals/RulesModal";
import { SoundContext } from "../../context/SoundContext";
import { playSound, pauseSound } from "../../utility/gameSettings";
import soundonsvg from "../../assets/Sound-1.svg";
import soundoffsvg from "../../assets/Sound Close.svg";
import { formatBalance } from "../../utility/helper";

import settingsvg from "../../assets/setting.svg";

import { Link } from "react-router-dom";

function Header({ info, resultData, queryParams }) {
  const { sound, setSound } = useContext(SoundContext);
  const [settingModal, setSettingModal] = useState(false);
  const [openLimits, setOpenLimits] = useState(false);
  const [openRules, setOpenRules] = useState(false);
  const [payoutClass, setPayoutClass] = useState("");
  const [payoutData, setPayoutData] = useState(0);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const handleClickOutside = (event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      setSettingModal(false);
    }
  };

  useEffect(() => {
    if (settingModal) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [settingModal]);

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
        setPayoutData(0);
      }, 1500);
    }
  }, [resultData]);

  return (
    <>
      <div className="game-header">
        <div className="game-header-back">
          <Link to={`https://lobby.unicon.vip/?id=${queryParams.id}`}>
            <IoIosArrowBack
              style={{
                color: "#fff",
                fontSize: "19px",
                strokeWidth: "15px",
                marginTop: "2px",
              }}
            />
          </Link>
        </div>
        <div className="game-header-logo"></div>
        <div className="game-header-balance-title">Balance:</div>
        <div className="game-header-balance">
          <div className="game-header-balance-text">{formatBalance(info?.bl)}</div>
          <div className={`game-header-balance-delta ${payoutClass}`}>
            {payoutData === 0 ? "-" : "+"}
            {payoutData.toFixed(2)}
          </div>
        </div>

        <div className="game-header-buttons">
          <div className="game-header-button">
            <div className="game-header-btton-inner" onClick={toggleSound}>
              {sound ? (
                <img
                  src={soundonsvg}
                  alt="Sound On"
                  style={{ height: "15px", width: "20px" }}
                />
              ) : (
                <img
                  src={soundoffsvg}
                  alt="Sound Off"
                  style={{ height: "18px", width: "18px" }}
                />
              )}
            </div>
          </div>
          <div className="game-header-button">
            <div
              className="game-header-btton-inner"
              onClick={handleSetting}
              ref={buttonRef}
            >
              <img
                src={settingsvg}
                alt="settings"
                style={{ height: "17px", width: "17px" }}
              />
            </div>
            {settingModal && (
              <SettingModal
                menuRef={menuRef}
                info={info}
                handleRules={handleRules}
                handleSetting={handleSetting}
                handleLimits={handleLimits}
              ></SettingModal>
            )}
          </div>
        </div>
      </div>
      {openLimits && (
        <Limits
          setOpenLimits={setOpenLimits}
          handleLimits={handleLimits}
        ></Limits>
      )}
      {openRules && (
        <RulesModal
          setOpenRules={setOpenRules}
          handleRules={handleRules}
        ></RulesModal>
      )}
    </>
  );
}

export default Header;
