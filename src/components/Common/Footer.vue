<template>
    <div>
        <footer class="footer-wrap">
            <div class="footer">
                <dl>
                    <dt>ABOUT US</dt>
                    <dd>
                        <router-link to="/policy/1">이용약관</router-link>
                    </dd>
                    <dd>
                        <router-link to="/policy/2">개인정보처리방침</router-link>
                    </dd>
                </dl>
                <dl>
                    <dt>CUSTOMER CENTER</dt>
                    <dd>010-6595-2468</dd>
                    <dd>10:00 ~ 19:00 (Lunch time 12:00 ~ 13:00)</dd>
                </dl>
                <dl>
                    <dt>BANK ACCOUNT</dt>
                    <dd>신한 000-000-000000</dd>
                    <dd>농협 000000-00-000000</dd>
                </dl>
                <dl>
                    <dt>INFO</dt>
<!--                    <dd>회사명: ㈜옷과 썸 탈래?</dd>-->
                    <dd>대표: 김종욱</dd>
                    <dd>주소: 서울특별시</dd>
                    <dd>사업자등록번호: 000-00-00000</dd>
                    <dd>통신판매업신고: 제 2022-서울-0000호</dd>
                    <dd>이메일: <a href="mailto:jong-wook@naver.com">jong-wook@naver.com</a></dd>
                </dl>
                <dl>
                    <dd>DEVELOPER</dd>
                    <dd>Front-End: KIM JONG WOOK</dd>
<!--                    <dd>Back-End: KIM JONG WOOK</dd>-->
                    <dd>Design: KIM JONG WOOK</dd>
                </dl>
                <div class="footer-portfolio">
                    <div>본 홈페이지는 상업적 목적이 아닌 개인 포트폴리오용으로 제작되었습니다.</div>
                    <div>©Copyright 2022. clothessome. All right reserved</div>
                </div>
            </div>
        </footer>

        <button id="kakaoPlusBtnWrap" type="button" @click="kakaoPlusBtnWrap()" v-if="isMoveBtn">
            <img :src="require('@/assets/img/common/kakao_chaner.png')" alt="플러스친구 1:1 채팅 버튼" />
        </button>
        <div class="page-top-btn" @click="pageTop" v-if="isMoveBtn">
            <img :src="require('@/assets/img/common/top_btn.png')" alt="맨끝 이동" />
        </div>
        <div class="page-bottom-btn" @click="pageBottom" v-if="isMoveBtn">
            <img :src="require('@/assets/img/common/bottom_btn.png')" alt="맨아래 이동" />
        </div>
<!--        <div ref="pageTopBtn"></div>-->
    </div>
</template>

<script>
export default {
	name: "Footer",
	components: {

    },
    data() {
        return {
            isMoveBtn: false,
        }
    },
    mounted() {
        window.addEventListener('scroll', () => {
            document.querySelector('html').scrollTop > 0 ? this.isMoveBtn = true : this.isMoveBtn = false
        });
    },
	methods: {
        /* 특정 영역으로 이동할때 refs 사용 */
        // this.$refs['pageTopBtn'].scrollIntoView({behavior: "smooth"})

        pageTop() {
            if(window.pageYOffset > 0) {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        },

        pageBottom() {
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth'
            });
        },

        kakaoPlusBtnWrap() {
            alert("서비스 준비중입니다.");
            return false;
        }
	}
};
</script>

<style lang="scss" scoped>

</style>
