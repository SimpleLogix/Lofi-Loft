import React from "react";
import "./styles/app.css";
import MediaPlayer from "./components/MediaPlayer";
import ActionsBar from "./components/ActionsBar";

function App() {
  // enables fullscreen or exits fullscreen if already in
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
        <i className="material-icons fullscreen-icon" onClick={fullscreenClick}>
          fullscreen
        </i>
      </div>
      <MediaPlayer></MediaPlayer>
    </div>
  );
}

export default App;
