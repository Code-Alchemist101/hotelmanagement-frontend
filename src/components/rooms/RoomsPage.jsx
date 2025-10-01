import React, { useState, useEffect } from 'react';
import { Plus, Search } from 'lucide-react';
import api from '../../api/apiService';
import RoomCard from './RoomCard';
import RoomModal from './RoomModal';
import { USER_ROLES } from '../../utils/constants';

const RoomsPage = ({ user }) => {
  const [rooms, setRooms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await api.getRooms();
      if (!response.ok) throw new Error('Failed to load rooms');
      const data = await response.json();
      setRooms(data);
    } catch (err) {
      setError(err.message);
      console.error('Error loading rooms:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      const endpoint = editingRoom 
        ? api.updateRoom(editingRoom.id, formData)
        : api.createRoom(formData);
      
      const response = await endpoint;
      if (!response.ok) throw new Error('Failed to save room');
      
      await loadRooms();
      setShowModal(false);
      setEditingRoom(null);
    } catch (err) {
      alert('Error saving room: ' + err.message);
      console.error('Error saving room:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      try {
        const response = await api.deleteRoom(id);
        if (!response.ok) throw new Error('Failed to delete room');
        await loadRooms();
      } catch (err) {
        alert('Error deleting room: ' + err.message);
        console.error('Error deleting room:', err);
      }
    }
  };

  const openEditModal = (room) => {
    setEditingRoom(room);
    setShowModal(true);
  };

  const openCreateModal = () => {
    setEditingRoom(null);
    setShowModal(true);
  };

  const filteredRooms = rooms.filter(room =>
    room.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-gray-600">Loading rooms...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Room Management</h2>
        {user.role === USER_ROLES.ADMIN && (
          <button
            onClick={openCreateModal}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <Plus className="w-4 h-4" />
            Add Room
          </button>
        )}
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by room number or type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      {filteredRooms.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          {searchTerm ? 'No rooms found matching your search.' : 'No rooms available.'}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRooms.map(room => (
            <RoomCard
              key={room.id}
              room={room}
              onEdit={openEditModal}
              onDelete={handleDelete}
              isAdmin={user.role === USER_ROLES.ADMIN}
            />
          ))}
        </div>
      )}

      <RoomModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingRoom(null);
        }}
        onSubmit={handleSubmit}
        editingRoom={editingRoom}
      />
    </div>
  );
};

export default RoomsPage;