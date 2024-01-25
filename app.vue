<script setup lang="ts">
import { ref } from 'vue';
useHead({
  link: [
    {
      rel: "stylesheet",
      href: "https://rsms.me/inter/inter.css",
    },
  ],
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage
      class="sm:px-4 py-4 md:px-4 py-4 lg:px-4 py-4 max-w-full flex-auto"
    />
    <DialogToastpopup />
  </NuxtLayout>
</template>
