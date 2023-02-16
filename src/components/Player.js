import React, { useEffect } from "react";
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
  SetSongs,
  songInfo,
  songs,
  SetCurrentSong,
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
  const skipTrackHandler = async (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === "skip-forwad") {
      /* if (currentIndex === songs.length - 1) {
        SetCurrentSong(songs[0]);
      } else {
        SetCurrentSong(songs[currentIndex + 1]);
        console.log(currentIndex);
        console.log(songs.length);
      }
      */
      //or this way
      await SetCurrentSong(songs[(currentIndex + 1) % songs.length]);
    }
    if (direction === "skip-back") {
      if (currentIndex === 0) {
        await SetCurrentSong(songs[songs.length - 1]);
      } else {
        await SetCurrentSong(songs[currentIndex - 1]);
        console.log(currentIndex);
        console.log(songs.length);
      }
    }
    if (isPlaying) audioRef.current.play();
  };
  //use effect
  useEffect(() => {
    const newSong = songs.map((song) => {
      if (song.id === currentSong.id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });
    SetSongs(newSong);
  }, [currentSong]);

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <input
          min={0}
          max={songInfo.duration || 0}
          value={songInfo.currentTime}
          onChange={dragHandler}
          type="range"
        />
        <p>{songInfo.duration ? getTime(songInfo.duration) : `00:00`}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          className="skip-back"
          onClick={() => skipTrackHandler("skip-back")}
          size="2x"
          icon={faAngleLeft}
        />

        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />

        <FontAwesomeIcon
          className="skip-forward"
          onClick={() => skipTrackHandler("skip-forwad")}
          size="2x"
          icon={faAngleRight}
        />
      </div>
    </div>
  );
};

export default Player;
