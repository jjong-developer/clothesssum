<template>
    <div>
        <Header></Header>

        <div class="right-wrap">
            <div class="login-content-wrap">
                <div class="login-content">
                    <h2>비밀번호 찾기</h2>
                    <div>
                        <label>이름</label>
                        <input id="nameVal" type="text" name="" value="" autocomplete="off" placeholder="" />
                    </div>
                    <div>
                        <label>이메일</label>
                        <input id="emailVal" type="email" name="" value="" autocomplete="off" placeholder="" />
                    </div>
                    <div>
                        <button class="wd-100 defalut-btn" type="button" @click="findPasswordSubmit()">이메일 보내기</button>
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
    name: "FindPassword",
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
        findPasswordSubmit() {
            let test = document.querySelector('#nameVal');
            let test2 = document.querySelector('#emailVal');

            if (test.value == '') {
                alert("이름을 입력해주세요 :)");
                test.focus();
                return false;
            } else if (test2.value == '') {
                alert("이메일을 입력해주세요 :)");
                test2.focus();
                return false;
            } else {
                alert("입력하신 정보와 일치하는 회원이 없습니다 :)");
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
