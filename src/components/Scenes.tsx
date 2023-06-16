import React from "react";

type Props = {
  isOpen: boolean;
};

const Scenes = ({ isOpen }: Props) => {
  return (
    <div className={`scenes-container frosty ${isOpen ? "" : "hidden"}`}></div>
  );
};

export default Scenes;
