import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const App = () => {
  return (
    <>
      <header>
        <h1>Weather App</h1>
        <nav>
          <NavLink className="NavLink" to="">
            Home{' '}
          </NavLink>
          <NavLink className="NavLink" to="cities-temp">
            Cities Temp.{' '}
          </NavLink>
          <NavLink className="NavLink" to="local">
            Local Forecast{' '}
          </NavLink>
          <NavLink className="NavLink" to="cities">
            Cities Forecast{' '}
          </NavLink>
        </nav>
      </header>
      <main>
        <div className="fristContainer">
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
