<template>
  <div :class="[ui.wrapper, ' border border-gray-200 rounded-t-lg']" id="infinite-table" style="box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.10), 0px 1px 2px -1px rgba(0, 0, 0, 0.10);">
    <table :class="[ui.base, ui.divide]" >
      <thead :class="ui.thead" style="z-index: 9">
        <tr :class="ui.tr.base">
          <th v-if="modelValue" scope="col" :class="[ui.th.checkbox]">
            <UCheckbox 
              :checked="indeterminate || selected.length === rows.length" 
              :indeterminate="indeterminate" 
              @change="selected = $event.target.checked ? rows : []" 
            />
          </th>

          <th 
            v-for="(column, index) in columns" 
            :key="index" scope="col" 
            :class="[ui.th.base, ui.th.padding, ui.th.color, ui.th.font, ui.th.size, column.classNames, index != 0 ? 'border-l border-gray-200' : '']"
          >
            <slot :name="`${column.key}-header`" :column="column" :sort="sort" :on-sort="onSort">
                <!-- <UIcon class="h-6 w-6 text-gray-400 hover:text-indigo-500 hover-change-animation" name="i-custom-arrow-left" dynamic/> -->
              <UButton
                v-if="column.sortable"
                v-bind="{ ...ui.default.sortButton, ...sortButton }"
                :icon="(!sort.column || sort.column !== column.key) ? (sortButton.icon || ui.default.sortButton.icon) : sort.direction === 'asc' ? sortAscIcon : sortDescIcon"
                :label="column[columnAttribute]"
                @click="onSort(column)"
                :class="['p-0', searchTabs.filter(e => e == column.label).length > 0 ? 
                  'text-primary hover:text-primary'
                  :
                  '']"
              />
              <span v-else>{{ column[columnAttribute] }}</span>
            </slot>
          </th>
        </tr>
      </thead>
      <tbody :class="ui.tbody">
        <tr v-for="(row, index) in rows" :key="index" :class="[ui.tr.base, isSelected(row) && ui.tr.selected]">
          <td v-if="modelValue" :class="[ui.th.checkbox]">
            <UCheckbox v-model="selected" :value="row" />
          </td>

          <td v-for="(column, subIndex) in columns" :key="subIndex" :class="[ui.td.base, ui.td.padding, ui.td.color, ui.td.font, ui.td.size]">
            <slot :name="`${column.key}-data`" :column="column" :row="row" :index="index">
              {{ row[column.key] }}
            </slot>
          </td>
        </tr>

        <tr v-if="loadingState && loading">
          <td :colspan="columns.length + (modelValue ? 1 : 0)">
            <slot name="loading-state">
              <div :class="ui.loadingState.wrapper">
                <UIcon v-if="loadingState.icon" :name="loadingState.icon" :class="ui.loadingState.icon" aria-hidden="true" />
                <p :class="ui.loadingState.label">
                  {{ loadingState.label }}
                </p>
              </div>
            </slot>
          </td>
        </tr>

        <tr v-else-if="emptyState && !rows.length">
          <td :colspan="columns.length + (modelValue ? 1 : 0)">
            <slot name="empty-state">
              <div :class="ui.emptyState.wrapper">
                <UIcon v-if="emptyState.icon" :name="emptyState.icon" :class="ui.emptyState.icon" aria-hidden="true"/>
                <p :class="ui.emptyState.label">
                  {{ emptyState.label }}
                </p>
              </div>
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script  lang="ts">
import { ref, computed, defineComponent, toRaw, onMounted, onBeforeUnmount } from 'vue'
import type { PropType } from 'vue'
import { capitalize, orderBy } from 'lodash-es'
import { defu } from 'defu'
import type { Button } from '../../types/button'
import { useAppConfig } from '#imports'
// TODO: Remove
// @ts-expect-error
import appConfig from '#build/app.config'

// const appConfig = useAppConfig()

function defaultComparator<T> (a: T, z: T): boolean {
  return a === z
}

