<template>
    <div>
        <Header></Header>

        <div class="right-wrap">
            <div class="board-wrap">
                <div class="board-write-wrap">
                    <label>작성자</label>
                    <input id="nameValue" type="text" value="" placeholder="작성자를 입력해주세요." />
                    <label>제목</label>
                    <input id="titleValue" type="text" value="" placeholder="제목을 입력해주세요." />
                    <label>내용</label>
                    <textarea id="contentValue" value="" placeholder="내용을 입력해주세요."></textarea>
                    <label>첨부파일</label>
                    <input class="fileUpload" type="file" multiple />
                    <div class="board-btn-wrap">
                        <button class="defalut-w-btn" type="text" @click="cancel()">취소</button>
                        <button class="defalut-btn" type="text" @click="compleat()">완료</button>
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
import { goBack } from "@/assets/js/common.js";

export default {
    name: "Write",
    components: {
        Header,
        Footer,
    },
    data() {
        return {
            getNameValue: '',
            getTitleValue: '',
            getContentValue: '',
            setSaveFile: '',
            getSaveFile: '',
            fileFind: '',
            save: '',
            dateOptions: {
                // year: 'numeric',
                // month: 'numeric',
                // day: 'numeric',
                dateStyle: 'short'
            },
            file_name: '',
        }
    },
    mounted() {
        // console.log(this.$firebase.firestore());

        // let fileInputs = document.getElementById('fileUpload');
        // let handleFiles = () => {
        //     let selectedFile = [...fileInputs.files];
        //     console.log(selectedFile);
        // };
        // fileInputs.addEventListener('change', handleFiles);

        // let fileInputs = document.getElementById('fileUpload');
        // fileInputs.onchange = () => {
        //     let selectedFile = [...fileInputs.files];
        //     console.log(selectedFile);
        // };
    },
    methods: {
        compleat() {
            this.getTitleValue = document.querySelector('#titleValue').value;
            this.getContentValue = document.querySelector('#contentValue').value;
            this.getNameValue = document.querySelector('#nameValue').value;

            // 이미지, 첨부파일 저장공간
            // // this.fileFind = document.getElementById('fileUpload').files[0]; // 단일
            // this.fileFind = [...document.getElementById('fileUpload').files]; // 다중
            // this.setSaveFile = this.$firebase.storage().ref().child('notice/file/' + this.fileFind.name);
            // this.getSaveFile = this.setSaveFile.put(this.fileFind);

            this.save = {
                // 'num': this.num, // 게시글 번호
                'title': this.getTitleValue, // 제목
                'author': this.getNameValue, // 작성자
                'date': new Intl.DateTimeFormat('ko', this.dateOptions).format(new Date()), // 등록일
                'content': this.getContentValue, // 내용
            };
            this.$firebase.firestore().collection('notice').add(this.save).then((result) => {
                console.log(result);
                alert("게시글이 등록되었습니다.");
                console.log(this.getSaveFile);
                // window.location.href = '/Board/Notice/List';
            }).catch((error) => {
                console.log(error);
                alert("게시글 작성에 실패하였습니다.");
            })
        },

        cancel() {
            goBack();
        },
    },
};
</script>

<style lang="scss" scoped>

</style>
