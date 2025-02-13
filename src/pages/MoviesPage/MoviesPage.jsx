import React, { useEffect, useState } from 'react'
import s from './MoviesPage.module.css'
import SearchForm from '../../components/SearchForm/SearchForm'
import axios from 'axios';
import { useLocation, useSearchParams } from 'react-router-dom';
import MovieList from '../../components/MovieList/MovieList';
import toast from 'react-hot-toast';
const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query');

  const location = useLocation();

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [moviesByQuery, setMoviesByQuery] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const API_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMWIxNTk0NzI5ZDlhODRlZjZkZTU2MmRiMjJiOTRkZSIsIm5iZiI6MTczNDUzMDE1Ny43ODIsInN1YiI6IjY3NjJkNDZkMTYxYWI3ZGVjNWZmZTgzMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.n11YprEyAIsNVgOqkidenCI4yQs_Y4WRKkJJKM74lkc';
axios.defaults.headers.common['accept'] = 'application/json';
axios.defaults.headers.common['Authorization'] = `Bearer ${API_TOKEN}`;
   async function fetchMovieByQuery(query, page) {
  const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
  params: {
      query,
      language: "en-US",
      page,
      },
    });
  return response.data;
  }

  useEffect(() => {

    if (!query) return;

    const getMoviesByQuery = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        const { results, total_pages } = await fetchMovieByQuery(query, page);
        
        setTotalPages(total_pages);
        setMoviesByQuery(prev => [...prev, ...results]);
      }
      catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getMoviesByQuery();
  }, [query, page]);

  const getNewQuery = (newQuery) => {
    searchParams.set('query', newQuery);
    setSearchParams(searchParams);
    setPage(1);
    setTotalPages(0);
  }

  const handleClick = () => {
    if (page >= totalPages) {
      toast.error('Sorry, the films you requested are out of stock!')
      return;
    }
        return setPage(prev => prev + 1)
      }
  return (
    <div className={s.contentWrapper}>
      <SearchForm getNewQuery={getNewQuery} query={query ?? ''} />
      <MovieList data={moviesByQuery} location={location} />
       {isLoading && <p>Loading...</p>}
      {isError && <p>Sorry, we have a problem. try later</p>}
      {moviesByQuery.length > 0 && <button onClick={handleClick}>Load more</button>}
    </div>
  )
}

export default MoviesPage