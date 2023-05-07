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
                </dl>
                <dl>
                    <dt>INFO</dt>
                    <dd>회사명: ㈜옷과 썸 탈래?</dd>
                    <dd>대표: 김종욱</dd>
                    <dd>주소: 서울특별시</dd>
                    <dd>사업자등록번호: 000-00-00000</dd>
                    <dd>통신판매업신고: 제 2023-서울-0000호</dd>
                    <dd>이메일: <a href="mailto:jongwook2.kim@gmail.com">jongwook2.kim@gmail.com</a></dd>
                </dl>
                <dl>
                    <dd>DEVELOPER</dd>
                    <dd>Front-End: KIM JONG WOOK</dd>
                    <dd>Back-End: KIM JONG WOOK</dd>
                    <dd>Design: KIM JONG WOOK</dd>
                </dl>
                <div class="footer-portfolio">
                    <div>본 사이트는 상업적 목적이 아닌 개인 포트폴리오용으로 제작되었습니다.</div>
                    <div>본 사이트는 관리자 기능이 포함되어 있습니다.</div>
                    <div>©Copyright 2023. clothessome. All right reserved</div>
                </div>
            </div>
        </footer>
        <button class="page-top-btn" type="button" @click="pageTop();">
            <img :src="require('@/assets/img/common/top.png')" alt="맨 위로 이동" />
        </button>
        <button class="page-bottom-btn" type="button" @click="pageBottom();">
            <img :src="require('@/assets/img/common/bottom.png')" alt="맨 아래 이동" />
        </button>
<!--        <div ref="pageTopBtn"></div>-->
    </div>
</template>

<script>
import { channelTalk } from "@/assets/js/common.js";

export default {
	name: "Footer",

	components: {

    },

    data() {
        return {

        }
    },

    mounted() {
        channelTalk();

        document.addEventListener('scroll', () => {
            if (document.documentElement.scrollTop > 0 || document.body.scrollTop > 0) {
                document.querySelector('.page-top-btn').classList.remove('opacity0');
                document.querySelector('.page-bottom-btn').classList.remove('opacity0');
            } else {
                document.querySelector('.page-top-btn').classList.add('opacity0');
                document.querySelector('.page-bottom-btn').classList.add('opacity0');
            }

            // pageYOffset는 IE 및 모든 브라우저에서 지원하지만 scrollY는 IE에서는 지원을 안함
            if ((window.innerHeight + Math.ceil(window.pageYOffset)) >= document.body.offsetHeight) {
                document.querySelector('.page-top-btn').classList.add('opacity0');
                document.querySelector('.page-bottom-btn').classList.add('opacity0');
            }
        });
    },

	methods: {
        /* 특정 영역으로 이동할때 refs 사용 */
        // this.$refs['pageTopBtn'].scrollIntoView({behavior: "smooth"})

        pageTop() {
            if (window.pageYOffset > 0) {
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
	}
};
</script>

<style lang="scss" scoped>

</style>
