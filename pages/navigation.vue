<template>
    <div class="w-full max-w-md px-2 py-16 sm:px-0">
      <TabGroup>
        <TabList class="flex border-0 ">
          <Tab
            v-for="category in Object.keys(categories)"
            as="template"
            :key="category"
            v-slot="{ selected }"
          >
            <div
              :class="[
                'bg-white text-blue-700 shadow border-b-blue-700 border-2'
              ]"            
            >
              <button
                :class="[
                  'w-full text-sm font-medium leading-5',
                  selected
                    ? 'bg-white text-blue-700 shadow border-b-blue-700 border-2'
                    : '',
                ]"
              >
                {{ category }}
              </button>
            </div>
          </Tab>
        </TabList>
      </TabGroup>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
  
  const categories = ref({
    Recent: [
      {
        id: 1,
        title: 'Does drinking coffee make you smarter?',
        date: '5h ago',
        commentCount: 5,
        shareCount: 2,
      },
      {
        id: 2,
        title: "So you've bought coffee... now what?",
        date: '2h ago',
        commentCount: 3,
        shareCount: 2,
      },
    ],
    Popular: [
      {
        id: 1,
        title: 'Is tech making coffee better or worse?',
        date: 'Jan 7',
        commentCount: 29,
        shareCount: 16,
      },
      {
        id: 2,
        title: 'The most innovative things happening in coffee',
        date: 'Mar 19',
        commentCount: 24,
        shareCount: 12,
      },
    ],
    Trending: [
      {
        id: 1,
        title: 'Ask Me Anything: 10 answers to your questions about coffee',
        date: '2d ago',
        commentCount: 9,
        shareCount: 5,
      },
      {
        id: 2,
        title: "The worst advice we've ever heard about coffee",
        date: '4d ago',
        commentCount: 1,
        shareCount: 2,
      },
    ],
  })
  </script>
  