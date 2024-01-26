<!-- 
  example page
  updateDate : 2024-01-09
  Toastpopup(2024-01-05), testAPI(2024-01-09)
-->
<template>
  <div>About Page</div>

  <div class="py-3">
    <div id="printDiv">
      <!-- pure html table -->
      <div class="px-3 py-5">
        <div style="width: 5cm; height: 2cm; border: 0.05cm solid black">
          <div
            style="
              width: 4.95cm;
              height: 1cm;
              border-bottom: 0.05cm solid black;
            "
          >
            <div
              style="
                width: 2.4cm;
                height: 1cm;
                padding: 0.1cm;
                border-right: 0.05cm solid black;
                text-align: center;
                float: left;
              "
            >
              원부자재
            </div>
            <div
              style="
                width: 2.4cm;
                height: 1cm;
                padding: 0.1cm;
                text-align: center;
                float: right;
              "
            >
              SKU / EA
            </div>
          </div>
          <div style="width: 4.95cm; height: 1cm">
            <div
              style="
                width: 2.4cm;
                height: 1cm;
                padding: 0.1cm;
                border-right: 0.05cm solid black;
                text-align: center;
                float: left;
              "
            >
              0/0
            </div>
            <div
              style="
                width: 2.4cm;
                height: 1cm;
                padding: 0.1cm;
                text-align: center;
                float: right;
              "
            >
              1/2
            </div>
          </div>
        </div>
      </div>

      <!-- UTable -->
      <!-- <UTable
        :rows="rows"
        :columns="columns"
        class="w-1/2 max-h-32 h-fit bg-slate-50 rounded"
      /> -->

      <!-- Img -->
      <!-- <span>
        <img src="/static/img/truck-2181037_640.png" alt="" />
      </span> -->

      <!-- Barcode -->
      <!-- <span>
        CODE39::
        <div class="py-3">
          <Barcode-generator
            :value="bcrData"
            :format="'CODE39'"
            :width="1"
            :height="30"
            :textMargin="2"
            :elementTag="'svg'"
          />
        </div>
      </span>
      <span>
        CODE128::
        <div class="py-3">
          <Barcode-generator
            :value="bcrData"
            :format="'CODE128'"
            :width="1"
            :height="30"
            :textMargin="2"
            :elementTag="'svg'"
          />
        </div>
      </span>
      <span>
        QR::
        <div class="py-3">
          <qrcode-vue
            :size="30"
            :value="bcrData"
            :level="'M'"
            :render-as="'svg'"
          />
        </div>
      </span> -->
    </div>
    <UButton type="button" @click="initPrt"> print LabelPrint </UButton>
  </div>

  <div class="py-3">
    <UButton type="button" @click="initToast"> call Toastpopup </UButton>
  </div>

  <div class="py-3">
    <UButton type="button" @click="initDialog('default', 'popup Contents')">
      call Dialogpopup - default (w-1/2 h-1/3)
    </UButton>
    <h2>modal popup close respose value :: {{ modalRtn }}</h2>
  </div>

  <div class="py-3">
    <UButton type="button" @click="initDialog('default', 'popup Contents')">
      call Dialogpopup - default (w-1/2 h-1/3)
    </UButton>
    <UButton
      type="button"
      @click="
        initDialog(
          'custom height 50%',
          'popup Contents',
          undefined,
          false,
          undefined,
          'h-1/2'
        )
      "
    >
      call Dialogpopup - custom height 50% (h-1/2)
    </UButton>
    <UButton
      type="button"
      @click="
        initDialog(
          'custom width 70%',
          'popup Contents',
          undefined,
          false,
          'w-[70%]'
        )
      "
    >
      call Dialogpopup - custom width 70% (w-[70%])
    </UButton>
  </div>

  <div class="py-3">
    <UButton
      type="button"
      @click="initDialog('default YES/NO button', 'popup Contents', 'YN')"
    >
      call Dialogpopup - default (YES/NO)
    </UButton>
    <UButton
      type="button"
      @click="initDialog('default NO button', 'popup Contents', 'NONE')"
    >
      call Dialogpopup - default (NONE)
    </UButton>
  </div>

  <div class="py-3">
    <UButton type="button" @click="testFunc"> dialog 내 Table </UButton>
  </div>

  <div class="py-3">
    <UButton type="button" @click="initApiPostCall">
      call Test API (pda login api call - POST)
    </UButton>
  </div>
  <div class="py-3">
    <UButton type="button" @click="initApiPostErrCall">
      call Test API (pda login api call - POST) - error
    </UButton>
  </div>
  <div class="py-3">
    <UButton type="button" @click="initApiGetCall">
      call Test API (pda "입고조회" api call - GET)
    </UButton>
  </div>
  <div class="py-3">
    <UButton type="button" @click="clearLog">Clean Log</UButton>
  </div>
  <div class="py-1">API Ref :: https://ansunglogis.co.kr:20004/swagger</div>
  <div class="py-3">call Test API Result ::</div>
  <div class="max-w-[1500px] h-[300px] text-ellipsis overflow-scroll">
    {{ rtnData }}
  </div>

  <DialogDialogpopup @modal-result-value-test="returnModalRtn" />
