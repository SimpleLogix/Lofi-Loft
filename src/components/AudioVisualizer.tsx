import React from "react";

type Props = {
  isPlaying: boolean;
};

const AudioVisualizer = ({ isPlaying }: Props) => {
  return (
    <div className="audio-visualizer center">
      {Array.from({ length: 20 }, (_, index) => (
        <div
          key={index}
          className="audio-bar"
          style={{
            animation: `${
              isPlaying
                ? `bar-animation ${Math.random() + 0.5}s infinite alternate`
                : "none"
            }`,
          }}
        ></div>
      ))}
    </div>
  );
};

export default AudioVisualizer;
