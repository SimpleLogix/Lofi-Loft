import React, { useState, useEffect } from "react";
import "../styles/actionbar.css";
import Scenes from "./Scenes";

type Props = {};

export default function ActionsBar(props: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLightMode, setIsLightMode] = useState(true);
  const [isScenesOpen, setIsScenesOpen] = useState(false);
  const [isMixerOpen, setIsMixerOpen] = useState(false);

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

  function handleDarkLightModeToggle(event: React.MouseEvent<HTMLElement>) {
    setIsLightMode(!isLightMode);
  }

  const handleScenesClick = (event: React.MouseEvent<HTMLElement>) => {
    setIsMixerOpen(false);
    setIsScenesOpen(!isScenesOpen);
  };

  const handleMixerClick = (event: React.MouseEvent<HTMLElement>) => {
    setIsScenesOpen(false);
    setIsMixerOpen(!isMixerOpen);
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
          <div className="center">
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

            <div className="center slider-parent">
              <i className="material-symbols-outlined">forest</i>
              <div
                className={`${
                  isMixerOpen ? "frosty mixer-slider center" : "hidden"
                }`}
              >
                <div className="mixer-slider-bar center">
                  <div className="mixer-slider-ball"></div>
                </div>
              </div>
            </div>

            <div className="center slider-parent">
              <i className="material-symbols-outlined">rainy</i>
              <div
                className={`${
                  isMixerOpen ? "frosty mixer-slider center" : "hidden"
                }`}
              >
                <div className="mixer-slider-bar center">
                  <div className="mixer-slider-ball"></div>
                </div>
              </div>
            </div>

            <div className="center slider-parent">
              <i className="material-symbols-outlined">bolt</i>
              <div
                className={`${
                  isMixerOpen ? "frosty mixer-slider center" : "hidden"
                }`}
              >
                <div className="mixer-slider-bar center">
                  <div className="mixer-slider-ball"></div>
                </div>
              </div>
            </div>

            <div className="center slider-parent">
              <i className="material-symbols-outlined">train</i>
              <div
                className={`${
                  isMixerOpen ? "frosty mixer-slider center" : "hidden"
                }`}
              >
                <div className="mixer-slider-bar center">
                  <div className="mixer-slider-ball"></div>
                </div>
              </div>
            </div>

            <div className="center slider-parent">
            <i className="material-symbols-outlined">music_note</i>
              <div
                className={`${
                  isMixerOpen ? "frosty mixer-slider center" : "hidden"
                }`}
              >
                <div className="mixer-slider-bar center">
                  <div className="mixer-slider-ball"></div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <i className="hidden"></i>
        )}
      </div>
      <Scenes isOpen={isScenesOpen}></Scenes>
    </div>
  );
}
