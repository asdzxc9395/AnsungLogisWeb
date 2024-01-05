<!--
  @pages/index.vue
  @Author: [채진호]
  @Date: [2023-11-30]
  @Last Modified by: [채진호]
  @Last Modified time: [2023-11-03]
-->
<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import { ref, onMounted } from 'vue';
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'

const value = ref('')
const people = [{
  id: 1,
  name: 'Lindsay Walton',
  title: 'Front-end Developer',
  email: 'lindsay.walton@example.com',
  role: 'Member'
}, {
  id: 2,
  name: 'Courtney Henry',
  title: 'Designer',
  email: 'courtney.henry@example.com',
  role: 'Admin'
}, {
  id: 3,
  name: 'Tom Cook',
  title: 'Director of Product',
  email: 'tom.cook@example.com',
  role: 'Member'
}, {
  id: 4,
  name: 'Whitney Francis',
  title: 'Copywriter',
  email: 'whitney.francis@example.com',
  role: 'Admin'
}, {
  id: 5,
  name: 'Leonard Krasner',
  title: 'Senior Designer',
  email: 'leonard.krasner@example.com',
  role: 'Owner'
}, {
  id: 6,
  name: 'Floyd Miles',
  title: 'Principal Designer',
  email: 'floyd.miles@example.com',
  role: 'Member'
}]
const tabItems = [{
  id: 1,
  name: 'Overview',
},{
  id: 2,
  name: 'DashBoard',
}]
const selected = ref([people[1]])
const selectedTab = ref(tabItems[1])
const selectTab = (tab: any) => {
  console.log(tab)
  selectedTab.value = tab;
}
</script>

<template>
  <UContainer class="">
  <UCard class="mb-4">
    <div class="flex justify-between items-center">
      <div class="text-4xl font-semibold text-blue-900 w-1/2">
        Billing
      </div>
      <div class="">
        <UInput color="blue" v-model="value" size="xs"/>
      </div>
    </div>
    <div>
      <div class="border-b border-b-gray-200">
        <ul class="-mb-px flex items-center gap-4 text-sm font-medium" >
          <li 
            v-for="item in tabItems" 
            :key="item.id"
          >
            <a
              @click="selectTab(item)"
              :class="[
                'px-8',
                selectedTab.id === item.id ?
                'relative flex items-center justify-center gap-2 px-1 py-3 text-blue-700 after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-full after:bg-blue-700'
                :
                'flex items-center justify-center text-gray-500 px-1 py-3'
              ]"
            >
              {{ item.name }}
            </a>
          </li>
          <!-- <li class="flex-1">
            <a
            >
              Profile
            </a>
          </li>
          <li class="flex-1">
            <a class="flex items-center justify-center gap-2 px-1 py-3 text-gray-500 hover:text-blue-700">
              Preferences
            </a>
          </li> -->
        </ul>
      </div>
          
    </div>
  </UCard>
  <UTable 
    v-model="selected" 
    :rows="people"
    class="bg-slate-50 rounded"
  />
  <!-- <button
              :class="[
                'px-4 rounded-md py-1 leading-5',
                'ring-white/60',
                selected
                  ? 'bg-white text-black border border-black rounded-md text-sm font-semibold'
                  : 'text-gray-400 hover:bg-white/[0.12] hover:text-black text-sm font-thin ',
              ]"
            /> -->
  </UContainer>
</template>
