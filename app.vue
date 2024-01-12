<script setup lang="ts">
useHead({
  link: [
    {
      rel: "stylesheet",
      href: "https://rsms.me/inter/inter.css",
    },
  ],
});
// function returnModalRtn(rtnVal: any) {
//   console.log("returnValue:: ", rtnVal);
//   // pinia base value update?
// }

const layout = "layout";
</script>

<template>
  <NuxtLayout>
    <NuxtPage
      class="sm:px-4 py-4 md:px-4 py-4 lg:px-4 py-4 max-w-full flex-auto"
    />
    <DialogToastpopup />
    <!-- <DialogDialogpopup @modal-result-value-test="returnModalRtn" /> -->
  </NuxtLayout>
</template>
