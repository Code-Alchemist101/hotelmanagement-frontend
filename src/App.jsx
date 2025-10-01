import React, { useState, useEffect } from 'react';
import api from './api/apiService';
import LoginPage from './components/auth/LoginPage';
import Header from './components/layout/Header';
import Navigation from './components/layout/Navigation';
import MobileMenu from './components/layout/MobileMenu';
import RoomsPage from './components/rooms/RoomsPage';
import BookingsPage from './components/bookings/BookingsPage';

function App() {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('rooms');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const token = api.getToken();
    if (token) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    api.setToken(null);
    localStorage.removeItem('user');
    setUser(null);
    setCurrentPage('rooms');
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        user={user} 
        onLogout={handleLogout}
        onToggleMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Navigation 
          currentPage={currentPage}
          onNavigate={handleNavigate}
        />
      </div>

      <MobileMenu
        isOpen={mobileMenuOpen}
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onClose={() => setMobileMenuOpen(false)}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentPage === 'rooms' && <RoomsPage user={user} />}
        {currentPage === 'bookings' && <BookingsPage user={user} />}
      </main>
    </div>
  );
}

export default App;