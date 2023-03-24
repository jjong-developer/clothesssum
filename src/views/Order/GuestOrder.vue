<template>
    <div>
        <Header></Header>

        <div class="right-wrap">
            <div class="login-content-wrap">
                <div class="login-content">
                    <h2>비회원 주문 조회</h2>
                    <div>
                        <label>이름</label>
                        <input id="nameVal" type="text" name="" value="" autocomplete="off" placeholder="" />
                    </div>
                    <div>
                        <label>주문번호</label>
                        <input id="orderNumVal" type="text" name="" value="" autocomplete="off" placeholder="" />
                    </div>
                    <div>
                        <button class="wd-100 defalut-btn" type="button" @click="orderSubmit()">조회하기</button>
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
    name: "GuestOrder",
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
        orderSubmit() {
            let test = document.querySelector('#nameVal');
            let test2 = document.querySelector('#orderNumVal');

            if (test.value == '') {
                alert("주문자 이름을 입력해주세요 :)");
                test.focus();
                return false;
            } else if (test2.value == '') {
                alert("주문번호를 입력해주세요 :)");
                test2.focus();
                return false;
            } else {
                alert("존재하지 않는 주문입니다 :)");
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
