<script setup>
import { ref, toRefs, onMounted, defineProps, defineEmits } from 'vue';
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue';
const { categories } = defineProps(['categories']);
const category = ref(categories[0])
const emit = defineEmits();
// 탭이 변경될 때 부모에게 선택된 category를 emit
const handleTabChange = (e) => {
  emit('updateCategory', categories[e]);
};
</script>
<template>
    <div class="w-full px-2 py-0 sm:px-0 flex justify-center">
      <TabGroup @change="handleTabChange">
        <TabList class="flex rounded-md bg-slate-500/20 ">
          <Tab
            v-for="cat in categories"
            as="template"
            :key="cat.label"
            v-slot="{ selected }"
          >
            <button
              :class="[
                'px-4 rounded-md py-1 leading-5',
                'ring-white/60',
                selected
                  ? 'bg-white text-black border border-black rounded-md text-sm font-semibold'
                  : 'text-gray-400 hover:bg-white/[0.12] hover:text-black text-sm font-thin ',
              ]"
            >
              {{ cat.label }}
            </button>
          </Tab>
        </TabList>
      </TabGroup>
    </div>
  </template>
  