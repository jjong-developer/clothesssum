<template>
    <div>
        <Header></Header>

        <div class="right-wrap">
            <h2 class="page-title">공지사항 글쓰기</h2>
            <div class="board-wrap">
                <div class="board-write-wrap">
                    <label>작성자</label>
                    <input id="author" type="text" name="author" value="" placeholder="작성자를 입력해주세요." />
                    <label>제목</label>
                    <input id="title" type="text" name="title" value="" placeholder="제목을 입력해주세요." />
                    <div class="write-tool">
                        <label>내용</label>
                        <button type="button">
                            <img :src="require('@/assets/img/common/picture.png')" title="이미지 첨부" alt="이미지 첨부" />
                        </button>
                    </div>
                    <textarea id="content" name="content" value="" placeholder="내용을 입력해주세요."></textarea>
                    <label>첨부파일</label>
                    <input class="fileUpload" type="file" multiple />
                    <div class="board-btn-wrap">
                        <button class="defalut-w-btn" type="text" @click="cancel();">취소</button>
                        <button class="defalut-btn" type="text" @click="register();">등록</button>
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
import {dbAddDoc, dbCollection, dbGetDocs, dbService} from "@/plugins/firebase.js";
import {isUser} from "@/main";

export default {
    name: "Write",

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
                // year: 'numeric',
                // month: 'numeric',
                // day: 'numeric',
                dateStyle: 'short'
            },
        }
    },

    mounted() {

    },

    methods: {
        /**
         * 게시글 등록
         */
        register() {
            this.author = document.querySelector('input[name=author]').value;
            this.title = document.querySelector('input[name=title]').value;
            this.contents = document.querySelector('input[name=content]').value;

            // 이미지, 첨부파일
            // // this.fileFind = document.getElementById('fileUpload').files[0]; // 단일
            // this.fileFind = [...document.getElementById('fileUpload').files]; // 다중
            // this.setSaveFile = this.$firebase.storage().ref().child('notice/file/' + this.fileFind.name);
            // this.getSaveFile = this.setSaveFile.put(this.fileFind);

            dbAddDoc(dbCollection(dbService, 'notice'), { // 회원 가입 시 정보를 별도로 DB 저장
                'author': this.author, // 작성자
                'title': this.title, // 제목
                'contents': this.contents, // 내용
                'date': new Intl.DateTimeFormat('ko', this.dateOptions).format(new Date()), // 등록일
            }).then(() => {
                alert('게시글이 등록되었습니다.');
                siteReload('/Board/Notice/List');
            }).catch((error) => {
                console.log(error.message);
                alert('게시글 등록중에 실패하였습니다.\n잠시 후 다시 시도해주세요.');
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

</style>
