import React, { useRef } from "react";
import "./styles/app.css";
import MediaPlayer from "./components/MediaPlayer";
import ActionsBar from "./components/ActionsBar";
import MediaControls from "./util/MediaControls";

function App() {
  const mediaControls = useRef(new MediaControls()).current;

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
        <ActionsBar mediaControls={mediaControls}></ActionsBar>
        <i className="material-icons fullscreen-icon" onClick={fullscreenClick}>
          fullscreen
        </i>
      </div>
      <MediaPlayer mediaControls={mediaControls}></MediaPlayer>
      <div className="logo">Lofi Loft</div>
    </div>
  );
}

export default App;
