import Header from "../components/Header"
import { Check, Calendar, MapPin, Plane, Hotel, CreditCard, ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function TripSummaryPage() {
  const navigate = useNavigate();

  const handlePreviousStep = () => {
    navigate('/trip/accommodation');
  };
  const tripDetails = {
    festival: {
      name: "Summer Beats Festival",
      date: "July 12 - 14, 2024",
      location: "Barcelona, Spain",
      image: "/placeholder.svg?height=200&width=300",
      price: 250
    },
    transport: {
      type: "Flight",
      details: "Round trip to Barcelona",
      price: 350
    },
    accommodation: {
      name: "The Grand Hotel",
      nights: 3,
      pricePerNight: 120,
      totalPrice: 360
    },
    travelers: 2
  }

  const totalPrice = (tripDetails.festival.price + tripDetails.transport.price + tripDetails.accommodation.totalPrice) * tripDetails.travelers

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Trip Summary</h1>

            {/* Progress */}
            <div className="mb-8">
              <p className="text-sm text-gray-600 mb-2">Step 4 of 4: Final Summary</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gray-900 h-2 rounded-full" style={{ width: "100%" }}></div>
              </div>
            </div>

            {/* Trip Details */}
            <div className="space-y-6">
              {/* Festival */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 rounded-full p-2">
                    <Check className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Festival</h3>
                    <div className="flex space-x-4">
                      <img
                        src={tripDetails.festival.image}
                        alt={tripDetails.festival.name}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div>
                        <h4 className="font-medium text-gray-900">{tripDetails.festival.name}</h4>
                        <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                          <Calendar className="h-4 w-4" />
                          <span>{tripDetails.festival.date}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                          <MapPin className="h-4 w-4" />
                          <span>{tripDetails.festival.location}</span>
                        </div>
                        <p className="text-lg font-bold text-gray-900 mt-2">${tripDetails.festival.price} per person</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Transport */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 rounded-full p-2">
                    <Check className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Transport</h3>
                    <div className="flex items-center space-x-3">
                      <Plane className="h-8 w-8 text-gray-600" />
                      <div>
                        <h4 className="font-medium text-gray-900">{tripDetails.transport.type}</h4>
                        <p className="text-sm text-gray-500">{tripDetails.transport.details}</p>
                        <p className="text-lg font-bold text-gray-900 mt-1">${tripDetails.transport.price} per person</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Accommodation */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 rounded-full p-2">
                    <Check className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Accommodation</h3>
                    <div className="flex items-center space-x-3">
                      <Hotel className="h-8 w-8 text-gray-600" />
                      <div>
                        <h4 className="font-medium text-gray-900">{tripDetails.accommodation.name}</h4>
                        <p className="text-sm text-gray-500">{tripDetails.accommodation.nights} nights</p>
                        <p className="text-lg font-bold text-gray-900 mt-1">${tripDetails.accommodation.pricePerNight}/night</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg p-6 shadow-sm mt-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Payment Method</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <input type="radio" id="credit-card" name="payment" className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300" defaultChecked />
                  <label htmlFor="credit-card" className="flex items-center space-x-2">
                    <CreditCard className="h-5 w-5 text-gray-600" />
                    <span>Credit Card</span>
                  </label>
                </div>
                <div className="ml-7 space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Price Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-sm sticky top-4">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Price Summary</h3>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Festival tickets (2 persons)</span>
                  <span>${tripDetails.festival.price * tripDetails.travelers}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Transport (2 persons)</span>
                  <span>${tripDetails.transport.price * tripDetails.travelers}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Accommodation ({tripDetails.accommodation.nights} nights)</span>
                  <span>${tripDetails.accommodation.totalPrice}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${totalPrice}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg">
                  Confirm & Pay
                </button>
                <button className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-3 px-4 rounded-lg">
                  Save for Later
                </button>
              </div>

              <div className="mt-4 text-xs text-gray-500 text-center">
                Your payment is secured with 256-bit SSL encryption
              </div>
            </div>
          </div>
        </div>
        
        {/* Navigation Button */}
        <div className="flex justify-start p-6 border-t">
          <button 
            onClick={handlePreviousStep}
            className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition-colors font-semibold flex items-center gap-2"
          >
            <ArrowLeft size={20} />
            Retour à l'hébergement
          </button>
        </div>
      </div>
    </div>
  )
}
