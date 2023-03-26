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

import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import firebaseConfig from '../../firebase.config'

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };

console.log("firebase db server load");
