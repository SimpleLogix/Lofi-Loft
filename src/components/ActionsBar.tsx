import React, { useState, useEffect } from "react";

type Props = {};

export default function ActionsBar({}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

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

  

  return (
    <div className={`actions-bar bar column ${isOpen ? "open" : ""}`}>
      <i className={`material-icons hamburger `} onClick={hamburgerClick}>
        menu
      </i>
    </div>
  );
}
