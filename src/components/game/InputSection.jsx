import React, { useContext, useState } from "react";
import "../game/Game.css";
import { playButtonSound } from "../../utility/gameSettings";
import { SoundContext } from "../../context/SoundContext";

function InputSection({
  amount,
  setAmount,
  MAX_AMOUNT,
  MIN_AMOUNT,
  showTooltip,
  handleMax,
  handleMin,
  isBetting,
}) {
  const disableMin = Number(amount) === MIN_AMOUNT;
  const disableMax = Number(amount) === MAX_AMOUNT;
  const [errorInput, setErrorInput] = useState(""); // Error message
  const [errorInputModal, setErrorInputModal] = useState("");
  const { sound } = useContext(SoundContext);

  const validateAmount = (value) => {
    if (!value) {
      setErrorInput("Minimum bet amount is 10.00");
      setErrorInputModal(true);
    } else if (Number(value) < 10) {
      setErrorInput("Minimum bet amount is 10.00");
      setErrorInputModal(true);
    } else if (Number(value) > 20000) {
      setErrorInput("Maximum bet amount is 20000.00");
      setErrorInputModal(true);
    } else {
      setErrorInput(""); // Clear the error message
      setErrorInputModal(false); // Close the error modal when valid
    }
  };

  // const handleAmountChange = (event) => {
  //   event.preventDefault();
  //   let inputValue = event.target.value.replace(/[^0-9.]/g, "");

  //   if (inputValue) {
  //     let numericValue = inputValue;
  //     if (numericValue > MAX_AMOUNT) {
  //       numericValue = MAX_AMOUNT;
  //     }
  //     setAmount(numericValue.toString());
  //     validateAmount(inputValue);
  //   } else {
  //     setAmount("");
  //   }
  // };

 const handleAmountChange = (event) => {
   event.preventDefault();
   let inputValue = event.target.value;

   // Step 1: Remove non-numeric characters except for the decimal point
   inputValue = inputValue.replace(/[^0-9.]/g, "");

   // Step 2: Remove leading zeros, but ensure we keep at least one zero if the input is empty
   if (inputValue.startsWith("0") && inputValue.length > 1) {
     inputValue = inputValue.replace(/^0+/, "0");
   }

   // Step 3: Ensure only valid digits (1-9) follow after the initial zero
   if (inputValue.length > 1 && inputValue[0] === "0") {
     inputValue = "0" + inputValue.slice(1).replace(/^0+/, "");
   }

   // Step 4: Limit decimal part to two digits if a decimal exists
   if (inputValue.includes(".")) {
     const [integerPart, decimalPart] = inputValue.split(".");
     if (decimalPart.length > 2) {
       inputValue = `${integerPart}.${decimalPart.slice(0, 2)}`; // Limit to two decimal places
     }
   }

   // Step 5: Check if input exceeds MAX_AMOUNT and cap the value
   if (inputValue && parseFloat(inputValue) > MAX_AMOUNT) {
     inputValue = MAX_AMOUNT.toString(); // Ensure it doesn't exceed the MAX_AMOUNT
   }

   // Step 6: Update state with the sanitized value
   setAmount(inputValue);
   validateAmount(inputValue);
 };


  const handleAmountChangeBlur = (event) => {
    event.preventDefault();
    let numericValue = parseFloat(event.target.value);
    if (
      isNaN(numericValue) ||
      numericValue < MIN_AMOUNT ||
      numericValue <= MAX_AMOUNT
    ) {
      // If input is empty or less than 1.01, set it to the minimum value
      setAmount("10.00");
      setErrorInput(""); // Clear any error message
      setErrorInputModal(false); // Ensure the modal does not show
    }
    if (isNaN(numericValue) || numericValue === "") {
      numericValue = MIN_AMOUNT;
    } else {
      // Ensure the value is within the specified range
      if (numericValue < MIN_AMOUNT) {
        numericValue = MIN_AMOUNT;
      } else if (numericValue > MAX_AMOUNT) {
        numericValue = MAX_AMOUNT;
      }
    }
    setAmount(numericValue.toFixed(2));
  };

  const buttonStyle = (disabled) => ({
    cursor: disabled ? "default" : "",
  });

  // amount increse function
  const handleIncrease = () => {
    let numericValue = parseFloat(amount);
    if (isNaN(numericValue) || amount === "") {
      numericValue = MIN_AMOUNT;
    } else {
      numericValue += MIN_AMOUNT;
      if (numericValue > MAX_AMOUNT) {
        numericValue = MAX_AMOUNT;
      }
    }
    if (sound) {
      playButtonSound();
    }
    setAmount(numericValue.toFixed(2));
  };

  // Amount decrease function
  const handleDecrease = () => {
    let numericValue = parseFloat(amount);
    if (isNaN(numericValue) || amount === "") {
      numericValue = MIN_AMOUNT;
    } else if (numericValue > MIN_AMOUNT) {
      numericValue -= MIN_AMOUNT;
    }
    numericValue = Math.max(MIN_AMOUNT, numericValue);
    if (sound) {
      playButtonSound();
    }
    setAmount(numericValue.toFixed(2));
  };

  return (
    <div className="inpute-text-wrapper">
      <div className="inpute-button-sm">
        <button
          style={buttonStyle(disableMin)}
          className={`inpute-button-text ${isBetting ? "c-default" : ""}`}
          disabled={disableMin || isBetting}
          onClick={handleMin}
        >
          Min
        </button>
      </div>
      <div className="inpute-button-sm">
        <button
          className={`inpute-button-text ${isBetting ? "c-default" : ""}`}
          disabled={amount === MIN_AMOUNT || isBetting}
          type="button"
          style={{ cursor: amount === MIN_AMOUNT ? "default" : "" }}
          onClick={handleDecrease}
        >
          -
        </button>
      </div>
      <div className="inpute-button-sm">
        <button
          className={`inpute-button-text ${isBetting ? "c-default" : ""}`}
          disabled={amount === MAX_AMOUNT || isBetting}
          type="button"
          style={{ cursor: amount === MAX_AMOUNT ? "default" : "" }}
          onClick={handleIncrease}
          onKeyDown={(e) => e.key === " " && e.preventDefault()}
        >
          +
        </button>
      </div>
      <div className="inpute-button-sm">
        <button
          style={buttonStyle(disableMax)}
          className={`inpute-button-text ${isBetting ? "c-default" : ""}`}
          disabled={disableMax || isBetting}
          onClick={handleMax}
        >
          Max
        </button>
      </div>
      <div
        className={`game-inpute-wrapper ${
          errorInput && errorInputModal ? "input-warning" : "default-bottom"
        }`}
      >
        <div className="inpute-name-text">
          Bet Amount
          <span className={`tooltips-box ${showTooltip ? "_show" : ""}`}>
            i
            <span className="toltips-hint">
              Maximum Win for One Round 200,000.00
            </span>
          </span>
        </div>
        <input
          type="text"
          inputMode="numeric"
          placeholder="Enter Bet Amount "
          className="bet-input-modal"
          value={amount}
          onKeyDown={(e) =>
            ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
          }
          onBlur={handleAmountChangeBlur}
          onChange={handleAmountChange}
          disabled={isBetting}
        />
        {errorInput && errorInputModal && (
          <div className="error-warning">{errorInput}</div>
        )}
      </div>
    </div>
  );
}

export default InputSection;
