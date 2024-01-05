import { defineStore } from 'pinia';
import axios from "axios";

export const useAuthStore = defineStore('auth', {
  state: () => ({
    authenticated: false,
    loading: false,
  }),
  actions: {
    async authenticateUser({ username, password }) {
    try {
      // useFetch from nuxt 3
      const { data, status } = await axios.post('https://ansunglogis.co.kr:20004/srm/user/login', {
        useR_CD: username,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      // this.loading = pending;

      if (status === 201) {
        const token = useCookie('token'); // useCookie new hook in nuxt 3
        token.value = data.data.tokenVal; // set token to cookie
        this.authenticated = true; // set authenticated  state value to true
      }
        
      } catch (error) {
        console.log(error)
      }
    },
    logUserOut() {
      const token = useCookie('token'); // useCookie new hook in nuxt 3
      this.authenticated = false; // set authenticated  state value to false
      token.value = null; // clear the token cookie
    },
  },
});