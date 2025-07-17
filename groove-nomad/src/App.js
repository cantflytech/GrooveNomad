import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import HomePage from './pages/HomePage';
import FestivalsPage from './pages/FestivalsPage';
import FestivalDetailPage from './pages/FestivalDetailPage';
import MyTripsPage from './pages/MyTripsPage';
import TransportSearchPage from './pages/TransportSearchPage';
import AccommodationPage from './pages/AccommodationPage';
import TripSummaryPage from './pages/TripSummaryPage';
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
            <Route path="/trip/step1" element={<MyTripsPage />} />
            <Route path="/trip/transport" element={<TransportSearchPage />} />
            <Route path="/trip/accommodation" element={<AccommodationPage />} />
            <Route path="/trip/summary" element={<TripSummaryPage />} />
          </Routes>
        </div>
      </Router>
    </SearchProvider>
  );
}

export default App;
