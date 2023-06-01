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
                        <div class="board-btn-right" v-if="isUser !== null && superAdmin.includes(isUser.email)">
                            <button class="defalut-r-btn" type="button" @click="listDelete();">삭제</button>
                            <button class="defalut-btn" type="button" @click="listModify();">수정</button>
                            <button class="defalut-btn" type="button" @click="list();">목록</button>
                        </div>
                        <div class="board-btn-right" v-else>
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
import {siteReload, superAdmin} from "@/assets/js/common.js";
import {isUser} from "@/main.js";
import {dbCollection, dbGetDocs, dbService, DOC, dbDeleteDoc} from "@/plugins/firebase";

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
            urlParamName: '',
            noticeListTempleat: '',
            noticeListData: '', // notice 문서 데이터들
            noticeDocsSize: '', // notice 문서 게시글 갯수
            title: '', // 제목
            author: '', // 작성자
            contents: '', // 내용
            date: '', // 등록일
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
                    this.contents = this.noticeListData.contents;
                    this.date = this.noticeListData.date.slice(0, -1);
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
         * 게시글 목록 페이지 이동
         */
        list() {
            this.$router.push({
                path: '/Board/Notice/List'
            })
        },

        /**
         * 해당 게시글 수정
         */
        listModify() {
            this.urlParamName = new URL(location.href).searchParams.get('docUID');

            this.$router.push({
                path: '/Board/Notice/WriteUpdate',
                name: 'Query',
                query: {
                    docUID: this.urlParamName,
                    title: encodeURI(this.title),
                    author: this.author,
                    contents: encodeURI(this.contents),
                },
                props: true,
            }).catch(()=>{})
            this.$router.go();
        },

        /**
         * 해당 게시글 삭제
         */
        async listDelete() {
            if (confirm('삭제 후 복구가 불가능합니다.\n해당 게시글을 정말 삭제 하시겠습니까?') === true) {
                if (this.$route.query.docUID === this.noticeListData.docUID) {
                    await dbDeleteDoc(DOC(dbService, 'notice', this.noticeListData.docUID));
                    alert('해당 게시글이 삭제 되었습니다.');
                    siteReload('/Board/Notice/List');
                }
            }
        },
    },
};
</script>

<style lang="scss" scoped>

</style>
