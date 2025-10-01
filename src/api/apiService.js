const API_BASE = 'http://localhost:8080/api';

const api = {
  setToken: (token) => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  },
  
  getToken: () => localStorage.getItem('token'),
  
  getHeaders: () => ({
    'Content-Type': 'application/json',
    ...(api.getToken() && { 'Authorization': `Bearer ${api.getToken()}` })
  }),

  // Auth endpoints
  register: (data) => fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }),

  login: (data) => fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }),

  // Room endpoints
  getRooms: () => fetch(`${API_BASE}/rooms`, {
    headers: api.getHeaders()
  }),

  getRoom: (id) => fetch(`${API_BASE}/rooms/${id}`, {
    headers: api.getHeaders()
  }),

  createRoom: (data) => fetch(`${API_BASE}/rooms`, {
    method: 'POST',
    headers: api.getHeaders(),
    body: JSON.stringify(data)
  }),

  updateRoom: (id, data) => fetch(`${API_BASE}/rooms/${id}`, {
    method: 'PUT',
    headers: api.getHeaders(),
    body: JSON.stringify(data)
  }),

  deleteRoom: (id) => fetch(`${API_BASE}/rooms/${id}`, {
    method: 'DELETE',
    headers: api.getHeaders()
  }),

  // Booking endpoints
  getBookings: () => fetch(`${API_BASE}/bookings`, {
    headers: api.getHeaders()
  }),

  getBooking: (id) => fetch(`${API_BASE}/bookings/${id}`, {
    headers: api.getHeaders()
  }),

  createBooking: (data) => fetch(`${API_BASE}/bookings`, {
    method: 'POST',
    headers: api.getHeaders(),
    body: JSON.stringify(data)
  }),

  updateBooking: (id, data) => fetch(`${API_BASE}/bookings/${id}`, {
    method: 'PUT',
    headers: api.getHeaders(),
    body: JSON.stringify(data)
  }),

  deleteBooking: (id) => fetch(`${API_BASE}/bookings/${id}`, {
    method: 'DELETE',
    headers: api.getHeaders()
  }),

  getUserBookings: (userId) => fetch(`${API_BASE}/bookings/user/${userId}`, {
    headers: api.getHeaders()
  }),

  getRoomBookings: (roomId) => fetch(`${API_BASE}/bookings/room/${roomId}`, {
    headers: api.getHeaders()
  }),

  // User endpoints
  getUsers: () => fetch(`${API_BASE}/users`, {
    headers: api.getHeaders()
  }),

  getUser: (id) => fetch(`${API_BASE}/users/${id}`, {
    headers: api.getHeaders()
  }),

  // Get current user info by username
  getCurrentUserInfo: async (username) => {
    try {
      const response = await fetch(`${API_BASE}/users`, {
        headers: api.getHeaders()
      });
      const users = await response.json();
      return users.find(u => u.username === username);
    } catch (error) {
      console.error('Error fetching current user:', error);
      return null;
    }
  },

  updateUser: (id, data) => fetch(`${API_BASE}/users/${id}`, {
    method: 'PUT',
    headers: api.getHeaders(),
    body: JSON.stringify(data)
  }),

  deleteUser: (id) => fetch(`${API_BASE}/users/${id}`, {
    method: 'DELETE',
    headers: api.getHeaders()
  })
};

export default api;