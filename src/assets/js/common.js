export let superAdmin = ['jongwook2.kim@gmail.com']; // 관리자 권한 이메일 설정
export let isSuperAdmin = false;

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
