<template>
    <div>
        <Header></Header>

        <div class="right-wrap">
            <div class="page-top-wrap">
                <h2 class="page-title">공지사항</h2>
            </div>
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
<!--                        <div id="coin_list">-->
                            <tbody id="noticeList"></tbody>
<!--                        </div>-->
                    </table>

                    <div class="board-btn-wrap">
                        <input id="search" type="text" value="" placeholder="" />
                        <button class="defalut-btn" type="button" @click="searchFilter();">검색</button>
                        <div class="board-btn-right" v-if="isUser !== null && superAdmin.includes(isUser.email)">
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
import {dbCollection, dbGetDocs, dbService} from "@/plugins/firebase.js";
import {query, orderBy} from "firebase/firestore";

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
            searchData: '',
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
            this.noticeQuery = await dbGetDocs(query(dbCollection(dbService, 'notice'), orderBy('date', 'desc')));
            // const testtest = this.noticeQuery.docs.map((el) => el.data());
            // console.log(testtest);

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
                        '<td class="board-notice-title" data-id="'+this.noticeListData.docUID+'">'+ this.noticeListData.title +'</td>' +
                        '<td class="board-notice-author">'+ this.noticeListData.author +'</td>' +
                        '<td class="board-notice-date">'+ this.noticeListData.date.slice(0, -1) +'</td>' +
                    '</tr>';

                if (this.noticeDocsSize !== 0) {
                    document.querySelector('#noticeList').innerHTML += this.noticeListTempleat;
                }

                /**
                 * 전체 게시글중에 해당 게시물 보기
                 */
                document.querySelectorAll('.board-notice-title').forEach((el) => {
                    el.addEventListener('click', (e) => {
                        this.$router.push({
                            path: '/Board/Notice/View',
                            name: 'Query',
                            query: {docUID: e.target.dataset.id},
                            props: true,
                        }).catch(()=>{})
                        this.$router.go();
                    })
                })
            });
        },

        /**
         * 게시글 검색
         */
        searchFilter() {
            // this.searchData = document.querySelector('#search');
            //
            // if (!this.searchData.value) {
            //     alert('검색어를 입력해주세요');
            //     this.searchData.focus();
            // }

            let search, list, i, res = "";

            search = document.querySelector('#search').value.toUpperCase();  // input tag의 value 값 취득

            if (search != '') {
                // this.noticeListTempleat = document.querySelector('#noticeList').innerHTML.split('<br>');  // noticeList를 배열로 변환
                // this.noticeListTempleat[this.noticeListTempleat.length - 1] = this.noticeListTempleat[this.noticeListTempleat.length - 1].split('</tbody>')[0];

                // console.log(this.noticeListTempleat.length);
                // console.log(search);

                // for(i=1; i<this.noticeListTempleat.length; i++){
                //     console.log(this.noticeListTempleat.length);
                //
                //     if(this.noticeListTempleat[i].toUpperCase().includes(search)){
                //         res += this.noticeListTempleat[i].replaceAll('&nbsp;', ' ') + '\n';  // 검색 결과를 변수에 저장
                //
                //         console.log(res);
                //     }
                // }

                if(this.noticeListTempleat.toUpperCase().includes(search)){
                    res += this.noticeListTempleat.replaceAll('&nbsp;', ' ') + '\n';  // 검색 결과를 변수에 저장

                    console.log(res);
                }

                if (res == '') {
                    res = '해당 검색 게시글이 없습니다.';
                }
            }
            // document.getElementById("filter_result").innerText = res;  // 검색 결과 출력
            document.querySelector('#noticeList').innerText = res;  // 검색 결과 출력
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