</template>
<script lang="ts" setup>
import * as testApi from "~/api/testApi";
import BarcodeGenerator from "~/components/Barcode/BarcodeGenerator.vue";
import QrcodeVue from "qrcode.vue";
import prt from "print-js";

const rtnData = ref("[ 여기에서 api 호출 결과를 확인할 수 있습니다. ]");
const modalRtn = ref(-100);
const bcrData = ref("MAN527095305370033");
// const rows = ref([{ test1: "0/0", test2: "1/2" }]);
// const columns = ref([
//   {
//     key: "test1",
//     label: "원부자재",
//   },
//   {
//     key: "test2",
//     label: "SKU / EA",
//   },
// ]);

const clearLog = () => {
  rtnData.value = "";
};

const initPrt = () => {
  prt({
    printable: "printDiv",
    css: ["_nuxt/static/lblPrint.css", "_nuxt/assets/css/main.css"],
    type: "html",
    documentTitle: "　", //default: "Document"
    scanStyles: false,
  });
};

/* call Toast Popup */
const initToast = () => {
  const Toast = useToastPopup();
  Toast.actToast("test title", "test msg", "info", false, true);
};

const initDialog = (
  title: string,
  data?: any,
  btnType?: string,
  isTable?: boolean,
  width?: string,
  height?: string,
  closeBtn?: boolean
) => {
  const ModalDialog = useDialogPopup();
  ModalDialog.actDialog(title, data, btnType, isTable, width, height, closeBtn);
  // 기본적으로는 width, height, closeBtn을 재정의할 일이 없도록 처리할 예정,
  // 통상 호출 : ModalDialog.actDialog(title, data, btnType)
  console.log(
    "after close인지 확인, ModalDialog.rtnValue:: ",
    ModalDialog.rtnValue
  );
};

/* call API (GET) */
const initApiGetCall = async () => {
  const datainfo = {
    params: {
      DATE_FR: "2023-05-05",
      DATE_TO: "2023-08-08",
    },
  };
  const resp = await testApi.initGet(datainfo, "user/입고 조회");
  // const resp = await testApi.testApiCall(datainfo, "user/login", "POST");
  rtnData.value = resp.data;
};

/* call API (POST) */
const initApiPostCall = async () => {
  const datainfo = {
    useR_CD: "admin",
  };
  const resp = await testApi.initLogin(datainfo);
  // const resp = await testApi.initPost(datainfo, "user/login");
  // const resp = await testApi.testApiCall(datainfo, "user/login", "POST");
  rtnData.value = resp.data;
};

/* call API (POST / 500 Error) */
const initApiPostErrCall = async () => {
  const datainfo = {
    useR_CD: "admin1",
  };
  const resp = await testApi.initPost(datainfo, "user/login");
  // const resp = await testApi.testApiCall(datainfo, "user/login", "POST");
  rtnData.value = resp.data;
};

const testFunc = async () => {
  // await initApiGetCall();
  await initDialog("testTitle", rtnData.value, undefined, true);
};

function returnModalRtn(rtnVal: any) {
  console.log("returnValue:: ", rtnVal);
  modalRtn.value = rtnVal;
  return rtnVal;
}

onMounted(async () => {});
</script>
