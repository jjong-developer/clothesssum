// 제일 먼저 실행되는 파일
import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import '@/plugins/firebase'

Vue.config.productionTip = false
Vue.filter('commaChk', val => { /* 숫자 정규식 체크하여 콤마 표시 */
  return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
