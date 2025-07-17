import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import HomePage from './pages/HomePage';
import FestivalsPage from './pages/FestivalsPage';
import FestivalDetailPage from './pages/FestivalDetailPage';
import { SearchProvider } from './contexts/SearchContext';

function App() {
  return (
    <SearchProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/festivals" element={<FestivalsPage />} />
            <Route path="/festival/:id" element={<FestivalDetailPage />} />
          </Routes>
        </div>
      </Router>
    </SearchProvider>
  );
}

export default App;
