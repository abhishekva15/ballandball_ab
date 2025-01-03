import React from "react";
import "../error/Error.css";

function ErrorModal({ setErrorModal, error }) {
  return (
    // <div className='e-center'>
    //   <div className="error-modal" style={{ background: "red" }}>
    //     <div className="modal-content-error">
    //       <p className="session-para" style={{ fontSize: "20px" }}>
    //         {error}
    //       </p>
    //       <button
    //         onClick={() => setErrorModal(false)}
    //         type="button"
    //         aria-label="Close"
    //         className="icon-close"
    //       >
    //         <span aria-hidden="true">×</span>
    //       </button>
    //     </div>
    //   </div>
    // </div>
    <div className="toast-header">
      <div className="toast-text">{error}</div>
      <button
        onClick={() => setErrorModal(false)}
        type="button"
        aria-label="Close"
        className="toast-close"
      >
        <span aria-hidden="true">×</span>
      </button>
    </div>
  );
}

export default ErrorModal;
