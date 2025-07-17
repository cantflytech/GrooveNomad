import Header from "../components/Header"
import { Search, MapPin, ChevronDown } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function MyTripsPage() {
  const navigate = useNavigate();

  const handleNextStep = () => {
    navigate('/trip/transport');
  };
  const myFestivals = [
    {
      id: 1,
      name: "Summer Beats Festival",
      date: "July 12 - 14",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 2,
      name: "Harmony Fest",
      date: "August 5 - 7",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 3,
      name: "Electro Pulse",
      date: "September 20 - 22",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 4,
      name: "Indie Roots",
      date: "October 15 - 17",
      image: "/placeholder.svg?height=60&width=60",
    },
  ]

  const upcomingFestivals = [
    {
      id: 1,
      name: "Summer Beats Festival",
      date: "July 12 - 14",
      location: "City Park",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      name: "Harmony Fest",
      date: "August 5 - 7",
      location: "Lakeside Arena",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      name: "Electro Pulse",
      date: "September 20 - 22",
      location: "Downtown Plaza",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 4,
      name: "Indie Roots",
      date: "October 15 - 17",
      location: "Open Air Grounds",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  const filters = ["Genre", "Dates", "Popularity", "Location"]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage="My trips" />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-2">Step 1 of 4: Festival Selection</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gray-900 h-2 rounded-full" style={{ width: "25%" }}></div>
                </div>
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-4">My Festivals</h3>
              <div className="space-y-4">
                {myFestivals.map((festival) => (
                  <div key={festival.id} className="flex items-center space-x-3">
                    <img
                      src={festival.image || "/placeholder.svg"}
                      alt={festival.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-medium text-sm">{festival.name}</p>
                      <p className="text-xs text-gray-500">{festival.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Festival Search</h1>

            {/* Search */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search for a festival by name, location, or date"
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              />
            </div>

            {/* Map */}
            <div className="bg-green-100 rounded-lg h-64 mb-8 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-200 to-green-300 rounded-lg">
                <div className="absolute top-1/4 left-1/4 flex items-center space-x-2 bg-white rounded-full px-3 py-1 shadow-md">
                  <MapPin className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium">Park Conc</span>
                </div>
                <div className="absolute top-1/3 right-1/3 flex items-center space-x-2 bg-white rounded-full px-3 py-1 shadow-md">
                  <MapPin className="h-4 w-4 text-gray-600" />
                  <span className="text-sm font-medium">Deepa's Art Studio</span>
                </div>
                <div className="absolute bottom-1/4 left-1/2 text-gray-700 font-medium">Abbeyville</div>
                <div className="absolute bottom-1/3 right-1/4 text-gray-700 font-medium">Tincup</div>
              </div>
            </div>

            {/* Upcoming Festivals */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Festivals</h2>

              {/* Filters */}
              <div className="flex space-x-4 mb-6">
                {filters.map((filter) => (
                  <button
                    key={filter}
                    className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <span>{filter}</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                ))}
              </div>

              {/* Festivals Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {upcomingFestivals.map((festival) => (
                  <div key={festival.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <img
                      src={festival.image || "/placeholder.svg"}
                      alt={festival.name}
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 mb-1">{festival.name}</h3>
                      <p className="text-sm text-gray-600 mb-1">{festival.date}</p>
                      <p className="text-sm text-gray-500">{festival.location}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end mt-8">
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium">
                  Next: Transport
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Navigation Button */}
        <div className="flex justify-end p-6">
          <button 
            onClick={handleNextStep}
            className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
          >
            Continuer vers Transport
          </button>
        </div>
      </div>
    </div>
  )
}
