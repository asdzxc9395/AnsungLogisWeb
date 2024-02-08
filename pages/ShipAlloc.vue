<!--
  @pages/index.vue
  @Author: [채진호]
  @Date: [2023-11-30]
  @Last Modified by: [채진호]
  @Last Modified time: [2023-11-03]
-->
<script setup>
import { ref, onMounted, watchEffect, defineComponent } from 'vue';
import { useLoadingIndicator } from '#imports'
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
const countries = [{
  name: 'United States',
  value: 'US'
}, {
  name: 'Canada',
  value: 'CA',
  disabled: true
}, {
  name: 'Mexico',
  value: 'MX'
}]

const country = ref('CA')
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


const tagList = computed(() => {
  return tagItems.value.map(
    (items, index) => ({
      ...items,
      index: index + 1
    }))
})
const tagItems = ref([])
const tagVal = ref('')
  
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
    // console.log(document.('inner-1'))
  });

  onMounted(() => {
    // 초기 렌더링 후에도 watchEffect를 호출하여 초기 상태를 적용할 수 있습니다.
    watchEffect();
  });
}
const nuxtApp = useNuxtApp()

const initApiGetCall = async () => {
  try {
    nuxtApp.callHook('page:loading:start')
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
    nuxtApp.callHook('page:loading:end')
  } catch (error) {
    // nuxtApp.callHook('vue:error')
    nuxtApp.callHook('page:loading:end')
    console.log(error)
  }  
};
</script>

