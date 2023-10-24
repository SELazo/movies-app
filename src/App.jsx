import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import MovieDetail from './components/MovieDetail';
import Categories from './components/Categories';
import Favorites from './components/Favorites';
import Footer from './components/Footer';  // Asegúrate de que Footer esté importado

function App() {
  const storedFavorites = localStorage.getItem('favoriteMovies');
  const initialFavoriteMovies = storedFavorites ? JSON.parse(storedFavorites) : [];
  const [favoriteMovies, setFavoriteMovies] = useState(initialFavoriteMovies);

  const toggleFavorite = (movie) => {
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home toggleFavorite={toggleFavorite} />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/favorites" element={<Favorites favoriteMovies={favoriteMovies} toggleFavorite={toggleFavorite} />} />
        </Routes>
      </div>
      <Footer />  
    </Router>
  );
}

export default App;
