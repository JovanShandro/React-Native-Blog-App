import firebase from "firebase/app";

import "firebase/auth";
import "firebase/database";

let firebaseConfig = {
  apiKey: "AIzaSyDApvCkRf8kWQn5Dsk916OLhySIY1Ujpls",
  authDomain: "blog-app-c714c.firebaseapp.com",
  databaseURL: "https://blog-app-c714c.firebaseio.com",
  projectId: "blog-app-c714c",
  storageBucket: "blog-app-c714c.appspot.com",
  messagingSenderId: "17847927576",
  appId: "1:17847927576:web:dd81ef90aa74db4427946d"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAuth = firebaseApp.auth();
const firebaseDb = firebaseApp.database();

export { firebaseAuth, firebaseDb };
