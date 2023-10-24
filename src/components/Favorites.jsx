import React from 'react';
import '../Styles/favorites.css';

function Favorites({ favoriteMovies, toggleFavorite }) {
  if (!favoriteMovies || favoriteMovies.length === 0) {
    return <div>You haven't marked any movie as a favorite yet.</div>;
  }

  const removeFavorite = (movie) => {
    toggleFavorite(movie);
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center', margin: '20px 0' }}>My Favorites</h2>
      <div className="movie-list">
        {favoriteMovies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`} alt={movie.title} />
            <h3>{movie.title}</h3>
            <p>{movie.overview}</p>
            <button onClick={() => removeFavorite(movie)}>
              Remove from Favorites
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorites;
