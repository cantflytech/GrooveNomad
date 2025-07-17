import Header from "../components/Header"
import PageWrapper from "../components/PageWrapper"
import { Train, Plane, Car, ArrowLeft } from "lucide-react"
import { useNavigate, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import { fetchTransportOptions, fetchTransportByFestival } from "../services/airtableService"
import { useAuth } from "../contexts/AuthContext";

export default function TransportSearchPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, logout } = useAuth();
  const [transports, setTransports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFestival, setSelectedFestival] = useState(null);

  useEffect(() => {
    const loadTransports = async () => {
      try {
        setLoading(true);
        const festivalId = location.state?.selectedFestival?.id;
        
        if (festivalId) {
          setSelectedFestival(location.state.selectedFestival);
          const festivalTransports = await fetchTransportByFestival(festivalId);
          setTransports(festivalTransports);
        } else {
          const allTransports = await fetchTransportOptions();
          setTransports(allTransports.slice(0, 6)); // Limite à 6 résultats
        }
      } catch (error) {
        console.error('Error loading transports:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTransports();
  }, [location.state]);

  const handleNextStep = (selectedTransport) => {
    navigate('/trip/accommodation', {
      state: {
        selectedFestival,
        selectedTransport,
        tripData: {
          ...location.state?.tripData,
          transport: selectedTransport
        }
      }
    });
  };

  const handlePreviousStep = () => {
    navigate('/trip/step1');
  };

  const getTransportIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'train':
        return Train;
      case 'flight':
        return Plane;
      case 'car rental':
        return Car;
      default:
        return Train;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Chargement des options de transport...</p>
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
          {/* Main Content */}
          <div className="lg:col-span-3">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Options de Transport</h1>
            
            {selectedFestival && (
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h2 className="text-lg font-semibold text-blue-900">Festival sélectionné</h2>
                <p className="text-blue-700">{selectedFestival.name} - {selectedFestival.location}</p>
              </div>
            )}

            {/* Progress */}
            <div className="mb-8">
              <p className="text-sm text-gray-600 mb-2">Étape 2 sur 4: Transport</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gray-900 h-2 rounded-full" style={{ width: "50%" }}></div>
              </div>
            </div>

            {/* Transport Options */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Choisissez votre transport</h2>
              {transports.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>Aucune option de transport disponible pour ce festival.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {transports.map((transport) => {
                    const IconComponent = getTransportIcon(transport.type);
                    return (
                      <div
                        key={transport.id}
                        className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => handleNextStep(transport)}
                      >
                        <img
                          src={transport.image || "/placeholder.svg"}
                          alt={transport.type}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                          <div className="flex items-center mb-2">
                            <IconComponent className="h-6 w-6 text-gray-600 mr-2" />
                            <h3 className="font-bold text-gray-900">{transport.type}</h3>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            {new Date(transport.schedule).toLocaleString('fr-FR')}
                          </p>
                          <p className="text-lg font-bold text-green-600">${transport.price}</p>
                          {transport.duration && (
                            <p className="text-sm text-gray-500">Durée: {transport.duration}</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Compare Options */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Comparer les options</h2>
              <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Prix
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Horaire
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Disponibilité
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {transports.map((transport) => (
                      <tr key={transport.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => handleNextStep(transport)}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{transport.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${transport.price}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(transport.schedule).toLocaleString('fr-FR')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className={`px-2 py-1 rounded-full text-xs ${transport.availability ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {transport.availability ? 'Disponible' : 'Complet'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-end mt-6">
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium">
                  Next: Accommodation
                </button>
              </div>
            </div>
          </div>

          {/* Trip Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Trip Summary</h3>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Destination</p>
                  <p className="font-medium">Paris</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Dates</p>
                  <p className="font-medium">July 10 - July 20</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Travelers</p>
                  <p className="font-medium">2</p>
                </div>
              </div>

              <button 
                onClick={handleNextStep}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg mt-6"
              >
                Continuer vers Hébergement
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
            Continuer vers Hébergement
          </button>
        </div>
      </div>
    </div>
  )
}