<template>
  <UContainer class="">
  <UCard class="relative rounded-none px-8">
    <div class="flex items-center justify-between w-full relative  h-16">
      <div class="text-3xl font-bold text-primary w-1/3" style="line-height: 42px;">
        피킹수동할당
      </div>
      <div class="gap-2 flex relative items-center">
        <FormsLabel :line="'통합검색'"></FormsLabel>
        <UInput 
          v-model="q" 
          @keydown="page = 1"
          color="white" variant="outline"
          placeholder=""
          class="text-gray-700 hover:bg-gray-100 rounded-md " 
        />
        <UButton 
          icon="i-heroicons-magnifying-glass" 
          class="hover:bg-indigo-400 rounded-md" 
          variant="solid"
          @click="isOpen = true"
        >
          조회
        </UButton>        
        <UButton 
          icon="i-mdi-microsoft-excel"
          color="white"
          class=" text-gray-900 border-gray-500 hover:bg-gray-100 rounded-md" 
          variant="solid"
          @click="downloadExcel"
        >
          저장
        </UButton>
      </div>
    </div>
  </UCard>
  <div class="flex w-full px-4 py-3 items-start" style="flex: 1 0 0">
    <div class="flex w-full gap-4 items-start" style="flex: 1 0 0;width: calc(100vw - 272px);">
      <div class="w-1/2 rounded-lg border border-gray-200" style="box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.10), 0px 1px 2px -1px rgba(0, 0, 0, 0.10);">
        <FormsTable
          v-model="selected" 
          :rows="filteredRows" 
          :columns="columns"
          :search-tabs="searchTabs"
          class="hideBar"
          style="max-height: calc(100vh - 200px);"
        />
        <div class="flex px-6 py-2 gap-2 flex-col justify-center items-end border-t border-gray-200 bg-white rounded-b-lg">
          <div class="flex items-center lg:justify-end sm:max-lg:w-full">
            <div class="flex items-center gap-3" style="flex: 1 0 0;">
              <div class="w-8/12 flex items-center gap-2" style="flex: 1 0 0;">
                <FormsLabel :line="'제품명'"></FormsLabel>
                <UInput 
                  color="white" variant="outline"
                  placeholder=""
                  size="md"
                  class="text-gray-700 hover:bg-gray-100 rounded-md w-full" 
                />
              </div>
              <div class="w-4/12 flex items-center gap-2">
                <FormsLabel :line="'팔레트'"></FormsLabel>
                <UInput 
                  color="white" variant="outline"
                  placeholder=""
                  class="text-gray-700 hover:bg-gray-100 rounded-md w-full" 
                />
              </div>
            </div>
            <div class="flex items-start pl-4 gap-3 mr-2">
              <FormsLabel :line="'외 3건'"></FormsLabel>
            </div>
          </div>
          <div class="flex items-center justify-end">
            <div class="w-full flex items-center gap-3" style="flex: 1 0 0;">
              <div class="w-6/12 flex items-center gap-2 justify-end" style="flex: 1 0 0;">
                <FormsLabel :line="'제조국'"></FormsLabel>
                <USelect v-model="country" :options="countries" option-attribute="name" />
              </div>
              <div class="w-3/12 flex items-center gap-2" style="flex: 1 0 0;">
                <FormsLabel :line="'제조주차'"></FormsLabel>
                <UInput 
                  color="white" variant="outline"
                  placeholder=""
                  class="text-gray-700 hover:bg-gray-100 rounded-md w-full" 
                />
              </div>
              <div class="w-3/12 flex items-center gap-2" style="flex: 1 0 0;">
                <FormsLabel :line="'입고수량'"></FormsLabel>
                <UInput 
                  color="white" variant="outline"
                  placeholder=""
                  class="text-gray-700 hover:bg-gray-100 rounded-md w-full" 
                />
              </div>
            </div>
            <div class="flex items-start pl-4 gap-3">
              <UButton 
                color="white"
                class=" text-gray-900 border-gray-500 hover:bg-gray-100 rounded-md" 
                variant="solid"
              >
                등록
              </UButton>              
            </div>
          </div>
        </div>
      </div>
      <div class="w-1/2 rounded-lg border border-gray-200" style="box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.10), 0px 1px 2px -1px rgba(0, 0, 0, 0.10);">
        <FormsTable
          v-model="selected" 
          :rows="filteredRows" 
          :columns="columns"
          :search-tabs="searchTabs"
          class="hideBar"
          style="max-height: calc(100vh - 200px);"
        />
        <div class="flex px-6 py-2 gap-2 justify-center items-end border-t border-gray-200 bg-white rounded-b-lg">
          <div class="flex items-center justify-start" style="flex: 1 0 0;">
            <UButton 
              color="white"
              class=" text-gray-900 border-gray-500 hover:bg-gray-100 rounded-md" 
              variant="solid"
            >
              삭제
            </UButton>               
          </div>
          <div class="flex items-center justify-end gap-3">
            <FormsLabel :line="'로케이션'"></FormsLabel>
            <UInput 
              color="white" variant="outline"
              placeholder=""
              class="text-gray-700 hover:bg-gray-100 rounded-md w-full" 
            />
          </div>
          <div class="flex items-start pl-4 gap-3">
            <UButton 
              color="white"
              class=" text-gray-900 border-gray-500 hover:bg-gray-100 rounded-md" 
              variant="solid"
            >
              적치
            </UButton>              
          </div>
        </div>
      </div>
    </div>
  </div>
  <TransitionRoot :show="isOpen" >
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
            <!-- dialogPanel css: calendar-height  추가할지말지 -->
            <DialogPanel
              class="w-full max-w-md transform shadow-none text-left align-middle transition-all"
              style="min-width: 435px;"
              >
              <DialogTitle
                class="p-6 bg-white leading-6 rounded-t-lg shadow-right"
              >
                <div class="text-xl font-bold gray-black-900 w-1/3">
                  조건 설정
                </div>
              </DialogTitle>
              <div class="px-6 bg-white flex flex-col gap-2 shadow-right">
                <div class="flex flex-row gap-2 items-center">
                  <FormsLabel :line="'입고일자'"></FormsLabel>
                  <FormsDatePicker class="" :datePicker="startDate" @change-date="value => startDate = value"/>
                  <FormsLabel :line="'출고_일자'"></FormsLabel>
                  <FormsDatePicker class="" :datePicker="endDate" @change-date="value => endDate = value"/>
                </div>
                <div class="flex flex-row gap-2 items-center">
                  <FormsLabel :line="'조회조건'"></FormsLabel>
                  <USelectMenu
                  class=""
                  v-model="searchTabs" 
                  :options="columns" 
                  multiple
                  placeholder="All Select" 
                  value-attribute="label" 
                  option-attribute="label"
                  />
                  <FormsLabel :line="'태그추가'"></FormsLabel>
                  <UInput 
                    v-model="tagVal"
                    @keyup.enter="tagItems.push({val: tagVal})"
                    class=""
                  ></UInput>
                </div>
                <div class="flex flex-row gap-2 items-center">
                  <FormsSearchBadge :tagList="tagList" />
                </div>
              </div>

              <div class="p-6 bg-white rounded-b-lg shadow-right">
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

.i-mdi-microsoft-excel {
  color: #9CA3AF !important;
}
</style>