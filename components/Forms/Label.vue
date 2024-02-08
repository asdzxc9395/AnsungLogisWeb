<script setup>
import { ref, defineProps } from 'vue';

const { line } = defineProps(['line'])
const list =  line.split('_')
</script>
<template>
    <div>
        <span v-for="(item, index) in list" :key="index" :class="['flex text-sm font-semibold whitespace-nowrap',
            list.length > 1 ? 
            'items-start text-xs pr-1' 
            : 
            'items-center'
        ]">
            {{ item }}
        </span>
    </div>
</template>

    