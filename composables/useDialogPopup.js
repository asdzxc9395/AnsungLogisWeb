/* 
  createDate : 2024-01-10
  creator : kyn8330
*/
/* desc : 모달 활성화 기능 (타입 별 분리구현 검토 필요)
    - TODO(main):: Modal 내부 테이블 or components import 방안 검토
    - TODO(sub):: TOP / LEFT 좌표 자동계산 검토,
          - title         : 제목 (모달 상단)
          - data          : 본문 데이터 (모달 중앙)
          - btnType       : 버튼 타입 
                            default : "OK"
                            type    : "OK", "YN", "NONE" 
                            --> 전역변수 처리예정
                            --> 현 단계에서는 버튼 개수 기준으로 구분 가능하지만,
                                확장성 고려 [ OK, YES/NO, NONE ] 기준 초안 작성
          - show          : 모달 활성화여부
                            default : true
          - closeBtn      : 닫기버튼 활성화여부 
                            default : true
          - customWidth   : 모달 가로길이 추가 조정 (tailwind css 기반)
                            default : "w-1/2"
          - customHeight  : 모달 세로길이 추가 조정 (tailwind css 기반)
                            default : "h-1/3"
*/

import { defineStore } from "pinia";

export const useDialogPopup = defineStore("actDialog", {
  state: () => {
    return {
      title: "",
      data: "",
      btnType: "OK",
      show: false,
      closeBtn: true,
      customWidth: "w-1/2",
      customHeight: "h-1/3",
    };
  },
  getters: {},
  actions: {
    async actDialog(title, data, btnType, width, height, closeBtn) {
      try {
        // case cover : btnType === "NONE" && closeBtn === false
        // ==> 화면 새로고침 전에 모달 창을 닫을 직관적인 방법이 없음
        // ==> 예상 방어코드로, 대응 가능하거나 의도한 경우 주석처리
        if (btnType === "NONE" && closeBtn === false) {
          closeBtn = true;
        }

        await this.setDialog(title, data, btnType, width, height, closeBtn);
      } catch (error) {
        console.error("error:: ", error);
      }
    },

    async setDialog(title, data, btnType, width, height, closeBtn) {
      this.title = title;
      this.data = data;
      this.btnType = btnType || this.$state.btnType;
      this.customWidth = width || this.$state.customWidth;
      this.customHeight = height || this.$state.customHeight;
      this.closeBtn = closeBtn || this.$state.closeBtn;
      this.show = true;
      return true;
    },

    reset() {
      this.$reset();
    },

    // 테스트용 메서드
    setBtnType(type) {
      this.btnType = type;
      return true;
    },
  },
});
