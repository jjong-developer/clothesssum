<template>
    <div>
        <h2>1초 간편 로그인</h2>
        <div class="sns-login-wrap">
            <button type="button" @click="googleLogin();">
                <img :src="require('@/assets/img/sns/google_icon.png')" title="구글 이메일로 로그인" alt="구글 이메일로 로그인" />
            </button>
            <button type="button" @click="facebookLogin();">
                <img :src="require('@/assets/img/sns/facebook_icon.png')" title="페이스북 이메일로 로그인" alt="페이스북 이메일로 로그인" />
            </button>
        </div>
    </div>
</template>

<script>
import { signInWithPopup } from "firebase/auth";
import { dbAuth, facebookProvider, googleProvider } from "@/plugins/firebase";
import { siteReload } from "@/assets/js/common";

export default {
    name: "SnsLogin",

    components: {

    },

    data() {
        return {

        }
    },

    mounted() {

    },

    methods: {
        googleLogin() {
            signInWithPopup(dbAuth, googleProvider).then(() => {
                siteReload('/');
            }).catch((error) => {
                alert(error);
            });
        },

        facebookLogin() {
            signInWithPopup(dbAuth, facebookProvider).then(() => {
                siteReload('/');
            }).catch((error) => {
                alert(error);
            });
        }
    },
};
</script>

<style lang="scss" scoped>

</style>
