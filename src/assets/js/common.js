export function segment(num) {
  const httpUrlSlice = window.location.href.split("//")[1];
  const uriSliceAry = httpUrlSlice.split("/");

  return uriSliceAry[num];
}

export function siteReload(url) {
  const reload = window.location.href = url;

  return reload;
}

export function goBack() {
  const testset = history.back();

  return testset;
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
