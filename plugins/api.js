import axios from 'axios';

export default defineNuxtPlugin(() => {
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

  // Function to set the token in the header
  function setAuthToken(token) {
    axi.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
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
      }
    },
    user: {
      async createGroup(data, token) {
        const response = await useFetch(
          'http://localhost/api/events/new',
          {
            method: 'POST',
            body: data,
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            onResponseError({ request, response, options }) {
              console.log('error', response._data);
              return null;
            },
            async onResponse({ request, response, options }) {
              return response._data;
            },
          }
        );

        return response; 
      },
      async getUserEvent(token) {
        let result = null;
        try {
          const res = await axi.get(`/events`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
          });
          result = res?.data;
        } catch (e) {}
        return result;
      }
    },
    link: {
      async getMetadata(url) {
        let result = null;
        try {
          const response = await $fetch(`http://localhost/api/link?url=${encodeURIComponent(url)}`);
          result = response;
        } catch (error) {
          console.error('Error fetching metadata:', error);
        }
        return result;
      },
    }
  }

  return {
    provide: { api },
  };
})
