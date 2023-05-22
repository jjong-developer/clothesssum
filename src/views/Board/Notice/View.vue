<template>
    <div>
        <Header></Header>

        <div class="right-wrap">
            <div class="page-top-wrap">
                <h2 class="page-title">{{ this.title }}</h2>
                <div>
                    <p class="">작성자 : {{ this.author }}</p>
                    <p class="">등록일 : {{ this.date }}</p>
                </div>
            </div>
            <div class="board-wrap">
                <div class="board-list-wrap">
                    <div>
                        <p>{{ this.contents }}</p>
                    </div>

                    <div class="board-btn-wrap">
                        <div class="board-btn-right">
                            <button class="defalut-btn" type="button" @click="list();">목록</button>
                        </div>
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
import {superAdmin} from "@/assets/js/common.js";
import {isUser} from "@/main.js";
import {dbCollection, dbGetDocs, dbService} from "@/plugins/firebase";

export default {
    name: "View",

    components: {
        Header,
        Footer,
    },

    data() {
        return {
            isUser,
            superAdmin,
            uri: '',
            uriAry: '',
            andAry: '',
            noticeListTempleat: '',
            noticeListData: '', // notice 문서 데이터들
            noticeDocsSize: '', // notice 문서 게시글 갯수
            title: '', // 제목
            author: '', // 작성자
            date: '', // 등록일
            contents: '', // 내용
        }
    },

    mounted() {
        this.getNoticeList();
    },

    methods: {
        /**
         * 전체 게시글 불러오기
         */
        async getNoticeList() {
            this.noticeQuery = await dbGetDocs(dbCollection(dbService, 'notice'));
            this.noticeDocsSize = this.noticeQuery.docs.length;

            this.noticeQuery.forEach((docs) => {
                this.noticeListData = docs.data();
                this.noticeListData.docUID = docs.id;

                console.log(this.noticeListData);

                if (this.$route.query.docUID === this.noticeListData.docUID) {
                    this.title = this.noticeListData.title;
                    this.author = this.noticeListData.author;
                    this.date = this.noticeListData.date.slice(0, -1);
                    this.contents = this.noticeListData.contents;
                }
            });

            this.uri = window.location.search;
            this.uriAry = this.uri.split('?');
            this.andAry = this.uriAry[1].split('&');

            for (let k in this.andAry) {
                if (this.andAry[k].indexOf('docUID=') != -1) {
                    this.noticeListData.docUID = this.andAry[k].split('=')[1];
                }
            }
        },

        /**
         * 글쓰기 목록 페이지 이동
         */
        list() {
            this.$router.push({
                path: '/Board/Notice/List'
            })
        }
    },
};
</script>

<style lang="scss" scoped>

</style>
