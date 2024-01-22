<!--
  @pages/index.vue
  @Author: [채진호]
  @Date: [2023-11-30]
  @Last Modified by: [채진호]
  @Last Modified time: [2023-11-03]
-->
<script setup>
import { ref, onMounted, watchEffect, defineComponent } from 'vue';
import {TransitionRoot,TransitionChild,Dialog,DialogPanel,DialogTitle} from '@headlessui/vue'
import * as testApi from "~/api/testApi";
import { useUserStore } from '~/store/user'; // import the auth store we just created

const { setLog, getSearchList } = useUserStore();

// Modal
const isOpen = ref(false)

// excel 처리
const { exportExcel } = useExcel();
const downloadExcel =() => {
  exportExcel(columns, tableItems.value, 'test')
}

// Table Search기능 + Pagination, selected 처리
const columns = [{
  key: 'receiptDt',
  label: 'receiptDt',
  sortable: true
}, {
  key: 'receiptKey',
  label: 'receiptKey',
  sortable: true
}, {
  key: 'skuPlanQty',
  label: 'skuPlanQty',
  sortable: true
}, {
  key: 'skuWorkQty',
  label: 'skuWorkQty',
  sortable: true
}, {
  key: 'sourceOrigin',
  label: 'sourceOrigin',
  sortable: true
}, {
  key: 'pcsPlanQty',
  label: 'pcsPlanQty',
  sortable: true
}, {
  key: 'pcsWorkQty',
  label: 'pcsWorkQty',
  sortable: true
}]

const tableItems = ref([])
const selected = ref([])
const page = ref(1)
const pageCount = 10
const pageLength = ref(tableItems.length)
const q = ref('')
const searchTabs = ref([])
const filteredRows = computed(() => {
  if(tableItems.value.length == 0) {
    return
  }
      
  if (!q.value) {
    pageLength.value = tableItems.value.length
    return tableItems.value
  }


  const filteredPeople = tableItems.value.filter((person) => {
    const filteredRow = {};
    
    searchTabs.value.forEach((tab) => {
      if (person.hasOwnProperty(tab)) {
        filteredRow[tab] = person[tab];
      }
    });

    const row = searchTabs.value.length > 0 ? filteredRow : person

    return Object.values(row).some((value) => {
      return String(value).toLowerCase().includes(q.value.toLowerCase());
    });
  });

  pageLength.value = filteredPeople.length;
  return filteredPeople;
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
  try {
    const datainfo = {
      params: {
        DATE_FR: startDate.value,
        DATE_TO: endDate.value,
      },
    };
    
    const resp = await testApi.initGet(datainfo, "user/입고 조회");
    isOpen.value = false
    tableItems.value = resp.data;

    setLog({
      // isDate, isTextField, isSelect
      // beforeDate, afterDate / model / isActive
      name: 'isDate', 
      data: {beforeDate: startDate.value, afterDate: endDate.value},
      path: window.location.pathname,
    })
    console.log(getSearchList())
  } catch (error) {
    console.log(error)
  }  
};
</script>

<template>
  <UContainer class="">
  <UCard class="mb-0 p-0.5 relative">
    <div class="flex items-center justify-between w-full relative">
      <div class="text-3xl font-semibold text-blue-900 w-1/3">
        피킹수동할당
      </div>
      <div class="gap-2 flex relative items-center">
        <UInput 
          v-model="q" 
          @keydown="page = 1"
          color="gray" variant="outline"
          placeholder="Filter tableItems..." 
          class="text-gray-700 hover:bg-gray-100 rounded-md border-gray-700" 
        />
        <UButton 
          icon="i-mdi-microsoft-excel" 
          class="text-gray-700 hover:bg-gray-100 rounded-md" 
          variant="outline"
          @click="downloadExcel"
        >
          Excel
        </UButton>
        <UButton 
          icon="i-heroicons-document-magnifying-glass" 
          class="text-gray-700 hover:bg-gray-100 rounded-md" 
          variant="outline"
          @click="isOpen = true"
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
          <div class=" flex gap-2">
            <FormsTable
              v-model="selected" 
              :rows="filteredRows" 
              :columns="columns"
              :search-tabs="searchTabs"
              class="scrollBar"
              style="height: calc(100vh - 160px);"
            />
            <FormsTable
              v-model="selected" 
              :rows="filteredRows" 
              :columns="columns"
              :search-tabs="searchTabs"
              class="scrollBar"
              style="height: calc(100vh - 160px);"
            />
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