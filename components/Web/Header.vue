<template>
  <div class="w-60">
    <nav class="mx-auto flex max-w-7xl font-sans" aria-label="Global">
      <div class="w-full h-screen" style="">
        <!-- <div class="flex justify-center my-4">
          <span class="text-2xl font-semibold ">MHCNC</span>
        </div> -->
        <div class="flex justify-center my-6">
          <UButton class="bg-indigo-700 px-3 text-base font-medium" label="Connect New Account" />
        </div>
        <div class="mt-6 flow-root">
          <div class="-my-6 divide-y divide-gray-500/10">
            <div  v-if="authenticated" class="space-y-2 py-6 px-2">
              <!-- <Disclosure as="div" class="" v-slot="{ open }">
                <DisclosureButton class="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-base leading-7 text-gray-900 hover:bg-green-300">
                  Product
                  <ChevronDownIcon :class="[open ? 'rotate-180' : '', 'h-5 w-5 flex-none']" aria-hidden="true" />
                </DisclosureButton>
                <DisclosurePanel class="mt-2 space-y-2">
                  <DisclosureButton v-for="item in [...products, ...callsToAction]" :key="item.name" as="a" :href="item.href" class="block rounded-lg py-2 pl-6 pr-3 text-sm font-base leading-7 text-gray-900 hover:bg-green-300">{{ item.name }}</DisclosureButton>
                </DisclosurePanel>
              </Disclosure> -->
              <div 
              class="px-0 py-0 text-sm font-semibold leading-7 text-gray-900 hover:bg-slate-300"
              >
              <UIcon class="h-5 mx-2" name="i-material-symbols-house-outline" dynamic/>
                Dashboard
              </div>              
              <div class="px-2 pt-2 text-xs font-semibold text-gray-500">SUPPORT</div>
              <div 
                v-for="item in [...products]" 
                :key="item.name" 
                as="a"
                class="flex items-center px-4 py-0 text-sm font-semibold leading-7 text-gray-900 hover:bg-slate-300"
              >
                <!-- <UIcon class="h-5 mx-1" name="i-material-symbols-folder-outline" dynamic/> -->
                <component :is="item.icon" class="h-5 mx-1 w-5" aria-hidden="true"/>
                {{ item.name }}
              </div>
              <div class="px-2 pt-2 text-xs font-semibold text-gray-500">ANALYTICS</div>
              <div 
                v-for="item in [...products]" 
                :key="item.name" 
                as="a"
                class="px-4 py-0 text-sm font-semibold leading-7 text-gray-900 hover:bg-slate-300"
              >
                <UIcon class="h-5 mx-1" name="i-material-symbols-bar-chart" dynamic/>
                {{ item.name }}
              </div>

            </div>
            <div class="py-6">
              <!-- <a v-if="!authenticated" href="/login" class="block rounded-lg px-3 py-2 text-sm font-semibold leading-7 text-gray-900 hover:bg-slate-300">Login</a> -->
              <a v-if="authenticated" @click="logout" class="block rounded-lg px-3 py-2.5 text-sm font-semibold leading-7 text-gray-900 hover:bg-slate-300">Logout</a>
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
import { ref } from 'vue'
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
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/vue/20/solid'
import { storeToRefs } from 'pinia'; // import storeToRefs helper hook from pinia
import { useAuthStore } from '~/store/auth'; // import the auth store we just created

const router = useRouter();

const { logUserOut } = useAuthStore(); // use authenticateUser action from  auth store
const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs

const logout = () => {
  logUserOut();
  router.push('/login');
};
const products = [
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

const mobileMenuOpen = ref(false)

</script>