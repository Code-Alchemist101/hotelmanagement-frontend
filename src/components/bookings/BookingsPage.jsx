import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import api from '../../api/apiService';
import BookingTable from './BookingTable';
import BookingModal from './BookingModal';
import { USER_ROLES } from '../../utils/constants';

const BookingsPage = ({ user }) => {
  const [bookings, setBookings] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError('');
      await Promise.all([
        loadBookings(),
        loadRooms(),
        user.role === USER_ROLES.ADMIN && loadUsers()
      ]);
    } catch (err) {
      setError(err.message);
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadBookings = async () => {
    const response = await api.getBookings();
    if (!response.ok) throw new Error('Failed to load bookings');
    const data = await response.json();
    setBookings(data);
  };

  const loadRooms = async () => {
    const response = await api.getRooms();
    if (!response.ok) throw new Error('Failed to load rooms');
    const data = await response.json();
    setRooms(data);
  };

  const loadUsers = async () => {
    const response = await api.getUsers();
    if (!response.ok) throw new Error('Failed to load users');
    const data = await response.json();
    setUsers(data);
  };

  const handleSubmit = async (formData) => {
    try {
      const response = await api.createBooking(formData);
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || 'Failed to create booking');
      }
      
      await loadBookings();
      setShowModal(false);
    } catch (err) {
      alert('Error creating booking: ' + err.message);
      console.error('Error creating booking:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        const response = await api.deleteBooking(id);
        if (!response.ok) throw new Error('Failed to cancel booking');
        await loadBookings();
      } catch (err) {
        alert('Error canceling booking: ' + err.message);
        console.error('Error deleting booking:', err);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-gray-600">Loading bookings...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Bookings Management</h2>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Plus className="w-4 h-4" />
          New Booking
        </button>
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      <BookingTable
        bookings={bookings}
        onDelete={handleDelete}
        onView={null}
      />

      <BookingModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmit}
        rooms={rooms}
        users={users}
        currentUser={user}
      />
    </div>
  );
};

export default BookingsPage;