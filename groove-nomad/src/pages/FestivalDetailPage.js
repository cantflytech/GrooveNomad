import Header from "../components/Header"
import { Calendar, Plus } from "lucide-react"
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom"
import { fetchFestivalById } from "../services/airtableService";
import { useAuth } from "../contexts/AuthContext";

export default function FestivalDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [festival, setFestival] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFestival = async () => {
      try {
        const festivalData = await fetchFestivalById(id);
        setFestival(festivalData);
      } catch (error) {
        console.error('Error loading festival:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadFestival();
    }
  }, [id]);

  const handleCreateTrip = () => {
    navigate('/trip/step1');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header currentUser={currentUser} logout={logout} />
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
          <p className="mt-2 text-gray-600">Loading festival details...</p>
        </div>
      </div>
    );
  }

  if (!festival) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header currentUser={currentUser} logout={logout} />
        <div className="text-center py-12">
          <p className="text-gray-600">Festival not found</p>
        </div>
      </div>
    );
  }
  const galleryImages = [
    festival.image,
    festival.image,
    festival.image,
    festival.image,
  ];

  // Create dynamic tags based on festival data
  const getTags = () => {
    const tags = [];
    
    if (festival.trending) tags.push("Trending 🔥");
    
    // Add location info
    const locationParts = festival.location.split(',');
    if (locationParts.length > 1) {
      tags.push(locationParts[1].trim()); // Country/State
      tags.push(locationParts[0].trim()); // City
    } else {
      tags.push(festival.location);
    }
    
    // Add duration
    tags.push(`${festival.duration} ${festival.duration === 1 ? 'day' : 'days'}`);
    
    // Add ticket availability status
    if (festival.ticketAvailability > 5000) {
      tags.push("Large Festival");
    } else if (festival.ticketAvailability > 2000) {
      tags.push("Medium Festival");
    } else {
      tags.push("Intimate Festival");
    }
    
    // Add price range if available
    if (festival.averageQuotePrice) {
      if (festival.averageQuotePrice > 1500) {
        tags.push("Premium");
      } else if (festival.averageQuotePrice > 800) {
        tags.push("Mid-range");
      } else {
        tags.push("Budget-friendly");
      }
    }
    
    return tags;
  };

  const tags = getTags();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentUser={currentUser} logout={logout} />

      {/* Hero Image */}
      <div className="h-64 bg-gradient-to-r from-pink-400 to-orange-400">
        <div className="h-full bg-black bg-opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-8 border-b border-gray-200 mb-8">
          <button className="pb-4 border-b-2 border-gray-900 font-medium text-gray-900">Overview</button>
          <button className="pb-4 text-gray-500 hover:text-gray-700">Lineup</button>
          <button className="pb-4 text-gray-500 hover:text-gray-700">Travel & Stay</button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* About Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About {festival.name}</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                {festival.description}
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-900">Location:</span>
                  <span className="text-gray-600 ml-2">{festival.location}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-900">Duration:</span>
                  <span className="text-gray-600 ml-2">{festival.duration} days</span>
                </div>
                <div>
                  <span className="font-medium text-gray-900">Tickets Available:</span>
                  <span className="text-gray-600 ml-2">{festival.ticketAvailability}</span>
                </div>
                {festival.averageQuotePrice && (
                  <div>
                    <span className="font-medium text-gray-900">Average Price:</span>
                    <span className="text-gray-600 ml-2">${festival.averageQuotePrice}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Gallery */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Gallery</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {galleryImages.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${festival.name} ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <div className="absolute bottom-2 left-2 text-white text-xs font-medium bg-black bg-opacity-50 px-2 py-1 rounded">
                      {festival.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Festival Dates</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <Calendar className="h-5 w-5 text-gray-400 mt-1" />
                  <div>
                    <h4 className="font-medium text-gray-900">Start Date</h4>
                    <p className="text-sm text-gray-500">{new Date(festival.startDate).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Calendar className="h-5 w-5 text-gray-400 mt-1" />
                  <div>
                    <h4 className="font-medium text-gray-900">End Date</h4>
                    <p className="text-sm text-gray-500">{new Date(festival.endDate).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Calendar className="h-5 w-5 text-gray-400 mt-1" />
                  <div>
                    <h4 className="font-medium text-gray-900">Duration</h4>
                    <p className="text-sm text-gray-500">{festival.duration} days</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <button 
                onClick={handleCreateTrip}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center space-x-2 mb-6"
              >
                <Plus className="h-5 w-5" />
                <span>Create My Trip</span>
              </button>

              
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
