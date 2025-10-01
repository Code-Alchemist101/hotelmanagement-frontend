import React from 'react';
import { Hotel, Calendar } from 'lucide-react';

const Navigation = ({ currentPage, onNavigate }) => {
  const navigation = [
    { id: 'rooms', name: 'Rooms', icon: Hotel },
    { id: 'bookings', name: 'Bookings', icon: Calendar },
  ];

  return (
    <nav className="hidden md:flex space-x-4">
      {navigation.map(item => (
        <button
          key={item.id}
          onClick={() => onNavigate(item.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
            currentPage === item.id
              ? 'bg-blue-600 text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <item.icon className="w-5 h-5" />
          {item.name}
        </button>
      ))}
    </nav>
  );
};

export default Navigation;