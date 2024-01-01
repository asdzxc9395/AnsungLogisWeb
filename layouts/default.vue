<template>
  <div class="flex bg-slate-100 flex-auto relative">
    <WebHeader />
    <div class="max-x-full flex-auto">
      <UBreadcrumb class="px-2 py-4" :links="links" />
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'; // import storeToRefs helper hook from pinia
import { useAuthStore } from '~/store/auth'; // import the auth store we just created

const router = useRouter();

const { logUserOut } = useAuthStore(); // use authenticateUser action from  auth store
const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs

const logout = () => {
  logUserOut();
  router.push('/login');
};

const links = [{
  label: 'Home',
  icon: 'i-heroicons-home',
  to: '/'
}
, {
  label: 'Navigation',
  icon: 'i-heroicons-square-3-stack-3d'
}, {
  label: 'Breadcrumb',
  icon: 'i-heroicons-link'
}
]
</script>