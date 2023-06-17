import React, { useState, useEffect } from "react";
import "../styles/actionbar.css";
import Scenes from "./Scenes";
import VolumeSlider from "./VolumeSlider";
import MediaControls from "../util/MediaControls";

type Props = {
  mediaControls: MediaControls;
};

export default function ActionsBar({ mediaControls }: Props) {
  // state toggles
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLightMode, setIsLightMode] = useState(true);
  const [isScenesOpen, setIsScenesOpen] = useState(false);
  const [isMixerOpen, setIsMixerOpen] = useState(false);

  // load volume statet values from local storage
  const [ambienceVolume, setAmbienceVolume] = useState(
    localStorage.getItem("forestVolume") !== null
      ? Number(localStorage.getItem("forestVolume"))
      : 0
  );
  const [rainVolume, setRainVolume] = useState(
    localStorage.getItem("rainyVolume") !== null
      ? Number(localStorage.getItem("rainyVolume"))
      : 0
  );
  const [thunderVolume, setThunderVolume] = useState(
    localStorage.getItem("boltVolume") !== null
      ? Number(localStorage.getItem("boltVolume"))
      : 0
  );
  const [trafficVolume, setTrafficVolume] = useState(
    localStorage.getItem("trainVolume") !== null
      ? Number(localStorage.getItem("trainVolume"))
      : 0
  );
  const [musicVolume, setMusicVolume] = useState(
    localStorage.getItem("music_noteVolume") !== null
      ? Number(localStorage.getItem("music_noteVolume"))
      : 80
  );

  // close Action bar on resize < 500 vh
  useEffect(() => {
    function handleResize() {
      setIsMenuOpen(window.innerHeight > 320 && isMenuOpen);
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMenuOpen]);

  // open menu
  function hamburgerClick(event: React.MouseEvent<HTMLElement>) {
    if (window.innerHeight < 320) return;
    if (isMenuOpen) {
      setIsScenesOpen(false);
      setIsMixerOpen(false);
    }
    setIsMenuOpen(!isMenuOpen);
  }

  const handleDarkLightModeToggle = (event: React.MouseEvent<HTMLElement>) => {
    setIsLightMode(!isLightMode);
  };

  const handleScenesClick = (event: React.MouseEvent<HTMLElement>) => {
    setIsMixerOpen(false);
    setIsScenesOpen(!isScenesOpen);
  };

  const handleMixerClick = (event: React.MouseEvent<HTMLElement>) => {
    setIsScenesOpen(false);
    setIsMixerOpen(!isMixerOpen);
  };

  // volume slider values
  const handleAmbienceChange = (number: number) => {
    setAmbienceVolume(number);
  };
  const handleRainChange = (number: number) => {
    setRainVolume(number);
  };
  const handleThunderChange = (number: number) => {
    setThunderVolume(number);
  };
  const handleTrafficChange = (number: number) => {
    setTrafficVolume(number);
  };
  const handleMusicVolumeChange = (number: number) => {
    setMusicVolume(number);
  };

  return (
    <div className="actions-holder">
      <div
        className={`actions-bar frosty bar column ${isMenuOpen ? "open" : ""}`}
      >
        <i className={`material-icons hamburger `} onClick={hamburgerClick}>
          menu
        </i>
        {isMenuOpen ? (
          <div className="icons-column">
            <i className="material-icons" onClick={handleMixerClick}>
              tune
            </i>

            <i
              className={`material-icons ${isScenesOpen ? "selected" : ""}`}
              onClick={handleScenesClick}
            >
              wallpaper
            </i>

            <i
              onClick={handleDarkLightModeToggle}
              className={`material-symbols-outlined ${
                isLightMode ? "light-mode" : "dark-mode"
              }`}
            >
              {isLightMode ? "dark_mode" : "light_mode"}
            </i>

            <VolumeSlider
              icon="forest"
              isMixerOpen={isMixerOpen}
              value={ambienceVolume}
              onChange={handleAmbienceChange}
              tooltipText="Ambience"
            ></VolumeSlider>

            <VolumeSlider
              icon="rainy"
              isMixerOpen={isMixerOpen}
              value={rainVolume}
              onChange={handleRainChange}
              tooltipText="Rain"
            ></VolumeSlider>

            <VolumeSlider
              icon="bolt"
              isMixerOpen={isMixerOpen}
              value={thunderVolume}
              onChange={handleThunderChange}
              tooltipText="Thunder"
            ></VolumeSlider>

            <VolumeSlider
              icon="train"
              isMixerOpen={isMixerOpen}
              value={trafficVolume}
              onChange={handleTrafficChange}
              tooltipText="Traffic"
            ></VolumeSlider>

            <VolumeSlider
              icon="music_note"
              isMixerOpen={isMixerOpen}
              value={musicVolume}
              onChange={handleMusicVolumeChange}
              mediaControls={mediaControls}
              tooltipText="Music"
            ></VolumeSlider>
          </div>
        ) : (
          <i className="hidden"></i>
        )}
      </div>
      <Scenes isOpen={isScenesOpen}></Scenes>
    </div>
  );
}
