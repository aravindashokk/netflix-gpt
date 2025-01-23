import {useEffect} from 'react';
import {API_OPTIONS} from "../utils/constant";
import { useSelector,useDispatch } from 'react-redux';
import {addPopularMovies } from '../utils/movieSlice';

const usePopularMovies = () => {
    const dispatch = useDispatch();
    const popularMovies = useSelector((store) => store.movies.popularMovies);

    const getPopularMovies = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', API_OPTIONS); //returns promise
        const json = await data.json(); //convert to readable stream
        // console.log(json.results);
        dispatch(addPopularMovies(json.results));
    };

    useEffect(() => {
        !popularMovies && getPopularMovies();
    }, []);
};

export default usePopularMovies;



