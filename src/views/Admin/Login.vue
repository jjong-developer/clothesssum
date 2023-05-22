<template>
    <div>
        <div class="sign-content-wrap">
            <div class="sign-content">
                <div class="page-top-wrap">
                    <h2 class="page-title">관리자 로그인</h2>
                </div>
                <div>
                    <label>이메일</label>
                    <input id="userEmail" type="text" name="userEmail" value="" autocomplete="off" placeholder="" />
                </div>
                <div>
                    <label>비밀번호</label>
                    <input id="userPassWord" type="password" name="userPassWord" value="" autocomplete="new-password" placeholder="" />
                </div>
                <div>
                    <button class="wd-100 defalut-btn" type="button" @click="loginSubmit();">로그인</button>
                </div>
                <SnsLogin></SnsLogin>
            </div>
        </div>
    </div>
</template>

<script>
import SnsLogin from "@/components/SingInUp/SnsLogin";
import {emailCheck, superAdmin} from "@/assets/js/common.js";
import {onAuthStateChanged, signInWithEmailAndPassword} from "firebase/auth";
import {dbAuth} from "@/plugins/firebase.js";

export default {
    name: "Login",

    components: {
        SnsLogin,
    },

    data() {
        return {

        }
    },

    mounted() {
        onAuthStateChanged(dbAuth, (user) => { // 로그인 상태 여/부
            if (user && superAdmin.includes(user.email)) {
                this.$router.push('/Admin/Adminmaster');
            }
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
                onAuthStateChanged(dbAuth, (user) => { // 로그인 상태 여/부
                    if (user && result.user.emailVerified && superAdmin.includes(user.email)) {
                        this.$router.push('/Admin/Adminmaster');
                    } else {
                        alert('관리자 권한이 없습니다.\n시스템 관리자에게 문의바랍니다.');
                    }
                });
            }).catch(error => {
                console.log(error);
                alert('아이디 또는 비밀번호가 일치하지 않습니다.\n회원이 아니시라면 회원 가입 후 이용해주세요.');
            });
        },
    },
};
</script>

<style lang="scss" scoped>

</style>
