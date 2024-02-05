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
      class="sm:px-0 py-0 md:px-0 py-0 lg:px-0 py-0 max-w-full flex-auto"
    />
    <DialogToastpopup />
  </NuxtLayout>
</template>
