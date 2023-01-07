import React from "react";
import LibrarySong from "./LibrarySong";
function Library({ songs, SetCurrentSong, audioRef, isPlaying, SetSongs }) {
  return (
    <div className="library">
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
