import axios from "axios";

console.log("axios.js load");

export function getAsxiosNoParam(url, headers) {
  return axios.get(url,{ headers });
}

// export function getAxios(url, headers, param) {
// 	if (!param) param = '';
// 	return axios.get(url + param, { headers });
// }
//
// export function postAxios(url, headers, param) {
// 	return axios.post(url, param, { headers });
// }
