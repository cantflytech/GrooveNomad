import React from 'react';

export default function FestivalCard({ festival }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img
          src={festival.image || "/placeholder.svg"}
          alt={festival.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-xl font-bold">{festival.name}</h3>
          {festival.date && (
            <p className="text-sm opacity-90">{festival.date}</p>
          )}
        </div>
      </div>
      <div className="p-4">
        {festival.description && (
          <p className="text-gray-600 text-sm leading-relaxed">
            {festival.description}
          </p>
        )}
        <div className="mt-4 flex justify-between items-center">
          <button className="text-orange-500 hover:text-orange-600 font-medium text-sm">
            Learn More
          </button>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded text-sm font-medium">
            Join
          </button>
        </div>
      </div>
    </div>
  );
}
