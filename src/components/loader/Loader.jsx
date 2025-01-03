import React from 'react'
import "../loader/Loader.css";

function loader({message}) {
  return (
    <div className="loader">
      <div className="spinner"></div>
      <p>{message}</p>
    </div>
  );
}

export default loader
