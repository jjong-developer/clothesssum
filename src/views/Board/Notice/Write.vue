<template>
    <div>
        <Header></Header>

        <div class="right-wrap">
            <div class="page-top-wrap">
                <h2 class="page-title">공지사항 글쓰기</h2>
            </div>
            <div class="board-wrap">
                <div class="board-write-wrap">
                    <label>작성자</label>
                    <input id="author" type="text" name="author" :value="this.userName" placeholder="작성자를 입력해주세요." />
                    <label>제목</label>
                    <input id="title" type="text" name="title" value="" placeholder="제목을 입력해주세요." />
<!--                    <div class="write-tool">-->
                        <label>내용</label>
<!--                        <button type="button">-->
<!--                            <img :src="require('@/assets/img/common/picture.png')" title="이미지 첨부" alt="이미지 첨부" />-->
<!--                        </button>-->
<!--                        <span>(이미지도 첨부하실 수 있습니다.)</span>-->
<!--                    </div>-->
                    <textarea id="content" value="" placeholder="내용을 입력해주세요."></textarea>
                    <label>첨부파일</label>
                    <input class="file-find" type="file" />
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
import {goBack, siteReload, fileChange} from "@/assets/js/common.js";
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
            isUser,
            docData: '',
            userName: '',
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
        this.getUsers();
        // fileChange(); // 임시
    },

    methods: {
        /**
         * 회원 정보를 불러오기
         */
        async getUsers() {
            this.usersQuery = await dbGetDocs(dbCollection(dbService, 'users'));

            this.usersQuery.forEach((docs) => {
                // console.log(doc.id);
                console.log(docs.data());

                this.docData = docs.data()

                if (isUser.uid === this.docData.uid) {
                    this.userName = this.docData.name;
                }
            });
        },

        /**
         * 게시글 등록
         */
        register() {
            this.author = document.querySelector('input[name=author]').value;
            this.title = document.querySelector('input[name=title]').value;
            this.contents = document.querySelector('#content').value;

            // 첨부파일
            // this.fileFind = document.querySelector('.file-find').files[0]; // 단일
            // this.fileFind = [...document.querySelector('.file-find').files]; // 다중
            // this.setSaveFile = ref(dbStorage, 'notice/file/' + this.fileFind.name);
            // // this.setSaveFile = this.$firebase.storage().ref().child('notice/file/' + this.fileFind.name);
            // this.getSaveFile = this.setSaveFile.put(this.fileFind);
            // fileChange();

            dbAddDoc(dbCollection(dbService, 'notice'), {
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
    .write-tool {
        span {
            font-size: 12px;
        }
    }
</style>
