import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage/NotFoundPage'));
const MoviesPage = lazy(() => import('../pages/MoviesPage/MoviesPage')); 
const MovieDetailsPage = lazy(() => import('../pages/MovieDetailsPage/MovieDetailsPage'));
import MovieCast from './MovieCast/MovieCast'
import MovieReviews from './MovieReviews/MovieReviews'
import Header from './Header/Header'
import Navigation from './Navigation/Navigation'
import Footer from './Footer/Footer'


function App() {

  return (
    <>
      <Header>
<Navigation/>
      </Header>
      <Suspense fallback={<h2>Loading...</h2>}>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/movies' element={<MoviesPage />} />
        <Route path='/movies/:movieId' element={<MovieDetailsPage />}>
          <Route path='cast' element={<MovieCast/>} />
          <Route path='reviews' element={<MovieReviews/>} />
        </Route>
        <Route path='*' element={<NotFoundPage/>} />
      </Routes>
        </Suspense>
      <Footer/>
    </>
  )
}

export default App
