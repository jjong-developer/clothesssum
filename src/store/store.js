import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/**
 * Vue의 상태관리를 담당함
 * 컴포넌트 간의 통신이나 데이터 전달을 좀 더 유기적으로 관리
 * 컴포넌트 간 데이터 전달 및 이벤트 통신 등의 여러 컴포넌트의 공통 데이터 상태를 관리함
 */
export default new Vuex.Store({
  /**
   * global로 사용하는 state
   * component 간 공유될 전역 data를 관리
   * 예)
   * this.$store.state.CONSTANTS;
   */
  state: {
    config: {
      isDummy: false,
    },
    sessionStorage: {
      EUSER_INFO: {
        "ANDROID_USER_GBN": "10001",
        "MOCK_SEMESTER_GBN": "",
        "ANI_MENU_YN": "Y",
        "STUDENT_NO": "911820",
        "PAY_SIGN": "N",
        "USER_GBN": "10001",
        "CHANGE_DIV": "C9",
        "USER_ID": "1955240",
        "SEMESTER_GBN": "1",
        "EMAIL": "",
        "TODAY_FEELING": "bangul_1",
        "DEVICE_SERIAL_NO": "",
        "MOCK_VIEW_YN": "N",
        "LEARNING_TIME": "오전 --:--",
        "MESSAGE": "테스*님, 환영합니다.",
        "STATUS": "ON_SERVICE",
        "NAME_KOR": "테스*",
        "SPLIT_PAID_NO": "",
        "LOGIN_PWD": "",
        "GRADE_GBN": "9",
        "GENDER": "F",
        "CUR_ORDER_ID": "",
        "PUSH_SERVER_PORT": "5002",
        "LOGIN_ID": "ecotest4",
        "INIT_POPUP": "",
        "END_DE": "2021-07-07",
        "ANI_STUDY_YN": "YY",
        "token": "V016ceyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJlY290ZXN0NCIsInVzZXJJZCI6MTk1NTI0MCwibG9naW5BcyI6ZmFsc2UsImlhdCI6MTYxMTY0OTM5NSwiZXhwIjoxNjEyMjU0MTk1fQ.RiiS_fh64oRphBnGNbu--Uzvfc7ghB2SVWop_Gz2Fru1nlOyJiv4-Qi-gTZoMzLNxa0d2dsjw10OwKEKpThnow",
        "FIRST_SCREEN": "I",
        "TEACHER_ID": "1523399",
        "PUSH_SERVER_IP": "dev-nsem.home-learn.com",
        "TEACHER_NM_KOR": "연구*",
        "IS_ADMIN": "1",
        "CONNECT_DATE": "2021-01-26",
        "TEACHER_LOGIN_ID": "tc_test03",
        "EXPERIENCE": "N",
        "parent_cert": "Y",
        "extlink_yn": "Y",
        "user_type": "00",
        "frontSa": "AAxu5YJLmbsThQH8/SgZxwtYXSBlGrhOJufc5NaiUD8K+O/+4xc+xX/pWirXGvtZ65e1vKptzkmRRPsAzQQQtvDEcxyydUGDlmTFqpZG4rzljlVN+NX9UteJk3/gLRQ3Ec7fGvjlYXi5G06cCcZVOZ59q1xJ4CkY5CqJ4MQc/2ieSLk6Fv9LeuVKumOaud+HDiSba3HGObaXqLG4r95VxdrBG+Ycp1Qc+OiGFrL3PwmzwAvM4cps5yMl4Wv/UDv+dH71b6NnA2jrQ23bsYQoxfoTEdAIIENDiuYCi4F1Ou0/FZ+cpioGbasRvWdEA3vHvqbMPsgmWl0b8Masy1SaRdiPKI5LO/874wXDUlw8DFg=",
        "isSchoolingUser": true
      },
      EU_HEADER: {
        "Content-Type": "application/x-www-form-urlencoded",
        "lang": "ko",
        "token": "V016ceyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJlY290ZXN0NCIsInVzZXJJZCI6MTk1NTI0MCwibG9naW5BcyI6ZmFsc2UsImlhdCI6MTYxMTY0OTM5NSwiZXhwIjoxNjEyMjU0MTk1fQ.RiiS_fh64oRphBnGNbu--Uzvfc7ghB2SVWop_Gz2Fru1nlOyJiv4-Qi-gTZoMzLNxa0d2dsjw10OwKEKpThnow",
        "front-sa": "AAxu5YJLmbsThQH8/SgZxwtYXSBlGrhOJufc5NaiUD8K+O/+4xc+xX/pWirXGvtZ65e1vKptzkmRRPsAzQQQtvDEcxyydUGDlmTFqpZG4rzljlVN+NX9UteJk3/gLRQ3Ec7fGvjlYXi5G06cCcZVOZ59q1xJ4CkY5CqJ4MQc/2ieSLk6Fv9LeuVKumOaud+HDiSba3HGObaXqLG4r95VxdrBG+Ycp1Qc+OiGFrL3PwmzwAvM4cps5yMl4Wv/UDv+dH71b6NnA2jrQ23bsYQoxfoTEdAIIENDiuYCi4F1Ou0/FZ+cpioGbasRvWdEA3vHvqbMPsgmWl0b8Masy1SaRdiPKI5LO/874wXDUlw8DFg=",
        "model": "ECO-HYBRID",
        "clientType": "H",
        "os": "Windows"
      },
    },
    /**
     * 섹션 정보
     * 토큰 등 관리
     */
    session: {
      Authorization: 'AAxu5YJLmbsThQH8/SgZx4ODqWlPU41ZJOJSvwx/p1ymNRw48aaA46XHZHsKqfbJKWxtkdJuicoUsEa3ax7lUC81ioq5pEYmRa6PYpOhZuxmQ6g2NrgOAVaQrlusIQkNiYjeJRR7SWZZNaV6t2WbElYev9+I/V48Ux9BpRa+6JH4iEhbLdZvaJ2R2Z6WRgZffgHmhBsLG/DmJwYulo/gLQgfpg2wXFXcdK71C21oFTDK5ExnYbQGF+c0cAsGSreYU1w2zau4S35EvR03xOyj/XSdCzfGACmNEGgzbghWos+g/IMW5Sui3eM4dspBiEyM+EpCwIo1s8oJ7CnKEa2J+YA7scQFYZO62NHvpfj4umCG9R6mX+pH82HqU4gbEMDC',
      getApiUrl: 'https://dev-api.schooling.co.kr'
    },


    /**
     * SelectStudyStart
     */
    selectStudyStartInfo: {}
  },
  /**
   * global로 사용하는 getters
   * 각 컴포넌트에서 Vuex의 데이터를 접근할 때 중복된 코드를 반복호출 하게 될 때 여기서 정의 해 중복을 없앤다.
   * 데이터 호출에 관련된 중복 공통 로직이 정의 됨
   * 예)
   * this.$store.getters.CONSTANTS
   */
  getters: {
    getConfig: state => {
      return state.config
    },
    getSession: state => {
      return state.session
    },
    getSessionStorage: state => {
      return state.sessionStorage
    },
    getSelectStudyStartInfo: state => {
      return state.selectStudyStartInfo
    }
  }
})
