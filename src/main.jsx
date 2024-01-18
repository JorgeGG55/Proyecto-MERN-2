import React, { lazy } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home.jsx'));
const CitiesTemp = lazy(() => import('./pages/CitiesTemp.jsx'));
const Local = lazy(() => import('./pages/Local.jsx'));
const Cities = lazy(() => import('./pages/Cities.jsx'));

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route
            index
            element={
              <React.Suspense fallback={<h2>Cargando datos...</h2>}>
                <Home />
              </React.Suspense>
            }
          />
          <Route
            path="/cities-temp"
            element={
              <React.Suspense fallback={<h2>Cargando datos...</h2>}>
                <CitiesTemp />
              </React.Suspense>
            }
          />
          <Route
            path="/local"
            element={
              <React.Suspense fallback={<h2>Cargando datos...</h2>}>
                <Local />
              </React.Suspense>
            }
          />
          <Route
            path="/cities"
            element={
              <React.Suspense fallback={<h2>Cargando datos...</h2>}>
                <Cities />
              </React.Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
