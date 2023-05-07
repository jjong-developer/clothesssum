<template>
    <div>
        <Header></Header>

        <div class="right-wrap">
            <div class="sign-content-wrap not-page-height">
                <div class="sign-content">
                    <h2>회원 정보 수정</h2>
                    <div>
                        <label for="userName">이름</label>
                        <input id="userName" type="text" name="userName" :value="isUser.displayName" autocomplete="off" placeholder="" disabled="disabled" />
                    </div>
                    <div>
                        <label for="userEmail">이메일</label>
                        <input id="userEmail" type="email" name="userEmail" :value="isUser.email" autocomplete="off" placeholder="" disabled="disabled" />
                    </div>
                    <div>
                        <label for="userPassword">비밀번호</label>
                        <input id="userPassword" type="password" name="userPassword" value="" autocomplete="new-password" placeholder="" />
                    </div>
                    <div>
                        <label for="user_re_password">비밀번호 확인</label>
                        <input id="user_re_password" type="password" name="user_re_password" value="" autocomplete="new-password" placeholder="" />
                    </div>
                    <div>
                        <label for="userPhoneNumber">휴대폰 번호</label>
                        <input id="userPhoneNumber" type="tel" name="userPhoneNumber" value="" maxlength="13" autocomplete="off" placeholder="'-'를 제외하고 입력해주세요." />
                    </div>
                    <div class="address-wrap">
                        <label>주소</label>
                        <div class="col-70-25">
                            <input id="postCode" type="text" placeholder="" readonly="readonly">
                            <button class="defalut-w-btn" @click="addressSearch()">검색하기</button>
                        </div>
                        <input id="roadAddress" type="text" placeholder="도로명 주소" readonly="readonly">
                        <input id="jibunAddress" type="text" placeholder="지번 주소" readonly="readonly">
                        <input id="detailAddress" type="text" placeholder="상세 주소">
                    </div>
                    <div class="sign-up-content-wrap">
                        <label class="chk-list-label">
                            <input class="chk-list-item" type="checkbox" name="chkAll" value="">
                            <span class="chk-list-mark"></span>
                            <span id="chkAll" class="chk-list-text">모두 동의합니다.</span>
                        </label>
                        <label class="chk-list-label chk-list-essential">
                            <input class="chk-list-item" type="checkbox" name="chkList" value="">
                            <span class="chk-list-mark"></span>
                            <span class="chk-list-text">[필수] <router-link to="/policy/1" target="_blank">이용약관</router-link>과 <router-link to="/policy/2" target="_blank">개인정보처리방침</router-link>에 동의합니다.</span>
                        </label>
                        <label class="chk-list-label chk-list-essential">
                            <input class="chk-list-item" type="checkbox" name="chkList" value="">
                            <span class="chk-list-mark"></span>
                            <span class="chk-list-text">[필수] 만 14세 이상입니다.</span>
                            <p>만 19세 미만의 미성년자가 결제 시 법정대리인이 거래를 취소할 수 있습니다.</p>
                        </label>
                        <label class="chk-list-label">
                            <input class="chk-list-item" type="checkbox" name="chkList" value="">
                            <span class="chk-list-mark"></span>
                            <span class="chk-list-text">[선택] 이메일 및 SMS 마케팅 정보 수신에 동의합니다.</span>
                            <p>회원은 언제든지 회원 정보에서 수신 거부로 변경할 수 있습니다.</p>
                        </label>
                    </div>
                    <div>
                        <button class="wd-100 defalut-btn" type="button" @click="signUp();">가입하기</button>
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
import { dbService, dbCollection, dbGetDoc } from "@/plugins/firebase.js";
import { isUser } from "@/main.js";

export default {
    name: "MyInfo",

    components: {
        Header,
        Footer,
    },

    data() {
        return {
            isUser,
        }
    },

    mounted() {
        dbGetDoc(dbCollection(dbService, 'users')).forEach((doc) => {
            // 가져온 모든 문서들을 확인
            console.log(doc.id, " => ", doc.data());
        });

        // document.querySelectorAll('.sign-content input').forEach((doc) => {
        //     // 가져온 모든 문서들을 확인
        //     console.log(doc.id, " => ", doc.data());
        // });

        // dbGetDoc(dbCollection(dbService, 'users')).forEach(dbDoc => {
        //     console.log(dbDoc.data());
        // })
        // if (docSnap.exists()) {
        //     console.log(docSnap.data());
        // } else {
        //     console.log("No such document!");
        // }

        // dbGetDoc(dbCollection(doc(dbService, 'users')), { // 회원가입 시 정보를 불러오기위함
        //     name: this.userName,
        //     email: this.userEmail,
        //     phoneNumber: this.userPhoneNumber,
        //     address: this.userAddress,
        // });
    },

    methods: {

    },
};
</script>

<style lang="scss" scoped>

</style>
