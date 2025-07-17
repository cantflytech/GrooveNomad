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
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CommunityPage from './pages/CommunityPage';
import { SearchProvider } from './contexts/SearchContext';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <SearchProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/festivals" element={<FestivalsPage />} />
              <Route path="/festival/:id" element={<FestivalDetailPage />} />
              <Route path="/my-trips" element={<MyTripsPage />} />
              <Route path="/community" element={<CommunityPage />} />
              <Route path="/trip/step1" element={<MyTripsPage />} />
              <Route path="/trip/step2" element={<TransportSearchPage />} />
              <Route path="/trip/step3" element={<AccommodationPage />} />
              <Route path="/trip/step4" element={<TripSummaryPage />} />
              <Route path="/trip/transport" element={<TransportSearchPage />} />
              <Route path="/trip/accommodation" element={<AccommodationPage />} />
              <Route path="/trip/summary" element={<TripSummaryPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
            </Routes>
          </div>
        </Router>
      </SearchProvider>
    </AuthProvider>
  );
}

export default App;
