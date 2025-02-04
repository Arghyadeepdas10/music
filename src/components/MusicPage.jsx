import React, { useState } from 'react'
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { MusicProvider, useAudio } from '../Context/MusicProvider';

const MusicPage = () => {

    const navigate = useNavigate();
    const {musicData} = useAudio();
    const [view, setView] = useState('grid');

    const handledetails = (id)=>{
        navigate(`/musicplayer/${id}`);  
    }

    const handlegrid = ()=>{
        setView('grid');
    }

    const rendergrid = ()=>{
        return(
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-x-7 gap-y-12 mx-10 p-2">
            {musicData && musicData.length > 0 ? (
            musicData.map((music) => (
                <div key={music.id} className='w-full h-[200px]' onClick={()=>handledetails(music.id)}>
                  <div className="w-full h-[200px]">
                    <img
                      src={music.thumbnail}
                      alt={`${music.title} thumbnail`}
                      className="w-full h-full object-cover"
                    />
              </div>
                <audio className="w-full h-[200px]" > 
                    <source src={music.url} type="audio/mp3" />
                </audio>
                <p className='text-center'>{music.title}</p>
                </div>
            ))
            ) : (  <p>No Music available.</p>  )}
        </div>
        );
    }

    const handleList = () => {
        setView('list');
      };

      const renderlist = ()=>{
        return (
            <div className='text-center mx-10'>
              <ul className=''>
                {musicData.map((music, index) => (
                  <li key={index} className="w-full flex items-center gap-x-2 mb-8" onClick={()=>handledetails(music.id)} >
                    <div className="w-[150px] h-[150px] p-4">
                      <img
                        src={music.thumbnail}
                        alt={`${music.title} thumbnail`}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                 <div className="" >
                        <audio className="w-full h-[200px]">
                        <source src={music.url} type="audio/mp3" />
                        Your browser does not support the music tag.
                        </audio>
                    </div>
                    <div className="">
                    <p className="text-center" >{music.title}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          );
      }
      

  return (
    <>
        <h1 className='text-3xl text-center text-red-500'>The Following MusicPage
        <IconButton onClick={handlegrid}><GridViewIcon/></IconButton>
        <IconButton onClick={handleList}><ViewListIcon/></IconButton>
        </h1>
        <hr /><br /><br />
        {view === 'grid' ? rendergrid() : renderlist()}
    </>
  )
}

export default MusicPage