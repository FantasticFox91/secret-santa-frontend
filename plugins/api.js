import axios from 'axios';

export default defineNuxtPlugin(() => {
  let authToken = '';
  if (process.client) {
    authToken = localStorage.getItem('authToken');
  }

  const axi = axios.create({
    baseURL: 'http://localhost/api',
  });

  axi.interceptors.request.use((config) => {
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

  axi.interceptors.response.use((response) => {
    return response;
  }, (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  });

  if (authToken) {
    axi.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
  }
  
  const api = {
    auth: {
      async registration(data) {
        let result = null;
        try {
          const res = await axi.post(`/auth/register`, data);
          result = res?.data;
        } catch (e) {}
        return result;
      },
      async login(data) {
        let result = null;
        try {
          const res = await axi.post(`/auth/login`, data);
          result = res?.data;
          const token = result?.accessToken;
          if (token) {
            setAuthToken(token);
          }
        } catch (e) {}
        return result;
      },
      async loginByToken() {
        let result = null;
        try {
          const res = await axi.post(`/auth/login/token`);
          result = res?.data;
        } catch (e) {}
        return result;
      }
    },
    user: {
      async createGroup(data) {
        let result = null;
        try {
          const res = await axi.post(`/events/new`, data);
          result = res?.data;
        } catch (e) {}
        return result;
      },
      async getUserEvent() {
        let result = null;
        try {
          const res = await axi.get(`/events`);
          result = res?.data;
        } catch (e) {}
        return result;
      },
      async getEvent(eventId) {
        let result = null;
        try {
          const res = await axi.get(`/events/${eventId}`);
          result = res?.data;
        } catch (e) {}
        return result;
      },
      async updateEvent(data) {
        let result = null;
        try {
          const res = await axi.patch(`/events/${data.id}`, data);
          result = res?.data;
        } catch (e) {}
        return result;
      },
      async inviteUser(data) {
        let result = null;
        try {
          const res = await axi.post(`http://localhost/api/auth/invite`, data);
          result = res?.data;
        } catch (e) {}
        return result;
      },
      async declineInvitation(email) {
        let result = null;
        try {
          const res = await axi.get(`/events/decline/${email}`);
          result = res?.data;
        } catch (e) {}
        return result;
      },
      async acceptInvitation(data) {
        let result = null;
        try {
          const res = await axi.post(`/events/accept`, data);
          result = res?.data;
        } catch (e) {}
        return result;
      },
      async getUserWishlist(userId, eventId) {
        let result = null;
        try {
          const res = await axi.post(`/user/wishlist`, {
            userId,
            eventId
          });
          result = res?.data;
        } catch (e) {}
        return result;
      },
      async matchUsers(eventId) {
        let result = null;
        try {
          const res = await axi.get(`/matching/${eventId}`);
          result = res?.data;
        } catch (e) {}
        return result;
      },
    },
    wishlist: {
      async addItems(items, eventId) {
        let result = null;
        try {
          const res = await axi.post(`/wishlist/add`, {
            items,
            eventId
          });
          result = res?.data;
        } catch (error) {
          console.error('Error adding items to wishlist:', error);
        }
        return result;
      },
    },
    setToken(token) {
      axi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }

  return {
    provide: { api },
  };
})
