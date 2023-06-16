import React, { useState, useRef, useEffect } from "react";
import MediaControls from "../util/MediaControls";
import "../styles/mediaplayer.css";

type Props = {};

export default function MediaPlayer({}: Props) {
  // states
  const mediaPlayer = useRef(new MediaControls()).current;
  const [currentTrack, setCurrentTrack] = useState(mediaPlayer.currentTrack);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // state handlers
  const handlePlayClick = (event: React.MouseEvent<HTMLElement>) => {
    if (isPlaying) {
      mediaPlayer.pause();
    } else {
      mediaPlayer.play();
    }
    setIsPlaying(!isPlaying);
  };

  const secondsToString = (seconds: number): string => {
    if (isNaN(seconds)) return "0:00";
    const roundedSec = Math.round(seconds);
    const min = Math.floor(roundedSec / 60);
    const sec = roundedSec % 60;
    return `${min}:${sec < 10 ? "0" + sec : sec}`;
  };

  // returns the off set of the track duration
  // used in the track bar to position the little cirlce
  const getPercentageTrackDone = (): string => {
    return `calc(-6px + ${Math.round((currentTime / duration) * 100)}%)`;
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

  return (
    <div className="center column mp-container bar">
      {/* << */}
      <div className="track-bar">
        <div
          className="track-pos-ball"
          style={{ left: getPercentageTrackDone() }}
        ></div>
        <div className="track-time">
          <div>{secondsToString(currentTime)}</div>
          <div>{secondsToString(mediaPlayer.currentTrack.audio.duration)}</div>
        </div>
        <div className="track-metadata">{currentTrack.name}</div>
      </div>

      <div className="center controls">
        <i
          onClick={() => {
            const res = mediaPlayer.prev();
            if (res === 0) {
              mediaPlayer.play();
              setCurrentTrack(mediaPlayer.currentTrack);
              setIsPlaying(true);
            }
          }}
          className="material-icons"
        >
          fast_rewind
        </i>

        {/* Play/Pause */}
        <i
          onClick={handlePlayClick}
          className="material-symbols-outlined play-pause"
        >
          {isPlaying ? "pause_circle" : "play_circle"}
        </i>

        {/* >> */}
        <i
          onClick={() => {
            mediaPlayer.next();
            setCurrentTrack(mediaPlayer.currentTrack);
            setIsPlaying(true);
          }}
          className="material-icons"
        >
          fast_forward
        </i>
      </div>
    </div>
  );
}
