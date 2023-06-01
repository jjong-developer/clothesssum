<template>
    <div>
        <Header></Header>

        <div class="right-wrap">
            <div class="page-top-wrap">
                <h2 class="page-title">공지사항 글쓰기 수정</h2>
            </div>
            <div class="board-wrap">
                <div class="board-write-wrap">
                    <label>작성자</label>
                    <input id="author" type="text" name="author" :value="this.$route.query.author" placeholder="작성자를 입력해주세요." />
                    <label>제목</label>
                    <input id="title" type="text" name="title" :value="decodeURI(this.$route.query.title)" placeholder="제목을 입력해주세요." />
<!--                    <div class="write-tool">-->
                        <label>내용</label>
<!--                        <button type="button">-->
<!--                            <img :src="require('@/assets/img/common/picture.png')" alt="이미지 첨부" />-->
<!--                        </button>-->
<!--                        <span>(이미지도 첨부하실 수 있습니다.)</span>-->
<!--                    </div>-->
                    <textarea id="content" :value="decodeURI(this.$route.query.contents)" placeholder="내용을 입력해주세요."></textarea>
<!--                    <label>첨부파일</label>-->
<!--                    <input class="file-find" type="file" />-->
                    <div class="board-btn-wrap">
                        <button class="defalut-w-btn" type="text" @click="cancel();">취소</button>
                        <button class="defalut-btn" type="text" @click="listUpdate();">등록</button>
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
import {goBack, siteReload} from "@/assets/js/common.js";
import {dbUpdateDoc, dbService, DOC} from "@/plugins/firebase.js";
import {isUser} from "@/main";

export default {
    name: "WriteUpdate",

    components: {
        Header,
        Footer,
    },

    data() {
        return {
            author: '', // 작성자
            title: '', // 제목
            contents: '', // 내용
            setSaveFile: '', // 저장할 파일
            getSaveFile: '', // 가져올 파일
            fileFind: '', // 파일 찾기
            dateOptions: {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                // dateStyle: 'short'
            },
        }
    },

    mounted() {

    },

    methods: {
        listUpdate() {
            this.listUpdating();
        },

        /**
         * 게시글 수정
         */
        async listUpdating() {
            this.author = document.querySelector('input[name=author]').value;
            this.title = document.querySelector('input[name=title]').value;
            this.contents = document.querySelector('#content').value;

            await dbUpdateDoc(DOC(dbService, 'notice', this.$route.query.docUID), {
                'author': this.author, // 작성자
                'title': this.title, // 제목
                'contents': this.contents, // 내용
                'date': new Intl.DateTimeFormat('ko', this.dateOptions).format(new Date()), // 등록일
            }).then(() => {
                alert('게시글이 수정되었습니다.');
                siteReload('/Board/Notice/List');
            }).catch((error) => {
                console.log(error.message);
                alert('게시글 수정중에 실패하였습니다.\n잠시 후 다시 시도해주세요.');
            });
        },

        /**
         * 게시글 취소
         */
        cancel() {
            goBack();
        },
    },
};
</script>

<style lang="scss" scoped>
    .write-tool {
        span {
            font-size: 12px;
        }
    }
</style>
