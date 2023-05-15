<template>
    <div>
        <Header></Header>

        <div class="right-wrap">
            <h2 class="page-title">공지사항</h2>
            <div class="board-wrap">
                <div class="board-list-wrap">
                    <table class="board-table">
                        <thead>
                            <tr>
                                <th class="board-title">제목</th>
                                <th class="board-author">작성자</th>
                                <th class="board-date">등록일</th>
                            </tr>
                        </thead>
                        <tbody id="noticeList">
<!--                            <tr v-for="(tttttff, i) in this.noticeListData" :key="i"> -->
<!--                                <td class="board-notice-title">{{ tttttff.title }}</td>-->
<!--                                <td class="board-notice-author">{{ tttttff.author }}</td>-->
<!--                                <td class="board-notice-date">{{ tttttff.date }}</td>-->
<!--                            </tr>-->
                                <tr v-if="this.noticeDocsSize !== 0">
                                    <td class="board-notice-title">{{ this.noticeListData.title }}</td>
                                    <td class="board-notice-author">{{ this.noticeListData.author }}</td>
                                    <td class="board-notice-date">{{ this.noticeListData.date }}</td>
                                </tr>
                                <tr v-else>
                                    <td colspan="3">게시글이 없습니다.</td>
                                </tr>
                        </tbody>
                    </table>

                    <div class="board-btn-wrap">
                        <input type="text" placeholder="" />
                        <button class="defalut-btn" type="button">검색</button>
                        <div class="board-btn-right" v-if="superAdmin.includes(isUser.email)">
                            <button class="defalut-btn" type="button" @click="writing();">글쓰기</button>
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
    name: "List",

    components: {
        Header,
        Footer,
    },

    data() {
        return {
            isUser,
            superAdmin,
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
            console.log(this.noticeQuery.docs.length);

            this.noticeDocsSize = this.noticeQuery.docs.length;

            this.noticeQuery.forEach((docs) => {
                // console.log(doc.id);
                console.log(docs.data());

                this.noticeListData = docs.data();
            });
        },

        /**
         * 글쓰기 페이지 이동
         */
        writing() {
            this.$router.push({
                path: '/Board/Notice/Write'
            })
        }
    },
};
</script>

<style lang="scss" scoped>

</style>
