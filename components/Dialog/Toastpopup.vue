<!-- 
  createDate : 2024-01-05
  creator : kyn8330
  기존 토스트코드 샘플코드와 큰 차이 없음
-->
<template>
  <div
    aria-live="assertive"
    class="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-end z-40"
  >
    <div class="w-full flex flex-col items-center space-y-4 sm:items-end">
      <transition
        enter-active-class="transform ease-out duration-300 transition"
        enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="show"
          class="inline-flex p-4 items-start gap-4 bg-white rounded-lg pointer-events-auto overflow-hidden"
          :class="typeBorder"
          style="box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.10), 0px 4px 6px -4px rgba(0, 0, 0, 0.10);"
        >
          <div class="flex items-start gap-3">
            <div class="flex items-start">
              <!-- <CheckCircleIcon
                v-if="type == 'success'"
                class="h-6 w-6 text-green-400"
                aria-hidden="true"
              />
              <XCircleIcon
                v-if="type == 'error'"
                class="h-6 w-6 text-danger-400"
                aria-hidden="true"
              />
               <ExclamationCircleIcon
                v-if="type == 'warning'"
                class="h-6 w-6 text-warning-400"
                aria-hidden="true"
              /> 
              <InformationCircleIcon
                v-if="type == 'info'"
                class="h-6 w-6 text-info-400"
                aria-hidden="true"
              /> -->              
              <UIcon 
                v-if="type == 'success'"
                name="i-heroicons-check-circle-16-solid" 
                class="h-6 w-6 text-green-500"
                aria-hidden="true"
              />
              <UIcon 
                v-if="type == 'error'"
                name="i-heroicons-check-circle-16-solid" 
                class="h-6 w-6 text-red-500"
                aria-hidden="true"
              />
              <UIcon 
                v-if="type == 'warning'"
                name="i-heroicons-exclamation-triangle-20-solid" 
                class="h-6 w-6"
                style="color:#FACC15"
                aria-hidden="true"
              />
              <UIcon 
                v-if="type == 'info'"
                name="i-heroicons-exclamation-triangle-20-solid" 
                class="h-6 w-6 text-blue-500"
                aria-hidden="true"
              />

            </div>
            <div class="flex flex-col justify-center items-start gap-1">
              <p class="text-sm font-bold text-gray-900">
                {{ title }}
              </p>
              <p class="text-sm font-medium text-gray-900">
                {{ msg }}
              </p>
            </div>
          </div>
          <div class="flex items-start">
              <!-- 
                class="bg-white rounded-md inline-flex text-gray-300 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              -->
              <button
                v-if="closeBtn"
                @click="closeToast"
                class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500"
              >
                <span class="sr-only">Close</span>
                <XMarkIcon class="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script setup>
import {
  CheckCircleIcon,
  XCircleIcon,
  InformationCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/vue/24/outline";
import { XMarkIcon } from "@heroicons/vue/24/solid";
import { useToastPopup } from "~/composables/useToastPopup.js";

const Toast = useToastPopup();

const title = computed(() => Toast.title);
const msg = computed(() => Toast.msg);
const type = computed(() => Toast.type);
const show = computed(() => Toast.show);
const closeBtn = computed(() => Toast.closeBtn);

const closeToast = () => {
  Toast.reset();
};

const typeBorder = computed(() => {
  switch (type.value) {
    case "success":
      return "border radius-md border-gray-300";
    case "info":
      return "border radius-md border-gray-300";
    case "warning":
      return "border radius-md border-gray-300";
    case "error":
      return "border radius-md border-gray-300";
    default:
      return "border radius-md border-gray-300";
  }
});
</script>
