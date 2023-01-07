import React from 'react';


const Song = ({currentSong}) => {

    return (
        <div className='Song-container'>
            
                <div className="img-container">
                <img src={currentSong.cover} alt={currentSong.name} />
    </div>
            
            <h2>
            {currentSong.name}
            </h2>
            <h3>
            {currentSong.artist}
            </h3>
        </div>
    )
}

export default Song;