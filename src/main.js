// 제일 먼저 실행되는 파일
import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import { dbAuth } from '@/plugins/firebase.js';
import { onAuthStateChanged } from "firebase/auth";

export let isUser;

Vue.config.productionTip = false
Vue.filter('commaChk', val => { /* 숫자 정규식 체크하여 콤마 표시 */
    return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
})

onAuthStateChanged(dbAuth, (user) => { // 로그인 상태 여/부
    isUser = user;

    new Vue({
        router,
        render: h => h(App)
    }).$mount('#app')
});
