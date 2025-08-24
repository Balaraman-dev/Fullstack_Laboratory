// src/api.js
const API = {
  createOrUpdateUser: async (userId, data) => {
    return fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, ...data }),
    }).then(res => res.json());
  },

  getUserProfile: async (userId) => {
    return fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .catch(() => ({ success: false, data: null }));
  },
};

export default API;