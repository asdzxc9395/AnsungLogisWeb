

<script setup>
import { defineProps } from 'vue';

// props 객체에서 loading 속성을 참조
const { loading } = defineProps(['loading']);

watch(loading, () => {
}, {deep: true, immediate: true})

</script>
<template>
  <div v-if="loading" class="loading-wrapper">
    <div class="loader"></div>
  </div>
</template>
<style scoped>
.loading-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.2);
  width: 100vw;
  height: 100vh;
  position: fixed;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
  z-index: 999;
}

.loader {
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #3498db;
  width: 120px;
  height: 120px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
}

/* Safari */
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
