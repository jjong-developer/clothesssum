<template>
    <div>
        <Header></Header>

        <div class="right-wrap">
            <div class="board-wrap">
                <table class="board-table">
                    <thead>
                        <tr>
                            <th class="board-num">번호</th>
                            <th class="board-title">제목</th>
                            <th class="board-author">작성자</th>
                            <th class="board-date">등록일</th>
                        </tr>
                    </thead>
                    <tbody id="noticeList">
                        <tr>
                            <td>{{ noticeListResult.num }}</td>
                            <td>{{ noticeListResult.title }}</td>
                            <td>{{ noticeListResult.write }}</td>
                            <td>{{ noticeListResult.date }}</td>
                        </tr>
                    </tbody>
                </table>

                <div class="board-btn-wrap">
                    <input type="text" placeholder="" />
                    <button class="defalut-btn" type="button">검색</button>
                    <div class="board-btn-right">
                        <button class="defalut-btn" type="button" @click="write()">글쓰기</button>
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

export default {
    name: "List",

    components: {
        Header,
        Footer,
    },

    data() {
        return {
            noticeListResult: '',
        }
    },

    mounted() {
        this.$firebase.firestore().collection('notice').get().then((snapshot) => {
            if (snapshot.docs.length === 0) {
                let noticeListNoDatatempleat = '' +
                    '<tr>' +
                        '<td colspan="4">게시글이 없습니다.</td>' +
                    '</tr>'

                document.querySelector('#noticeList').innerHTML += noticeListNoDatatempleat;
            }

            snapshot.forEach((doc) => {
                this.noticeListResult = doc.data();
                console.log(this.noticeListResult);
                // console.log(this.noticeListResult);
                // const noticeListtempleat = `
                //     <tr>
                //         <td>${this.noticeListResult.num}</td>
                //         <td>${this.noticeListResult.title}</td>
                //         <td>${this.noticeListResult.author}</td>
                //         <td>${this.noticeListResult.date}</td>
                //     </tr>
                // `;
                let noticeListtempleat = '' +
                    '<tr>' +
                        '<td>' + this.noticeListResult.num + '</td>' + // 게시글 번호
                        '<td id="view">' + this.noticeListResult.title + '</td>' + // 제목
                        '<td>' + this.noticeListResult.author + '</td>' + // 작성자
                        '<td>' + this.noticeListResult.date.replace(/ /g,"").substring(0, 8) + '</td>' + // 등록일
                    '</tr>'

                document.querySelector('#noticeList').innerHTML += noticeListtempleat;

                document.querySelector('#view').addEventListener('click', () => { // 게시글 상세보기
                    console.log("aaa");
                })
            })
        });
    },

    methods: {
        write() {
            this.$router.push({
                path: '/Board/Notice/Write'
            })
        }
    },
};
</script>

<style lang="scss" scoped>

</style>
