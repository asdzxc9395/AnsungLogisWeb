/* 
  createDate : 2024-01-08
  creator : kyn8330
  --> URL단위 관리 / method단위 관리 중 택1, 선택한 방향으로 개발
*/

import { useAxios } from "~/composables/useAxios";

// case 1. URL 단위 function 관리
export function initLogin(data) {
  return callPost(data, "user/login");
}

// case 2. method 단위 function 관리

// GET
export function initGet(data, url) {
  // data convert part
  return callGet(data, url);
}

// POST
export function initPost(data, url) {
  // data convert part
  return callPost(data, url);
}

// PUT
export function initPut(data, url) {
  // data convert part
  return callPut(data, url);
}

// DELETE
export function initDel(data, url) {
  // data convert part
  return callDel(data, url);
}

// union case (test code)
export function testApiCall(data, url, method) {
  return useAxios(data, url, method);
}
