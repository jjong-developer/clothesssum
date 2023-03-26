import { getAsxiosNoParam } from './axios.js'; // getAxios, postAxios,
// import store from '../store/store.js';

const originHost = window.location.origin;
let serviceUrl;

if (originHost.indexOf('localhost') !== -1) {
  console.log("개발용 배포");
  serviceUrl = 'http://localhost:8080/';
} else {
  console.log("실서버용 배포");
  serviceUrl = 'https://clothesssum.web.app/';
}

export function getProductNoParam(url) {
  let u = serviceUrl + url;
  let headers = {
    'Content-Type' : 'application/json; charset=UTF-8',
    'Accept': 'application/json'
  };
  const response = getAsxiosNoParam(u, headers);

  return response;
}

// export function getDevSchooling(url, params) {
//   let u = serviceUrl + url;
//   let headers = {
//     'front-sa': EUSER_INFO['frontSa'] ? EUSER_INFO['frontSa'] : 'AAxu5YJLmbsThQH8/SgZx1Ex+blQccti886aHliT71+nDAdmizxUwJDGpr/TjL+h5XbfADJMUVfuNQjSrmALY0uJ6Duea2nFSlHv4Br1jLGjIASc/yp8z86+jxf3yFtRlIHKL2I+VBveTGDGOD6tDAHBJkWIa5ct3hNtWW3E3v9Yks+ueWQa707d5oEnIdBecoPi+FG0sMLg2FrndfIiCD6QzCoz5a8aXuijskfF1FZT7S3XOOukeJMVdCvHo8OquOt4L0yeZqV3z7B2vFt0VuKTUWF1OVkY0E+uUSzSHdKAs1PyErUGBkUtF5EkZwSFfRNXwxRTEe5ylMUZ9YcIaNLJKtdJl1STZ8Z/ZnRiFJykhwKi1Mx/JRhgObXfvHGM'
//   };
//   const response = getAxios(u, headers, params);
//
//   return response;
// }
//
// export function postDevSchooling(url, params) {
//   let u = serviceUrl + url;
//   let headers = {
//     'front-sa': EUSER_INFO['frontSa'],
//     'Content-Type' : 'application/json; charset=UTF-8'
//   };
//   const response = postAxios(u, headers, params);
//
//   return response;
// }
