<script setup>
import { ref, defineProps } from 'vue';
import {
  Listbox,
  ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'

const { isOpen, dialogData } = defineProps(['isOpen', 'dialogData']);
const isDialog = ref(isOpen.value)
</script>
<template>
  <TransitionRoot appear :show="isOpen" >
    <Dialog class="relative z-10">
      <TransitionChild
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25"></div>
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-hidden">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <!-- <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all divide-y divide-gray-500"
            > -->
            <DialogPanel
              class="w-full p-2 calendar-height max-w-md transform shadow-none text-left align-middle transition-all divide-y divide-gray-300"
              >
              <DialogTitle
                class="bg-white leading-6 rounded-t-lg p-3 shadow-right"
              >
                <div class="text-2xl font-semibold text-blue-900 w-1/3">
                  조건 설정
                </div>
              </DialogTitle>
              <div class="pt-2 bg-white flex flex-col gap-2 p-3 shadow-right">
                <div class="flex flex-row gap-2 items-center">
                  <FormsLabel :line="'입고일자'"></FormsLabel>
                  <FormsDatePicker class="w-1/3" :datePicker="startDate" @change-date="value => startDate = value"/>
                  <FormsLabel :line="'출고_일자'"></FormsLabel>
                  <FormsDatePicker class="w-1/3" :datePicker="endDate" @change-date="value => endDate = value"/>
                </div>
                <div class="flex flex-row gap-2 items-center">
                  <FormsLabel :line="'조회조건'"></FormsLabel>
                  <USelectMenu
                    class="w-1/3"
                    v-model="searchTabs" 
                    :options="columns" 
                    multiple
                    placeholder="All Select" 
                    value-attribute="label" 
                    option-attribute="label"
                  />
                  <div></div>                 
                </div>

              </div>

              <div class="pt-4 bg-white rounded-b-lg p-3 shadow-right">
                <div class="flex justify-end gap-2">
                  <UButton 
                    class="text-blue-900 hover:bg-blue-100 rounded-md" 
                    variant="outline"
                    @click="initApiGetCall"
                  >
                    저장
                  </UButton>
                  <UButton 
                    class="text-blue-900 hover:bg-blue-100 rounded-md" 
                    variant="outline"
                    @click="isOpen = false"
                  >
                    닫기
                  </UButton>                  
                </div>                
              </div>
              <div style="height: 272px"></div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

  