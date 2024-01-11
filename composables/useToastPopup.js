/* 
  createDate : 2024-01-05
  creator : kyn8330
*/
/* desc : 토스트팝업 활성화 기능
          - title         : 제목
          - msg           : 메시지 내용
          - type          : 타입 
                            default : none
                            type    : "success", "info", "warning", "error" 
                            --> 전역변수 처리예정
          - show          : 팝업 창 활성화여부
                            default : true
          - closeBtn      : 닫기버튼 활성화여부 
                            default : true
          - autoClose     : 팝업 창 자동초기화 활성화여부
                            default : true
          - autoCloseTime : 토스트팝업 자동초기화 시간 (단위 : microsecond)
                            default : 5000 
                            --> 필요시 store단에서 관리하도록 구조변경
*/

import { defineStore } from "pinia";

export const useToastPopup = defineStore("Toast", {
  state: () => {
    return {
      title: "",
      msg: "",
      type: "",
      show: false,
      closeBtn: true,
      autoClose: true,
      autoCloseTime: 5000,
    };
  },
  getters: {},
  actions: {
    async actToast(title, msg, type, closeBtn, autoClose, autoCloseTime) {
      try {
        // case cover : closeBtn === false && autoClose === false
        // ==> 화면 새로고침 전에 토스트 팝업 창을 닫을 직관적인 방법이 없음
        // ==> 예상 방어코드로, 대응 가능하거나 의도한 경우 주석처리
        if (closeBtn === false && autoClose === false) {
          closeBtn = true;
        }

        await this.setToast(title, msg, type, closeBtn);
        if (autoClose) {
          await new Promise((resolve) =>
            setTimeout(resolve, autoCloseTime || this.$state.autoCloseTime)
          );
          this.reset();
        }
      } catch (error) {
        console.error("error:: ", error);
      }
    },

    async setToast(title, msg, type, closeBtn) {
      this.title = title;
      this.msg = msg;
      this.type = type;
      this.closeBtn = closeBtn;
      this.show = true;
      return true;
    },

    reset() {
      this.$reset();
    },
  },
});
