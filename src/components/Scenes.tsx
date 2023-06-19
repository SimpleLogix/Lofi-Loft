import React from "react";

const IMAGE_NAMES = [
  "room.jpg",
  "coffee.jpg",
  "snow.jpg",
  "synthwave.gif",
  "cyberpunk.gif",
  "japan.jpg",
  "drive.gif",
];

type Props = {
  isOpen: boolean;
  scene: string;
};

const Scenes = ({ isOpen, scene }: Props) => {
  return (
    <div
      className={`center column scenes-container frosty ${
        isOpen ? "" : "hidden"
      }}`}
    >
      {IMAGE_NAMES.map((name) => (
        <img
          src={`/images/${name}`}
          alt=""
          className={`${scene === name ? "scenes-selected" : ""}`} //TODO- hide scenes menu / show selected / save selected
        />
      ))}
    </div>
  );
};

export default Scenes;
