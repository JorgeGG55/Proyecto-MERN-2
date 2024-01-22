import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const App = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header>
        <div className={`sidenav ${isMenuOpen ? 'open' : ''}`}>
          <div className="menu-icon" onClick={toggleMenu}>
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
          </div>
          <nav>
            <NavLink className="NavLink" to="" onClick={toggleMenu}>
              Home
            </NavLink>
            <NavLink className="NavLink" to="cities-temp" onClick={toggleMenu}>
              Cities Temp.
            </NavLink>
            <NavLink className="NavLink" to="local" onClick={toggleMenu}>
              Local Forecast
            </NavLink>
            <NavLink className="NavLink" to="cities" onClick={toggleMenu}>
              Cities Forecast
            </NavLink>
          </nav>
        </div>
        <h1>Weather App</h1>
      </header>
      <main>
        <div className="firstContainer">
          <Outlet />
        </div>
      </main>
      <footer>
        <p>© 2024 by Jorge Gravel for Rock{'{TheCode}'}</p>
      </footer>
    </>
  );
};

export default App;
