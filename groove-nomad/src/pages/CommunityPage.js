import React, { useState } from 'react';
import Header from "../components/Header";
import PageWrapper from "../components/PageWrapper";
import { Instagram, Twitter, Facebook, MessageCircle, Users, Camera, Heart, Send, Plus, Search, MapPin, Calendar } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export default function CommunityPage() {
  const { currentUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("Electric Echo");
  const [activeSection, setActiveSection] = useState("forums");
  const [newPost, setNewPost] = useState("");
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const forumTabs = ["Electric Echo", "Harmony Haven", "Rhythm Riot"];

  const [forumPosts, setForumPosts] = useState([
    {
      id: 1,
      user: "MusicLover23",
      avatar: "/placeholder.svg?height=40&width=40",
      content: "Who else is excited for Electric Echo? The lineup this year is insane! 🎵",
      timestamp: "2 hours ago",
      likes: 15,
      comments: 8,
      festival: "Electric Echo"
    },
    {
      id: 2,
      user: "FestivalFan",
      avatar: "/placeholder.svg?height=40&width=40",
      content: "Looking for people to share accommodation near the venue. Anyone interested?",
      timestamp: "4 hours ago",
      likes: 7,
      comments: 12,
      festival: "Electric Echo"
    },
    {
      id: 3,
      user: "BeatSeeker",
      avatar: "/placeholder.svg?height=40&width=40",
      content: "First time at Harmony Haven - any tips for a newbie?",
      timestamp: "6 hours ago",
      likes: 23,
      comments: 18,
      festival: "Harmony Haven"
    }
  ]);

  const [travelGroups, setTravelGroups] = useState([
    {
      id: 1,
      name: "London to Electric Echo",
      members: 12,
      maxMembers: 20,
      departure: "London",
      festival: "Electric Echo",
      date: "July 25, 2025",
      description: "Group traveling from London to Electric Echo. We're planning to rent a bus together!",
      organizer: "TravelMaster",
      image: "/placeholder.svg?height=120&width=200"
    },
    {
      id: 2,
      name: "Paris Electronic Crew",
      members: 8,
      maxMembers: 15,
      departure: "Paris",
      festival: "Electric Echo",
      date: "July 25, 2025",
      description: "Electronic music lovers from Paris heading to the festival together.",
      organizer: "ParisianVibes",
      image: "/placeholder.svg?height=120&width=200"
    },
    {
      id: 3,
      name: "Berlin Bass Lovers",
      members: 15,
      maxMembers: 25,
      departure: "Berlin",
      festival: "Rhythm Riot",
      date: "August 10, 2025",
      description: "Techno and bass enthusiasts from Berlin ready to party!",
      organizer: "BerlinBeats",
      image: "/placeholder.svg?height=120&width=200"
    }
  ]);

  const [userGallery, setUserGallery] = useState([
    {
      id: 1,
      image: "/placeholder.svg?height=150&width=200",
      user: "MusicLover23",
      festival: "Electric Echo 2024",
      likes: 45,
      caption: "Best night ever! 🎵✨"
    },
    {
      id: 2,
      image: "/placeholder.svg?height=150&width=200",
      user: "FestivalFan",
      festival: "Harmony Haven 2024",
      likes: 32,
      caption: "Amazing vibes with new friends!"
    },
    {
      id: 3,
      image: "/placeholder.svg?height=150&width=200",
      user: "BeatSeeker",
      festival: "Rhythm Riot 2024",
      likes: 67,
      caption: "The crowd was insane! 🔥"
    },
    {
      id: 4,
      image: "/placeholder.svg?height=150&width=200",
      user: "TravelMaster",
      festival: "Electric Echo 2024",
      likes: 28,
      caption: "Perfect sunset set 🌅"
    },
    {
      id: 5,
      image: "/placeholder.svg?height=150&width=200",
      user: "ParisianVibes",
      festival: "Harmony Haven 2024",
      likes: 51,
      caption: "Dancing until sunrise 💃"
    },
    {
      id: 6,
      image: "/placeholder.svg?height=150&width=200",
      user: "BerlinBeats",
      festival: "Rhythm Riot 2024",
      likes: 39,
      caption: "Front row energy! ⚡"
    }
  ]);

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    const post = {
      id: forumPosts.length + 1,
      user: currentUser?.firstName || "Anonymous",
      avatar: currentUser?.profilePhoto || "/placeholder.svg?height=40&width=40",
      content: newPost,
      timestamp: "Just now",
      likes: 0,
      comments: 0,
      festival: activeTab
    };

    setForumPosts([post, ...forumPosts]);
    setNewPost("");
  };

  const handleLike = (postId) => {
    setForumPosts(posts => posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
  };

  const handleJoinGroup = (groupId) => {
    setTravelGroups(groups => groups.map(group => 
      group.id === groupId && group.members < group.maxMembers
        ? { ...group, members: group.members + 1 }
        : group
    ));
  };

  const handleImageLike = (imageId) => {
    setUserGallery(gallery => gallery.map(item => 
      item.id === imageId 
        ? { ...item, likes: item.likes + 1 }
        : item
    ));
  };

  const filteredPosts = forumPosts.filter(post => 
    post.festival === activeTab &&
    (searchQuery === "" || post.content.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredGroups = travelGroups.filter(group => 
    searchQuery === "" || 
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.departure.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PageWrapper>
      <div className="min-h-screen bg-gray-50">
        <Header currentUser={currentUser} logout={logout} />

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">GrooveNomad Community</h1>
            <p className="text-gray-600">
              Connect with fellow music lovers, share your festival experiences, and plan your next adventure together.
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-8 border-b border-gray-200 mb-8">
            <button
              onClick={() => setActiveSection("forums")}
              className={`pb-4 font-medium ${
                activeSection === "forums"
                  ? "border-b-2 border-purple-600 text-purple-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <MessageCircle className="h-5 w-5 inline mr-2" />
              Forums
            </button>
            <button
              onClick={() => setActiveSection("groups")}
              className={`pb-4 font-medium ${
                activeSection === "groups"
                  ? "border-b-2 border-purple-600 text-purple-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Users className="h-5 w-5 inline mr-2" />
              Travel Groups
            </button>
            <button
              onClick={() => setActiveSection("gallery")}
              className={`pb-4 font-medium ${
                activeSection === "gallery"
                  ? "border-b-2 border-purple-600 text-purple-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Camera className="h-5 w-5 inline mr-2" />
              Gallery
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search community..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
            />
          </div>

          {/* Forum Section */}
          {activeSection === "forums" && (
            <div>
              {/* Festival Forum Tabs */}
              <div className="flex space-x-4 mb-6">
                {forumTabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-full font-medium transition-colors ${
                      activeTab === tab
                        ? "bg-purple-600 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Create New Post */}
              {currentUser && (
                <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
                  <form onSubmit={handlePostSubmit}>
                    <div className="flex items-start space-x-4">
                      <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-purple-600 font-medium">
                          {currentUser.firstName?.charAt(0) || "A"}
                        </span>
                      </div>
                      <div className="flex-1">
                        <textarea
                          value={newPost}
                          onChange={(e) => setNewPost(e.target.value)}
                          placeholder={`Share something with the ${activeTab} community...`}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                          rows="3"
                        />
                        <div className="mt-3 flex justify-between items-center">
                          <span className="text-sm text-gray-500">
                            Posting to {activeTab}
                          </span>
                          <button
                            type="submit"
                            disabled={!newPost.trim()}
                            className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                          >
                            <Send className="h-4 w-4 inline mr-2" />
                            Post
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              )}

              {/* Forum Posts */}
              <div className="space-y-6">
                {filteredPosts.map((post) => (
                  <div key={post.id} className="bg-white rounded-lg p-6 shadow-sm">
                    <div className="flex items-start space-x-4">
                      <img
                        src={post.avatar}
                        alt={post.user}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="font-medium text-gray-900">{post.user}</span>
                          <span className="text-sm text-gray-500">•</span>
                          <span className="text-sm text-gray-500">{post.timestamp}</span>
                          <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full">
                            {post.festival}
                          </span>
                        </div>
                        <p className="text-gray-700 mb-4">{post.content}</p>
                        <div className="flex items-center space-x-6">
                          <button
                            onClick={() => handleLike(post.id)}
                            className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors"
                          >
                            <Heart className="h-4 w-4" />
                            <span className="text-sm">{post.likes}</span>
                          </button>
                          <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors">
                            <MessageCircle className="h-4 w-4" />
                            <span className="text-sm">{post.comments}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Travel Groups Section */}
          {activeSection === "groups" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Travel Groups</h2>
                <button
                  onClick={() => setShowCreateGroup(!showCreateGroup)}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium"
                >
                  <Plus className="h-4 w-4 inline mr-2" />
                  Create Group
                </button>
              </div>

              {showCreateGroup && (
                <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
                  <h3 className="text-lg font-medium mb-4">Create New Travel Group</h3>
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Group Name
                      </label>
                      <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="e.g., London to Electric Echo"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Departure City
                        </label>
                        <input
                          type="text"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="e.g., London"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Max Members
                        </label>
                        <input
                          type="number"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="20"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                        rows="3"
                        placeholder="Tell us about your travel group..."
                      />
                    </div>
                    <div className="flex space-x-3">
                      <button
                        type="submit"
                        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium"
                      >
                        Create Group
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowCreateGroup(false)}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGroups.map((group) => (
                  <div key={group.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <img
                      src={group.image}
                      alt={group.name}
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">{group.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {group.departure}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {group.date}
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-4">{group.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            {group.members}/{group.maxMembers}
                          </span>
                        </div>
                        <button
                          onClick={() => handleJoinGroup(group.id)}
                          disabled={group.members >= group.maxMembers}
                          className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                          {group.members >= group.maxMembers ? "Full" : "Join"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Gallery Section */}
          {activeSection === "gallery" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Community Gallery</h2>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium">
                  <Plus className="h-4 w-4 inline mr-2" />
                  Upload Photo
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {userGallery.map((item) => (
                  <div key={item.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.caption}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-900">{item.user}</span>
                        <button
                          onClick={() => handleImageLike(item.id)}
                          className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors"
                        >
                          <Heart className="h-4 w-4" />
                          <span className="text-sm">{item.likes}</span>
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mb-2">{item.festival}</p>
                      <p className="text-sm text-gray-600">{item.caption}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Social Media Footer */}
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Follow Us</h2>
            <div className="flex justify-center space-x-8">
              <button className="text-gray-600 hover:text-purple-600 transition-colors">
                <Instagram className="h-8 w-8 mx-auto mb-2" />
                <p className="text-sm">Instagram</p>
              </button>
              <button className="text-gray-600 hover:text-purple-600 transition-colors">
                <Twitter className="h-8 w-8 mx-auto mb-2" />
                <p className="text-sm">Twitter</p>
              </button>
              <button className="text-gray-600 hover:text-purple-600 transition-colors">
                <Facebook className="h-8 w-8 mx-auto mb-2" />
                <p className="text-sm">Facebook</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
