import { Search, Bell, User } from "lucide-react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { useSearch } from "../contexts/SearchContext"
import { fetchFestivals } from "../services/airtableService"

export default function Header({ currentPage }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { globalSearchTerm, updateGlobalSearch } = useSearch()
  const [localSearchTerm, setLocalSearchTerm] = useState(globalSearchTerm)
  const [searchResults, setSearchResults] = useState([])
  const [showResults, setShowResults] = useState(false)
  const [festivals, setFestivals] = useState([])

  useEffect(() => {
    const loadFestivals = async () => {
      try {
        const festivalsData = await fetchFestivals()
        setFestivals(festivalsData)
      } catch (error) {
        console.error('Error loading festivals:', error)
      }
    }
    loadFestivals()
  }, [])

  useEffect(() => {
    setLocalSearchTerm(globalSearchTerm)
  }, [globalSearchTerm])

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Festivals", href: "/festivals" },
    { name: "Community", href: "/community" },
    { name: "Trip", href: "/trip" },
  ]

  const getCurrentPage = () => {
    if (currentPage) return currentPage
    
    switch (location.pathname) {
      case "/":
        return "Home"
      case "/festivals":
        return "Festivals"
      case "/community":
        return "Community"
      case "/trip":
        return "Trip"
      default:
        return "Home"
    }
  }

  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      setSearchResults([])
      setShowResults(false)
      return
    }

    const filtered = festivals.filter(festival => 
      festival.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      festival.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      festival.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    
    setSearchResults(filtered)
    setShowResults(true)
    updateGlobalSearch(searchTerm)
  }

  const handleInputChange = (e) => {
    const value = e.target.value
    setLocalSearchTerm(value)
    handleSearch(value)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (localSearchTerm.trim()) {
      updateGlobalSearch(localSearchTerm)
      navigate('/festivals')
      setShowResults(false)
    }
  }

  const handleResultClick = (festival) => {
    navigate(`/festival/${festival.id}`)
    setShowResults(false)
    setLocalSearchTerm('')
  }

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img className="h-8 w-auto" src="/placeholder.svg?height=32&width=120" alt="Groove Nomad" />
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`${
                  getCurrentPage() === item.name ? "text-gray-900 font-medium" : "text-gray-500 hover:text-gray-700"
                } px-3 py-2 text-sm font-medium transition-colors`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Search and User */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <form onSubmit={handleSearchSubmit}>
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search festivals..."
                  value={localSearchTerm}
                  onChange={handleInputChange}
                  onFocus={() => localSearchTerm && setShowResults(true)}
                  onBlur={() => setTimeout(() => setShowResults(false), 200)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 w-64"
                />
              </form>
              
              {/* Search Results Dropdown */}
              {showResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                  {searchResults.slice(0, 5).map((festival) => (
                    <div
                      key={festival.id}
                      onClick={() => handleResultClick(festival)}
                      className="flex items-center p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                    >
                      <img
                        src={festival.image}
                        alt={festival.name}
                        className="w-12 h-12 object-cover rounded-lg mr-3"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 text-sm">{festival.name}</h4>
                        <p className="text-xs text-gray-500">{festival.location}</p>
                        <p className="text-xs text-gray-400">{festival.date}</p>
                      </div>
                    </div>
                  ))}
                  {searchResults.length > 5 && (
                    <div 
                      onClick={() => {
                        navigate('/festivals')
                        setShowResults(false)
                      }}
                      className="p-3 text-center text-blue-600 hover:bg-gray-50 cursor-pointer text-sm font-medium"
                    >
                      Voir tous les {searchResults.length} résultats
                    </div>
                  )}
                </div>
              )}
              
              {showResults && searchResults.length === 0 && localSearchTerm && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4 text-center text-gray-500 text-sm">
                  Aucun festival trouvé pour "{localSearchTerm}"
                </div>
              )}
            </div>
            <Bell className="h-6 w-6 text-gray-400 hover:text-gray-600 cursor-pointer" />
            <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
              <User className="h-5 w-5 text-gray-600" />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
