<template>
    <div>
        <Header></Header>

        <div class="right-wrap">
            <div class="sign-content-wrap not-page-height">
                <div class="sign-content">
                    <h2>회원 정보 수정</h2>
                    <div>
                        <label for="userName">이름</label>
                        <input id="userName" type="text" name="userName" :value="this.userName" autocomplete="off" placeholder="" readonly="readonly" />
                    </div>
                    <div>
                        <label for="userEmail">이메일</label>
                        <input id="userEmail" type="email" name="userEmail" :value="this.userEmail" autocomplete="off" placeholder="" readonly="readonly" />
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
                        <input id="userPhoneNumber" type="tel" name="userPhoneNumber" :value="this.userPhoneNumber" maxlength="13" autocomplete="off" placeholder="'-'를 제외하고 입력해주세요." />
                    </div>
                    <div class="address-wrap">
                        <label>주소</label>
                        <div class="col-70-25">
                            <input id="postCode" type="text" :value="this.userPostCode" placeholder="" readonly="readonly">
                            <button class="defalut-w-btn" @click="addressSearch()">검색하기</button>
                        </div>
                        <input id="roadAddress" type="text" name="roadAddress" :value="this.userRoadAddress" placeholder="도로명 주소" readonly="readonly">
                        <input id="jibunAddress" type="text" name="jibunAddress" :value="this.userJibunAddress" placeholder="지번 주소" readonly="readonly">
                        <input id="detailAddress" type="text" name="detailAddress" :value="this.userDetailAddress" placeholder="상세 주소">
                    </div>
                    <div class="sign-up-content-wrap">
                        <label>이메일 수신여부</label>
                        <label class="chk-list-label chk-list-unessential">
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
import {updatePassword, deleteUser} from "firebase/auth";
import {dbAuth, dbService, dbCollection, dbGetDocs, dbAddDoc} from "@/plugins/firebase.js";
import {isUser} from "@/main.js";
import {regexPhoneNumber, siteReload} from "@/assets/js/common.js";

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
            userName: '',
            userEmail: '',
            userPassword: '',
            user_re_password: '',
            userPhoneNumber: '',
            phoneNumCheck: '',
            userPostCode: '',
            userRoadAddress: '',
            userJibunAddress: '',
            userDetailAddress: '',
            userUid: '',
            chkListUnEssential: '',
        }
    },

    mounted() {
        this.getUsers();

        /**
         * 실시간 phone number input key 체크
         */
        this.phoneNumCheck = document.querySelector('input[name=userPhoneNumber]');
        this.phoneNumCheck.addEventListener('keyup', (e) => {
            regexPhoneNumber(e.target);
        });

        /**
         * 선택 항목 선택 유,무
         */
        this.chkListUnEssential = document.querySelector('.chk-list-label.chk-list-unessential .chk-list-item');
        this.chkListUnEssential.addEventListener('change', (e) => {
            if (e.target.checked === true) {
                this.isChkListUnEssential = true;
            } else {
                this.isChkListUnEssential = false;
            }
        });
    },

    methods: {
        /**
         * 회원 정보를 불러오기위함
         */
        async getUsers() {
            let usersQuery = await dbGetDocs(dbCollection(dbService, 'users'));

            usersQuery.forEach((doc) => {
                console.log(doc.data());

                this.docData = doc.data()
                this.userUid = this.docData.uid;

                if (isUser.uid === this.userUid) {
                    this.userName = this.docData.name;
                    this.userEmail = this.docData.email;
                    this.userPhoneNumber = this.docData.phoneNumber;
                    this.userPostCode = this.docData.postCode;
                    this.userRoadAddress = this.docData.roadAddress;
                    this.userJibunAddress = this.docData.jibunAddress;
                    this.userDetailAddress = this.docData.detailAddress;

                    if (this.docData.isChkListUnEssential === true) {
                        this.chkListUnEssential.checked = true;
                    } else {
                        this.chkListUnEssential.checked = false;
                    }
                }
            });
        },

        /**
         * 회원 정보 수정
         */
        userEdit() {
            this.userPassword = document.querySelector('input[name=userPassword]');
            this.user_re_password = document.querySelector('input[name=user_re_password]');

            if (!this.userPassword.value || !this.user_re_password.value) {
                alert('비밀번호을(를) 입력해주세요.');
                this.userPassword.focus();
                return;
            } else if (this.userPassword.value !== this.user_re_password.value) {
                alert('비밀번호가 일치하지 않습니다.');
                this.userPassword.focus();
                return;
            }

            updatePassword(dbAuth.currentUser, this.userPassword.value).then(() => {
                // dbAddDoc(dbCollection(dbService, 'users'), { // 회원가입 시 정보를 별도로 DB 수정
                //     name: this.userName,
                //     email: this.userEmail,
                //     phoneNumber: this.userPhoneNumber,
                //     fullAddress: this.userFullAddress,
                //     postCode: this.userPostCode,
                //     roadAddress: this.userRoadAddress,
                //     jibunAddress: this.userJibunAddress,
                //     address: this.userAddress,
                //     detailAddress: this.userDetailAddress,
                //     isChkListUnEssential: this.isChkListUnEssential,
                //     uid: isUser.uid,
                // });

                alert(this.userName + ' 회원님, 정보가 정상적으로 수정되었습니다.');
                siteReload('/');
            }).catch((error) => {
                console.log(error.message);
                alert('회원 정보 수정에 실패하였습니다, 잠시 후 다시 시도해주세요.');

                if (error.message === 'Firebase: Password should be at least 6 characters (auth/weak-password).') {
                    alert('비밀번호는 6자 이상이어야 합니다.');
                    this.userPassword.focus();
                    return;
                }
            });
        },

        /**
         * 회원 탈퇴
         */
        userDelete() {
            if (confirm(this.userName + ' 회원님의 정보 복구 및 동일한 이메일로 재가입이 불가합니다.\n정말로 탈퇴 하시겠습니까?') === true) {
                if (isUser.uid === this.userUid) {
                    deleteUser(dbAuth.currentUser).then(() => {
                        alert('정상적으로 탈퇴 처리가 되었습니다.\n이용해 주셔서 감사합니다.');
                        siteReload('/');
                    }).catch((error) => {
                        console.log(error);
                        alert('비정상으로 탈퇴 처리가 되었습니다.\n잠시 후 다시 시도해주세요.');
                    });
                }
            }
        },
    },
};
</script>

<style lang="scss" scoped>

</style>
