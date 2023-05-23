import {dbStorage, dbStorageRef, dbGetDownloadURL} from "@/plugins/firebase.js";

export let superAdmin = ['jongwook2.kim@gmail.com']; // 관리자 권한 이메일 설정
export let isSuperAdmin = false;
export let fileUpload, fileUrl;

/**
 * 채널톡 버튼 플러그인 설치
 */
export function channelTalk() {
    var w = window;
    if (w.ChannelIO) {
        return w.console.error("ChannelIO script included twice.");
    }
    var ch = function () {
        ch.c(arguments);
    };
    ch.q = [];
    ch.c = function (args) {
        ch.q.push(args);
    };
    w.ChannelIO = ch;

    function l() {
        if (w.ChannelIOInitialized) {
            return;
        }
        w.ChannelIOInitialized = true;
        var s = document.createElement("script");
        s.type = "text/javascript";
        s.async = true;
        s.src = "https://cdn.channel.io/plugin/ch-plugin-web.js";
        var x = document.getElementsByTagName("script")[0];
        if (x.parentNode) {
            x.parentNode.insertBefore(s, x);
        }
    }

    if (document.readyState === "complete") {
        l();
    } else {
        w.addEventListener("DOMContentLoaded", l);
        w.addEventListener("load", l);
    }

    ChannelIO('boot', {
        "pluginKey": "74657b53-18e1-4869-9342-ee1a112501a2"
    });
}

/**
 * 주소 검색
 */
export function addressSearch() {
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
}

/**
 * 주소 파라미터 제거
 */
export function segment(num) {
    const httpUrlSlice = window.location.href.split('//')[1];
    const uriSliceAry = httpUrlSlice.split('/');

    return uriSliceAry[num];
}

/**
 * 새로고침
 */
export function siteReload(url) {
    const reload = window.location.href = url;

    return reload;
}

/**
 * 뒤로 이동
 */
export function goBack() {
    const back = history.back();

    return back;
}

/**
 * 이메일 정규식 체크
 */
export function emailCheck(str) {
    let regEmail = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;

    if (!regEmail.test(str)) {
        return false;
    } else {
        return true;
    }
}

/**
 * 핸드폰번호 정규식 & "-" 표시
 */
export function phoneNumberCheck(str) {
    let regPhoneNumber = /[^0-9]/g;

    if (!regPhoneNumber.test(str)) {
        return false;
    } else {
        return true;
    }
}

export function regexPhoneNumber(target) {
    target.value = target.value.replace(/[^0-9]/g, '').replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
}

/**
 * 첨부파일 변경
 */
export function fileChange() {
    let fileNameTarget = document.querySelector('.file-find');

    fileNameTarget.addEventListener('change', (e) => {
        if (window.FileReader) {
            let fileTarget = e.target.files[0]; // 파일 추출
            let fileName = e.target.files[0].name; // 파일명 추출

            fileNameTarget.value = fileName; // 변경할때마다 파일명을 input에 삽입
            // ref(dbStorage, 'notice/file/' + this.fileFind.name)
            // fileUpload = dbStorageRef.child('images/portfolio/' + fileName).put(fileTarget);
            fileUpload = dbStorageRef.child(dbStorage, 'notice/file/' + fileName).put(fileTarget);

            fileUpload.on('state_changed', null, (error) => { // 이미지 업로드 여부
                alert('업로드중 실패하였습니다, 잠시 후 다시 시도해주세요.\n', error.message);
            }, () => {
                // dbGetDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                dbGetDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    fileUrl = downloadURL;
                });
            });
        }
    });
}
