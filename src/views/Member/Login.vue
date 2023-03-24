<template>
    <div>
        <Header></Header>

        <div class="right-wrap">
            <div class="login-content-wrap">
                <div class="login-content">
                    <h2>로그인</h2>
                    <div>
                        <label>아이디</label>
                        <input id="idVal" type="text" name="" value="" autocomplete="off" placeholder="" />
                    </div>
                    <div>
                        <label>비밀번호</label>
                        <input id="pwVal" type="password" name="" value="" autocomplete="new-password" placeholder="" />
                    </div>
                    <div class="login-help">
                        <router-link to="/Member/FindPassword">비밀번호 찾기</router-link>
                        <router-link to="/Order/GuestOrder">비회원 주문 조회</router-link>
                        <router-link to="/Member/Join">회원 가입하기</router-link>
                    </div>
                    <div>
                        <button class="wd-100 defalut-btn" type="button" @click="loginSubmit()">로그인</button>
                    </div>
                    <div>
                        <h2>SNS 로그인</h2>
                    </div>
                </div>
            </div>
        </div>

        <Footer></Footer>
    </div>
</template>

<script>
import Header from "@/components/Common/Header";
import Footer from "@/components/Common/Footer";
// import {segment} from "@/assets/js/common.js";

export default {
    name: "Login",
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
        loginSubmit() {
            let test = document.querySelector('#idVal');
            let test2 = document.querySelector('#pwVal');

            if (test.value == '') {
                alert("아이디를 정확히 입력해주세요 :)");
                test.focus();
                return false;
            } else if (test2.value == '') {
                alert("비밀번호를 정확히 입력해주세요 :)");
                test2.focus();
                return false;
            } else {
                alert("아이디랑 비밀번호가 일치하지 않습니다 :)");
                return false;
            }
        }
    },
    watch: {

    },
};
</script>

<style lang="scss" scoped>

</style>
