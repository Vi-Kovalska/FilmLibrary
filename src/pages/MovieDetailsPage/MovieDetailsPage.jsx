import { React, useEffect, useState} from 'react'
import axios from 'axios'
import s from './MovieDetailsPage.module.css'
import { Link, NavLink, Outlet, useLocation, useParams } from 'react-router-dom'
import clsx from 'clsx';
// import fetchMovieById from '.../services/api'
export default function MovieDetailsPage() {
  const location = useLocation();

  const [details, setDetails] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const buildLinkClass = ({ isActive }) => {
    return clsx(s.link, isActive && s.active);
  }

  const API_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMWIxNTk0NzI5ZDlhODRlZjZkZTU2MmRiMjJiOTRkZSIsIm5iZiI6MTczNDUzMDE1Ny43ODIsInN1YiI6IjY3NjJkNDZkMTYxYWI3ZGVjNWZmZTgzMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.n11YprEyAIsNVgOqkidenCI4yQs_Y4WRKkJJKM74lkc';
axios.defaults.headers.common['accept'] = 'application/json';
axios.defaults.headers.common['Authorization'] = `Bearer ${API_TOKEN}`;
async function fetchMovieById(id) {
  const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`);
  return response.data;
}

  const {movieId} = useParams();

  useEffect(() => {
    const getMovieById = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
      const movieData = await fetchMovieById(movieId);
      setDetails(movieData);
      } catch {
        setIsError(true)
      } finally {
        setIsLoading(false);
      }
    }
    getMovieById();
  }, [movieId])

    if (!details) {
    return <p>Loading...</p>
  }
  const { poster_path, taglin, original_title, vote_average, overview, genres } = details;

  return (
    <>
      <Link className={s.linkGoBack} to={location.state ?? '/movies'}> ⬅ Go back</Link>
      <div className={s.containerDetails}>
        <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt={taglin} />
        <div className={s.infoContainer}>
          <h1>{original_title}</h1>
          <h2>User Score { vote_average}%</h2>
          <h2>Overview</h2>
          <p>{overview}</p>
          <h2>Genres</h2>
          <p className={s.genresParagraf}>{genres.map(i => <span key={`${i.id}${crypto.randomUUID()}`}>{i.name}</span>)}</p>
        </div>
      </div>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Sorry, we have a problem. try later</p>}
      <h2>Additional information</h2>
    <div className={s.linkContainer}>
      <NavLink className={buildLinkClass} to='cast'>Cast</NavLink>
      <NavLink className={buildLinkClass} to='reviews'>Reviews</NavLink>
      </div>
      <Outlet/>
    </>
  )
}
