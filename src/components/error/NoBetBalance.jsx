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
    <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
      <div className="toast-header" style={{width:"200px"}}>
        <div className="toast-text">Not Enough Balance</div>
        <button onClick={() => setShowBalance(false)} className="toast-close">
          ×
        </button>
      </div>
    </div>
  );
}

export default NoBetBalance;
