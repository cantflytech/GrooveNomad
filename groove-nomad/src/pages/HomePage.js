import React from 'react';
import Header from "../components/Header";
import FestivalCard from "../components/FestivalCard";
import { Search } from "lucide-react";

export default function HomePage() {
  const recommendedFestivals = [
    {
      id: 1,
      name: "Electric Beats Fest",
      location: "Ibiza, Spain",
      image: "/placeholder.svg?height=300&width=400",
      trending: true,
    },
    {
      id: 2,
      name: "Harmony Flow",
      location: "Austin, TX",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 3,
      name: "Rhythm Riot",
      location: "Berlin, Germany",
      image: "/placeholder.svg?height=300&width=400",
    },
  ];

  const featuredFestivals = [
    {
      id: 1,
      name: "Harmony Haven",
      description:
        "A three-day music festival in the heart of the city, featuring top artists and immersive experiences.",
      date: "Jul 12 - 14, 2024",
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      id: 2,
      name: "Rhythm Retreat",
      description: "Escape to a serene lakeside retreat with acoustic performances and wellness activities.",
      date: "Aug 5 - 7, 2024",
      image: "/placeholder.svg?height=300&width=500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage="Home" />

      {/* Notification Banner */}
      <div className="bg-black text-white px-4 py-2 text-center text-sm">
        <span>• 75% off on your tech bundles until 07/15 – hurry up!</span>
        <button className="ml-4 text-white hover:text-gray-300">×</button>
      </div>

      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-orange-400 to-pink-400">
        <div
          className="absolute inset-0 bg-cover bg-center bg-blend-overlay"
          style={{ backgroundImage: "url(/placeholder.svg?height=400&width=1200)" }}
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
        <div className="bg-teal-500 rounded-lg p-6 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div>
              <label className="block text-white text-sm font-medium mb-2">. Drop-Off Location</label>
              <select className="w-full p-2 rounded border-0 shadow-none text-white bg-transparent">
                <option>Search for a location</option>
              </select>
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-2">Departure</label>
              <select className="w-full p-2 rounded border-0 text-white bg-transparent">
                <option>When?</option>
              </select>
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-2">Time</label>
              <select className="w-full p-2 rounded border-0 text-white bg-transparent">
                <option>Select your time</option>
              </select>
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-2">Travelers</label>
              <select className="w-full p-2 rounded border-0 text-white bg-transparent">
                <option>How many people?</option>
              </select>
            </div>
          </div>
          <button className="mt-4 bg-white text-teal-500 px-6 py-2 font-medium hover:bg-gray-100 rounded-md">
            Search
          </button>
        </div>

        {/* Featured Festivals */}
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Festivals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {featuredFestivals.map((festival) => (
            <FestivalCard key={festival.id} festival={festival} />
          ))}
        </div>

        {/* Quiz Section */}
        <div className="bg-teal-500 rounded-lg p-8 text-white mb-12">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">Find your perfect festival</h3>
              <h4 className="text-lg font-medium mb-2">Quiz: Your Ideal Festival</h4>
              <p className="mb-4">
                Take our quick quiz to get personalized festival recommendations based on your music taste and travel
                preferences.
              </p>
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium">
                Start Quiz
              </button>
            </div>
            <div className="ml-8">
              <img src="/placeholder.svg?height=120&width=200" alt="Music Pulse" className="rounded-lg" />
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
