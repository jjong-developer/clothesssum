<template>
    <div class="popup-wrap">
        <div class="popup-contents">
            <p>
                <img :src="require(`@/assets/img/popup/popupImg.jpg`)" />
            </p>
        </div>
        <div class="board-btn-wrap">
            <button class="defalut-w-btn" type="text">오늘 하루 열지 않기</button>
            <button class="defalut-w-btn" type="text" dataTest @click="popupClose();">닫기</button>
        </div>
    </div>
</template>

<script>
export default {
	name: "Popup",

	components: {

    },

    props: {
        dataTest: {
            isPopup: false,
        },
    },

	data() {
		return {

        }
	},

    mounted() {

    },

    methods: {

    },
};
</script>

<style lang="scss" scoped>

</style>
