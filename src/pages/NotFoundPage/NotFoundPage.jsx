import React from 'react'
import s from './NotFoundPage.module.css'
import { Link } from 'react-router-dom'
const NotFoundPage = () => {
  return (
      <div>
          <p>Sorry, this page is not found.</p>
          <p>Go back to <Link to='/'>Home</Link>!</p>
          
    </div>
  )
}

export default NotFoundPage