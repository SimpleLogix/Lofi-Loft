import React from "react";
import "./styles/app.css";
import PlayBar from "./components/PlayBar";
import ActionsBar from "./components/ActionsBar";

function App() {
  function fullscreenClick(event: React.MouseEvent<HTMLElement>) {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }
  return (
    <div className="background">
      <div>
        <ActionsBar></ActionsBar>
        <PlayBar></PlayBar>
        <i className="material-icons fullscreen-icon" onClick={fullscreenClick}>
          fullscreen
        </i>
      </div>
      <div className="logo"></div>
    </div>
  );
}

export default App;
