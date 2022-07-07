import React from "react";
import "./spinner-styles.css";
import loadingGif from "./loading.gif"
const Spinner = () => {
  return (
    <div className="spinner-wrapper">

      <img src={loadingGif} alt="wait until the page loads" width={500} height={500} />
    </div>
  );
};

export default Spinner;
