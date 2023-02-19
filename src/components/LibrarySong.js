import React from "react";


const LibrarySong = ({
  song,
  songs,
  SetCurrentSong,
  id,
  audioRef,
  isPlaying,
  SetSongs,
}) => {
  //event Handler
  const songSelectHandler = async () => {
    /*const selectedSong = songs.filter((state) => state.id === id);
    console.log(selectedSong[0]);
    SetCurrentSong(selectedSong[0]);*/
    await SetCurrentSong(song);
    //activ state
    const newSong = songs.map((song) => {
      if (song.id === id) {
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
    //check the song if is playing or not
    if (isPlaying) audioRef.current.play();
  };
  return (
    <div
      onClick={songSelectHandler}
      className={`Library-Song ${song.active ? "selected" : ""}`}
    >
      <div className="img-container2">
        <img src={song.cover} alt={song.name} />
      </div>
      <div className="song-descreption">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
