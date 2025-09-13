import React from 'react'

import { IoCloseSharp } from "react-icons/io5";
import '../modals/Modal.css'

function Limits({ handleLimits, setOpenLimits }) {

  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      setOpenLimits(false);
    }
  };
  return (
    <div className="overlay-1" onClick={handleOutsideClick}>
      <div className="modal-new">
        <div className="modal-head" style={{ paddingLeft: "0" }}>
          <div
            className="limit-head"
            style={{ fontSize: "0.9rem", fontWeigh: "500" }}
          >
            Limits
          </div>
          <div onClick={handleLimits}>
            <IoCloseSharp
              className="close"
              style={{ fontSize: "18px", fontWeight: "bolder", strokeWidth:"5px" }}
            />
          </div>
        </div>
        <div className="modal-body" style={{ gap: "1.5rem" }}>
          <div className="limit-block">
            <p className="value-para">Minimum Bet</p>
            <p className="value">10.00</p>
          </div>
          <div className="limit-block">
            <p className="value-para">Maximum Bet</p>
            <p className="value">20,000.00</p>
          </div>
          <div className="limit-block">
            <p className="value-para">Maximum win for one Round</p>
            <p className="value">2,00,000.00</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Limits
