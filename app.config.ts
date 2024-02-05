export default defineAppConfig({
  ui: {
    primary: 'indigo',
    gray: 'cool',    
    card: {
      background: "bg-white dark:bg-white",
      ring: "ring-1 ring-gray-200 dark:ring-gray-200",
      base: "overflow-visible",
      mobile: {
        padding: 'px-2 py-3 sm:p-7', // 원하는 패딩 값으로 변경
      },
      body: {
        base: "",
        padding: 'px-0 py-0 sm:p-0', // 원하는 패딩 값으로 변경
      },
      header: {
        padding: 'px-2 py-3 sm:p-4', // 원하는 패딩 값으로 변경
      },
    },
    modal: {
      overlay: {
        background: "bg-gray-100/30",
      },
    }, 
    input: {
      default: {
        size: "md",
        color: "white",
        variant: "outline",
        loadingIcon: "i-heroicons-arrow-path-20-solid"
      },
      padding: {
        "2xs": "px-2 py-1",
        xs: "px-2.5 py-1.5",
        sm: "px-2.5 py-1.5",
        md: "pl-3 pr-2.5 py-1.5",
        lg: "px-3.5 py-2.5",
        xl: "px-3.5 py-2.5"
      },      
      color: {
        white: {
          outline: "shadow-sm bg-white dark:bg-white text-gray-900 dark:text-gray-900 ring-1 ring-inset ring-gray-300 dark:ring-gray-300 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
        },
        gray: {
          outline: "shadow-sm bg-gray-50 dark:bg-gray-50 text-gray-900 dark:text-gray-900 ring-1 ring-inset ring-gray-300 dark:ring-gray-300 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
        }
      },
      // "variant": {
      //   "outline": "shadow-sm bg-transparent text-gray-900 dark:text-white ring-1 ring-inset ring-{color}-500 dark:ring-{color}-400 focus:ring-2 focus:ring-{color}-500 dark:focus:ring-{color}-400",
      //   "none": "bg-transparent focus:ring-0 focus:shadow-none"
      // },
      // "icon": {
      //   "base": "flex-shrink-0 text-gray-400 dark:text-gray-500",
      //   "color": "text-{color}-500 dark:text-{color}-400",
      //   "loading": "animate-spin",
      //   "size": {
      //     "2xs": "h-4 w-4",
      //     "xs": "h-4 w-4",
      //     "sm": "h-5 w-5",
      //     "md": "h-5 w-5",
      //     "lg": "h-5 w-5",
      //     "xl": "h-6 w-6"
      //   },
      //   "leading": {
      //     "wrapper": "absolute inset-y-0 start-0 flex items-center",
      //     "pointer": "pointer-events-none",
      //     "padding": {
      //       "2xs": "px-2",
      //       "xs": "px-2.5",
      //       "sm": "px-2.5",
      //       "md": "px-3",
      //       "lg": "px-3.5",
      //       "xl": "px-3.5"
      //     }
      //   },
      //   "trailing": {
      //     "wrapper": "absolute inset-y-0 end-0 flex items-center",
      //     "pointer": "pointer-events-none",
      //     "padding": {
      //       "2xs": "px-2",
      //       "xs": "px-2.5",
      //       "sm": "px-2.5",
      //       "md": "px-3",
      //       "lg": "px-3.5",
      //       "xl": "px-3.5"
      //     }
      //   }
      // },
    },
    table: {
      wrapper: "border-collapse",
      base: "min-w-full table-fixed relative",
      divide: "divide-y divide-gray-300 dark:divide-gray-700",
      thead: "sticky z-5 top-0 bg-gray-50",
      //
      tbody: "divide-y bg-white divide-gray-200 dark:divide-gray-800", 
      tr: {
        base: "border-b border-gray-200  gap-3",
        selected: "bg-gray-50 dark:bg-gray-800/50",
        active: "hover:bg-white dark:hover:bg-gray-800/50 cursor-pointer"
      },
      th: {
        base: "sticky top-0 text-left rtl:text-right",
        padding: "pl-2 pr-2 py-2",
        checkbox: "pl-3 pr-4 py-2",
        color: "text-gray-900 dark:text-white",
        font: "font-medium",
        size: "text-xs"
      },
      td: {
        base: "whitespace-nowrap",
        padding: "pl-2 pr-2 py-2",
        checkbox: "pl-3 pr-4 py-2",
        color: "text-gray-900 dark:text-gray-400",
        font: "font-medium",
        size: "text-xs"
      },
      checkbox: {
        "padding": "ps-4"
      },               
      default: {
        sortAscIcon: "i-heroicons-bars-arrow-up",
        sortDescIcon: "i-heroicons-bars-arrow-down",
        sortButton: {
          "icon": "i-custom-bars-arrow",
          "trailing": true,
          "square": true,
          "color": "gray",
          "variant": "ghost",
          "class": "-m-1.0"
        },
        "loadingState": {
          "icon": "i-heroicons-arrow-path-20-solid",
          "label": "Loading..."
        },
        "emptyState": {
          "icon": "i-heroicons-circle-stack-20-solid",
          "label": "No items."
        }        
      },
      loadingState: {
        "wrapper": "flex flex-col items-center justify-center flex-1 px-6 py-14 sm:px-14",
        "label": "text-sm text-center text-gray-900 dark:text-white",
        "icon": "w-6 h-6 mx-auto text-gray-400 dark:text-gray-500 mb-4 animate-spin"
      },
      emptyState: {
        "wrapper": "flex flex-col items-center justify-center flex-1 px-6 py-14 sm:px-14",
        "label": "text-sm text-center text-gray-900 dark:text-white",
        "icon": "w-6 h-6 mx-auto text-gray-400 dark:text-gray-500 mb-4"
      },        
    },    
    button: {
      // "base": "focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0",
      // "font": "font-medium",
      // "rounded": "rounded-md",
      // "truncate": "text-left break-all line-clamp-1",
      // "block": "w-full flex justify-center items-center",
      // "inline": "inline-flex items-center",
      // "size": {
      //   "2xs": "text-xs",
      //   "xs": "text-xs",
      //   "sm": "text-sm",
      //   "md": "text-sm",
      //   "lg": "text-sm",
      //   "xl": "text-base"
      // },
      // "gap": {
      //   "2xs": "gap-x-1",
      //   "xs": "gap-x-1.5",
      //   "sm": "gap-x-1.5",
      //   "md": "gap-x-2",
      //   "lg": "gap-x-2.5",
      //   "xl": "gap-x-2.5"
      // },
      // "padding": {
      //   "2xs": "px-2 py-1",
      //   "xs": "px-2.5 py-1.5",
      //   "sm": "px-2.5 py-1.5",
      //   "md": "px-3 py-2",
      //   "lg": "px-3.5 py-2.5",
      //   "xl": "px-3.5 py-2.5"
      // },
      // "square": {
      //   "2xs": "p-1",
      //   "xs": "p-1.5",
      //   "sm": "p-1.5",
      //   "md": "p-2",
      //   "lg": "p-2.5",
      //   "xl": "p-2.5"
      // },
      color: {
        white: {
          solid: "shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 text-gray-900 dark:text-white bg-white hover:bg-gray-50 disabled:bg-white dark:bg-gray-900 dark:hover:bg-gray-800/50 dark:disabled:bg-gray-900 focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400",
          ghost: "text-gray-900 dark:text-white hover:bg-white dark:hover:bg-gray-900 focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400"
        },
        // "gray": {
        //   "solid": "shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 text-gray-700 dark:text-gray-200 bg-gray-50 hover:bg-gray-100 disabled:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700/50 dark:disabled:bg-gray-800 focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400",
        //   "ghost": "text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400",
        //   "link": "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 underline-offset-4 hover:underline focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400"
        // },
        // "black": {
        //   "solid": "shadow-sm text-white dark:text-gray-900 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-900 dark:bg-white dark:hover:bg-gray-100 dark:disabled:bg-white focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400",
        //   "link": "text-gray-900 dark:text-white underline-offset-4 hover:underline focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400"
        // }
      },
        // "variant": {
        //   "solid": "shadow-sm text-white dark:text-gray-900 bg-{color}-500 hover:bg-{color}-600 disabled:bg-{color}-500 dark:bg-{color}-400 dark:hover:bg-{color}-500 dark:disabled:bg-{color}-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-{color}-500 dark:focus-visible:outline-{color}-400",
        //   "outline": "ring-1 ring-inset ring-current text-{color}-500 dark:text-{color}-400 hover:bg-{color}-50 disabled:bg-transparent dark:hover:bg-{color}-950 dark:disabled:bg-transparent focus-visible:ring-2 focus-visible:ring-{color}-500 dark:focus-visible:ring-{color}-400",
        //   "soft": "text-{color}-500 dark:text-{color}-400 bg-{color}-50 hover:bg-{color}-100 disabled:bg-{color}-50 dark:bg-{color}-950 dark:hover:bg-{color}-900 dark:disabled:bg-{color}-950 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-{color}-500 dark:focus-visible:ring-{color}-400",
        //   "ghost": "text-{color}-500 dark:text-{color}-400 hover:bg-{color}-50 disabled:bg-transparent dark:hover:bg-{color}-950 dark:disabled:bg-transparent focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-{color}-500 dark:focus-visible:ring-{color}-400",
        //   "link": "text-{color}-500 hover:text-{color}-600 disabled:text-{color}-500 dark:text-{color}-400 dark:hover:text-{color}-500 dark:disabled:text-{color}-400 underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-{color}-500 dark:focus-visible:ring-{color}-400"
        // },
        // "icon": {
        //   "base": "flex-shrink-0",
        //   "loading": "animate-spin",
        //   "size": {
        //     "2xs": "h-4 w-4",
        //     "xs": "h-4 w-4",
        //     "sm": "h-5 w-5",
        //     "md": "h-5 w-5",
        //     "lg": "h-5 w-5",
        //     "xl": "h-6 w-6"
        //   }
        // },
        default: {
          size: "md",
          variant: "solid",
          color: "primary",
          loadingIcon: "i-heroicons-arrow-path-20-solid"
        }
    }
    // select: {
    //   default: {
    //     loadingIcon: 'i-octicon-sync-24',
    //     trailingIcon: 'i-octicon-chevron-down-24'
    //   }
    // },
    // selectMenu: {
    //   default: {
    //     selectedIcon: 'i-octicon-check-24'
    //   }
    // },
    // notification: {
    //   default: {
    //     closeButton: {
    //       icon: 'i-octicon-x-24'
    //     }
    //   }
    // },
    // commandPalette: {
    //   default: {
    //     icon: 'i-octicon-search-24',
    //     loadingIcon: 'i-octicon-sync-24',
    //     selectedIcon: 'i-octicon-check-24',
    //     emptyState: {
    //       icon: 'i-octicon-search-24'
    //     }
    //   }
    // },
    // pagination: {
    //   default: {
    //     firstButton: {
    //       icon: 'i-octicon-chevron-left-24'
    //     },
    //     prevButton: {
    //       icon: 'i-octicon-arrow-left-24'
    //     },
    //     nextButton: {
    //       icon: 'i-octicon-arrow-right-24'
    //     },
    //     lastButton: {
    //       icon: 'i-octicon-chevron-right-24'
    //     }
    //   }
    // },
    // accordion: {
    //   default: {
    //     openIcon: 'i-octicon-chevron-down-24'
    //   }
    // },
    // breadcrumb: {
    //   default: {
    //     divider: 'i-octicon-chevron-right-24'
    //   }
    // }
  }
})
  