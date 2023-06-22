import React, { useState, useEffect } from "react";
import MediaControls from "../util/MediaControls";
import "../styles/mediaplayer.css";
import AudioVisualizer from "./AudioVisualizer";

type Props = {
  mediaControls: MediaControls;
  isPlaying: boolean;
  musicVolume: number;
  isMuted: boolean;
  setIsMuted: (isMuted: boolean) => void;
  setIsPlaying: (isPlaying: boolean) => void;
};

const MediaPlayer = ({
  mediaControls,
  isPlaying,
  isMuted,
  setIsMuted,
  setIsPlaying,
}: Props) => {
  const [currentTrack, setCurrentTrack] = useState(mediaControls.currentTrack);
  const [duration, setDuration] = useState(0); // displayed track duration
  const [currentTime, setCurrentTime] = useState(0); // displayed current time

  //? useEffects
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

  // play next audio when current audio ends
  useEffect(() => {
    mediaControls.currentTrack.audio.onended = () => mediaControls.next();
    setCurrentTrack(mediaControls.currentTrack);
  }, [mediaControls.currentTrack.audio, mediaControls]);

  //? state handlers
  const handlePausePlayClick = (event: React.MouseEvent<HTMLElement>) => {
    if (isPlaying) {
      mediaControls.pause();
    } else {
      mediaControls.play();
      setIsMuted(false);
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

  const handleTrackPositionUpdate = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCurrentTime(Number(event.target.value));
    mediaControls.currentTrack.audio.currentTime = Number(event.target.value);
  };

  const handleMuteClick = (event: React.MouseEvent<HTMLElement>) => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="center column mp-parent">
      <AudioVisualizer isPlaying={isPlaying}></AudioVisualizer>

      <div
        className="center column mp-container frosty bar"
        onDoubleClick={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="track-bar">
          <input
            type="range"
            id="track-slider"
            value={mediaControls.currentTrack.audio.currentTime}
            min={0}
            max={mediaControls.currentTrack.audio.duration || 0}
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
          <div>
            <i onClick={handleRewindClick} className="material-icons">
              fast_rewind
            </i>
          </div>

          {/* Play/Pause */}
          <i
            onClick={handlePausePlayClick}
            className="material-symbols-outlined play-pause"
          >
            {isPlaying ? "pause_circle" : "play_circle"}
          </i>
          <div className="center">
            <i onClick={handleForwardClick} className="material-icons">
              fast_forward
            </i>
            <i onClick={handleMuteClick} className="material-icons">
              {isMuted ? "volume_off" : "volume_up"}
            </i>
            <i></i>
          </div>
        </div>
      </div>
    </div>
  );
};

// helpers

const secondsToString = (seconds: number): string => {
  if (isNaN(seconds)) return "0:00";
  const roundedSec = Math.round(seconds);
  const min = Math.floor(roundedSec / 60);
  const sec = roundedSec % 60;
  return `${min}:${sec < 10 ? "0" + sec : sec}`;
};

export default MediaPlayer;
