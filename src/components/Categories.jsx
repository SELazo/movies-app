import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/categories.css';

const apiKey = '3becc9ab84a71277cb6dfd73f3c55a7f';
const baseUrl = 'https://api.themoviedb.org/3/';

function Categories() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [isFavorite, setIsFavorite] = useState({});

  useEffect(() => {
    // Obtener la lista de categorías al cargar la página
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${baseUrl}genre/movie/list?api_key=${apiKey}`);
        setCategories(response.data.genres);
      } catch (error) {
        console.error('Error al obtener categorías:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    // Recuperar películas favoritas del almacenamiento local (LocalStorage) al cargar la página
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
  }, []);

  const handleCategoryClick = (category) => {
    // Obtener películas de la categoría seleccionada
    setSelectedCategory(category);
    const categoryId = category.id;

    const fetchMoviesByCategory = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}discover/movie?api_key=${apiKey}&with_genres=${categoryId}`
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error al obtener películas de la categoría:', error);
      }
    };

    fetchMoviesByCategory();
  };

  const handleSearch = () => {
    // Realizar una solicitud para obtener películas que coincidan con la consulta de búsqueda
    const fetchSearchedMovies = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}search/movie?api_key=${apiKey}&query=${searchQuery}`
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error al obtener películas de la búsqueda:', error);
      }
    };

    fetchSearchedMovies();
  };

  // Implementa la lógica para marcar o desmarcar como favorita aquí
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
    <div className="categories-container">
      <h1>Películas de la Categoría</h1>
      <div className="category-list">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category)}
            className="category-button"
          >
            {category.name}
          </button>
        ))}
      </div>
      <ul className="movie-list">
        {movies.map((movie) => (
          <li key={movie.id} className="movie-card">
            <img src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`} alt={movie.title} />
            <h3>{movie.title}</h3>
            <p>{movie.overview}</p>
            <button className="favorite-button" onClick={() => toggleFavorite(movie)}>
              {isFavorite[movie.id] ? 'Desmarcar de Favorita' : 'Marcar como Favorita'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
