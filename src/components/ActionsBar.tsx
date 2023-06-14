import React, { useState, useEffect } from "react";
import "../styles/actionbar.css";

type Props = {};

export default function ActionsBar({}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLightMode, setIsLightMode] = useState(true);

  // close Action bar on resize < 500 vh
  useEffect(() => {
    function handleResize() {
      setIsOpen(window.innerHeight > 320 && isOpen);
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen]);

  // open menu
  function hamburgerClick(event: React.MouseEvent<HTMLElement>) {
    if (window.innerHeight < 320) return;
    setIsOpen(!isOpen);
  }

  function handleDarkLightModeToggle(event: React.MouseEvent<HTMLElement>) {
    setIsLightMode(!isLightMode);
  }

  return (
    <div className={`actions-bar bar column ${isOpen ? "open" : ""}`}>
      <i className={`material-icons hamburger `} onClick={hamburgerClick}>
        menu
      </i>
      {isOpen ? (
        <div className="center column">
          <i className="material-icons">tune</i>
          <i className="material-icons">wallpaper</i>
          <i
            onClick={handleDarkLightModeToggle}
            className={`material-symbols-outlined ${
              isLightMode ? "light-mode" : "dark-mode"
            }`}
          >
            {isLightMode ? "dark_mode" : "light_mode"}
          </i>
        </div>
      ) : (
        <i className="hidden"></i>
      )}
    </div>
  );
}
