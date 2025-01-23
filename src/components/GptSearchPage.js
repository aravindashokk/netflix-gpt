import React from 'react';
import GptSearchBar from './GptSearchBar';
import GptMovieSugestions from './GptMovieSugestions';
import { BACKDROP_IMG } from '../utils/constant';

const GptSearchPage = () => {
  return (
    <>
      <div className='fixed -z-10'>
        <img className='h-screen object-cover md:w-screen' src={BACKDROP_IMG} alt='bg-img'  />
      </div>
      <div className=''>
        <GptSearchBar />
        <GptMovieSugestions />
      </div>
    </>

  )
}

export default GptSearchPage