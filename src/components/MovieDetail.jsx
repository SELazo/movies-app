import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const apiKey = '3becc9ab84a71277cb6dfd73f3c55a7f';
const imageBaseURL = 'https://image.tmdb.org/t/p/w300'; 

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&append_to_response=credits`);
        setMovie(response.data);
      } catch (error) {
        console.error('Error getting movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  return (
    <div>
      {movie ? (
        <div>
          <h2>{movie.title}</h2>
          <img src={`${imageBaseURL}${movie.poster_path}`} alt={movie.title} />
          <p>{movie.overview}</p>
          {movie.credits && movie.credits.cast && (
            <p>Cast: {movie.credits.cast.slice(0, 5).map((actor) => actor.name).join(', ')}</p>
          )}
          <p>Genres: {movie.genres.map((genre) => genre.name).join(', ')}</p>
          <p>Runtime: {movie.runtime} minutes</p>
          <p>Release Date: {movie.release_date}</p>
        </div>
      ) : (
        <p>Loading movie details...</p>
      )}
    </div>
  );
}

export default MovieDetail;