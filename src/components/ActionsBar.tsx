import React, { useState, useEffect } from "react";
import "../styles/actionbar.css";
import Scenes from "./Scenes";
import VolumeSlider from "./VolumeSlider";
import MediaControls from "../util/MediaControls";
import Icon from "./Icon";
import MoodMenu from "./MoodMenu";

type Props = {
  mediaControls: MediaControls;
  changeSceneCallback: (scene: string) => void;
  isMuted: boolean;
  isMixerOpen: boolean;
  setIsMixerOpen: (isMixerOpen: boolean) => void;
  isScenesOpen: boolean;
  setIsScenesOpen: (isScenesOpen: boolean) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (isMenuOpen: boolean) => void;
  isMoodMenuOpen: boolean;
  setIsMoodMenuOpen: (isMoodMenuOpen: boolean) => void;
};

export default function ActionsBar({
  mediaControls,
  changeSceneCallback,
  isMuted,
  isMixerOpen,
  isScenesOpen,
  isMenuOpen,
  isMoodMenuOpen,
  setIsMixerOpen,
  setIsScenesOpen,
  setIsMenuOpen,
  setIsMoodMenuOpen,
}: Props) {
  // state toggles
  const [isLightMode, setIsLightMode] = useState(true);
  const [isMixerHover, setIsMixerHover] = useState(false);
  const [isScenesHover, setIsScenesHover] = useState(false);
  const [isMoodMenuHover, setIsMoodMenuHover] = useState(false);
  const [isVolumesMuted, setIsVolumesMuted] = useState(isMuted);

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
  const [mood, setMood] = useState(
    localStorage.getItem("mood") !== null
      ? localStorage.getItem("mood")!
      : "shuffle"
  );

  // load selected scene
  const [scene, setScene] = useState(
    localStorage.getItem("scene") !== null
      ? localStorage.getItem("scene")!
      : "room.jpg"
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

  //todo- figure out how to mute the volume sliders audio
  useEffect(() => {
    console.log("first")
    const muteAllVolumes = (mute: boolean) => {
      setAmbienceVolume(mute ? 0 : ambienceVolume);
      setRainVolume(mute ? 0 : rainVolume);
      setThunderVolume(mute ? 0 : thunderVolume);
      setTrafficVolume(mute ? 0 : trafficVolume);
      setMusicVolume(mute ? 0 : musicVolume);
      setIsVolumesMuted(mute);
    };
  }, [isMuted]);

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

  // show slider when hovering over icon
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
              isLightMode ? "light-mode" : "dark-mode"
            }`}
          >
            {isLightMode ? "dark_mode" : "light_mode"}
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
}
