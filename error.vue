<template class="h-full">
  <div class="w-full h-3/4 p-4">
    <UCard class="mb-4">
      <div class="flex justify-between items-center p-0.5">
        <!-- Header -->
        <div class="text-4xl font-semibold text-red-600 w-1/3">오류</div>
      </div>
    </UCard>
    <!-- Body -->
    <UCard class="w-full h-auto p-4 mb-4">
      <div class="float-left">
        <UIcon
          name="i-heroicons-exclamation-triangle"
          class="w-28 h-28 text-red-600"
        />
      </div>
      <!-- </UCard> -->
      <div class="w-auto h-full p-2 pl-6 float-left">
        <div>
          <span> 오류가 발생하여 페이지에 접속할 수 없습니다. </span>
        </div>
        <div>
          <span>오류코드 : {{ error.statusCode }} </span>
        </div>
        <div>
          <span>오류상세 : {{ error.statusMessage }}</span>
        </div>
        <div>
          <span>접속 URL : {{ error.url }}</span>
        </div>
      </div>
    </UCard>
    <!-- Footer -->
    <div class="w-full float-left">
      <UButton
        type="button"
        icon="i-heroicons-arrow-uturn-left"
        class="float-right"
        @click="goPrev"
      >
        이전 페이지로 (Back)
      </UButton>
      <UButton
        type="button"
        icon="i-heroicons-home"
        class="mr-4 float-right"
        @click="goHome"
      >
        메인 페이지로(Home)
      </UButton>
    </div>
  </div>
</template>
<script setup>
import {
  ExclamationTriangleIcon,
  ArrowUturnLeftIcon,
  HomeIcon,
} from "@heroicons/vue/20/solid";
const error = useError();
useHead({
  bodyAttrs: {
    class: "h-full",
  },
  htmlAttrs: {
    class: "h-full",
  },
});

const goHome = () => {
  clearError({
    redirect: "/",
  });
};

const goPrev = () => {
  clearError();
  window.history.go(-1);
};
</script>
