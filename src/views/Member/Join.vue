<template>
    <div>
        <Header></Header>

        <div class="right-wrap">
            <div class="sign-content-wrap not-page-height">
                <div class="sign-content">
                    <h2 class="page-title">회원 가입</h2>
                    <div>
                        <label for="userName">이름</label>
                        <input id="userName" type="text" name="userName" value="" autocomplete="off" placeholder="" />
                    </div>
                    <div>
                        <label for="userEmail">이메일</label>
                        <input id="userEmail" type="email" name="userEmail" value="" autocomplete="off" placeholder="" />
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
                            <button class="defalut-w-btn" @click="addressSearch();">검색하기</button>
                        </div>
                        <input id="roadAddress" type="text" name="address" placeholder="도로명 주소" readonly="readonly">
                        <input id="jibunAddress" type="text" name="address" placeholder="지번 주소" readonly="readonly">
                        <input id="detailAddress" type="text" name="address" placeholder="상세 주소">
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
                        <label class="chk-list-label chk-list-unessential">
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
import {createUserWithEmailAndPassword, updateProfile, sendEmailVerification} from "firebase/auth";
import {dbAuth, dbService, dbAddDoc, dbCollection} from "@/plugins/firebase.js";
import {isUser} from "@/main.js";
import {addressSearch, emailCheck, phoneNumberCheck, regexPhoneNumber, siteReload} from "@/assets/js/common.js";

