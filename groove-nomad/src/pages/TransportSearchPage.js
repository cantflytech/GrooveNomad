import Header from "../components/Header"
import { Train, Plane, Car, ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function TransportSearchPage() {
  const navigate = useNavigate();

  const handleNextStep = () => {
    navigate('/trip/accommodation');
  };

  const handlePreviousStep = () => {
    navigate('/trip/step1');
  };
  const transportOptions = [
    {
      type: "Train",
      icon: Train,
      image: "/placeholder.svg?height=200&width=300",
      price: "$50",
      comfort: "High",
      services: "Wi-Fi, Meals",
    },
    {
      type: "Plane",
      icon: Plane,
      image: "/placeholder.svg?height=200&width=300",
      price: "$150",
      comfort: "Medium",
      services: "In-flight entertainment",
    },
    {
      type: "Car",
      icon: Car,
      image: "/placeholder.svg?height=200&width=300",
      price: "$80",
      comfort: "Low",
      services: "Freedom",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Transport Search</h1>

            {/* Progress */}
            <div className="mb-8">
              <p className="text-sm text-gray-600 mb-2">Step 2 of 4: Transport</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gray-900 h-2 rounded-full" style={{ width: "50%" }}></div>
              </div>
            </div>

            {/* Transport Options */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Choose Your Transport</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {transportOptions.map((option) => (
                  <div
                    key={option.type}
                    className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <img
                      src={option.image || "/placeholder.svg"}
                      alt={option.type}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900">{option.type}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Compare Options */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Compare Options</h2>
              <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Option
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Comfort
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Services
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {transportOptions.map((option) => (
                      <tr key={option.type}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{option.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{option.price}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{option.comfort}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{option.services}</td>
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
