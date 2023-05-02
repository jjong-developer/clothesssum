<template>
    <div>
        <Header></Header>

        <div class="right-wrap">
            <div class="sign-content-wrap">
                <div class="sign-content">
                    <h2>로그인</h2>
                    <div>
                        <label>이메일</label>
                        <input id="userEmail" type="text" name="userEmail" value="" autocomplete="off" placeholder="" />
                    </div>
                    <div>
                        <label>비밀번호</label>
                        <input id="userPassWord" type="password" name="userPassWord" value="" autocomplete="new-password" placeholder="" />
                    </div>
                    <div class="login-help">
                        <router-link to="/Member/PasswordReset">비밀번호 재설정</router-link>
                        <router-link to="/Order/GuestOrder">비회원 주문 조회</router-link>
                        <router-link to="/Member/Join">회원 가입</router-link>
                    </div>
                    <div>
                        <button class="wd-100 defalut-btn" type="button" @click="loginSubmit();">로그인</button>
                    </div>
                    <SnsLogin></SnsLogin>
                </div>
            </div>
        </div>

        <Footer></Footer>
    </div>
</template>

<script>
import Header from "@/components/Common/Header";
import Footer from "@/components/Common/Footer";
import SnsLogin from "@/components/SingInUp/SnsLogin";
import { emailCheck, siteReload } from "@/assets/js/common.js";
import { signInWithEmailAndPassword, sendEmailVerification, onAuthStateChanged } from "firebase/auth";
import { dbAuth } from "@/plugins/firebase.js";

export default {
    name: "Login",

    components: {
        Header,
        Footer,
        SnsLogin,
    },

    props: {

    },

    data() {
        return {

        }
    },

    created () {

    },

    mounted() {
        onAuthStateChanged(dbAuth, (user) => { // 로그인 상태 여/부
           console.log(user);
        });
    },

    methods: {
        loginSubmit() {
            let userEmail = document.querySelector('#userEmail');
            let userPassWord = document.querySelector('#userPassWord');

            if (!userEmail.value) {
                alert('이메일을(를) 입력해주세요.');
                userEmail.focus();
                return;
            } else if (!emailCheck(userEmail.value)) {
                alert('이메일 형식이 올바르지 않습니다.');
                userEmail.focus();
                return;
            } else if (!userPassWord.value) {
                alert('비밀번호을(를) 입력해주세요.');
                userPassWord.focus();
                return;
            }

            signInWithEmailAndPassword(dbAuth, userEmail.value, userPassWord.value).then(result => {
                console.log(result.user.emailVerified);

                if (result.user.emailVerified) { // 이메일 인증한 유저만 로그인 가능 (boolean 값)
                    siteReload('/');
                } else {
                    if (confirm('이메일 인증이 확인되지 않았습니다.\n인증 메일의 링크를 다시 전송하시겠습니까?') === true) {
                        sendEmailVerification(dbAuth.currentUser).then(() => {});
                        dbAuth.signOut();

                        alert(result.user.email + '이메일로 전송된 인증 메일의 링크를 클릭하여 인증을 완료해주세요\n인증 후 로그인이 가능합니다.');
                        siteReload('/');
                    }
                }
            }).catch(error => {
                console.log(error);
                alert('회원 정보가 일치하지 않습니다.\n회원이 아니시라면 회원 가입 후 이용해주세요.');
            });
        },
    },

    watch: {

    },
};
</script>

<style lang="scss" scoped>

</style>
