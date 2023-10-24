import '../Styles/footer.css'; 
import React, { useEffect, useState } from 'react';

function Footer() {
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.body.clientHeight;

    if (scrollPosition + windowHeight >= documentHeight) {
      setShowFooter(true);
    } else {
      setShowFooter(false);
    }
  };

  return (
    <footer style={{ opacity: showFooter ? 1 : 0 }}>
      <div>
        <span>Santiago Ezequiel Lazo</span>
      </div>
      <p>2023</p>
    </footer>
  );
}

export default Footer;