import React, { useState } from "react";

type Props = {};

export default function PlayBar({}: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const handlePlayClick = (event: React.MouseEvent<HTMLElement>) => {
    setIsPlaying(!isPlaying);
  };
  const handleMutedClick = (event: React.MouseEvent<HTMLElement>) => {
    setIsMuted(!isMuted);
  };
  return (
    <div className="center column">
      <div>12:00pm</div>
      <div className="play-bar bar center">
        <i className="material-icons">fast_rewind</i>
        <i onClick={handlePlayClick} className="material-icons">
          {isPlaying ? "pause" : "play_arrow"}
        </i>
        <i className="material-icons">fast_forward</i>
        <i onClick={handleMutedClick} className="material-icons">
          {isMuted ? "volume_off" : "volume_up"}
        </i>
      </div>
      <div className="track-metadata">
        <span>Track Name</span>- <span>Track Artist</span>
      </div>
    </div>
  );
}
