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
import * as testApi from "~/api/testApi";

const value = ref('')

// Table Search기능 + Pagination, selected 처리
const columns = [{
  key: 'receiptDt',
  label: 'receiptDt'
}, {
  key: 'receiptKey',
  label: 'receiptKey'
}, {
  key: 'skuPlanQty',
  label: 'skuPlanQty'
}, {
  key: 'skuWorkQty',
  label: 'skuWorkQty'
}, {
  key: 'sourceOrigin',
  label: 'sourceOrigin'
}, {
  key: 'pcsPlanQty',
  label: 'pcsPlanQty'
}, {
  key: 'pcsWorkQty',
  label: 'pcsWorkQty'
}]
const tableItems = ref([])
const selected = ref([])
const page = ref(1)
const pageCount = 10
const pageLength = ref(tableItems.length)
const q = ref('')
const filteredRows = computed(() => {
  if(tableItems.value.length == 0) {
    return
  }
  if (!q.value) {
    pageLength.value = tableItems.value.length
    return tableItems.value.slice((page.value - 1) * pageCount, (page.value) * pageCount)
  }

  const filteredPeople = tableItems.value.filter((person) => {
    return Object.values(person).some((value) => {
      return String(value).toLowerCase().includes(q.value.toLowerCase());
    });
  });

  pageLength.value = filteredPeople.length;
  return filteredPeople.slice((page.value - 1) * pageCount, page.value * pageCount);
});

const tabItems = [{
  id: 1,
  name: 'Overview',
},{
  id: 2,
  name: 'DashBoard',
}]

// Vcalendar 처리
const startDate = ref(new Date());
const endDate = ref(new Date());

// Table / Chartjs 슬라이딩 처리
const activeSlide = ref(0);
const selectedTab = ref(tabItems[0])

//Chartjs
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

const render = (slideIndex) => {
  activeSlide.value = slideIndex;
};
const selectTab = (tab) => {
  selectedTab.value = tab;
  render(tab.id);
}
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

const initApiGetCall = async () => {
  const datainfo = {
    params: {
      DATE_FR: startDate.value,
      DATE_TO: endDate.value,
    },
  };
  const resp = await testApi.initGet(datainfo, "user/입고 조회");
  // const resp = await testApi.testApiCall(datainfo, "user/login", "POST");
  tableItems.value = resp.data;
};
</script>

<template>
  <UContainer class="">
  <UCard class="mb-0">
    <div class="flex justify-between items-center p-0.5">
      <div class="text-4xl font-semibold text-blue-900 w-1/3">
        재고조회
      </div>
      <div class="gap-2 flex">
        <FormsDatePicker @change-date="value => startDate = value"/>
        <FormsDatePicker @change-date="value => endDate = value"/>
        <UInput 
          v-model="q" 
          @keydown="page = 1"
          color="gray" variant="outline"
          placeholder="Filter tableItems..." 
          class="text-gray-700 hover:bg-gray-100 rounded-md border-gray-700" 
        />
        <UButton 
          icon="i-heroicons-document-magnifying-glass" 
          class="text-gray-700 hover:bg-gray-100 rounded-md" 
          variant="outline"
          @click="initApiGetCall"
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
        <div class="py-3.5 border-t border-gray-200 dark:border-gray-700">
          <UPagination class="flex justify-center" v-model="page" :page-count="pageCount" :total="pageLength"/>
        </div>          
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
}
</style>