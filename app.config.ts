export default defineAppConfig({
  ui: {
    primary: 'indigo',
    gray: 'cool',    
    card: {
      background: "bg-white dark:bg-white",
      ring: "ring-1 ring-gray-200 dark:ring-gray-200",
      mobile: {
        padding: 'px-2 py-3 sm:p-7', // 원하는 패딩 값으로 변경
      },
      body: {
        padding: 'px-2 py-3 sm:p-4', // 원하는 패딩 값으로 변경
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
        loadingIcon: 'i-octicon-sync-24'
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
      default: {
        sortAscIcon: 'i-octicon-sort-asc-24',
        sortDescIcon: 'i-octicon-sort-desc-24',
        sortButton: {
          icon: 'i-octicon-arrow-switch-24'
        },
        loadingState: {
          icon: 'i-octicon-sync-24'
        },
        emptyState: {
          icon: 'i-octicon-database-24'
        }
      },
      // .wrapper .tableBox{position: relative; top: 50px; left: 50px; width: 700px; height: 100px; overflow-y: scroll; border-top: 2px solid dodgerblue;}
      // .tableData{width: 100%; border-collapse: collapse; text-align: center;}
      // .tableData thead tr th{position: sticky; top: 0; background: #ebeaea;}
      // .tableData thead tr th,
      // .tableData tbody tr td{padding: 15px 0; box-sizing: border-box; border-bottom: 1px solid #dedede; border-right: 1px solid #ddd; word-break: break-all;}
      base: "border-collapse", 
      thead: "sticky z-10 top-0 bg-white",
      tbody: "divide-y bg-slate-50 divide-gray-200 dark:divide-gray-800",
      tr: {
        base: "",
        selected: "bg-gray-50 dark:bg-gray-800/50",
        active: "hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer"
      },
      th: {
        base: "sticky top-0",
        padding: "px-1 py-1",
        color: "text-gray-900 dark:text-white",
        font: "font-semibold",
        size: "text-xs"
      },
      td: {
        base: "whitespace-nowrap",
        padding: "px-1 py-1",
        color: "text-gray-500 dark:text-gray-400",
        font: "",
        size: "text-xs"
      },      
    },    
    // button: {
    //   default: {
    //     loadingIcon: 'i-octicon-sync-24',
    //     color: 'blue'
    //   }
    // },
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
  