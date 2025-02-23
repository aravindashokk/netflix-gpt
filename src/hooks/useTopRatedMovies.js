import {useEffect} from 'react';
import {API_OPTIONS} from "../utils/constant";
import { useSelector,useDispatch } from 'react-redux';
import {addTopRatedMovies } from '../utils/movieSlice';

const useTopRatedMovies = () => {
    const dispatch = useDispatch();
    const topRatedMovies = useSelector((store) => store.movies.topRatedMovies);

    const TopRatedrMovies = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', API_OPTIONS); //returns promise
        const json = await data.json(); //convert to readable stream
        // console.log(json.results);
        dispatch(addTopRatedMovies(json.results));
    };

    useEffect(() => {
        !topRatedMovies && TopRatedrMovies();
    }, []);
};

export default useTopRatedMovies;



