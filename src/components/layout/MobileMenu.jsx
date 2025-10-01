import React from 'react';
import { Hotel, Calendar, X } from 'lucide-react';

const MobileMenu = ({ isOpen, currentPage, onNavigate, onClose }) => {
  const navigation = [
    { id: 'rooms', name: 'Rooms', icon: Hotel },
    { id: 'bookings', name: 'Bookings', icon: Calendar },
  ];

  if (!isOpen) return null;

  return (
    <div className="md:hidden border-t border-gray-200">
      <div className="px-4 py-2 space-y-1">
        {navigation.map(item => (
          <button
            key={item.id}
            onClick={() => {
              onNavigate(item.id);
              onClose();
            }}
            className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg transition ${
              currentPage === item.id
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <item.icon className="w-5 h-5" />
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MobileMenu;