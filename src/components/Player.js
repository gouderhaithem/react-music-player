import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";
const Player = ({
  currentSong,
  isPlaying,
  SetIsPlaying,
  audioRef,
  SetSongInfo,
  songInfo,
}) => {
  //EventHandler
  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      SetIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      SetIsPlaying(!isPlaying);
    }
  };

  const getTime = (time) => {
    let minutes = Math.floor(time / 60);
    minutes = minutes >= 10 ? minutes : "0" + minutes;
    time = Math.floor(time % 60);
    time = time >= 10 ? time : "0" + time;
    return minutes + ":" + time;
  };
  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;

    SetSongInfo({ ...songInfo, currentTime: e.target.value });
  };
  //state

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <input
          min={0}
          max={songInfo.duration}
          value={songInfo.currentTime}
          onChange={dragHandler}
          type="range"
        />
        <p>{getTime(songInfo.duration)}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon className="skip-back" size="2x" icon={faAngleLeft} />

        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />

        <FontAwesomeIcon
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
        />
      </div>
    </div>
  );
};

export default Player;
