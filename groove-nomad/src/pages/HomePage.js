import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../components/Header";
import FestivalCard from "../components/FestivalCard";
import { Search } from "lucide-react";
import { fetchFestivals } from "../services/airtableService";
import { useSearch } from "../contexts/SearchContext";
import { useAuth } from "../contexts/AuthContext";
import homeImg from '../img/home.jpg'; // Assuming you have a home image
import Quizz from '../img/Quizz.png'; // Assuming you have a quiz image

export default function HomePage() {
  const navigate = useNavigate();
  const { updateGlobalSearch } = useSearch();
  const { currentUser, logout } = useAuth();
  const [festivals, setFestivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchFilters, setSearchFilters] = useState({
    destination: '',
    time: '',
    travelers: ''
  });

  useEffect(() => {
    const loadFestivals = async () => {
      try {
        const festivalsData = await fetchFestivals();
        setFestivals(festivalsData);
      } catch (error) {
        console.error('Error loading festivals:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFestivals();
  }, []);

  const handleFestivalClick = (festival) => {
    navigate(`/festival/${festival.id}`);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchFilters.destination) {
      updateGlobalSearch(searchFilters.destination);
      navigate('/festivals');
    }
  };

  const handleFilterChange = (field, value) => {
    setSearchFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Get recommended festivals (first 3 for carousel)
  const recommendedFestivals = festivals.slice(0, 3);
  
  // Get featured festivals (trending or first 2)
  const featuredFestivals = festivals.filter(f => f.trending).slice(0, 2);
  if (featuredFestivals.length < 2) {
    const nonTrending = festivals.filter(f => !f.trending).slice(0, 2 - featuredFestivals.length);
    featuredFestivals.push(...nonTrending);
  }

  // Get unique locations for destination dropdown
  const destinations = [...new Set(festivals.map(f => f.location))];

  // Get unique time ranges
  const timeRanges = ['This Month', 'Next 3 Months', 'This Year', 'Next Year'];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentUser={currentUser} logout={logout} />

      {/* Notification Banner */}
      <div className="bg-black text-white px-4 py-2 text-center text-sm">
        <span>• 75% off on your tech bundles until 07/15 – hurry up!</span>
        <button className="ml-4 text-white hover:text-gray-300">×</button>
      </div>

      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-orange-400 to-pink-400">
        <div
          className="absolute inset-0 bg-cover bg-center bg-blend-overlay"
             style={{ backgroundImage: `url(${homeImg})` }}
        />
        
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
          <h1 className="text-5xl font-bold mb-4">
            GROOVE
            <br />
            NOMAD
          </h1>
          <h2 className="text-2xl font-medium mb-2">Own your Festival Journey</h2>
          <p className="text-lg mb-8">
            Customize a unique experience thanks to Cyrius,
            <br />
            our festiAval-goer
          </p>
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Chat with IA"
              className="w-full pl-12 pr-4 py-3 rounded-lg text-gray-900 placeholder-gray-500"
            />
          </div>
        </div>
      </div>

      {/* Recommended Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Recommended for you</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {recommendedFestivals.map((festival) => (
            <div key={festival.id} className="relative">
              <img
                src={festival.image || "/placeholder.svg"}
                alt={festival.name}
                className="w-full h-48 object-cover rounded-lg"
              />
              {festival.trending && (
                <span className="absolute top-4 left-4 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                  Tendance 🔥
                </span>
              )}
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-bold">{festival.name}</h3>
                <p className="text-sm">{festival.location}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="bg-teal-500 rounded-lg p-6 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div>
              <label className="block text-white text-sm font-medium mb-2">Destination</label>
              <select 
                className="w-full p-2 rounded border-0 shadow-none text-gray-900 bg-white"
                value={searchFilters.destination}
                onChange={(e) => handleFilterChange('destination', e.target.value)}
              >
                <option value="">Search for a destination</option>
                {destinations.map((destination, index) => (
                  <option key={index} value={destination}>{destination}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-2">Time Period</label>
              <select 
                className="w-full p-2 rounded border-0 text-gray-900 bg-white"
                value={searchFilters.time}
                onChange={(e) => handleFilterChange('time', e.target.value)}
              >
                <option value="">When?</option>
                {timeRanges.map((range, index) => (
                  <option key={index} value={range}>{range}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-2">Duration</label>
              <select 
                className="w-full p-2 rounded border-0 text-gray-900 bg-white"
                value={searchFilters.duration}
                onChange={(e) => handleFilterChange('duration', e.target.value)}
              >
                <option value="">Any duration</option>
                <option value="1">1 day</option>
                <option value="2-3">2-3 days</option>
                <option value="4-7">4-7 days</option>
                <option value="7+">More than 7 days</option>
              </select>
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-2">Travelers</label>
              <select 
                className="w-full p-2 rounded border-0 text-gray-900 bg-white"
                value={searchFilters.travelers}
                onChange={(e) => handleFilterChange('travelers', e.target.value)}
              >
                <option value="">How many people?</option>
                <option value="1">1 person</option>
                <option value="2">2 people</option>
                <option value="3-5">3-5 people</option>
                <option value="6+">6+ people</option>
              </select>
            </div>
          </div>
          <button 
            type="submit"
            className="mt-4 bg-white text-teal-500 px-6 py-2 font-medium hover:bg-gray-100 rounded-md flex items-center gap-2"
          >
            <Search className="h-4 w-4" />
            Search Festivals
          </button>
        </form>

        {/* Featured Festivals */}
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Festivals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {featuredFestivals.map((festival) => (
            <FestivalCard key={festival.id} festival={festival} onFestivalClick={handleFestivalClick} />
          ))}
        </div>

 {/* Quiz Section */}
<div className="bg-teal-400 rounded-xl p-1 mb-12">
  <div className="bg-teal-600 rounded-lg p-6 md:p-8 text-white flex flex-col md:flex-row items-center md:justify-between">
    <div className="flex-1 md:pr-8 mb-6 md:mb-0 text-center md:text-left">
      <h3 className="text-lg md:text-xl font-bold mb-1">Find your perfect festival</h3>
      <h4 className="text-base md:text-lg font-medium mb-2">Quiz: Your Ideal Festival</h4>
      <p className="mb-4 md:mb-6 text-sm md:text-base">
        Take our quick quiz to get personalized festival recommendations based on your music taste and travel
        preferences.
      </p>
      <button className="inline-block bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 
                         text-white px-5 py-2 rounded-lg font-medium transition">
        Start Quiz
      </button>
    </div>
    <div className="w-32 md:w-48 lg:w-56 aspect-[3/4] overflow-hidden rounded-lg shadow-lg">
      <img
        src={Quizz}
        alt="Quiz preview"
        className="object-cover w-full h-full"
      />
    </div>
  </div>
</div>


        {/* Community Feed */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Community Feed</h2>
          <h3 className="text-lg font-medium text-gray-700 mb-2">Social Matching</h3>
          <p className="text-gray-600 mb-6">
            Get matched with other attendees based on your music profile and departure location. Start messaging and
            plan your festival adventure together!
          </p>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium">
            Find Matches
          </button>
        </div>
      </div>
    </div>
  );
}
