import { storeToRefs } from 'pinia'; // import storeToRefs helper hook from pinia
import { useAuthStore } from '~/store/auth'; // import the auth store we just created

export default defineNuxtRouteMiddleware((_to, _from) => {
    const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive
    const token = useCookie('token'); // get token from cookies
    
    if (token.value) {
        // console.log(token.value)
      // check if value exists
      authenticated.value = true; // update the state to authenticated
    }
  
    // if token exists and url is /login redirect to homepage
    if (token.value && _to?.name === 'login') {
      return navigateTo('/');
    }
  
    // if token doesn't exist redirect to log in
    if (!token.value && _to?.name !== 'login') {
      abortNavigation();
      return navigateTo('/login');
    }
})
