import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom'; 
import Loader from './Loader';
import '../Styles/home.css';

const apiKey = '3becc9ab84a71277cb6dfd73f3c55a7f';
const baseUrl = 'https://api.themoviedb.org/3/';

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [isFavorite, setIsFavorite] = useState({});
  const location = useLocation(); 

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favoriteMovies');
    if (storedFavorites) {
      const favorites = JSON.parse(storedFavorites);
      setFavoriteMovies(favorites);
      const favoriteMap = {};
      favorites.forEach((movie) => {
        favoriteMap[movie.id] = true;
      });
      setIsFavorite(favoriteMap);
    }

    const fetchMovies = async () => {
      try {
        let response;
        if (location.search.startsWith('?search=')) {
          const searchQuery = location.search.slice(8); 
          response = await axios.get(`${baseUrl}search/movie?api_key=${apiKey}&query=${searchQuery}`);
        } else {
          response = await axios.get(`${baseUrl}movie/popular?api_key=${apiKey}`);
        }
        setMovies(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error('Error getting movies:', error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, [location.search]); 

  const toggleFavorite = (movie) => {
    const updatedFavorites = [...favoriteMovies];
    const isMovieFavorite = isFavorite[movie.id];

    if (isMovieFavorite) {
      const index = updatedFavorites.findIndex((favMovie) => favMovie.id === movie.id);
      if (index !== -1) {
        updatedFavorites.splice(index, 1);
      }
    } else {
      updatedFavorites.push(movie);
    }

    setFavoriteMovies(updatedFavorites);
    setIsFavorite({ ...isFavorite, [movie.id]: !isMovieFavorite });

    localStorage.setItem('favoriteMovies', JSON.stringify(updatedFavorites));
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Popular Movies</h1>
      {loading ? (
        <Loader />
      ) : (
        <ul className="movie-list">
          {movies.map((movie) => (
            <li key={movie.id} className="movie-card">
              <div className="movie-content">
                <a className="no-link" href={`/movie/${movie.id}`}>
                  <img src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`} alt={movie.title} />
                  <h3 className="movie-title">{movie.title}</h3>
                </a>
                <p className="movie-description">{movie.overview}</p>
              </div>
              <div className="button" onClick={() => toggleFavorite(movie)}>
                {isFavorite[movie.id] ? 'Unmark Favorite' : 'Mark as Favorite'}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Home;