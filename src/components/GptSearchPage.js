import React from 'react';
import GptSearchBar from './GptSearchBar';
import GptMovieSugestions from './GptMovieSugestions';
import { BACKDROP_IMG } from '../utils/constant';

const GptSearchPage = () => {
  return (
    <div>
      <div className='fixed -z-10'>
        <img className='bg-gradient-to-b from-black' src={BACKDROP_IMG} alt='bg-img' aria-hidden="true" />
      </div>
      <GptSearchBar />
      <GptMovieSugestions />
    </div>
  )
}

export default GptSearchPage