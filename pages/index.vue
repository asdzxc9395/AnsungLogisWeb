<!--
  @pages/index.vue
  @Author: [채진호]
  @Date: [2023-11-30]
  @Last Modified by: [채진호]
  @Last Modified time: [2023-11-03]
-->
<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'

type Person = {name: string}
type Category = {label: string, isActive: boolean}

const dynamicValue: number = 4;
const peopleList : Person[] = [
  { name: 'Wade Cooper' },
  { name: 'Arlene Mccoy' },
  { name: 'Devon Webb' },
  { name: 'Tom Cook' },
  { name: 'Tanya Fox' },
  { name: 'Hellen Schmidt' },
]

const categories: Category[] = [
  { label: '12months', isActive: false },
  { label: '6months', isActive: false },
  { label: '30days', isActive: false },
  { label: '7days', isActive: false }
]

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

const handleUpdateCategory = (e: any) => {
  // console.log('Selected Category:', e);
  updateChartData(e.label);
};

const { data } = await useFetch<{ title: string }>(() => 'https://jsonplaceholder.typicode.com/todos/1');

const chartData = reactive({
  labels: ['January', 'February', 'March', 'April', 'May'],
  datasets: [
    {
      label: '',
      backgroundColor: '#f87979',
      data: [40, 20, 12, 50, 10],
    },
  ],
});

const updateChartData = (timeRange: any) => {
  const { labels, data } = generateDummyData(timeRange);
  chartData.labels = labels;
  chartData.datasets[0].data = data;
  console.log(chartData)
};

const generateDummyData = (timeRange: string) => {
  const labels = [];
  const data = [];
  const numDataPoints = 5; // 예시로 5개의 데이터 포인트 사용

  // 각 탭에 따라 다른 기간의 더미 데이터 및 라벨 생성
  switch (timeRange) {
    case '12months':
      for (let i = 0; i < 12; i++) {
        labels.push(`Month ${i + 1}`);
        data.push(Math.floor(Math.random() * 100));
      }
      break;
    case '6months':
      for (let i = 0; i < 6; i++) {
        labels.push(`Month ${i + 1}`);
        data.push(Math.floor(Math.random() * 50));
      }
      break;
    case '30days':
      for (let i = 0; i < 30; i++) {
        labels.push(`Day ${i + 1}`);
        data.push(Math.floor(Math.random() * 30));
      }
      break;
    case '7days':
      for (let i = 0; i < 7; i++) {
        labels.push(`Day ${i + 1}`);
        data.push(Math.floor(Math.random() * 20));
      }
      break;
    default:
      break;
  }

  return { labels, data };
};

useSeoMeta({
  title: data.value?.title
});
</script>

<template>
  <!-- <div>
    <div>{{ runtimeConfig }}</div>
  </div> -->
  <UContainer class="mx-0">
    <!-- <UBreadcrumb :links="links" divider=">"/> -->
      <div class="flex gap-3">
        <div v-for="item in 4" v-bind:key="item" :class="`bg-white mt-2 w-1/4 border border-slate-300 rounded-lg px-4 py-1`" >
            <div class="mt-2">
              <p class="text-base text-gray-500">
                Todays Sale.
              </p>
            </div>          
            <div class="mt-2 flex justify-between">
              <p class="text-2xl font-bold text-black">
                $12840 
              </p>
              <div class="text-sm text-green-400 font-bold leading-10">
                +36% 
              </div>
            </div>          
        </div>
      </div>
      <div class="flex gap-3 mt-2">
        <div class="px-4 bg-white w-2/3 border border-slate-300 rounded-lg">
          <div class="h-1/5 flex items-center">
            <FormsTabs :categories="categories" @updateCategory="handleUpdateCategory" />            
          </div>
          <div class="h-4/5" id="tableHeight">
            <ChartBar
              :chartData="chartData"
              style="height: 100%;"
            />
          </div>
        </div>      
        <div class="px-4 py-2 bg-white w-1/3 border border-slate-300 rounded-lg">
          <div class="mx-2 my-2 flex justify-between">
            <p class="pt-2 text-xl font-semibold">
              Traffic Sources
            </p>
            <FormsSelect :people="peopleList"/>
          </div>
          <UDivider/>
          <div v-for="item in 8" v-bind:key="item" :class="`my-1 px-2 pt-1`" >
            <div class="flex justify-between">
            <p class="text-base font-semibold text-gray-500">
              Direct.
            </p>
            <p class="text-base font-semibold text-gray-500">
              1,403,802
            </p>
            </div>
            <UMeter class="mt-1" :value="50" />
          </div>      
        </div>
      </div>
      <div class="flex gap-3">
        <div class="px-4 bg-white mt-2 w-2/3 border border-slate-300 rounded-lg">
          <div class="mx-2 my-4 flex justify-between">
            <div>
              <p class="text-xl font-semibold">
                Transactions
              </p>
              <p class="pl-1 text-sm font-medium text-gray-400">
                Lorem ipsum dolor sit amet. consectetur adipis.
              </p>
            </div>
            <div class="flex items-center text-indigo-600">
              <p class="pl-1 text-sm font-medium">
                See All Transactions.
              </p>              
              <UIcon class="h-3" name="i-ep-arrow-right-bold" dynamic />
            </div>
          </div>
          <UDivider/>
          <div v-for="item in 4" v-bind:key="item" :class="``" >
            <div class="flex justify-between items-center px-2 py-3">
              <div class="flex items-center bg-green-400 px-2 border rounded-3xl h-6">
                <UIcon class="h-3 text-green-600" name="i-fad-armrecording" dynamic />
                <p class="pl-1 text-sm font-semibold text-green-950">
                  Completed
                </p>
              </div>
              <div>
                <p class="text-sm font-semibold">
                  Visa card **** 9294
                </p>
                <p class="text-sm font-medium text-gray-400">
                  Card payment
                </p>
              </div>
              <div>
                <p class="text-sm font-semibold">
                  $182.94
                </p>
                <p class="text-sm font-medium text-gray-400">
                  Jan.17.2022
                </p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-400">
                  Amazon
                </p>
              </div>
            </div>
            <UDivider v-if="item != 4"/>
          </div>      
        </div>
        <div class="px-4 bg-white mt-2 w-1/3 border border-slate-300 rounded-lg">
          <div class="mx-2 my-4 flex">
            <div>
              <p class="text-xl font-semibold">
                Recent Customers
              </p>
              <p class="pl-1 text-sm font-medium text-gray-400">
                Lorem ipsum dolor sit amet.
              </p>
            </div>
          </div>
          <UDivider/>
          <div v-for="item in 4" v-bind:key="item" :class="``" >
            <div class="flex justify-between items-center px-2 py-3">
              <div class="flex items-center">
                <UAvatar
                  src="https://avatars.githubusercontent.com/u/739984?v=4"
                  alt="Avatar"
                />
                <div class="px-2">
                  <p class="text-sm font-semibold">
                    Jenny Wilson
                  </p>
                  <p class="pl-1 text-sm font-medium text-gray-400">
                    asdzxc9395@Naver.com
                  </p>          
                </div>
              </div>
              <div>
                <p class="text-sm font-semibold">
                  $182.94
                </p>
                <p class="text-sm font-medium text-gray-400">
                  New York
                </p>
              </div>
          </div>      
          <UDivider v-if="item != 4"/>
        </div>
        </div>
      </div>
  </UContainer>
</template>
