<template>
    <div>
        <Header></Header>

        <div class="right-wrap">
            <div class="sign-content-wrap not-page-height">
                <div class="sign-content">
                    <h2>회원 정보 수정</h2>
                    <div>
                        <label for="userName">이름</label>
                        <input id="userName" type="text" name="userName" :value="this.name" autocomplete="off" placeholder="" readonly="readonly" />
                    </div>
                    <div>
                        <label for="userEmail">이메일</label>
                        <input id="userEmail" type="email" name="userEmail" :value="this.email" autocomplete="off" placeholder="" readonly="readonly" />
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
                        <input id="userPhoneNumber" type="tel" name="userPhoneNumber" :value="this.phoneNumber" maxlength="13" autocomplete="off" placeholder="'-'를 제외하고 입력해주세요." />
                    </div>
                    <div class="address-wrap">
                        <label>주소</label>
                        <div class="col-70-25">
                            <input id="postCode" type="text" placeholder="" readonly="readonly">
                            <button class="defalut-w-btn" @click="addressSearch()">검색하기</button>
                        </div>
                        <input id="roadAddress" type="text" name="roadAddress" placeholder="도로명 주소" readonly="readonly">
                        <input id="jibunAddress" type="text" name="jibunAddress" placeholder="지번 주소" readonly="readonly">
                        <input id="detailAddress" type="text" name="detailAddress" :value="this.detailAddress" placeholder="상세 주소">
                    </div>
                    <div class="sign-up-content-wrap">
                        <label>이메일 수신여부</label>
                        <label class="chk-list-label">
                            <input class="chk-list-item" type="checkbox" name="chkList" value="">
                            <span class="chk-list-mark"></span>
                            <span class="chk-list-text">이메일 및 SMS 마케팅 정보 수신에 동의합니다.</span>
                        </label>
                    </div>
                    <div class="btn-wrap">
                        <button class="wd-100 defalut-w-btn" type="button" @click="userDelete();">회원탈퇴</button>
                        <button class="wd-100 defalut-btn" type="button" @click="userEdit();">수정하기</button>
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
import { deleteUser } from "firebase/auth";
import { dbAuth, dbService, dbCollection, dbGetDoc } from "@/plugins/firebase.js";
import { isUser } from "@/main.js";
import {siteReload} from "@/assets/js/common";

export default {
    name: "MyInfo",

    components: {
        Header,
        Footer,
    },

    data() {
        return {
            isUser,
            docData: '',
            name: '',
            email: '',
            phoneNumber: '',
            detailAddress: '',
        }
    },

    mounted() {
        this.getUsers();
    },

    methods: {
        /**
         * 회원가입 시 회원 정보를 불러오기위함
         */
        async getUsers() {
            const usersQuery = await dbGetDoc(dbCollection(dbService, 'users'));

            usersQuery.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());

                this.docData = doc.data()
                this.name = this.docData.name;
                this.email = this.docData.email;
                this.phoneNumber = this.docData.phoneNumber;
                this.detailAddress = this.docData.detailAddress;
            });
        },

        /**
         * 회원 정보 수정
         */
        userEdit() {

        },

        /**
         * 회원 탈퇴
         */
        userDelete() {
            if (confirm(this.name + ' 회원님의 정보 복구 및 동일한 이메일로 재가입이 불가합니다.\n정말로 탈퇴 하시겠습니까?') === true) {
                deleteUser(dbAuth.currentUser).then(() => {
                    alert('정상적으로 탈퇴 처리가 되었습니다.\n이용해 주셔서 감사합니다.');
                    siteReload('/');
                }).catch((error) => {
                    console.log(error);
                    alert('비정상으로 탈퇴 처리가 되었습니다.\n잠시 후 다시 시도해주세요.');
                });
            }
        },
    },
};
</script>

<style lang="scss" scoped>

</style>
