import Header from "../components/Header"
import FestivalCard from "../components/FestivalCard"
import { Search, Music } from "lucide-react"
import { useNavigate } from "react-router-dom"
import React, { useState, useEffect } from 'react';
import { fetchFestivals } from "../services/airtableService";
import { useSearch } from "../contexts/SearchContext";
import { useAuth } from "../contexts/AuthContext";

export default function FestivalsPage() {
  const navigate = useNavigate();
  const { globalSearchTerm } = useSearch();
  const { currentUser, logout } = useAuth();
  const [festivals, setFestivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

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

  // Sync with global search term
  useEffect(() => {
    if (globalSearchTerm) {
      setSearchTerm(globalSearchTerm);
    }
  }, [globalSearchTerm]);

  const handleFestivalClick = (festival) => {
    navigate(`/festival/${festival.id}`);
  };

  // Get unique locations for category filtering
  const getCategories = () => {
    const locations = [...new Set(festivals.map(f => f.location.split(',')[1]?.trim() || f.location))];
    const categories = ['All'];
    
    // Add Trending if there are trending festivals
    if (festivals.some(f => f.trending)) {
      categories.push('Trending');
    }
    
    // Add unique locations
    categories.push(...locations.slice(0, 3)); // Limit to avoid too many categories
    
    return categories;
  };

  // Filter festivals based on search term and category
  const filteredFestivals = festivals.filter(festival => {
    const matchesSearch = festival.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         festival.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         festival.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || 
                           festival.location.includes(selectedCategory) ||
                           (selectedCategory === 'Trending' && festival.trending);
    
    return matchesSearch && matchesCategory;
  });

  const categories = getCategories();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentUser={currentUser} logout={logout} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Festivals</h1>
          <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 bg-slate-200 px-2.5 rounded-lg">
            <Music className="h-5 w-5" />
            <span>Connect to Music</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search for festivals"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
          />
        </div>

        {/* Categories */}
        <div className="flex space-x-4 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full font-medium transition-colors ${
                selectedCategory === category ? "bg-teal-500 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Festivals Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
            <p className="mt-2 text-gray-600">Loading festivals...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {filteredFestivals.map((festival) => (
              <FestivalCard key={festival.id} festival={festival} onFestivalClick={handleFestivalClick} />
            ))}
          </div>
        )}

        {/* Quiz Section */}
        <div className="text-center bg-white rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">You don't know where to go?</h2>
          <p className="text-gray-600 mb-6">
            Try our AI quiz to find your festival and your dream destination in 5 minutes.
          </p>
          <button className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded-lg font-medium">
            Take the Quiz
          </button>
        </div>
      </div>
    </div>
  )
}
