export function segment(num) {
  const httpUrlSlice = window.location.href.split("//")[1];
  const uriSliceAry = httpUrlSlice.split("/");

  return uriSliceAry[num];
}

export function siteReload() {
  const reload = location.reload();

  return reload;
}

export function goBack() {
  const testset = history.back();

  return testset;
}

export function validationCheck() {
  console.log("검사 체크");
}
