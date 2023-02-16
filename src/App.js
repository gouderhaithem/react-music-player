import React, { useState, useRef, useEffect } from "react";
//import styles
import "./styles/app.scss";
//import component
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
//import util
import data from "./data";
import Nav from "./components/Nav";

function App() {
  //state
  const [songs, SetSongs] = useState(data());
  const [darkMode, SetDarkMode] = useState(false);
  const [currentSong, SetCurrentSong] = useState(songs[0]);
  const [isPlaying, SetIsPlaying] = useState(false);
  const [songInfo, SetSongInfo] = useState({
    currentTime: 0,
    duration: 1,
  });
  const [libraryStatus, SetLibraryStatus] = useState(false);
  //Ref
  const audioRef = useRef(null);
  //event handler
  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duratio = e.target.duration;
    SetSongInfo({ ...songInfo, currentTime: current, duration: duratio });
  };
  const songEndHandler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    SetCurrentSong(songs[(currentIndex + 1) % songs.length]);
    audioRef.current.play();
    console.log(isPlaying);
    // if (isPlaying) audioRef.current.play();
  };

  const handleCanPlay = async () => {
    if (isPlaying) {
      audioRef.current.play();
    }
  };
  //use effect for dark mode
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("bg-salmon");
    } else {
      document.body.classList.remove("bg-salmon");
    }

    // 👇️ checking if the body element contains a class
    if (document.body.classList.contains("bg-salmon")) {
      console.log("body tag contains class");
    }
  }, [darkMode]);

  //dark mode handler
  const darkModeHandler = () => {
    SetDarkMode(!darkMode);
    console.log(darkMode);
  };
  return (
    <div className="App dark">
      <button id="corner-btn" onClick={darkModeHandler}>
        Click me!
      </button>
      <Nav libraryStatus={libraryStatus} SetLibraryStatus={SetLibraryStatus} />
      <Song currentSong={currentSong} />
      <Player
        audioRef={audioRef}
        currentSong={currentSong}
        isPlaying={isPlaying}
        SetIsPlaying={SetIsPlaying}
        SetSongInfo={SetSongInfo}
        songInfo={songInfo}
        songs={songs}
        SetCurrentSong={SetCurrentSong}
        SetSongs={SetSongs}
      />
      <Library
        songs={songs}
        audioRef={audioRef}
        SetCurrentSong={SetCurrentSong}
        isPlaying={isPlaying}
        SetSongs={SetSongs}
        libraryStatus={libraryStatus}
        darkMode = {darkMode}
      />
      <audio
        //ki yjib data t3 song ydir update direct
        onLoadedMetadata={timeUpdateHandler}
        onTimeUpdate={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
        onCanPlay={handleCanPlay}
        onEnded={songEndHandler}
      ></audio>
    </div>
  );
}

export default App;
