import React, { useState, useRef } from "react";
//import styles
import "./styles/app.scss";
//import component
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
//import util
import data from "./util";

function App() {
  //state
  const [songs, SetSongs] = useState(data());
  const [currentSong, SetCurrentSong] = useState(songs[0]);
  const [isPlaying, SetIsPlaying] = useState(false);
  const [songInfo, SetSongInfo] = useState({
    currentTime: 0,
    duration: 1,
  });
  //Ref
  const audioRef = useRef(null);
  //event handler
  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duratio = e.target.duration;
    SetSongInfo({ ...songInfo, currentTime: current, duration: duratio });
  };
  return (
    <div className="App">
      <Song currentSong={currentSong} />
      <Player
        audioRef={audioRef}
        currentSong={currentSong}
        isPlaying={isPlaying}
        SetIsPlaying={SetIsPlaying}
        SetSongInfo={SetSongInfo}
        songInfo={songInfo}
      />
      <Library
        songs={songs}
        audioRef={audioRef}
        SetCurrentSong={SetCurrentSong}
        isPlaying={isPlaying}
        SetSongs={SetSongs}
      />
      <audio
        //ki yjib data t3 song ydir update direct
        onLoadedMetadata={timeUpdateHandler}
        onTimeUpdate={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
      ></audio>
    </div>
  );
}

export default App;
