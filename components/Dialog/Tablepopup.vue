<template>
  <div></div>
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
                  조회기록
                </div>
              </DialogTitle>
              <div class="bg-white flex flex-col gap-2 px-6 shadow-right">
                <div class="w-full h-full">
                  <FormsTable
                    :rows="filteredRows" 
                    :columns="columns"
                    :search-tabs="searchTabs"
                    class="hideBar"
                    style="max-height: calc(300px);"
                  > 
                  <template #searchCondition-data="{ row }">
                    <span v-if="row.searchCondition.isDate.isActive">{{ row.searchCondition.isDate.beforeDate + '_' + row.searchCondition.isDate.afterDate }}</span>
                    <span v-if="row.searchCondition.isTextField.isActive">{{ row.searchCondition.isDate.beforeDate + '_' + row.searchCondition.isDate.afterDate }}</span>
                    <span v-if="row.searchCondition.isSelect.isActive">{{ row.searchCondition.isDate.beforeDate + '_' + row.searchCondition.isDate.afterDate }}</span>
                  </template>

                  <template #other-data="{ row }">
                    <UDropdown :items="items(row)">
                      <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
                    </UDropdown>
                  </template>                
                </FormsTable>                
                </div>
              </div>

              <div class="p-6 bg-white rounded-b-lg shadow-right">
                <div class="flex justify-center w-full">
                  <UButton 
                    class="hover:bg-indigo-400 rounded-md text-sm font-bold w-full" 
                    variant="solid"                    
                    @click="isClose()"
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
<script setup>
import { ref, watch, defineEmits, computed } from "vue";
import {TransitionRoot,TransitionChild,Dialog,DialogPanel,DialogTitle,DialogDescription} from '@headlessui/vue'
import { XMarkIcon } from "@heroicons/vue/24/solid";
import { useUserStore } from '~/store/user';

const emit = defineEmits(['closeDialog']);

const { getSearchList } = useUserStore();
const searchList = ref([]);

const e = defineProps(['isOpen']);
const isOpen = computed(() => {
  return e.isOpen
})

const status = ref(false)
watch(() => isOpen.value, (newValue) => {
  status.value = newValue
});

const searchTabs = ref([])

const columns = [{
  key: 'searchDate',
  label: '검색일자',
  sortable: true
}, {
  key: 'menuName',
  label: '메뉴명',
  sortable: true
}, {
  key: 'searchCondition',
  label: '검색조건',
  sortable: true
},{
  key: 'other'
}];

const items = (row) => [
  [{
    label: 'Edit',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => console.log('Edit', row.id)
  }, {
    label: 'Duplicate',
    icon: 'i-heroicons-document-duplicate-20-solid'
  }], [{
    label: 'Archive',
    icon: 'i-heroicons-archive-box-20-solid'
  }, {
    label: 'Move',
    icon: 'i-heroicons-arrow-right-circle-20-solid'
  }], [{
    label: 'Delete',
    icon: 'i-heroicons-trash-20-solid'
  }]
]

const filteredRows = computed(() => {
  // if(status.value) {
    searchList.value = getSearchList();
    console.log(searchList.value)
    return !getSearchList() ? [] : toRaw(searchList.value);
  // }
});

const isClose = async () => {
  emit("closeDialog", false);
};
// watchEffect(() => isOpen, (newValue, oldValue) => {
// });

</script>
