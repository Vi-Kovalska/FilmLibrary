import React from 'react'
import s from './SearchForm.module.css'
const SearchForm = ({getNewQuery, query}) => {
    const handleSubmit = (e) => {
      e.preventDefault();
      if (!e.target.elements.query.value.trim()) return;
      getNewQuery(e.target.elements.query.value.trim().toLowerCase())
    }
  return (
      <form onSubmit={handleSubmit} className={s.form}>
          <input type="text" name='query' value={query} onChange={(e)=> getNewQuery(e.target.value)}/>
          <button type='submit'>Search</button>
    </form>
  )
}

export default SearchForm