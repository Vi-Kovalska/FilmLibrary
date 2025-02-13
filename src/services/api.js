import axios from 'axios';
const API_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMWIxNTk0NzI5ZDlhODRlZjZkZTU2MmRiMjJiOTRkZSIsIm5iZiI6MTczNDUzMDE1Ny43ODIsInN1YiI6IjY3NjJkNDZkMTYxYWI3ZGVjNWZmZTgzMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.n11YprEyAIsNVgOqkidenCI4yQs_Y4WRKkJJKM74lkc';
axios.defaults.headers.common['accept'] = 'application/json';
axios.defaults.headers.common['Authorization'] = `Bearer ${API_TOKEN}`;

export async function fetchMovies(url) {
  const response = await axios.get(url);

  return response.data;
}
