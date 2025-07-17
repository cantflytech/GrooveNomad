export default function FestivalCard({ festival, showButton = true, onFestivalClick }) {
  const handleClick = () => {
    if (onFestivalClick) {
      onFestivalClick(festival)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow" onClick={handleClick}>
      <div className="relative h-64">
        <img src={festival.image || "/placeholder.svg"} alt={festival.name} className="w-full h-full object-cover" />
        {festival.trending && (
          <span className="absolute top-4 left-4 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            Tendance 🔥
          </span>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{festival.name}</h3>
        <p className="text-gray-600 mb-3 line-clamp-2">{festival.description}</p>
        <p className="text-sm text-gray-500 mb-4">{festival.date}</p>
        {showButton && (
          <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition-colors">
            En savoir plus
          </button>
        )}
      </div>
    </div>
  )
}
