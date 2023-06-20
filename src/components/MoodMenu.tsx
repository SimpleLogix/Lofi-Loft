import React from "react";

type Props = {
  isMoodMenuOpen: boolean;
  setMoodCallback: (mood: string) => void;
  selectedMood: string;
};

// icon name : mood name
const MOODS = ["Shuffle", "Piano", "Nightlife", "Pokemon"];
const pokeballImg = require("../assets/pokeball.png");
const selectedPokeballImg = require("../assets/pokeball-selected.png");

const MoodMenu = ({ isMoodMenuOpen, setMoodCallback, selectedMood }: Props) => {
  return (
    <div className={`${isMoodMenuOpen ? "frosty mood-container" : "hidden"}`}>
      {MOODS.map((mood) => {
        return (
          <div
            key={mood}
            className={`center column ${
              selectedMood === mood ? "selected-mood" : ""
            }`}
            onClick={() => {
              // return the selected mood as callback to save and change state
              setMoodCallback(mood);
            }}
          >
            {mood === "Pokemon" ? (
              <img
                src={selectedMood === mood ? selectedPokeballImg : pokeballImg}
                alt=""
              />
            ) : (
              <i
                className={`material-symbols-outlined ${
                  selectedMood === mood ? "selected-mood" : ""
                }`}
              >
                {mood.toLowerCase()}
              </i>
            )}
            <div>{mood}</div>
          </div>
        );
      })}
    </div>
  );
};

export default MoodMenu;
