<template>
    <div>
        <Header></Header>

        <div class="right-wrap">
            <div>test</div>
        </div>

        <Footer></Footer>
    </div>
</template>

<script>
import Header from "@/components/Common/Header";
import Footer from "@/components/Common/Footer";
// import {segment} from "@/assets/js/common.js";

export default {
    name: "MyInfo",
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
        test() {
        }
    },
    watch: {

    },
};
</script>

<style lang="scss" scoped>

</style>
