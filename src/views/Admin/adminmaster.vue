<template>
    <div>
        <div>test</div>
    </div>
</template>

<script>
import { onAuthStateChanged } from "firebase/auth";
import { dbAuth } from "@/plugins/firebase";
import { superAdmin } from "@/assets/js/common";

export default {
    name: "Adminmaster",

    components: {

    },

    data() {
        return {

        }
    },

    mounted() {
        onAuthStateChanged(dbAuth, (user) => { // 로그인 상태 여/부
            if (user && superAdmin.includes(user.email)) {

            } else { // 관리자 계정이 아니면 로그인 화면으로 이동
                this.$router.push('/Admin/Login');
            }
        });
    },

    methods: {

    },
};
</script>

<style lang="scss" scoped>

</style>
