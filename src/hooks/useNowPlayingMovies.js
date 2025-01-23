import { useEffect } from 'react';
import { API_OPTIONS } from "../utils/constant";
import { useSelector, useDispatch } from 'react-redux';
import { addNowPlayingMovies } from '../utils/movieSlice';

const useNowPlayingMovies = () => {
    const dispatch = useDispatch();
    const nowPlayingMovies = useSelector((store) => store.movies.nowPlayingMovies);

    const getNowPlayingMovies = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', API_OPTIONS); //returns promise
        const json = await data.json(); //convert to readable stream
        // console.log(json.results);
        dispatch(addNowPlayingMovies(json.results));
    };

    useEffect(() => {
        !nowPlayingMovies && getNowPlayingMovies();
    }, []);
};

export default useNowPlayingMovies;



