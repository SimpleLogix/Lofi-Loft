import React, { useState, useRef } from "react";
import MediaPlayer from "../util/MediaPlayer";

type Props = {};

export default function PlayBar({}: Props) {
  // states
  const mediaPlayer = useRef(new MediaPlayer()).current;
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  
  // state handlers
  const handlePlayClick = (event: React.MouseEvent<HTMLElement>) => {
    if (isPlaying) {
      mediaPlayer.pause();
    } else {
      mediaPlayer.play();
    }
    setIsPlaying(!isPlaying);
  };
  const handleMutedClick = (event: React.MouseEvent<HTMLElement>) => {
    if (isMuted) {
      mediaPlayer.unmute();
    } else {
      mediaPlayer.mute();
    }
    setIsMuted(!isMuted);
  };

  return (
    <div className="center column">
      <div>12:00pm</div>
      <div className="play-bar bar center">
        {/* << */}
        <i onClick={() => mediaPlayer.prev()} className="material-icons">
          fast_rewind
        </i>
        {/* Play/Pause */}
        <i onClick={handlePlayClick} className="material-icons">
          {isPlaying ? "pause" : "play_arrow"}
        </i>
        {/* >> */}
        <i onClick={() => mediaPlayer.next()} className="material-icons">
          fast_forward
        </i>
        {/* Volume */}
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
