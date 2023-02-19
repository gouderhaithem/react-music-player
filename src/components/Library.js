import React from "react";
import LibrarySong from "./LibrarySong";
function Library({
  songs,
  SetCurrentSong,
  audioRef,
  isPlaying,
  SetSongs,
  libraryStatus,
  darkMode,
}) {
  const style = {
    backgroundColor: darkMode ? "rgb(54, 54, 54)" : "white",
    
  };

  return (
    <div
      className={`library ${libraryStatus ? "active-library" : ""}`}
      style={style}
    >
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map((song) => (
          <LibrarySong
            songs={songs}
            SetCurrentSong={SetCurrentSong}
            song={song}
            id={song.id}
            key={song.id}
            audioRef={audioRef}
            isPlaying={isPlaying}
            SetSongs={SetSongs}
          />
        ))}
      </div>
    </div>
  );
}
export default Library;
