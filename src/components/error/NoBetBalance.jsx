import React, { useEffect } from "react";

function NoBetBalance({ setShowBalance, showBalance }) {
  useEffect(() => {
    let timer;
    if (showBalance) {
      timer = setTimeout(() => {
        setShowBalance(false);
      }, 2000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [showBalance, setShowBalance]);
  return (
    <div className="toast-header">
      <div className="toast-text">Not enough balance</div>
      <button onClick={() => setShowBalance(false)} className="toast-close">
        ×
      </button>
    </div>
  );
}

export default NoBetBalance;
