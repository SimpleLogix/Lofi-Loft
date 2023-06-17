import React, { useState, useRef, useEffect } from "react";
import MediaControls from "../util/MediaControls";
import "../styles/mediaplayer.css";

type Props = {
  mediaControls: MediaControls;
};

export default function MediaPlayer({ mediaControls }: Props) {
  // states
  const [currentTrack, setCurrentTrack] = useState(mediaControls.currentTrack);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // state handlers
  const handlePausePlayClick = (event: React.MouseEvent<HTMLElement>) => {
    if (isPlaying) {
      mediaControls.pause();
    } else {
      mediaControls.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleRewindClick = (event: React.MouseEvent<HTMLElement>) => {
    const res = mediaControls.prev();
    if (res === 0) {
      mediaControls.play();
      setCurrentTrack(mediaControls.currentTrack);
      setIsPlaying(true);
    }
  };
  const handleForwardClick = (event: React.MouseEvent<HTMLElement>) => {
    mediaControls.next();
    setCurrentTrack(mediaControls.currentTrack);
    setIsPlaying(true);
  };

  // update duration and add event listener to audio on load
  useEffect(() => {
    // update current time state every time audio updates
    const handleTimeUpdate = () => {
      const time = currentTrack.audio.currentTime;
      setCurrentTime(time);
    };

    // load duration of track
    const handleMetadataLoad = () => {
      const dur = currentTrack.audio.duration;
      setDuration(dur);
    };

    const audio = currentTrack.audio;
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleMetadataLoad);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleMetadataLoad);
    };
  }, [currentTrack]);

  // pause  state when audio is paused
  useEffect(() => {
    setIsPlaying(!mediaControls.currentTrack.audio.paused);
  }, [mediaControls.currentTrack.audio.paused]);

  useEffect(() => {
    mediaControls.currentTrack.audio.onended = () => mediaControls.next();
    setCurrentTrack(mediaControls.currentTrack);
  }, [mediaControls.currentTrack.audio]);

  const handleTrackPositionUpdate = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCurrentTime(Number(event.target.value));
    mediaControls.currentTrack.audio.currentTime = Number(event.target.value);
  };

  return (
    <div className="center column mp-container frosty bar">
      <div className="track-bar">
        <input
          type="range"
          id="track-slider"
          value={mediaControls.currentTrack.audio.currentTime}
          min={0}
          max={mediaControls.currentTrack.audio.duration}
          onChange={handleTrackPositionUpdate}
        />
        <div className="track-time">
          <div>{secondsToString(currentTime)}</div>
          <div>
            {secondsToString(mediaControls.currentTrack.audio.duration)}
          </div>
        </div>
        <div className="track-metadata">{currentTrack.name}</div>
      </div>

      <div className="center controls">
        <i onClick={handleRewindClick} className="material-icons">
          fast_rewind
        </i>
        {/* Play/Pause */}
        <i
          onClick={handlePausePlayClick}
          className="material-symbols-outlined play-pause"
        >
          {isPlaying ? "pause_circle" : "play_circle"}
        </i>
        <i onClick={handleForwardClick} className="material-icons">
          fast_forward
        </i>
      </div>
    </div>
  );
}

// helpers

const secondsToString = (seconds: number): string => {
  if (isNaN(seconds)) return "0:00";
  const roundedSec = Math.round(seconds);
  const min = Math.floor(roundedSec / 60);
  const sec = roundedSec % 60;
  return `${min}:${sec < 10 ? "0" + sec : sec}`;
};

// returns the off set of the track duration
// used in the track bar to position the little cirlce
const getPercentageTrackDone = (current: number, duration: number): string => {
  return `calc(-6px + ${Math.round((current / duration) * 100)}%)`;
};
