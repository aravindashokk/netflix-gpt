import {useEffect} from 'react';
import {API_OPTIONS} from "../utils/constant";
import { useSelector,useDispatch } from 'react-redux';
import {addUpComingMovies } from '../utils/movieSlice';

const useUpcomingMovies = () => {
    const dispatch = useDispatch();
    const upComingMovies = useSelector((store) => store.movies.upComingMovies);

    const getUpcomingMovies = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', API_OPTIONS); //returns promise
        const json = await data.json(); //convert to readable stream
        // console.log(json.results);
        dispatch(addUpComingMovies(json.results));
    };

    useEffect(() => {
        !upComingMovies && getUpcomingMovies();
    }, []);
};

export default useUpcomingMovies;



