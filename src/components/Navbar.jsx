import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../Images/logo.jpg'; 
import '../Styles/navbar.css';

function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/?search=${searchQuery}`);
  };

  return (
    <header className="header">
      <div className="logo">
        <img src={Logo} alt="Logo" />
      </div>
      <ul className="nav-links">
        <li className="nav-link search">
          <input
            type="text"
            placeholder="Search Movies"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </li>
        <li className="nav-link">
          <Link to="/">Home</Link>
        </li>
        <li className="nav-link">
          <Link to="/categories">Category</Link>
        </li>
        <li className="nav-link">
          <Link to="/favorites">Favorite</Link>
        </li>
      </ul>
    </header>
  );
}

export default Navbar;
