import React, { useRef, useState, useCallback } from "react";
import "./styles/app.css";
import MediaPlayer from "./components/MediaPlayer";
import ActionsBar from "./components/ActionsBar";
import MediaControls from "./util/MediaControls";

function App() {
  const mediaControls = useRef(new MediaControls()).current;
  const [isScenesOpen, setIsScenesOpen] = useState(false);
  const [isMixerOpen, setIsMixerOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMoodMenuOpen, setIsMoodMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

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

  // load scene background from local storage
  const [scene, setScene] = useState(
    localStorage.getItem("scene") !== null
      ? localStorage.getItem("scene")!
      : "room.jpg"
  );

  // closes menus on clicking outside
  const closeMenus = useCallback(() => {
    if (isMixerOpen || isScenesOpen || isMoodMenuOpen) {
      setIsMixerOpen(false);
      setIsScenesOpen(false);
      setIsMoodMenuOpen(false);
    } else {
      setIsMenuOpen(false);
    }
  }, [isMixerOpen, isScenesOpen, isMoodMenuOpen]);

  return (
    <div
      className="background"
      style={{
        backgroundImage: `url(/images/${scene})`,
      }}
      onClick={closeMenus}
      onDoubleClick={fullscreenClick}
    >
      <div>
        <ActionsBar
          mediaControls={mediaControls}
          changeSceneCallback={(name) => {
            setScene(name); // change background in app
          }}
          isMuted={isMuted}
          isMixerOpen={isMixerOpen}
          isScenesOpen={isScenesOpen}
          isMenuOpen={isMenuOpen}
          isMoodMenuOpen={isMoodMenuOpen}
          setIsMixerOpen={setIsMixerOpen}
          setIsScenesOpen={setIsScenesOpen}
          setIsMenuOpen={setIsMenuOpen}
          setIsMoodMenuOpen={setIsMoodMenuOpen}
        ></ActionsBar>
        <i className="material-icons fullscreen-icon" onClick={fullscreenClick}>
          fullscreen
        </i>
      </div>
      <MediaPlayer
        mediaControls={mediaControls}
        muteCallback={setIsMuted}
      ></MediaPlayer>
      <div className="logo">Lofi Loft</div>
    </div>
  );
}

export default App;
