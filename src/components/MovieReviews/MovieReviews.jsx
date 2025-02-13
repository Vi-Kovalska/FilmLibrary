import React, { useEffect, useState } from 'react'
import s from './MovieReviews.module.css'
import { useParams } from 'react-router-dom';
import axios from 'axios';
const MovieReviews = () => {
   const {movieId} = useParams();
    const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [reviews, setRewiews] = useState([]);

  const API_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMWIxNTk0NzI5ZDlhODRlZjZkZTU2MmRiMjJiOTRkZSIsIm5iZiI6MTczNDUzMDE1Ny43ODIsInN1YiI6IjY3NjJkNDZkMTYxYWI3ZGVjNWZmZTgzMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.n11YprEyAIsNVgOqkidenCI4yQs_Y4WRKkJJKM74lkc';
axios.defaults.headers.common['accept'] = 'application/json';
axios.defaults.headers.common['Authorization'] = `Bearer ${API_TOKEN}`;
   async function fetchMovieInfoById(id) {
  const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/reviews`);
  return response.data;
  }

  useEffect(() => {
    const getRewiews = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        const res = await fetchMovieInfoById(movieId);
        
        setRewiews(res.results);
        
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getRewiews();
  }, [movieId])
  return (
    <>
      {reviews.length ===0 && <p className={s.paragrafIfemptyArrayOfReviews}>There are no reviews. You can be the first to leave a review.</p>}
      <ul className={s.rewiewList}>
        {reviews.map(({ id, author, author_details: {avatar_path}, content, created_at, updated_at}) => 
          <li key={`${id}${crypto.randomUUID()}`} className={s.rewiewCard}>
            <img src={avatar_path ? `https://image.tmdb.org/t/p/w500/${avatar_path}` : `./avatar-reserv.webp`} alt="author" width={150} height={150} />
            <div className={s.rewiewsInfoContainer}>
            <h2>{author}</h2>
            <p>{content}</p>
            <p>Created at {created_at}</p>
              <p>Updated at {updated_at}</p>
              </div>
        </li>
        )}
</ul>
    </>
  )
}

export default MovieReviews