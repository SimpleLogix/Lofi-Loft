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
  changeSceneCallback: (scene: string) => void;
};

const Scenes = ({ isOpen, scene, changeSceneCallback }: Props) => {
  return (
    <div
      className={`${
        isOpen ? "center column scenes-container frosty" : "hidden"
      } }`}
    >
      {IMAGE_NAMES.map((name) => (
        <img
          key={name}
          src={`/images/${name}`}
          alt=""
          className={`${scene === name ? "selected-scene" : "hidden"}`}
          onClick={() => changeSceneCallback(name)}
        />
      ))}
    </div>
  );
};

export default Scenes;
