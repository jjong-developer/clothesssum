<template>
    <div>
        <Header></Header>

        <div class="right-wrap">
            <h2 class="page-title">{{ this.noticeListData.title }}</h2>
            <div class="board-wrap">
                <div class="board-list-wrap">
                    <div>test</div>

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
            noticeListTempleat: '',
            noticeListData: '', // notice 문서 데이터들
            noticeDocsSize: '', // notice 문서 게시글 갯수
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
            console.log(this.noticeQuery);

            this.noticeDocsSize = this.noticeQuery.docs.length;

            this.noticeQuery.forEach((docs) => {
                this.noticeListData = docs.data();
                this.noticeListData.docUID = docs.id;

                console.log(this.noticeListData);

                if (this.noticeListData.docUID) {

                }

                // this.noticeListTempleat = '' +
                //     '<tr>' +
                //         '<td class="board-notice-title">'+ this.noticeListData.title +'</td>' +
                //         '<td class="board-notice-author">'+ this.noticeListData.author +'</td>' +
                //         '<td class="board-notice-date">'+ this.noticeListData.date.slice(0, -1) +'</td>' +
                //     '</tr>';
                //
                // if (this.noticeDocsSize !== 0) {
                //     document.querySelector('#noticeList').innerHTML += this.noticeListTempleat;
                // }
            });
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
