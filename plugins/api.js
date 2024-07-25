import axios from 'axios';

export default defineNuxtPlugin(() => {
  const tokenCookie = useCookie('authToken');
  const authToken2 = tokenCookie.value;
  let authToken = authToken2 || '';

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
      async getUserById(userId) {
        let result = null;
        try {
          const res = await axi.get(`/user/${userId}`);
          result = res?.data;
        } catch (e) {}
        return result;
      },
      async getUserPastEvents() {
        let result = null;
        try {
          const res = await axi.get(`/events/asd/getPastEvents`);
          result = res?.data.result;
        } catch (e) {}
        return result;
      },
      async updateUserInfo(formData) {
        let result = null;
        try {
          const res = await axi.patch('/user/info', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          result = res?.data;
        } catch (e) {
        }
        return result;
      },
      async deleteInvite(userId, eventId) {
        let result = null;
        try {
          const res = await axi.delete(`/user/delete/${eventId}/${userId}`);
          result = res?.data;
        } catch (e) {
        }
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
    thankYou: {
      async sentThankYouMessage(santaId, eventId, message) {
        let result = null;
        try {
          const res = await axi.post(`/thank-you/${santaId}`, {
            eventId,
            message
          });
          result = res?.data;
        } catch (error) {
          console.error('Error adding items to wishlist:', error);
        }
        return result;
      },
    },
    event: {
      async getPastEvent(eventId) {
        let result = null;
        try {
          const res = await axi.get(`/events/past/${eventId}`);
          result = res?.data.result;
          console.log(result)
        } catch (error) {
          console.error('Error fetching past event:', error);
        }
        return result;
      },
      async deleteEvent(eventId) {
        let result = null;
        try {
          const res = await axi.delete(`/events/delete/${eventId}`);
          result = res?.data;
        } catch (e) {
        }
        return result;
      }
    },
    setToken(token) {
      axi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }

  return {
    provide: { api },
  };
})
