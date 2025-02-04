import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useAudio } from '../Context/MusicProvider';

const MusicPlayer = () => {
    const { id } = useParams();  
    const navigate = useNavigate();

    const{musicData} = useAudio()

    const music = musicData.find((item)=>item.id === id);
    
    if (!music) {
        return <p className="text-center">Audio not found.</p>;
      }

  return (
    <>
    <h1 className='text-4xl text-center text-red-500'>Music Details</h1>
    <hr /><br />
    <div className="video-details grid grid-cols-2 mx-10 p-5">

    <div className="thumbnail w-full h-[400px]">
          <img src={music.thumbnail} alt={`${music.title} thumbnail`} className="w-full h-full object-cover rounded-xl"  />
          <div className="video-player">
        <audio controls className="w-full ">
          <source src={music.url} type="audio/mp3" />
          Your browser does not support the audio tag.
        </audio>
        <h1 className="text-3xl text-start">{music.title}</h1>
      </div>
    </div>

      
      
    </div>
    </>

  )
}

export default MusicPlayer