setTimeout(() => {
  const divTable = document.querySelector("#infinite-table");
  const table = divTable.getElementsByTagName("tbody")[0];

  const loadMore = () => {
      let row = table.insertRow(-1);
      row.insertCell(0).innerHTML = '123';
  };

  let timer: any;
  divTable.addEventListener("scroll", () => {
    if (timer) {   
        clearTimeout(timer); 
    }
    timer = setTimeout(() => {
        const scrollValue = Math.abs(divTable.scrollHeight - divTable.clientHeight - divTable.scrollTop);
        if (Math.abs(divTable.scrollHeight - divTable.clientHeight - divTable.scrollTop) < 1) {
          // loadMore()
        }          
    }, 300);
  })
}, 2000);
  
export default defineComponent({
  props: {
    modelValue: {
      type: Array,
      default: null
    },
    by: {
      type: [String, Function],
      default: () => defaultComparator
    },
    searchTabs: {
      type: Array,
      default: null
    },    
    rows: {
      type: Array as PropType<{ [key: string]: any }[]>,
      default: () => []
    },
    columns: {
      type: Array as PropType<{ key: string, classNames?: string, sortable?: boolean, [key: string]: any }[]>,
      default: null
    },
    columnAttribute: {
      type: String,
      default: 'label'
    },
    sort: {
      type: Object as PropType<{ column: string, direction: 'asc' | 'desc' }>,
      default: () => ({})
    },
    sortButton: {
      type: Object as PropType<Partial<Button>>,
      default: () => appConfig.ui.table.default.sortButton
    },
    sortAscIcon: {
      type: String,
      default: () => appConfig.ui.table.default.sortAscIcon
    },
    sortDescIcon: {
      type: String,
      default: () => appConfig.ui.table.default.sortDescIcon
    },
    loading: {
      type: Boolean,
      default: false
    },
    loadingState: {
      type: Object as PropType<{ icon: string, label: string }>,
      default: () => appConfig.ui.table.default.loadingState
    },
    emptyState: {
      type: Object as PropType<{ icon: string, label: string }>,
      default: () => appConfig.ui.table.default.emptyState
    },
    ui: {
      type: Object as PropType<Partial<typeof appConfig.ui.table>>,
      default: () => appConfig.ui.table
    }
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    // TODO: Remove

    const appConfig = useAppConfig()

    const ui: any = computed<Partial<typeof appConfig.ui.table>>(() => defu({}, props.ui, appConfig.ui.table))
    const columns = computed(() => props.columns ?? Object.keys(props.rows[0] ?? {}).map((key) => ({ key, label: capitalize(key), sortable: false })))
      console.log(appConfig.ui.table)
    const sort = ref(defu({}, props.sort, { column: null, direction: 'asc' }))

    const rows = computed(() => {
      if (!sort.value?.column) {
        return props.rows
      }

      const { column, direction } = sort.value

      return orderBy(props.rows, column, direction)
    })

    const selected = computed({
      get () {
        return props.modelValue
      },
      set (value) {
        emit('update:modelValue', value)
      }
    })

    const indeterminate = computed(() => selected.value && selected.value.length > 0 && selected.value.length < props.rows.length)

    const emptyState = computed(() => ({ ...ui.value.default.emptyState, ...props.emptyState }))

    function compare (a: any, z: any) {
      if (typeof props.by === 'string') {
        const property = props.by as unknown as any
        return a?.[property] === z?.[property]
      }
      return props.by(a, z)
    }

    function isSelected (row) {
      if (!props.modelValue) {
        return false
      }

      return selected.value.some((item) => compare(toRaw(item), toRaw(row)))
    }

    function onSort (column) {
      if (sort.value.column === column.key) {
        const direction = !column.direction || column.direction === 'asc' ? 'desc' : 'asc'

        if (sort.value.direction === direction) {
          sort.value = defu({}, props.sort, { column: null, direction: 'asc' })
        } else {
          sort.value.direction = sort.value.direction === 'asc' ? 'desc' : 'asc'
        }
      } else {
        sort.value = { column: column.key, direction: column.direction || 'asc' }
      }
    }

    return {
      // eslint-disable-next-line vue/no-dupe-keys
      ui,
      // eslint-disable-next-line vue/no-dupe-keys
      sort,
      // eslint-disable-next-line vue/no-dupe-keys
      columns,
      // eslint-disable-next-line vue/no-dupe-keys
      rows,
      selected,
      indeterminate,
      // eslint-disable-next-line vue/no-dupe-keys
      emptyState,
      isSelected,
      onSort
    }
  }
})
</script>