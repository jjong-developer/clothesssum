<template>
    <div>
        <div class="right-wrap">
            <div class="sign-content-wrap">
                <div class="sign-content">
                    <div class="page-top-wrap">
                        <h2 class="page-title">비밀번호 재설정</h2>
                    </div>
                    <div>
                        <label>이메일</label>
                        <input id="userEmail" type="email" name="userEmail" value="" autocomplete="off" placeholder="" />
                    </div>
                    <div>
                        <button class="wd-100 defalut-btn" type="button" @click="passwordResetSubmit();">이메일 보내기</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from "@/components/Common/Header";
import Footer from "@/components/Common/Footer";
import { emailCheck } from "@/assets/js/common.js";
import { sendPasswordResetEmail } from "firebase/auth";
import { dbAuth } from "@/plugins/firebase.js";

export default {
    name: "PasswordReset",

    components: {
        Header,
        Footer,
    },

    data() {
        return {

        }
    },

    mounted() {

    },

    methods: {
        passwordResetSubmit() {
            let userEmail = document.querySelector('#userEmail');

            if (!userEmail.value) {
                alert('이메일을(를) 입력해주세요.');
                userEmail.focus();
                return;
            } else if (!emailCheck(userEmail.value)) {
                alert('이메일 형식이 올바르지 않습니다.');
                userEmail.focus();
                return;
            } else {
                sendPasswordResetEmail(dbAuth, userEmail.value).then(() => { // 비밀번호 재설정
                    alert('해당 이메일로 링크를 전송하였습니다\n메일함을 확인해주세요.');
                }).catch(error => {
                    alert('잠시 후 다시 시도해주세요.');
                });
            }
        }
    },

    watch: {

    },
};
</script>

<style lang="scss" scoped>

</style>
