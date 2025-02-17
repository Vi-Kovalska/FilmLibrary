import React, { useEffect, useState } from 'react'
import s from './HomePage.module.css'
import {fetchMovies} from '../../services/api'
import MovieList from '../../components/MovieList/MovieList';
import { useLocation } from 'react-router-dom';

const HomePage = () => {
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    const asyncWrapper = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        const {results} = await fetchMovies('https://api.themoviedb.org/3/trending/movie/day');
        setTrending(results);
        
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    asyncWrapper();
  }, [setTrending])

  return (
    <div>
      <h1>Trending today</h1>
      <MovieList data={trending} location={location}/>
        {isLoading && <p>Loading...</p>}
      {isError && <p>Sorry, we have a problem. Try later</p>}
      
    </div>
  )
}

export default HomePage