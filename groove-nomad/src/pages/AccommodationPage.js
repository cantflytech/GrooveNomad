import Header from "../components/Header";
import { Star, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchHotels, fetchHotelsByFestival } from "../services/airtableService";

export default function AccommodationPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [accommodations, setAccommodations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFestival, setSelectedFestival] = useState(null);
  const [selectedTransport, setSelectedTransport] = useState(null);

  useEffect(() => {
    const loadAccommodations = async () => {
      try {
        setLoading(true);
        const festivalId = location.state?.selectedFestival?.id;

        if (festivalId) {
          setSelectedFestival(location.state.selectedFestival);
          setSelectedTransport(location.state.selectedTransport);
          const festivalHotels = await fetchHotelsByFestival(festivalId);
          setAccommodations(festivalHotels);
        } else {
          const allHotels = await fetchHotels();
          setAccommodations(allHotels.slice(0, 6)); // Limite à 6 résultats
        }
      } catch (error) {
        console.error('Error loading accommodations:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAccommodations();
  }, [location.state]);

  const handleNextStep = (selectedAccommodation) => {
    navigate('/trip/summary', {
      state: {
        selectedFestival,
        selectedTransport,
        selectedAccommodation,
        tripData: {
          ...location.state?.tripData,
          accommodation: selectedAccommodation,
        },
      },
    });
  };

  const handlePreviousStep = () => {
    navigate('/trip/transport');
  };

  const filters = ["Prix", "Distance", "Type", "Note"];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Chargement des hébergements...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Votre Voyage</h3>
              <div className="space-y-4">
                {selectedFestival && (
                  <div>
                    <p className="font-medium">{selectedFestival.name}</p>
                    <p className="text-sm text-gray-500">{selectedFestival.date}</p>
                    <p className="text-sm text-gray-500">{selectedFestival.location}</p>
                  </div>
                )}
                {selectedTransport && (
                  <div>
                    <p className="font-medium">Transport: {selectedTransport.type}</p>
                    <p className="text-sm text-gray-500">${selectedTransport.price}</p>
                  </div>
                )}
                <div>
                  <p className="font-medium">Hébergement</p>
                  <p className="text-sm text-gray-500">{selectedFestival?.duration || 2} nuits</p>
                </div>
                <div className="pt-4 border-t">
                  <p className="font-medium">Total Transport: ${selectedTransport?.price || 0}</p>
                  <p className="text-sm text-gray-500">+ Hébergement à sélectionner</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <p className="text-sm text-gray-600 mb-2">Étape 3 sur 4: Hébergement</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gray-900 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <section className="lg:col-span-3">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Hébergement {selectedFestival ? `pour ${selectedFestival.name}` : 'disponible'}
            </h1>
            {selectedFestival && (
              <p className="text-gray-600 mb-6">
                {selectedFestival.location} • {selectedFestival.date}
              </p>
            )}

            {/* Search */}
            <div className="mb-6">
              <input
                type="text"
                placeholder="Rechercher un hébergement"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filters */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Filtres</h3>
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
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Résultats ({accommodations.length} hébergements)
              </h3>

              {accommodations.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>Aucun hébergement disponible pour ce festival.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {accommodations.map((acc) => (
                    <div
                      key={acc.id}
                      className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => handleNextStep(acc)}
                    >
                      <div className="flex">
                        <img
                          src={acc.image || '/placeholder.svg'}
                          alt={acc.name}
                          className="w-48 h-32 object-cover"
                        />
                        <div className="flex-1 p-6 flex justify-between">
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="text-sm text-gray-600">{acc.rating?.toFixed(1)}</span>
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${i < Math.floor(acc.rating || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-gray-500">({acc.reviews} avis)</span>
                            </div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-1">{acc.name}</h4>
                            <p className="text-sm text-gray-600 mb-2">{acc.location}</p>
                            {acc.roomTypes?.length > 0 && (
                              <p className="text-sm text-gray-500 mb-2">
                                Types de chambres: {acc.roomTypes.join(', ')}
                              </p>
                            )}
                            {acc.amenities && (
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                {acc.amenities.slice(0, 3).map((amenity, idx) => (
                                  <span key={idx} className="flex items-center">
                                    {amenity}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-gray-900">${acc.pricePerNight}</p>
                            <p className="text-sm text-gray-500">par nuit</p>
                            <p className="text-sm text-green-600 mt-1">
                              {acc.availability} chambres disponibles
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center space-x-2 mb-8">
              <button className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50">
                <ChevronLeft className="h-5 w-5" />
              </button>
              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  className={`px-3 py-2 rounded-lg ${page === 1 ? 'bg-blue-500 text-white' : 'border border-gray-300 hover:bg-gray-50'}`}
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
                onClick={() => handleNextStep(null)}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium"
              >
                Continuer vers Résumé
              </button>
            </div>
          </section>
        </div>

        {/* Bottom Navigation */}
        <div className="flex justify-between items-center p-6 border-t">
          <button
            onClick={handlePreviousStep}
            className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition-colors font-semibold flex items-center gap-2"
          >
            <ArrowLeft size={20} />
            Retour
          </button>
          <button
            onClick={() => handleNextStep(null)}
            className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
          >
            Continuer vers Résumé
          </button>
        </div>
      </div>
    </div>
  );
}
