import React, { useState, useRef, useEffect } from "react";
import MediaControls from "../util/MediaControls";

type SliderProps = {
  icon: string;
  value: number;
  onChange: (number: number) => void;
  isMixerOpen: boolean;
  mediaControls?: MediaControls;
  tooltipText: string;
};

// Slider with an icon right before it
// goes into the div stack inside actions bar
const VolumeSlider = ({
  icon,
  value,
  onChange,
  isMixerOpen,
  mediaControls,
  tooltipText,
}: SliderProps) => {
  const [isHover, setIsHover] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const audioRef = useRef<null | HTMLAudioElement>(null);
  const [oldVal, setOldVal] = useState(value);
  let timer: NodeJS.Timeout;


  // Create a new audio instance when the component mounts
  useEffect(() => {

    if (mediaControls) {
      // only music control has ref
      audioRef.current = mediaControls!.currentTrack.audio;
    } else {
      audioRef.current = new Audio(`/audio/${tooltipText}.mp3`);
      audioRef.current.loop = true;
    }
  }, []); // ran once

  // update audioRef everytime track changes
  useEffect(() => {
    if (mediaControls) {
      audioRef.current = mediaControls!.currentTrack.audio;
    }
  }, [mediaControls?.currentTrack, mediaControls]);

  // show slider when hovering over icon
  const handleMouseEnter = () => {
    clearTimeout(timer);
    setIsHover(true);
  };
  const handleMouseExit = () => {
    timer = setTimeout(() => {
      setIsHover(false);
    }, 700);
  };
  // toggle volume onn/off
  const handleIconMouseClick = () => {
    // toggle volume
    const newVolume = isActive ? 0 : oldVal;
    setIsActive(!isActive);

    // play or pause audio
    if (newVolume === 0) {
      audioRef.current!.volume = 0;
      audioRef.current!.pause();
    } else {
      audioRef.current!.volume = oldVal / 100;
      audioRef
        .current!.play()
        .catch((error) => console.error("Audio error", error));
    }
    onChange(newVolume);
    localStorage.setItem(`${icon}Volume`, newVolume.toString());
  };
  // handle slider value change
  const handleSliderMouseClick = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const volume = Number(event.target.value);
    onChange(volume);
    setOldVal(volume);
    setIsActive(volume > 0);
    if (volume === 0) {
      audioRef.current!.pause();
    } else {
      audioRef.current!.play();
    }
    audioRef.current!.volume = volume / 100;
    mediaControls?.setVolume(volume);
  };

  return (
    <div className="slider-parent center">
      <i
        className={`${
          isActive ? "active-icon" : "inactive-icon"
        } material-symbols-outlined`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseExit}
        onClick={handleIconMouseClick}
      >
        {icon}
      </i>
      <input
        className={`${isMixerOpen || isHover ? "fadeIn frosty slider" : "hidden"}`}
        type="range"
        min={0}
        max={100}
        value={value}
        onMouseMove={handleMouseEnter}
        onMouseLeave={handleMouseExit}
        onChange={handleSliderMouseClick}
        onMouseUp={(event) => {
          //save to local storage
          localStorage.setItem(`${icon}Volume`, value.toString());
        }}
      />
      {isHover ? (
        <div className={`${isHover ? "frosty tooltip" : ""}`}>
          {tooltipText}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default VolumeSlider;
