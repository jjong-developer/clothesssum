<template>
    <div id="app">
        <router-view :key="$route.fullPath" /> <!-- router/index.js 에서 설정 -->
    </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
    name: 'App',

    computed: {
        ...mapGetters({
            Config: 'getConfig',
            Session: 'getSession',
            sessionStorage: 'getSessionStorage'
        })
    },

    data() {
        return {

        }
    },
}
</script>

<!-- scoped는 현재 파일에서만 실행, 전역으로 사용할때는 제거 -->
<style lang="scss">
@import "@/assets/scss/common.scss";
@import "@/assets/scss/style.scss";
@import "@/assets/scss/responsive.scss";
</style>
