import Header from "../components/Header"
import { Star, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function AccommodationPage() {
  const navigate = useNavigate();

  const handleNextStep = () => {
    navigate('/trip/summary');
  };

  const handlePreviousStep = () => {
    navigate('/trip/transport');
  };
  const accommodations = [
    {
      id: 1,
      name: "The Grand Hotel",
      rating: 4.5,
      reviews: 120,
      distance: "1.2 miles from festival",
      price: 200,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      name: "Festival Camping",
      rating: 4.2,
      reviews: 85,
      distance: "On-site camping",
      price: 50,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      name: "Cozy Apartment",
      rating: 4.7,
      reviews: 210,
      distance: "2.5 miles from festival",
      price: 150,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 4,
      name: "The Backpackers Inn",
      rating: 4.0,
      reviews: 60,
      distance: "0.8 miles from festival",
      price: 30,
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  const filters = ["Price", "Distance", "Type", "Rating"]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Your Trip</h3>

              <div className="space-y-4">
                <div>
                  <p className="font-medium">Festival of Music</p>
                  <p className="text-sm text-gray-500">July 12 - 14</p>
                </div>

                <div>
                  <p className="font-medium">Accommodation</p>
                  <p className="text-sm text-gray-500">2 nights</p>
                </div>

                <div>
                  <p className="font-medium">Tickets</p>
                  <p className="text-sm text-gray-500">2 tickets</p>
                </div>

                <div className="pt-4 border-t">
                  <p className="font-medium">Total: $1,200</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <p className="text-sm text-gray-600 mb-2">Step 3 of 4: Accommodation</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gray-900 h-2 rounded-full" style={{ width: "75%" }}></div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Accommodation for Festival of Music</h1>

            {/* Search */}
            <div className="mb-6">
              <input
                type="text"
                placeholder="Search for accommodation"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filters */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Filters</h3>
              <div className="flex space-x-4">
                {filters.map((filter) => (
                  <button
                    key={filter}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2"
                  >
                    <span>{filter}</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                ))}
              </div>
            </div>

            {/* Results */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Results</h3>
              <div className="space-y-6">
                {accommodations.map((accommodation) => (
                  <div key={accommodation.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="flex">
                      <img
                        src={accommodation.image || "/placeholder.svg"}
                        alt={accommodation.name}
                        className="w-48 h-32 object-cover"
                      />
                      <div className="flex-1 p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="text-sm text-gray-600">{accommodation.rating}</span>
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${i < Math.floor(accommodation.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-gray-600">({accommodation.reviews} reviews)</span>
                            </div>
                            <h4 className="text-lg font-bold text-gray-900 mb-1">{accommodation.name}</h4>
                            <p className="text-sm text-gray-600">{accommodation.distance}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-gray-900">${accommodation.price}/night</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center space-x-2 mb-8">
              <button className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50">
                <ChevronLeft className="h-5 w-5" />
              </button>
              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  className={`px-3 py-2 rounded-lg ${page === 1 ? "bg-blue-500 text-white" : "border border-gray-300 hover:bg-gray-50"}`}
                >
                  {page}
                </button>
              ))}
              <button className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            <div className="flex justify-end">
              <button 
                onClick={handleNextStep}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium"
              >
                Continuer vers Résumé
              </button>
            </div>
          </div>
        </div>
        
        {/* Navigation Buttons */}
        <div className="flex justify-between items-center p-6 border-t">
          <button 
            onClick={handlePreviousStep}
            className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition-colors font-semibold flex items-center gap-2"
          >
            <ArrowLeft size={20} />
            Retour
          </button>
          <button 
            onClick={handleNextStep}
            className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
          >
            Continuer vers Résumé
          </button>
        </div>
      </div>
    </div>
  )
}
