import React from 'react'

function BallDetails() {
  return (
    <div className={`gamelimits-overlay ${gameLimits ? "overlay-open" : ""}`}>
      <div
        className={`gamelimits-modal ${
          gameLimits ? "modal-show" : "modal-close"
        } `}
      >
        Heeee
      </div>
    </div>
  );
}

export default BallDetails
