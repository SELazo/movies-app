import '../Styles/footer.css'; 
import React from 'react';
import Logo from '../Images/logo.jpg'; 

function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <div className="logo">
          <img src={Logo} alt="Logo" />
        </div>
        <div className="footer-info">
          <span>Santiago Ezequiel Lazo</span>
          <p>2023</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
