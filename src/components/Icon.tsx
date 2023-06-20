import React from "react";

type Props = {
  icon: string;
  onMouseEnter: (event: React.MouseEvent<HTMLElement>) => void;
  onMouseLeave: (event: React.MouseEvent<HTMLElement>) => void;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  isSelected: boolean;
  isHover: boolean;
  tooltipText: string;
};

const Icon = ({
  icon,
  onMouseEnter,
  onMouseLeave,
  onClick,
  isSelected,
  isHover,
  tooltipText,
}: Props) => {
  return (
    <div className="icon-holder">
      <i
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={`material-symbols-outlined ${
          isSelected ? "selected" : ""
        }`}
        onClick={onClick}
      >
        {icon}
      </i>
      <div className={`${isHover ? " center frosty tooltip" : "hidden"}`}>
        {tooltipText}
      </div>
    </div>
  );
};

export default Icon;
