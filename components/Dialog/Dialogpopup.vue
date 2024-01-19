<template>
  <Dialog
    :open="show"
    class="reactive z-50 items-center"
    @close="closeFunc(-2)"
  >
    <!-- 
      class="fixed top-1/4 left-1/4 flex min-h-[33%] max-h-[75%] justify-center bg-white ring-4 ring-opacity-50 rounded-md items-center"
      :class="modalLength"
    -->
    <div
      class="fixed top-1/4 left-1/4 flex min-h-[33%] max-h-[75%] justify-center bg-white ring-4 ring-opacity-50 rounded-md items-center"
      :class="modalLength"
    >
      <DialogPanel class="justify-center align-middle w-full h-full">
        <!-- header part -->
        <div class="w-full h-11 top-0">
          <button
            v-if="closeBtn"
            @click="closeFunc(-1)"
            class="p-3 rounded-md inline-flex text-gray-300 hover:text-gray-400 float-right"
          >
            <span class="sr-only">Close</span>
            <XMarkIcon class="h-5 w-5" aria-hidden="true" />
          </button>
          <DialogTitle class="p-3">{{ title }}</DialogTitle>
        </div>
        <!-- body part -->
        <div class="w-full h-fit border-t-4 border-blue-300">
          <div class="w-full max-h-32 h-fit p-3">
            <UTable
              v-if="isTable"
              :rows="data"
              :columns="columns"
              class="w-full max-h-32 h-fit bg-slate-50 rounded"
            />
            <span
              v-else
              class="w-full max-h-32 h-fit flex overflow-scroll text-ellipsis"
            >
              {{ data }}
            </span>
            <!-- test button part -->
            <div class="w-full h-1/4">
              <UButton type="button" @click="convertBtnType('OK')">
                OK 버튼 확인
              </UButton>
              <UButton type="button" @click="convertBtnType('YN')">
                YES/NO 버튼 확인
              </UButton>
              <UButton type="button" @click="convertBtnType('NONE')">
                NONE(버튼없음) 확인
              </UButton>
            </div>
          </div>
        </div>
        <!-- footer part -->
        <div class="w-full h-11 items-center absolute bottom-0">
          <!-- 1 BUTTON - "OK" -->
          <UButton
            v-if="btnType == 'OK'"
            type="button"
            class="border-t-4 border-blue-300 inline-flex justify-center w-full h-full rounded-t-none bg-blue-100 px-4 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            @click="closeFunc(1)"
          >
            확인(OK)
          </UButton>

          <!-- 2 BUTTON - YES/NO -->
          <UButton
            v-if="btnType == 'YN'"
            type="button"
            class="border-t-4 border-blue-300 inline-flex justify-center w-1/2 h-full bg-blue-100 px-4 text-sm font-medium text-blue-900 rounded-t-none rounded-br-none border-r-4 border-blue-300 hover:bg-blue-200 focus:outline-none focus-visible:bg-blue-500"
            @click="closeFunc(1)"
          >
            확인(YES)
          </UButton>
          <UButton
            v-if="btnType == 'YN'"
            type="button"
            class="border-t-4 border-blue-300 inline-flex justify-center w-1/2 h-full bg-blue-100 px-4 text-sm font-medium text-blue-900 rounded-t-none rounded-bl-none hover:bg-blue-200 focus:outline-none focus-visible:bg-blue-500"
            @click="closeFunc(0)"
          >
            취소(NO)
          </UButton>
        </div>
      </DialogPanel>
    </div>
  </Dialog>
</template>

<script setup>
import { ref } from "vue";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogDescription,
} from "@headlessui/vue";
import { XMarkIcon } from "@heroicons/vue/24/solid";
import { useDialogPopup } from "~/composables/useDialogPopup.js";

const actDialog = useDialogPopup();

const emit = defineEmits(["modal-result-value-test"]);

const btnType = computed(() => actDialog.btnType);
const title = computed(() => actDialog.title);
const data = computed(() => actDialog.data);
const isTable = computed(() => actDialog.isTable);
const show = computed(() => actDialog.show);
const closeBtn = computed(() => actDialog.closeBtn);
const modalWidth = computed(() => actDialog.customWidth);
const modalHeight = computed(() => actDialog.customHeight);

const modalLength = computed(() => {
  return modalWidth.value + " " + modalHeight.value;
});

const columns = computed(() => actDialog.columns);

const closeFunc = async (val) => {
  // returnValue 전달
  emit("modal-result-value-test", val);

  await closeDialog(val);
};

const closeDialog = async (val) => {
  // actDialog.setClose();
  actDialog.reset(val);
};

// 테스트용 메서드
const convertBtnType = (typeValue) => {
  actDialog.setBtnType(typeValue);
};
</script>
