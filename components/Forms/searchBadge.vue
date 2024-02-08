<template>
  <div
    v-if="tagList.length > 0"
    class="flex flex-wrap gap-1 border border-gray-300 rounded-md px-3 py-2 w-full"
  >
    <div 
      v-for="(item, i) in tagList" 
      :key="i" 
      :class="[
        `bg-${colorList[getIndexWithinRange(i)].color}-100 ${colorList[getIndexWithinRange(i)].ringColor} ${colorList[getIndexWithinRange(i)].fontColor}`, 
        'ring-1 ring-inset rounded-md flex items-center gap-2 px-2 py-1 hover:opacity-60'
      ]"
    >
      <span 
        :class="['inline-flex text-sm font-medium']"
      >
        {{ item.val }}
      </span>
      <UIcon :name="'i-heroicons-x-circle-16-solid'" class="flex-shrink-0 h-4 w-4 ms-auto" />

    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, computed } from 'vue';

const t = defineProps(['tagList']);
const tagList = computed(() => {
  return t.tagList
})

const colorList = [
  {color: 'gray', fontColor:'text-gray-600', ringColor:'ring-gray-500/10'},
  {color: 'red', fontColor:'text-red-700', ringColor:'ring-red-600/10'},
  {color: 'yellow', fontColor:'text-yellow-800', ringColor:'ring-yellow-600/20'},
  {color: 'green', fontColor:'text-green-700', ringColor:'ring-green-600/20'},
  {color: 'blue', fontColor:'text-blue-700', ringColor:'ring-blue-700/10'},
  {color: 'indigo', fontColor:'text-indigo-700', ringColor:'ring-indigo-700/10'},
  {color: 'purple', fontColor:'text-purple-700', ringColor:'ring-purple-700/10'},
  {color: 'pink', fontColor:'text-pink-700', ringColor:'ring-pink-700/10'},
]

// Ensure `i` is within 0 to colorList.length - 1 range
const getIndexWithinRange = (i) => {
  const range = colorList.length;
  return (i >= 0) ? i % range : (range + (i % range)) % range;
}
</script>
