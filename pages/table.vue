<!--
  @pages/index.vue
  @Author: [채진호]
  @Date: [2023-11-30]
  @Last Modified by: [채진호]
  @Last Modified time: [2023-11-03]
-->
<script setup>
import { ref, onMounted, watchEffect, defineComponent } from 'vue';
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'

const value = ref('')

const columns = [{
  key: 'id',
  label: 'ID'
}, {
  key: 'name',
  label: 'Name'
}, {
  key: 'title',
  label: 'Title'
}, {
  key: 'email',
  label: 'Email'
}, {
  key: 'role',
  label: 'Role'
}]
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
const selectTab = (tab) => {
  selectedTab.value = tab;
  render(tab.id);
}

const activeSlide = ref(1);
const render = (slideIndex) => {
  activeSlide.value = slideIndex;
};

if(process.client) {
  watchEffect(() => {
    let gapWidth =  activeSlide.value == 1 ? '0' : '256';
    const transformValue = `translate(calc(-${(activeSlide.value - 1) * 100}vw + ${gapWidth}px))`;
    document.querySelectorAll('.container .inner div').forEach((divEl) => {
      divEl.style.transform = transformValue;
    });
    // console.log(document.getElementsByClassName('inner-1'))
  });

  onMounted(() => {
    // 초기 렌더링 후에도 watchEffect를 호출하여 초기 상태를 적용할 수 있습니다.
    watchEffect();
  });
}

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

const q = ref('')

const filteredRows = computed(() => {
  if (!q.value) {
    return people
  }

  return people.filter((person) => {
    return Object.values(person).some((value) => {
      return String(value).toLowerCase().includes(q.value.toLowerCase())
    })
  })
})
</script>

<template>
  <UContainer class="">
  <UCard class="mb-0">
    <div class="flex justify-between items-center p-0.5">
      <div class="text-4xl font-semibold text-blue-900 w-1/2">
        재고조회
      </div>
      <div class="gap-1 flex">
        <UInput 
          v-model="q" 
          color="gray" variant="outline"
          placeholder="Filter people..." 
          class="text-gray-700 hover:bg-gray-100 rounded-md border-gray-700" 
        />
        <UButton 
          icon="i-heroicons-document-magnifying-glass" 
          class="text-gray-700 hover:bg-gray-100 rounded-md" 
          variant="outline"
        >
          Filter
        </UButton>
      </div>
    </div>
  </UCard>
  <div>
    <div class="border-b border-b-gray-200 mb-2">
      <ul class="-mb-px flex items-center gap-4 text-sm font-medium" >
        <li 
          v-for="item in tabItems" 
          :key="item.id"
        >
          <button
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
          </button>
        </li>
      </ul>
    </div>
    <div class="slide-container">
      <div class="container">
        <div class="inner">
          <UTable 
            v-model="selected" 
            :rows="filteredRows" 
            :columns="columns" 
            class="bg-slate-50 rounded"
          />
        </div>
        <div class="inner">
          <ChartBar
            :chartData="chartData"
            style="height: 100%;"
            class="bg-slate-50 rounded"
          />
        </div>
      </div>
    </div>
  </div>
  </UContainer>
</template>

<style scoped>
/* 슬라이드 컨테이너 스타일 */
.slide-container {
  width: calc(100vw - 256px);
  overflow: hidden;
}
.container {
  display: flex;
  width: calc(100vw - 256px);
}

.container .inner div {
  width: calc(100vw - 256px);
  font-size: 4rem;
  transition-property: transform;
  transition-duration: 1s;
  text-align: left;
  transition-timing-function: ease-in-out;
  line-height: 500px;
}
</style>