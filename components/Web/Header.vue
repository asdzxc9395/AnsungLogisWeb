<template>
  <div class="w-60">
    <nav class="mx-auto flex max-w-7xl font-sans" aria-label="Global">
      <div class="w-full h-screen" style="" @mouseover="changeBg(true)" @mouseout="changeBg(false)">
        <div :class="`flex justify-center gap-8 items-center ${headerBg} mr-2`">
        <div :class="`flex justify-center py-6 gap-1 items-center ${headerBg}`">
          <UIcon class="h-10 w-10 text-gray-400" name="i-heroicons-user-circle-16-solid" dynamic/>
          <div>
            <div class="text-base font-semibold">채진호</div>
            <div class="pl-1 text-xs text-gray-500 font-light">admin</div>
          </div>
        </div>
          <UDropdown :items="items" :ui="{ item: { disabled: 'cursor-text select-text' } }" :popper="{ placement: 'bottom-start' }">
            <UIcon class="h-5 w-5 text-gray-400 hover:text-indigo-500 hover-change-animation" name="i-material-symbols-settings" dynamic/>

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
        <div class="pt-6 flow-root overflow-y-hidden hover:overflow-y-scroll scrollBar" style="height: calc(100vh - 88px)">
          <div class="-my-6 divide-y divide-gray-500/10" >
            <div v-for="(menu, i) in menus" :key="i" class="space-y-2 py-1 px-2 overflow-y-auto">
              <Disclosure as="div" class="" v-slot="{ open }">
                <DisclosureButton 
                  class="flex w-full items-center justify-between py-1 pl -2 rounded-sm text-sm font-semibold leading-0 text-gray-900 hover:bg-slate-200"
                >
                <div class="flex items-center justify-between">
                  <component :is="products[i].icon" class="mr-2 h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />                
                  {{ menu.name }}
                </div>
                  <ChevronDownIcon :class="[open ? 'rotate-180' : '', 'h-5 w-5 flex-none']" aria-hidden="true" />
                </DisclosureButton>
                <DisclosurePanel class="mt-2 space-y-2" v-if="menu.subs.length > 0">
                  <DisclosureButton 
                    v-for="item in menu.subs" 
                    :key="item.MENU_SEQ" 
                    as="a" 
                    :href="item.href" 
                    class="block rounded-md py-0 pl-6 pr-1 text-sm font-base leading-7 text-gray-900 hover:bg-slate-200"
                  >
                    {{ item.SUBMENU_NM }}
                  </DisclosureButton>
                </DisclosurePanel>
              </Disclosure>
            </div>
          </div>
        </div>
      </div>      
      <!-- 좌측 버튼 -->

      <!-- 우측 버튼 -->
      <!-- lg:hidden max-width: 1024(0 ~ 1024) -->
      <!-- <div class="flex lg:hidden">
        <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = true">
          <span class="sr-only">Open main menu</span>
          <Bars3Icon class="h-6 w-6" aria-hidden="true" />
        </button> 
      </div> -->

      <!-- 중앙 메뉴 -->
      <!-- <PopoverGroup class="hidden lg:flex lg:gap-x-12">
        <Popover class="relative">
          <PopoverButton class="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-700">
            Product
            <ChevronDownIcon class="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
          </PopoverButton>
  
          <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 translate-y-1" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-1">
            <PopoverPanel class="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
              <div class="p-4">
                <div v-for="item in products" :key="item.name" class="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-green-300">
                  <div class="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                    <component :is="item.icon" class="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                  </div>
                  <div class="flex-auto">
                    <a :href="item.href" class="block font-semibold text-gray-900">
                      {{ item.name }}
                      <span class="absolute inset-0" />
                    </a>
                    <p class="mt-1 text-gray-600">{{ item.description }}</p>
                  </div>
                </div>
              </div>
              <div class="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                <a v-for="item in callsToAction" :key="item.name" :href="item.href" class="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100">
                  <component :is="item.icon" class="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                  {{ item.name }}
                </a>
              </div>
            </PopoverPanel>
          </transition>
        </Popover>
        <a href="/contact" class="text-sm font-semibold leading-6 text-gray-900">Features</a>
        <a href="/" class="text-sm font-semibold leading-6 text-gray-900">Marketplace</a>
        <a href="#" class="text-sm font-semibold leading-6 text-gray-900">Company</a>
      </PopoverGroup> -->

      <!-- 우측 로그인 -->
      <!-- hidden lg:flex min-width: 1024(1024 ~ ) -->
      <!-- <div class="hidden lg:flex lg:flex-1 lg:justify-end">
        <a href="#" class="text-sm font-semibold leading-6 text-gray-900">Log in <span aria-hidden="true">&rarr;</span></a>
      </div> -->
    </nav>
  </div>
</template>

<script setup>
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

const { menus } = defineProps(['menus']);
// const menu = ref(menus)

const router = useRouter();
const { logUserOut } = useAuthStore(); // use authenticateUser action from  auth store
const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs

const logout = () => {
  logUserOut();
  router.push('/login');
};
const products = [
  { name: 'Analytics', description: 'Get a better understanding of your traffic', href: '#', icon: HeartIcon },
  { name: 'Analytics', description: 'Get a better understanding of your traffic', href: '#', icon: ChartPieIcon },
  { name: 'Engagement', description: 'Speak directly to your customers', href: '#', icon: CursorArrowRaysIcon },
  { name: 'Security', description: 'Your customers’ data will be safe and secure', href: '#', icon: FingerPrintIcon },
  { name: 'Integrations', description: 'Connect with third-party tools', href: '#', icon: SquaresPlusIcon },
  { name: 'Automations', description: 'Build strategic funnels that will convert', href: '#', icon: ArrowPathIcon },
]
const callsToAction = [
  { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
  { name: 'Contact sales', href: '#', icon: PhoneIcon },
]

const headerBg = ref('bg-slate-100')
const changeBg = (e) => {
if(e) {
  headerBg.value = 'bg-slate-200'
} else {
  headerBg.value = 'bg-slate-100'
}
}

const mobileMenuOpen = ref(false)
// const items = [[{
//     label: 'Edit',
//     icon: 'i-heroicons-pencil-square-20-solid',
//     // shortcuts: ['E'],
//     click: () => {
//       console.log('Edit')
//     }
//   }],[{
//     label: 'Logout',
//     icon: 'i-heroicons-arrow-right-on-rectangle-20-solid',
//     // shortcuts: ['⌘', 'D']
//     click: () => {
//       logout()
//     }
//   }]
// ]
const items = [
  [{
    label: 'mhcnc@mhcnc.com',
    slot: 'account',
    disabled: true
  }], [{
    label: 'Settings',
    icon: 'i-heroicons-cog-8-tooth'
  }], [{
    label: 'Logout',
    icon: 'i-heroicons-arrow-left-on-rectangle',
    click: () => {
      logout()
    }
  }]
]
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