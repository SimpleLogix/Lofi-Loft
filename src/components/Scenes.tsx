import React from "react";

export interface IMG {
  day: string;
  night?: string;
}

export const IMAGES: IMG[] = [
  { day: "room.jpg" },
  { day: "synthwave.gif" },
  { day: "japan.jpg", night: "japan-night.jpg" },
  { day: "drive.gif" },
  { day: "snow.jpg" },
  { day: "room2.jpg" },
  { day: "room3-day.jpg", night: "room3-night.jpg" },
  { day: "leaf.gif" },
  { day: "metro-green.jpg" },
];

export const getNightScene = (scene: string): string => {
  let imageObj = IMAGES.find((img) => img.day === scene)!;
  return imageObj.night ? imageObj.night : scene;
};

export const getDayScene = (scene: string) => {
  let imageObj = IMAGES.find((img) => img.night === scene)!;
  return imageObj.day ? imageObj.day : scene;
};

type Props = {
  isOpen: boolean;
  scene: string;
  changeSceneCallback: (scene: string) => void;
};

const Scenes = ({ isOpen, scene, changeSceneCallback }: Props) => {
  return (
    <div
      className={`${isOpen ? "scenes-container column frosty" : "hidden"} }`}
    >
      {IMAGES.map(({ day, night }) => (
        <div key={`${day}-parent`}>
          <img
            key={`${day}-img`}
            src={`/images/${day}`}
            alt=""
            className={`${scene === day ? "selected-scene" : "hidden"}`}
            onClick={() => changeSceneCallback(day)}
          />
          <i key={`${day}-icon`} className="material-symbols-outlined">
            {getNightScene(day) !== day
              ? "light_mode"
              : day.split(".")[1] === "gif"
              ? "gif"
              : ""}
          </i>
        </div>
      ))}
    </div>
  );
};

export default Scenes;
