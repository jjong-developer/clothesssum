// import Vue from 'vue'
// import firebase from 'firebase/app'
// import 'firebase/auth'
// import 'firebase/firebase-database'
// import 'firebase/firestore'
// import 'firebase/storage'
// import firebaseConfig from '../../firebase.config'
//
// firebase.initializeApp(firebaseConfig)
//
// Vue.prototype.$firebase = firebase // 전역으로 사용하기 위함

import {isSuperAdmin, superAdmin} from "@/assets/js/common";

console.log("firebase db server load");

import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import firebaseConfig from "../../firebase.config";

export const app = initializeApp(firebaseConfig);
export const dbAuth = getAuth();
export const dbService = getFirestore(app);
export const dbStorage = getStorage(app);
export const googleProvider = new GoogleAuthProvider(); // 구글 간편 로그인 (https://console.cloud.google.com/ 개발자 사이트 등록)
export const facebookProvider = new FacebookAuthProvider(); // 페이스북 간편 로그인 (https://developers.facebook.com/ 개발자 사이트 등록)
