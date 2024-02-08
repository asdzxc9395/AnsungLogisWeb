<template>
  <div>
    <nav class="mx-auto flex font-sans" aria-label="Global">
      <div class="flex flex-col w-full h-screen p-4 bg-white gap-4 border-r border-gray-300" style="width: 236px;" @mouseover="changeBg(true)" @mouseout="changeBg(false)">
        <div :class="`flex justify-center items-center h-12 px-4`">
          <span class="font-bold text-2xl leading-8">
            안성종합물류
          </span>
        </div>
        <div :class="`w-full flex justify-center py-3 px-2 gap-3 items-center`">
            <UIcon class="h-9 w-9 text-gray-400" name="i-heroicons-user-circle-16-solid" dynamic/>
            <div class="flex justify-center items-start flex-col" style="flex: 1 0 0;">
              <div class="text-base font-semibold">채진호</div>
              <div class="text-xs font-normal">admin</div>
            </div>
          <UDropdown :items="items" :ui="{ item: { disabled: 'cursor-text select-text' } }" :popper="{ placement: 'bottom-start' }">
            <on class="h-6 w-6 text-gray-400 hover:text-indigo-500 hover-change-animation" name="i-heroicons-cog-6-tooth" dynamic/>
            <template #account="{ item }">
              <div class="text-left">
                <p class="truncate font-medium text-gray-900 dark:text-white">
                  {{ item.label }}
                </p>
              </div>
            </template>

            <template #item="{ item }">
              <span class="truncate">{{ item.label }}</span>
              <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto" />
            </template>
          </UDropdown>                 
        </div>
        <div :class="['py-3 border-t border-gray-300 flow-root overflow-y-hidden hover:overflow-y-scroll scrollBar']" style="height: calc(100vh - 250px); flex: 1 0 0;"
        >
          <div class="flex flex-col items-start gap-1 w-full" >
            <div v-for="(menu, i) in menus" :key="i" :class="['overflow-y-auto w-full']">
              <Disclosure as="div" class="" v-slot="{ open }">
                <DisclosureButton 
                  :class="['flex p-2 items-center gap-3 w-full self-stretch rounded-sm hover:bg-gray-100',
                  open ? '' : ''
                  ]"
                  style="border: radius 4px;"
                >
                <UIcon :name="`${products[i].icon}`" :class="['h-6 w-6 text-gray-400', 
                  open ? '' : ''
                  ]" dynamic
                />
                <div class="text-sm font-semibold leading-5 text-left" style="flex:1 0 0;">
                  {{ menu.name }}
                </div>
                <ChevronDownIcon :class="['text-gray-400', open ? 'rotate-180 ' : '', 'h-5 w-5 flex-none']" aria-hidden="true" />
                </DisclosureButton>
                <transition
                  enter="transform transition duration-85"
                  enter-active-class="transition duration-100 ease-out"
                  enter-from-class="transform scale-95 opacity-0"
                  enter-to-class="transform scale-100 opacity-100"
                  leave-active-class="transition duration-75 ease-out"
                  leave-from-class="transform scale-100 opacity-100"
                  leave-to-class="transform scale-95 opacity-0"
                >
                <DisclosurePanel class="mt-1 flex items-start gap-2 w-full" v-if="menu.subs.length > 0">
                  <div class="flex flex-col justify-items-start" style="width: 18px;"></div>
                  <div class="w-full flex flex-col gap-1 border-l border-gray-300">
                    <DisclosureButton 
                      v-for="item in menu.subs" 
                      :key="item.MENU_SEQ" 
                      as="a" 
                      :href="item.href" 
                      class="flex items-center ml-1 px-4 py-2.5 gap-3 text-sm font-semibold text-gray-900 hover:bg-gray-100 hover:text-primary"
                      style="border-radius: 4px; width: calc(100% - 4px);"
                    >
                      {{ item.SUBMENU_NM }}
                    </DisclosureButton>
                  </div>

                </DisclosurePanel>
                </transition>
              </Disclosure>              
            </div>
          </div>
        </div>
      </div>
    </nav>
    <DialogTablepopup :isOpen="isOpen"  @closeDialog="closeDialog" />
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue'
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/vue'
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline'
import { ChevronDownIcon, HeartIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/vue/20/solid'
import { storeToRefs } from 'pinia'; // import storeToRefs helper hook from pinia
import { useAuthStore } from '~/store/auth'; // import the auth store we just created
import { useUserStore } from '~/store/user'; // import the auth store we just created

const { menus } = defineProps(['menus']);
// const menu = ref(menus)

const router = useRouter();
const { logUserOut } = useAuthStore(); // use authenticateUser action from  auth store
const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs
const headerBg = ref('bg-slate-100')
const isOpen = ref(false);

const products = [
  {href: '', icon: 'i-heroicons-star' },
  {href: '', icon: 'i-heroicons-document-text' },
  {href: '', icon: 'i-heroicons-arrow-left-end-on-rectangle' },
  {href: '', icon: 'i-heroicons-arrow-right-start-on-rectangle' },
  {href: '', icon: 'i-heroicons-squares-2x2' },
  {href: '', icon: 'i-heroicons-chart-bar-square' },
]

const logout = () => {
  logUserOut();
  router.push('/login');
};

const changeBg = (e: any) => {
if(e) {
  headerBg.value = 'bg-gray-200'
} else {
  headerBg.value = 'bg-gray-200'
}
}

const items = [
  [{
    label: 'mhcnc@mhcnc.com',
    slot: 'account',
    disabled: true
  }], [{
    label: 'Settings',
    icon: 'i-heroicons-cog-8-tooth'
  }, {
    label: '조회기록',
    icon: 'i-heroicons-clipboard-document-list',
    click: () => {
      isOpen.value = true;
    }
  }], [{
    label: 'Logout',
    icon: 'i-heroicons-arrow-left-on-rectangle',
    click: () => {
      logout()
    }
  }]
]

function closeDialog(e:any) {
  isOpen.value = e
}

</script>
<style scoped>

.scrollBar::-webkit-scrollbar {
    width: 0px;  /* 스크롤바의 너비 */
}

.scrollBar::-webkit-scrollbar-thumb {
    height: 30%; /* 스크롤바의 길이 */
    background: #999; /* 스크롤바의 색상 */
    border-radius: 10px;
}

.scrollBar::-webkit-scrollbar-track {
    background: #eee;  /*스크롤바 뒷 배경 색상*/
}
</style>