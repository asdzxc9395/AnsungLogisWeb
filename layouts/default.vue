<template>
  <div class="flex bg-slate-100 flex-auto relative">
    <WebHeader :menus="menus"/>
    <div class="max-x-full flex-auto">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'; // import storeToRefs helper hook from pinia
import { useAuthStore } from '~/store/auth'; // import the auth store we just created
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';

const router = useRouter();

const { logUserOut } = useAuthStore(); // use authenticateUser action from  auth store
const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs
const route = useRoute();

const logout = () => {
  logUserOut();
  router.push('/login');
};

// const { data } = await useFetch('/api/menu')
// let menus = data.value
let menus = [
    {
      "formName" : "Master",
      "name": "기준정보",
      "subs": [
        {
          "MENU_URL": "Master_01",
          "MENU_SEQ": 1,
          "MENU_NM": "기준정보",
          "SUBMENU_SEQ": 1,
          "SUBMENU_NM": "품목관리",
          "FORM_NAME": "MasterSku",
          "REG_DT": "2022-02-07 00:00:00.0000000"
        },
        {
          "MENU_URL": "Master_02",
          "MENU_SEQ": 1,
          "MENU_NM": "기준정보",
          "SUBMENU_SEQ": 1,
          "SUBMENU_NM": "거래처관리",
          "FORM_NAME": "MasterCust",
          "REG_DT": "2022-02-14 00:00:00.0000000"
        },
        {
          "MENU_URL": "Master_03",
          "MENU_SEQ": 1,
          "MENU_NM": "기준정보",
          "SUBMENU_SEQ": 3,
          "SUBMENU_NM": "사용자관리",
          "FORM_NAME": "SystemUser",
          "REG_DT": "2022-02-07 00:00:00.0000000"
        },
        {
          "MENU_URL": "Master_04",
          "MENU_SEQ": 1,
          "MENU_NM": "기준정보",
          "SUBMENU_SEQ": 4,
          "SUBMENU_NM": "사용자권한관리",
          "FORM_NAME": "SystemAuth",
          "REG_DT": "2022-02-07 00:00:00.0000000"
        },
        {
          "MENU_URL": "Master_05",
          "MENU_SEQ": 1,
          "MENU_NM": "기준정보",
          "SUBMENU_SEQ": 5,
          "SUBMENU_NM": "로케이션관리",
          "FORM_NAME": "MasterLoc",
          "REG_DT": "2022-04-01 00:00:00.0000000"
        },
        {
          "MENU_URL": "Master_06",
          "MENU_SEQ": 1,
          "MENU_NM": "기준정보",
          "SUBMENU_SEQ": 6,
          "SUBMENU_NM": "팔렛트관리",
          "FORM_NAME": "MasterPallet",
          "REG_DT": "2022-04-01 00:00:00.0000000"
        }
      ]
    },
    {
      "formName" : "Order",
      "name": "입고업무",
      "subs": [
        {
          "MENU_URL": "Order_01",
          "MENU_SEQ": 2,
          "MENU_NM": "입고업무",
          "SUBMENU_SEQ": 1,
          "SUBMENU_NM": "입고등록",
          "FORM_NAME": "OrderSearch01",
          "REG_DT": "2022-04-01 00:00:00.0000000"
        },
        {
          "MENU_URL": "Order_02",
          "MENU_SEQ": 2,
          "MENU_NM": "입고업무",
          "SUBMENU_SEQ": 2,
          "SUBMENU_NM": "입고마감",
          "FORM_NAME": "OrderClose",
          "REG_DT": "2022-04-01 00:00:00.0000000"
        },
        {
          "MENU_URL": "Order_03",
          "MENU_SEQ": 2,
          "MENU_NM": "입고업무",
          "SUBMENU_SEQ": 3,
          "SUBMENU_NM": "반품입고",
          "FORM_NAME": "ShipReturn",
          "REG_DT": "2022-04-01 00:00:00.0000000"
        }
      ]
    },
    {
      "formName" : "Ship",
      "name": "출고업무",
      "subs": [
        {
          "MENU_URL": "Ship_01",
          "MENU_SEQ": 3,
          "MENU_NM": "출고업무",
          "SUBMENU_SEQ": 1,
          "SUBMENU_NM": "출고등록",
          "FORM_NAME": "ShipSearch01",
          "REG_DT": "2022-04-11 07:40:48.4300000"
        },
        {
          "MENU_URL": "Ship_02",
          "MENU_SEQ": 3,
          "MENU_NM": "출고업무",
          "SUBMENU_SEQ": 3,
          "SUBMENU_NM": "배송지정",
          "FORM_NAME": "ShipSearch02",
          "REG_DT": "2022-04-11 07:40:48.4300000"
        },
        {
          "MENU_URL": "Ship_03",
          "MENU_SEQ": 3,
          "MENU_NM": "출고업무",
          "SUBMENU_SEQ": 2,
          "SUBMENU_NM": "피킹수동할당",
          "FORM_NAME": "ShipAlloc",
          "REG_DT": "2022-04-11 07:40:48.4300000"
        },
        {
          "MENU_URL": "Ship_04",
          "MENU_SEQ": 3,
          "MENU_NM": "출고업무",
          "SUBMENU_SEQ": 5,
          "SUBMENU_NM": "차량지정",
          "FORM_NAME": "ShipCar",
          "REG_DT": "2022-04-11 07:40:48.4300000"
        },
        {
          "MENU_URL": "Ship_05",
          "MENU_SEQ": 3,
          "MENU_NM": "출고업무",
          "SUBMENU_SEQ": 6,
          "SUBMENU_NM": "택배출고",
          "FORM_NAME": "ShipInvoice",
          "REG_DT": "2022-04-11 07:40:48.4300000"
        },
        {
          "MENU_URL": "Ship_06",
          "MENU_SEQ": 3,
          "MENU_NM": "출고업무",
          "SUBMENU_SEQ": 7,
          "SUBMENU_NM": "출고마감",
          "FORM_NAME": "ShipClose",
          "REG_DT": "2022-04-11 07:40:48.4300000"
        },
        {
          "MENU_URL": "Ship_07",
          "MENU_SEQ": 3,
          "MENU_NM": "출고업무",
          "SUBMENU_SEQ": 3,
          "SUBMENU_NM": "피킹자동할당",
          "FORM_NAME": "ShipAllocManual",
          "REG_DT": "2022-04-11 07:40:48.4300000"
        }
      ]
    },
    {
      "formName" : "Stock",
      "name": "재고업무",
      "subs": [
        {
          "MENU_URL": "Stock_01",
          "MENU_SEQ": 4,
          "MENU_NM": "재고업무",
          "SUBMENU_SEQ": 1,
          "SUBMENU_NM": "재고조회",
          "FORM_NAME": "StockSearch01",
          "REG_DT": "2022-04-01 00:00:00.0000000"
        },
        {
          "MENU_URL": "Stock_02",
          "MENU_SEQ": 4,
          "MENU_NM": "재고업무",
          "SUBMENU_SEQ": 2,
          "SUBMENU_NM": "입출고이력",
          "FORM_NAME": "StockInoutSearch01",
          "REG_DT": "2022-04-01 00:00:00.0000000"
        },
        {
          "MENU_URL": "Stock_03",
          "MENU_SEQ": 4,
          "MENU_NM": "재고업무",
          "SUBMENU_SEQ": 3,
          "SUBMENU_NM": "제품별재고",
          "FORM_NAME": "StockPrdSearch01",
          "REG_DT": "2022-04-01 00:00:00.0000000"
        },
        {
          "MENU_URL": "Stock_04",
          "MENU_SEQ": 4,
          "MENU_NM": "재고업무",
          "SUBMENU_SEQ": 4,
          "SUBMENU_NM": "셀별재고",
          "FORM_NAME": "StockCell",
          "REG_DT": "2022-04-01 00:00:00.0000000"
        }
      ]
    },
    {
      "formName" : "Summary",
      "name": "집계",
      "subs": [
        {
          "MENU_URL": "Summary_01",
          "MENU_SEQ": 5,
          "MENU_NM": "집계",
          "SUBMENU_SEQ": 1,
          "SUBMENU_NM": "운송정보집계",
          "FORM_NAME": "SummaryDelivery",
          "REG_DT": "2022-04-01 00:00:00.0000000"
        }
      ]
    }
  ]

const links = [{
  label: 'Home',
  icon: 'i-heroicons-home',
  to: '/'
}
, {
  label: 'Navigation',
  icon: 'i-heroicons-square-3-stack-3d'
}, {
  label: 'Breadcrumb',
  icon: 'i-heroicons-link'
}
]
</script>