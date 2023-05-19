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
                        <tbody id="noticeList"></tbody>
                    </table>

                    <div class="board-btn-wrap">
                        <input id="search" type="text" value="" placeholder="" />
                        <button class="defalut-btn" type="button" @click="search();">검색</button>
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

            if (this.noticeDocsSize === 0) {
                document.querySelector('#noticeList').innerHTML =
                    '<tr>' +
                        '<td colspan="3">게시글이 없습니다.</td>' +
                    '</tr>';
            }

            this.noticeQuery.forEach((docs) => {
                this.noticeListData = docs.data();
                this.noticeListData.docUID = docs.id;

                console.log(this.noticeListData);

                this.noticeListTempleat = '' +
                    '<tr>' +
                        '<td id="'+this.noticeListData.docUID+'" class="board-notice-title" data-id="'+this.noticeListData.docUID+'">'+ this.noticeListData.title +'</td>' +
                        '<td class="board-notice-author">'+ this.noticeListData.author +'</td>' +
                        '<td class="board-notice-date">'+ this.noticeListData.date.slice(0, -1) +'</td>' +
                    '</tr>';

                if (this.noticeDocsSize !== 0) {
                    document.querySelector('#noticeList').innerHTML += this.noticeListTempleat;
                }

                /**
                 * 전체 게시글중에 해당 게시물 보기
                 */
                document.querySelectorAll('#'+this.noticeListData.docUID+'').forEach((el) => {
                    el.addEventListener('click', () => {
                        this.$router.push({
                            path: '/Board/Notice/View'
                        })
                    })
                });

                // document.querySelectorAll('#listView').forEach((el) => {
                //     el.addEventListener('click', () => {
                //         document.querySelector('#writeDeleteBtn').dataset.id = el.getAttribute('data-id');
                //         // this.$router.push({
                //         //     path: '/Board/Notice/View'
                //         // })
                //     });
                // });
            });
        },

        /**
         * 게시글 검색
         */
        search() {
            if (!document.querySelector('#search').value) {
                alert('검색어를 입력해주세요');
            }
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
