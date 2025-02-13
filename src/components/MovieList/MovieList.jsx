import React from 'react'
import s from './MovieList.module.css'
import { NavLink } from 'react-router-dom';
const MovieList = ({ data, location}) => {
  
  return (
    <ul>
      {data.map(({id, title}) => <li key={`${id}${crypto.randomUUID()}`}><NavLink to={`/movies/${id}`} state={location}>{title}</NavLink></li>)}
    </ul>
  )
}

export default MovieList