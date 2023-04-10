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

import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
import firebaseConfig from "../../firebase.config";

export const app = initializeApp(firebaseConfig);
export const dbAuth = getAuth();
export const dbService = getFirestore(app);
export const dbStorage = getStorage(app);

console.log("firebase db server load");

