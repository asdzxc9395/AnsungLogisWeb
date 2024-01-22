<script setup>
import { ref, toRefs, onMounted, defineProps, defineEmits } from 'vue';
import { format } from 'date-fns';
import koLocale from 'date-fns/locale/ko';

const d = defineProps(['datePicker'])
const date = ref(d.datePicker);
const emit = defineEmits(['changeDate']);

const handleDateChange = () =>emit('changeDate', format(date.value, 'yyyy-MM-dd', { locale: koLocale }));
onMounted(() => {
  handleDateChange()
})
</script>
<template>
  <div>
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
  </div>    
</template>

  