export default {
    name: "Join",

    components: {
        Header,
        Footer,
    },

    data() {
        return {
            isUser,
            userName: '',
            userEmail: '',
            userPassword: '',
            userPhoneNumber: '',
            phoneNumCheck: '',
            userFullAddress: '',
            userPostCode: '',
            userRoadAddress: '',
            userJibunAddress: '',
            userDetailAddress: '',
            isChkListEssential: Boolean,
            isChkListUnEssential: Boolean,
        }
    },

    mounted() {
        /**
         * 실시간 phone number input key 체크
         */
        this.phoneNumCheck = document.querySelector('input[name=userPhoneNumber]');
        this.phoneNumCheck.addEventListener('keyup', (e) => {
            regexPhoneNumber(e.target);
        });

        /**
         * 이용약관, 개인정보처리방침 선택 유,무
         */
        let getChkListItemAll = document.querySelector('input[name=chkAll]'); // 전체 체크
        let getChkListItem = document.querySelectorAll('input[name=chkList]'); // 개별 체크

        getChkListItemAll.addEventListener('click', () => {
            getChkListItem.forEach((checkbox) => {
                checkbox.checked = getChkListItemAll.checked
                this.isChkListUnEssential = true;
            })
        });

        for (let i = 0; i < getChkListItem.length; i++) {
            let getChkListItemClick = getChkListItem.item(i);

            getChkListItemClick.addEventListener('click', (e) => {
                let chkListItemSelect = document.querySelectorAll('input[name=chkList]:checked');

                if (getChkListItem.length === chkListItemSelect.length) {
                    getChkListItemAll.checked = true;
                } else {
                    getChkListItemAll.checked = false;
                }
            });
        }

        /**
         * 선택 항목 선택 유,무
         */
        let chkListUnEssential = document.querySelector('.chk-list-label.chk-list-unessential .chk-list-item');

        chkListUnEssential.addEventListener('change', (e) => {
            if (e.target.checked === true) {
                this.isChkListUnEssential = true;
            } else {
                this.isChkListUnEssential = false;
            }
        });
    },

    methods: {
        /**
         * 주소 검색
         */
        addressSearch,

        /**
         * 회원 가입
         */
        signUp() {
            let userName = document.querySelector('input[name=userName]');
            let userEmail = document.querySelector('input[name=userEmail]');
            let userPassword = document.querySelector('input[name=userPassword]');
            let user_re_password = document.querySelector('input[name=user_re_password]');
            let userPhoneNumber = document.querySelector('input[name=userPhoneNumber]');
            let addressDetailInput = document.querySelectorAll('.address-wrap input');
            let addressDetail = '';
            let chkListEssential = document.querySelectorAll('.chk-list-label.chk-list-essential .chk-list-item'); // 필수 선택

            addressDetailInput.forEach((el) => {
                addressDetail = el.value;
            });

            // chkListEssential.forEach((el) => {
            //     el.addEventListener('change', (e) => {
            //         if (e.target.checked === true) {
            //             this.isChkListEssential = true;
            //             console.log(this.isChkListEssential);
            //         } else {
            //             this.isChkListEssential = false;
            //             console.log(this.isChkListEssential);
            //         }
            //     });
            // });

            for (let i = 0; i < chkListEssential.length; i += 1) {
                (chkListEssential[i].checked === true) ? this.isChkListEssential = true : this.isChkListEssential = false;
            }

            if (!userName.value) {
                alert('이름을(를) 입력해주세요.');
                userName.focus();
                return;
            } else if (!userEmail.value) {
                alert('이메일을(를) 입력해주세요.');
                userEmail.focus();
                return;
            } else if (!emailCheck(userEmail.value)) {
                alert('이메일 형식이 올바르지 않습니다.');
                userEmail.focus();
                return;
            } else if (!userPassword.value || !user_re_password.value) {
                alert('비밀번호을(를) 입력해주세요.');
                userPassword.focus();
                return;
            } else if (userPassword.value !== user_re_password.value) {
                alert('비밀번호가 일치하지 않습니다.');
                userPassword.focus();
                return;
            } else if (!phoneNumberCheck(userPhoneNumber.value)) {
                alert('핸드폰번호를 정확히 입력해주세요.');
                userPhoneNumber.focus();
                return;
            } else if (!addressDetail) {
                alert('주소을(를) 입력해주세요.');
                return;
            } else if (this.isChkListEssential !== true) {
                alert('필수 항목에 동의하세요.');
                return;
            }

            this.userName = document.querySelector('input[name=userName]').value;
            this.userEmail = document.querySelector('input[name=userEmail]').value;
            this.userPassword = document.querySelector('input[name=userPassword]').value;
            this.userPhoneNumber = document.querySelector('input[name=userPhoneNumber]').value;
            this.userPostCode = document.querySelector('#postCode').value;
            this.userRoadAddress = document.querySelector('#roadAddress').value;
            this.userJibunAddress = document.querySelector('#jibunAddress').value;
            this.userDetailAddress = document.querySelector('#detailAddress').value;
            this.userFullAddress = this.userRoadAddress.concat(' ', this.userDetailAddress);

            createUserWithEmailAndPassword(dbAuth, this.userEmail, this.userPassword).then((result) => {
                updateProfile(result.user, {
                    displayName: this.userName,
                }).then(() => {
                    sendEmailVerification(dbAuth.currentUser).then(() => {});
                    dbAuth.signOut(); // createUserWithEmailAndPassword 함수는 자동으로 로그인 되기때문에 메일 인증을 하기위해 로그아웃을 바로 실행

                    alert('본인확인을 위해서 가입하신 이메일로 전송된 인증 메일의 링크를 클릭하여 인증을 완료해주세요.\n인증 후 로그인이 가능합니다.');
                    siteReload('/');
                }).catch((error) => {
                    console.log(error.message);
                });

                dbAddDoc(dbCollection(dbService, 'users'), { // 회원 가입 시 정보를 별도로 DB 저장
                    name: this.userName,
                    email: this.userEmail,
                    phoneNumber: this.userPhoneNumber,
                    fullAddress: this.userFullAddress,
                    postCode: this.userPostCode,
                    roadAddress: this.userRoadAddress,
                    jibunAddress: this.userJibunAddress,
                    detailAddress: this.userDetailAddress,
                    isChkListUnEssential: this.isChkListUnEssential,
                    uid: isUser.uid,
                });
            }).catch(error => {
                console.log(error.message);

                if (error.message === 'Firebase: Password should be at least 6 characters (auth/weak-password).') {
                    alert('비밀번호는 6자 이상이어야 합니다.');
                    userPassword.focus();
                    return;
                }

                if (error.message === 'Firebase: Error (auth/email-already-in-use).') {
                    alert('이미 사용 중인 이메일 주소입니다.');
                    userEmail.focus();
                    return;
                }
            });
        },
    },

    watch: {

    },
};
</script>

<style lang="scss" scoped>

</style>
