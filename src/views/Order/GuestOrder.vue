<template>
    <div>
        <Header></Header>

        <div class="right-wrap">
            <div class="sign-content-wrap">
                <div class="sign-content">
                    <h2>비회원 주문 조회</h2>
                    <div>
                        <label>이메일</label>
                        <input id="userEmail" type="email" name="userEmail" value="" autocomplete="off" placeholder="" />
                    </div>
                    <div>
                        <label>주문번호</label>
                        <input id="orderNumber" type="text" name="orderNumber" value="" autocomplete="off" placeholder="" />
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

        }
    },
    watch: {

    },
};
</script>

<style lang="scss" scoped>

</style>
