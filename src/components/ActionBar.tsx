import React, { useState, useEffect } from "react";
import Icon from "./Icon";
import VolumeSlider from "./VolumeSlider";
import "../styles/actionbar.css";
import MediaControls from "../util/MediaControls";
import Scenes from "./Scenes";
import MoodMenu from "./MoodMenu";

type Props = {
  mediaControls: MediaControls;
  ambienceVolume: number;
  rainVolume: number;
  thunderVolume: number;
  trafficVolume: number;
  musicVolume: number;
  mood: string;
  scene: string;
  isMuted: boolean;
  isMenuOpen: boolean;
  isMixerOpen: boolean;
  isScenesOpen: boolean;
  isMoodMenuOpen: boolean;
  setIsMenuOpen: (isMenuOpen: boolean) => void;
  setIsMixerOpen: (isMixerOpen: boolean) => void;
  setIsScenesOpen: (isScenesOpen: boolean) => void;
  setIsMoodMenuOpen: (isMoodMenuOpen: boolean) => void;
  setAmbienceVolume: (ambienceVolume: number) => void;
  setRainVolume: (rainVolume: number) => void;
  setThunderVolume: (thunderVolume: number) => void;
  setTrafficVolume: (trafficVolume: number) => void;
  setMusicVolume: (musicVolume: number) => void;
  setScene: (scene: string) => void;
  setMood: (mood: string) => void;
  changeSceneCallback: (scene: string) => void;
};

const ActionBar = ({
  mediaControls,
  ambienceVolume,
  rainVolume,
  thunderVolume,
  trafficVolume,
  musicVolume,
  mood,
  scene,
  isMuted,
  isMenuOpen,
  setIsMenuOpen,
  isMixerOpen,
  setIsMixerOpen,
  isScenesOpen,
  setIsScenesOpen,
  isMoodMenuOpen,
  setIsMoodMenuOpen,
  setAmbienceVolume,
  setRainVolume,
  setThunderVolume,
  setTrafficVolume,
  setMusicVolume,
  setScene,
  setMood,
  changeSceneCallback,
}: Props) => {
  // state toggles
  const [isLightModeToggle, setIsLightModeToggle] = useState(true);
  const [isMixerHover, setIsMixerHover] = useState(false);
  const [isScenesHover, setIsScenesHover] = useState(false);
  const [isMoodMenuHover, setIsMoodMenuHover] = useState(false);
  const [isVolumesMuted, setIsVolumesMuted] = useState(isMuted);

  //? useEffects
  // close Action bar on resize < 500 vh
  useEffect(() => {
    function handleResize() {
      setIsMenuOpen(window.innerHeight > 320 && isMenuOpen);
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMenuOpen, setIsMenuOpen]);

  //? handle CLICKs
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
    setIsLightModeToggle(!isLightModeToggle);
  };

  const handleScenesClick = (event: React.MouseEvent<HTMLElement>) => {
    closeAllMesnus();
    setIsScenesOpen(!isScenesOpen);
  };

  const handleMixerClick = (event: React.MouseEvent<HTMLElement>) => {
    closeAllMesnus();
    setIsMixerOpen(!isMixerOpen);
  };
  const handleMoodMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    closeAllMesnus();
    setIsMoodMenuOpen(!isMoodMenuOpen);
  };

  const closeAllMesnus = () => {
    setIsMixerOpen(false);
    setIsScenesOpen(false);
    setIsMoodMenuOpen(false);
  };

  //? volume SLIDER values
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

  //? HOVER: show slider when hovering over icon
  const handleMixerMouseEnter = () => {
    setIsMixerHover(true);
  };
  const handleMixerMouseExit = () => {
    setIsMixerHover(false);
  };
  const handleScenesMouseEnter = () => {
    setIsScenesHover(true);
  };
  const handleScenesMouseExit = () => {
    setIsScenesHover(false);
  };
  const handleMoodMouseEnter = () => {
    setIsMoodMenuHover(true);
  };
  const handleMoodMouseExit = () => {
    setIsMoodMenuHover(false);
  };

  // change scene on click
  const handleChangeScene = (scene: string) => {
    setScene(scene);
    localStorage.setItem("scene", scene);
    changeSceneCallback(scene); // call back to main app to change background
  };

  // change mood option
  const handleMoodChange = (mood: string) => {
    setMood(mood);
    localStorage.setItem("mood", mood);
    console.log(mood);
  };

  return (
    <div
      className="actions-holder"
      onDoubleClick={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className={`actions-bar frosty bar column ${isMenuOpen ? "open" : ""}`}
      >
        <i className={`material-icons hamburger `} onClick={hamburgerClick}>
          menu
        </i>
        <div className={`${isMenuOpen ? "icons-column" : "hidden"} `}>
          <Icon
            icon="discover_tune"
            isHover={isMixerHover}
            tooltipText="Audio Mixer"
            onMouseEnter={handleMixerMouseEnter}
            onMouseLeave={handleMixerMouseExit}
            onClick={handleMixerClick}
            isSelected={isMixerOpen}
          ></Icon>

          {/* Scenes */}
          <Icon
            icon="wallpaper"
            isHover={isScenesHover}
            tooltipText="Scenes"
            onMouseEnter={handleScenesMouseEnter}
            onMouseLeave={handleScenesMouseExit}
            onClick={handleScenesClick}
            isSelected={isScenesOpen}
          ></Icon>

          {/* Light/Dark mode toggle */}
          <i
            onClick={handleDarkLightModeToggle}
            className={`material-symbols-outlined ${
              isLightModeToggle ? "light-mode" : "dark-mode"
            }`}
          >
            {isLightModeToggle ? "dark_mode" : "light_mode"}
          </i>

          <Icon
            icon="theater_comedy"
            isHover={isMoodMenuHover}
            tooltipText="Mood"
            onMouseEnter={handleMoodMouseEnter}
            onMouseLeave={handleMoodMouseExit}
            onClick={handleMoodMenuClick}
            isSelected={isMoodMenuOpen}
          ></Icon>

          <VolumeSlider
            icon="forest"
            isMixerOpen={isMixerOpen}
            value={ambienceVolume}
            onChange={handleAmbienceChange}
            tooltipText="Ambience"
            isMuted={isMuted}
          ></VolumeSlider>

          <VolumeSlider
            icon="rainy"
            isMixerOpen={isMixerOpen}
            value={rainVolume}
            onChange={handleRainChange}
            tooltipText="Rain"
            isMuted={isMuted}
          ></VolumeSlider>

          <VolumeSlider
            icon="bolt"
            isMixerOpen={isMixerOpen}
            value={thunderVolume}
            onChange={handleThunderChange}
            tooltipText="Thunder"
            isMuted={isMuted}
          ></VolumeSlider>

          <VolumeSlider
            icon="train"
            isMixerOpen={isMixerOpen}
            value={trafficVolume}
            onChange={handleTrafficChange}
            tooltipText="Traffic"
            isMuted={isMuted}
          ></VolumeSlider>

          <VolumeSlider
            icon="music_note"
            isMixerOpen={isMixerOpen}
            value={musicVolume}
            onChange={handleMusicVolumeChange}
            mediaControls={mediaControls}
            tooltipText="Music"
            isMuted={isMuted}
          ></VolumeSlider>
        </div>
      </div>
      <Scenes
        isOpen={isScenesOpen}
        scene={scene}
        changeSceneCallback={handleChangeScene}
      />
      <MoodMenu
        isMoodMenuOpen={isMoodMenuOpen}
        setMoodCallback={handleMoodChange}
        selectedMood={mood}
      ></MoodMenu>
    </div>
  );
};

export default ActionBar;
