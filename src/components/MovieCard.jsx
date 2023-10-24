import React from 'react';
import '../Styles/movie-card.css'; 


function MovieCard(props) {
  const { title, posterPath, handleFavoriteToggle, isFavorite } = props;

  return (
    <div className="movie-card">
      <img src={posterPath} alt={title} />
      <h3>{title}</h3>
      <button className="button" onClick={handleFavoriteToggle}>
        {isFavorite ? 'Quitar de Favoritos' : 'Marcar como Favorita'}
      </button>
    </div>
  );
}

export default MovieCard;
