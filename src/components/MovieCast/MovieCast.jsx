import React, { useEffect, useState } from 'react'
import s from './MovieCast.module.css'
import { useParams } from 'react-router-dom';
import axios from 'axios';
const MovieCast = () => {
  const {movieId} = useParams();
    const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cast, setCast] = useState([]);

  const API_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMWIxNTk0NzI5ZDlhODRlZjZkZTU2MmRiMjJiOTRkZSIsIm5iZiI6MTczNDUzMDE1Ny43ODIsInN1YiI6IjY3NjJkNDZkMTYxYWI3ZGVjNWZmZTgzMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.n11YprEyAIsNVgOqkidenCI4yQs_Y4WRKkJJKM74lkc';
axios.defaults.headers.common['accept'] = 'application/json';
axios.defaults.headers.common['Authorization'] = `Bearer ${API_TOKEN}`;

  async function fetchMovieInfoById(id) {
  const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits`);
  return response.data;
  }
  
  useEffect(() => {
    const getCast = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        const res = await fetchMovieInfoById(movieId);
        setCast(res.cast);
        
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getCast();
  }, [movieId])
  return (
    <div>
      <ul className={s.castList}>
        {cast.map(({ id, name, character, profile_path }) => <li key={`${id}${crypto.randomUUID()}`} className={s.cardOfCast}>
          <img src={`https://image.tmdb.org/t/p/w500/${profile_path}`} alt={name} width={200} height={300}/>
          <div>
            <p>{name}</p>
            <p>Character: {character}</p>
          </div>
        </li>)}
      </ul>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Sorry, we have a problem. try later</p>}
    </div>
  )
}

export default MovieCast