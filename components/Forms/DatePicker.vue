<script setup>
import { ref, toRefs, onMounted, defineProps, defineEmits } from 'vue';
import { format } from 'date-fns';
import koLocale from 'date-fns/locale/ko';

const date = ref(new Date());
const emit = defineEmits(['changeDate']);

const handleDateChange = () =>emit('changeDate', format(date.value, 'yyyy-MM-dd', { locale: koLocale }));
</script>
<template>
    <div></div>
    <VDatePicker v-model="date" :popover="false" @click="handleDateChange()">
        <template #default="{ togglePopover, inputValue, inputEvents }">
          <div>
            <UInput
              :value="inputValue"
              v-on="inputEvents"
              autocomplete="off"
              readonly
              @click="() => togglePopover()"
              class="text-gray-700 hover:bg-gray-100 rounded-md border-gray-700" 
            >
              <template #leading>
                <UButton
                  variant="link"
                  icon="i-heroicons-calendar-days-16-solid"
                  color="gray"
                  :padded="false"
                />
              </template>
            </UInput>            
          </div>
        </template>
    </VDatePicker>        
</template>

  