import React, { useContext, useEffect, useRef, useState } from "react";
import "../game/Game.css";
import Combination from "./Combination";
import BallSlot from "./BallSlot";
import BetButton from "./BetButton";
import InputSection from "./InputSection";
import { playButtonSound } from "../../utility/gameSettings";
import { SoundContext } from "../../context/SoundContext";

// function Game({ amount, setAmount, handlePlacebet, resultData, info }) {
// function Game({ amount, setAmount, handlePlacebet, resultData, info }) {
function Game({
  amount,
  setAmount,
  handlePlacebet,
  resultData,
  info,
  isBetting,
  socket,
  winCombo,
  // resultData,
}) {
  const MIN_AMOUNT = 10;
  const MAX_AMOUNT = Math.min(info?.bl, 20000.0);
  const tooltipTimeout = useRef(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [spin, setSpin] = useState(false);
  const { sound } = useContext(SoundContext);
 

  useEffect(() => {
    if (Number(amount) === MAX_AMOUNT) {
      setShowTooltip(true);
      if (tooltipTimeout.current) {
        clearTimeout(tooltipTimeout.current);
      }
      tooltipTimeout.current = window.setTimeout(() => {
        setShowTooltip(false);
      }, 1000);
    }
  }, [MAX_AMOUNT, amount]);

  const handleMax = () => {
    setAmount(MAX_AMOUNT.toFixed(2));
    //  setShowTooltip(true);
    if (sound) {
      playButtonSound();
    }
  };

  const handleMin = () => {
    setAmount(MIN_AMOUNT.toFixed(2));
    if (sound) {
      playButtonSound();
    }
  };


  return (
    <div className="game-container">
      {/* Combination */}
      <Combination
        winCombo={winCombo}
        resultData={resultData}
        amount={amount}
      ></Combination>

      {/* Ball slot */}
      <BallSlot
        spin={spin}
        setSpin={setSpin}
        resultData={resultData}
        socket={socket}
      ></BallSlot>

      {/* BetButton and InputSection */}
      <div className={`game-betslip ${isBetting ? "bet-game-betslip" : ""}`}>
        <BetButton
          handlePlacebet={handlePlacebet}
          spin={spin}
          setSpin={setSpin}
        ></BetButton>
        <InputSection
          isBetting={isBetting}
          amount={amount}
          setAmount={setAmount}
          handleMax={handleMax}
          handleMin={handleMin}
          MAX_AMOUNT={MAX_AMOUNT}
          MIN_AMOUNT={MIN_AMOUNT}
          showTooltip={showTooltip}
        ></InputSection>
      </div>
    </div>
  );
}

export default Game;
