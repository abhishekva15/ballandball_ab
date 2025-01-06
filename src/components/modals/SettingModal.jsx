import React, { useContext } from "react";
import "../modals/Modal.css";
import { IoClose } from "react-icons/io5";

import { GrNotes } from "react-icons/gr";

import { HiSpeakerWave } from "react-icons/hi2";
import { BsFillRecord2Fill } from "react-icons/bs";
import { SoundContext } from "../../context/SoundContext";
import { setSoundVolume } from "../../utility/gameSettings";
import limitIcon from "../../assets/Round.svg";
import rulesicon from "../../assets/File.svg";

function SettingModal({ handleSetting, handleLimits, handleRules, info }) {
  const { sound, setSound } = useContext(SoundContext);

  const step = 1;
  const min = 0;
  const max = 100;

  const sliderStyles = (value) => {
    const percent = (value * 100) / 100;
    return {
      active: { transform: `translateX(${percent}%)` },
      bg: { transform: `translateX(-${100 - percent}%)` },
      btn: { transform: `translateX(${100 - percent}%)` },
    };
  };

  const soundStyles = sliderStyles(sound);

  const handleSoundChange = (event) => {
    const value = event.target.value;
    setSound(value); // Update context state
    setSoundVolume(value / 100); // Update sound effects volume dynamically
  };

  return (
    <div className="setting-modal">
      <div className="setting-light setting-back-light">
        <div className="setting-inner">
          <div className="setting-title">Settings</div>
          <div className="close-icon-s" onClick={handleSetting}>
            <IoClose />
          </div>
          <div className="setting-content">
            <div className="user-name">
              <div className="user-name-inner">
                <div className="name-u">UserName</div>
                <div className="user-name-text">{info?.urNm}</div>
              </div>
            </div>
            <div className="setting-link" onClick={handleLimits}>
              <div
                className="setting-icon"
                style={{ fontSize: "25px", height: "1.5rem", width: "1.5rem" }}
              >
      
                <img
                  src={limitIcon}
                  alt="Limit Icon"
                  style={{ width: "70%", height: "60%" }}
                />
              </div>
              <div className="setting-name">Limits</div>
            </div>

            <div className="setting-link" onClick={handleRules}>
              <div
                className="setting-icon"
                style={{ height: "1.5rem", width: "1.5rem" }}
              >
                <img
                  src={rulesicon}
                  alt="Rules Icon"
                  style={{ height: "60%", width: "60%" }}
                />
              </div>
              <div className="setting-name">Rules</div>
            </div>

            <div className="setting-item">
              <div
                className="setting-icon"
                onClick={() => setSound(sound === 0 ? 50 : 0)}
                style={{ fontSize: "1.2rem" }}
              >
                <HiSpeakerWave />
              </div>
              <div className="range-slider-sound">
                <input
                  className="range-slider-input"
                  type="range"
                  value={sound}
                  onChange={handleSoundChange}
                  min={min}
                  max={max}
                  step={step}
                />
                <div className="range-slider-bg">
                  <div className="range-slider-bg-inner"></div>
                  <div
                    className="range-slider-active"
                    style={soundStyles.active}
                  ></div>
                </div>
                <div className="range-slider-btn-wrap" style={soundStyles.bg}>
                  <div
                    className="range-slider-btn"
                    style={soundStyles.btn}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingModal;
