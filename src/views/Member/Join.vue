<template>
    <div>
        <Header></Header>

        <div class="right-wrap">
            <div class="sign-content-wrap not-page-height">
                <div class="sign-content">
                    <h2>회원 가입</h2>
                    <div>
                        <label for="nameVal">이름</label>
                        <input id="nameVal" type="text" name="" value="" autocomplete="off" placeholder="" />
                    </div>
                    <div>
                        <label for="emailVal">이메일</label>
                        <input id="emailVal" type="email" name="" value="" autocomplete="off" placeholder="" />
                    </div>
                    <div>
                        <label for="pwVal">비밀번호</label>
                        <input id="pwVal" type="password" name="" value="" autocomplete="new-password" placeholder="" />
                    </div>
                    <div>
                        <label for="re_pwVal">비밀번호 확인</label>
                        <input id="re_pwVal" type="password" name="" value="" autocomplete="new-password" placeholder="" />
                    </div>
                    <div>
                        <label for="phoneNumVal">휴대폰 번호</label>
                        <input id="phoneNumVal" type="tel" name="" value="" maxlength="13" autocomplete="off" placeholder="'-'를 제외하고 입력해주세요." />
                    </div>
                    <div class="address-wrap">
                        <label>주소</label>
                        <div class="col-70-25">
                            <input id="postCode" type="text" placeholder="" readonly="readonly">
                            <button class="defalut-w-btn" @click="addressSearch()">검색하기</button>
                        </div>
                        <input id="roadAddress" type="text" placeholder="도로명주소" readonly="readonly">
                        <input id="jibunAddress" type="text" placeholder="지번주소" readonly="readonly">
                        <input id="detailAddress" type="text" placeholder="상세주소">
                    </div>
                    <div class="sign-up-content-wrap">
                        <label class="chk-list-label">
                            <input class="chk-list-item" type="checkbox" name="chkAll" value="">
                            <span class="chk-list-mark"></span>
                            <span id="chkAll" class="chk-list-text">모두 동의합니다.</span>
                        </label>
                        <label class="chk-list-label">
                            <input class="chk-list-item" type="checkbox" name="chkList" value="">
                            <span class="chk-list-mark"></span>
                            <span class="chk-list-text">[필수] <router-link to="/policy/1" target="_blank">이용약관</router-link>과 <router-link to="/policy/2" target="_blank">개인정보처리방침</router-link>에 동의합니다.</span>
                        </label>
                        <label class="chk-list-label">
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
                    <div>
                        <h2>1초 간편 회원가입</h2>
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
import { emailCheck, phoneNumberCheck, regexPhoneNumber } from "@/assets/js/common.js";

export default {
    name: "Join",
    components: {
        Header,
        Footer,
    },
    data() {
        return {

        }
    },
    mounted() {
        let phoneNumCheck = document.querySelector('#phoneNumVal');

        /**
         * 실시간 phone number input key 체크
         */
        phoneNumCheck.addEventListener('keyup', (e) => {
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

                console.log(e.target.checked);
            });
        }
    },
    methods: {
        addressSearch() {
            new window.daum.Postcode({
                oncomplete: (data) => {
                    let extraRoadAddr = ''; // 참고 항목 변수

                    // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                    // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                    if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                        extraRoadAddr += data.bname;
                    }

                    // 건물명이 있고, 공동주택일 경우 추가한다.
                    if (data.buildingName !== '' && data.apartment === 'Y') {
                        extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                    }

                    // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                    if (extraRoadAddr !== '') {
                        extraRoadAddr = ' (' + extraRoadAddr + ')';
                    }

                    // 우편번호와 주소 정보를 해당 필드에 넣는다.
                    document.querySelector('#postCode').value = data.zonecode;
                    document.querySelector('#roadAddress').value = data.roadAddress;
                    document.querySelector('#jibunAddress').value = data.jibunAddress;
                }
            }).open();
        },

        signUp() {
            let nameVal = document.querySelector('#nameVal').value;
            let emailVal = document.querySelector('#emailVal').value;
            let pwVal = document.querySelector('#pwVal').value;
            let re_pwVal = document.querySelector('#re_pwVal').value;
            let phoneNumVal = document.querySelector('#phoneNumVal').value;
            let addressInput = document.querySelectorAll('.address-wrap input');
            let addressVal = '';

            addressInput.forEach((el) => {
                addressVal = el.value;
            })

            let getChkListItem = document.querySelectorAll('input[name=chkList]'); // 개별 체크
            for (let i = 0; i < getChkListItem.length; i++) {
                // let getChkListItemClick = getChkListItem.item(i);
                let chkListItemSelect = document.querySelectorAll('input[name=chkList]:checked');
            }

            if (!nameVal) {
                alert("이름을(를) 입력해주세요.");
                return;
            } else if (!emailVal) {
                alert("이메일을(를) 입력해주세요.");
                return;
            } else if (!emailCheck(emailVal)) {
                alert("이메일 형식이 올바르지 않습니다.");
                return;
            } else if (!pwVal || !re_pwVal) {
                alert("비밀번호을(를) 입력해주세요.");
                return;
            } else if (pwVal !== re_pwVal) {
                alert("비밀번호가 일치하지 않습니다.");
                return;
            } else if (!phoneNumberCheck(phoneNumVal)) {
                alert("핸드폰번호를 정확히 입력해주세요.");
                return;
            } else if (!addressVal) {
                alert("주소을(를) 입력해주세요.");
            }
        },
    },
    watch: {

    },
};
</script>

<style lang="scss" scoped>

</style>
