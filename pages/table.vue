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

const peopleList = [
  { name: 'Wade Cooper' },
  { name: 'Arlene Mccoy' },
  { name: 'Devon Webb' },
  { name: 'Tom Cook' },
  { name: 'Tanya Fox' },
  { name: 'Hellen Schmidt' },
]
const { data } = await useFetch<{ title: string }>(() => 'https://jsonplaceholder.typicode.com/todos/1');
// 클라이언트 측에서만 로깅
if (import.meta.env.SSR) {
}
const chartData = ref({
  labels: ['January', 'February', 'March', 'April', 'May'],
  datasets: [
    {
      label: 'Data One',
      backgroundColor: '#f87979',
      data: [40, 20, 12, 50, 10],
    },
  ],
})

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      min: 0,
      max: 100, // 원하는 높이 값으로 설정
    },
  },  
})

const links = [
  {
    label: 'Home',
    icon: 'i-heroicons-home',
    to: '/'
  },
  {
    label: 'Navigation',
    icon: 'i-heroicons-square-3-stack-3d'
  },
  {
    label: 'Breadcrumb',
    icon: 'i-heroicons-link'
  }
];

const dynamicValue: number = 4;

useSeoMeta({
  title: data.value?.title
});
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

const selected = ref([people[1]])
</script>

<template>
  <UContainer class="mx-0">
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
