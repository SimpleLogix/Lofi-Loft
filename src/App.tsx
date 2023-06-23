import React, { useState, useRef, useEffect, useCallback } from "react";
import MediaPlayer from "./components/MediaPlayer";
import ActionBar from "./components/ActionBar";
import "./styles/app.css";
import MediaControls from "./util/MediaControls";
import { Track, TrackCache } from "./util/Track";
import { getNightScene } from "./components/Scenes";

const getItem = (key: string, def: any) => {
  return localStorage.getItem(key) !== null ? localStorage.getItem(key)! : def;
};

function App() {
  const mediaControls = useRef<MediaControls | null>(null);

  //? init states

  const [musicVolume, setMusicVolume] = useState(80);
  const [mood, setMood] = useState("Shuffle");
  const [scene, setScene] = useState("room.jpg");
  const [isDayOn, setIsDayOn] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMixerOpen, setIsMixerOpen] = useState(false);
  const [isScenesOpen, setIsScenesOpen] = useState(false);
  const [isMoodMenuOpen, setIsMoodMenuOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const cachedTracks = useRef<TrackCache>(new Map()); // cache for tracks to avoid re-fetching

  // initialize a new MediaControls instance if one doesn't exist
  if (!mediaControls.current) {
    mediaControls.current = new MediaControls(cachedTracks.current);
  }

  //? useEffects
  // fetch from local storage any existing values
  useEffect(() => {
    setMusicVolume(Number(getItem("music_noteVolume", 80)));
    const storedMood = getItem("mood", "Shuffle");
    setMood(storedMood);
    setScene(getItem("scene", "room.jpg"));
    const storedDay = getItem("isDayOn", "true");
    setIsDayOn(storedDay === "true");

    if (storedDay === "false") {
      setScene(getNightScene(getItem("scene", "room.jpg")));
    }

    mediaControls.current?.changePlaylist(storedMood);
  }, []); // ensure data is only fetched locally once

  //? functions
  // enables fullscreen or exits fullscreen if already in
  function fullscreenClick(event: React.MouseEvent<HTMLElement>) {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  // closes menus on clicking outside
  const closeMenus = useCallback(() => {
    if (isMixerOpen || isScenesOpen || isMoodMenuOpen) {
      setIsMixerOpen(false);
      setIsScenesOpen(false);
      setIsMoodMenuOpen(false);
    } else {
      setIsMenuOpen(false);
    }
  }, [isMixerOpen, isScenesOpen, isMoodMenuOpen]);

  // pause on spacebar press
  useEffect(() => {
    const onSpacebarPress = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        setIsPlaying(!isPlaying);
        isPlaying
          ? mediaControls.current?.pause()
          : mediaControls.current?.play();
      }
    };
    window.addEventListener("keydown", onSpacebarPress);

    return () => {
      window.removeEventListener("keydown", onSpacebarPress);
    };
  }, [isPlaying, mediaControls]);

  return (
    <div
      className="background"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/images/${scene})`,
      }}
      onClick={closeMenus}
      onDoubleClick={fullscreenClick}
    >
      <div>
        <ActionBar
          mediaControls={mediaControls.current}
          musicVolume={musicVolume}
          mood={mood}
          scene={scene}
          isMuted={isMuted}
          isMenuOpen={isMenuOpen}
          isMoodMenuOpen={isMoodMenuOpen}
          isScenesOpen={isScenesOpen}
          isMixerOpen={isMixerOpen}
          isDayOn={isDayOn}
          setIsMenuOpen={setIsMenuOpen}
          setIsMixerOpen={setIsMixerOpen}
          setIsScenesOpen={setIsScenesOpen}
          setIsMoodMenuOpen={setIsMoodMenuOpen}
          setMusicVolume={setMusicVolume}
          setIsDayOn={setIsDayOn}
          setScene={setScene}
          setMood={setMood}
          setIsPlaying={setIsPlaying}
        ></ActionBar>
        <i className="material-icons fullscreen-icon" onClick={fullscreenClick}>
          fullscreen
        </i>
      </div>

      <MediaPlayer
        musicVolume={musicVolume}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        isMuted={isMuted}
        mood={mood}
        mediaControls={mediaControls.current}
        setIsMuted={setIsMuted}
      ></MediaPlayer>
      <div className="music-by center left column">
        <p>Music by</p>
        <p className="music-source">
          {mediaControls.current.currentTrack.source}
        </p>
      </div>
    </div>
  );
}

export default App;
