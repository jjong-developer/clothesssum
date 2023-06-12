<template>
    <div class="popup-wrap">
        <div class="popup-contents">
            <p>
                <img :src="require(`@/assets/img/popup/popupImg.jpg`)" />
            </p>
        </div>
        <div class="board-btn-wrap">
            <button class="defalut-w-btn" type="text" @click="popupData('todayClose');">오늘 하루 열지 않기</button>
            <button class="defalut-w-btn" type="text" @click="popupData('close');">닫기</button>
        </div>
    </div>
</template>

<script>
export default {
	name: "Popup",

	components: {

    },

    props: {

    },

	data() {
		return {

        }
	},

    mounted() {

    },

    methods: {
        /**
         * 팝업창 닫기
         * 부모한테 데이터 전달
         */
        popupData(state) {
            if (state === 'close') { // 닫기
                this.$emit('close-popup');
            } else if (state === 'todayClose') { // 오늘 하루 열지 않기
                this.$emit('today-close-popup');
            }
        },
    },
};
</script>

<style lang="scss" scoped>

</style>
