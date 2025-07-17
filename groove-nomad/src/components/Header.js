import React from 'react';

export default function Header({ currentPage }) {
  const navItems = [
    { name: 'Home', path: '/', active: currentPage === 'Home' },
    { name: 'Festivals', path: '/festivals', active: currentPage === 'Festivals' },
    { name: 'Community', path: '/community', active: currentPage === 'Community' },
    { name: 'About', path: '/about', active: currentPage === 'About' },
  ];

  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-gray-900">
              GROOVE<span className="text-orange-500">NOMAD</span>
            </h1>
          </div>

          {/* Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    item.active
                      ? 'bg-orange-100 text-orange-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          {/* User actions */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-gray-900">
              Sign In
            </button>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium">
              Sign Up
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
