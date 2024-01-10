<!-- 
  example page
  updateDate : 2024-01-09
  Toastpopup(2024-01-05), testAPI(2024-01-09)
-->
<template>
  <div>About Page</div>
  <div class="py-3">
    <UButton class="btn" type="button" @click="initToast">
      call Toastpopup
    </UButton>
  </div>
  <div class="py-3">
    <UButton class="btn" type="button" @click="initApiPostCall">
      call Test API (pda login api call - POST)
    </UButton>
  </div>
  <div class="py-3">
    <UButton class="btn" type="button" @click="initApiPostErrCall">
      call Test API (pda login api call - POST) - error
    </UButton>
  </div>
  <div class="py-3">
    <UButton class="btn" type="button" @click="initApiGetCall">
      call Test API (pda "입고조회" api call - GET)
    </UButton>
  </div>
  <div class="py-3">
    <UButton class="btn" type="button" @click="clearLog">Clean Log</UButton>
  </div>
  <div class="py-1">API Ref :: https://ansunglogis.co.kr:20004/swagger</div>
  <div class="py-3">call Test API Result ::</div>
  <div class="max-w-[1500px] h-[500px] text-ellipsis overflow-scroll">
    {{ rtnData }}
  </div>
</template>
<script lang="ts" setup>
import * as testApi from "~/api/testApi";

let rtnData = ref("[ 여기에서 api 호출 결과를 확인할 수 있습니다. ]");

const clearLog = () => {
  rtnData.value = "";
};

/* call Toast Popup */
const initToast = () => {
  const Toast = useToastPopup();
  Toast.actToast("test title", "test msg", "info", false, true);
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

onMounted(async () => {});
</script>
