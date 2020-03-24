import * as firebase from "firebase/app";

import "firebase/auth";
import "firebase/database";

let firebaseConfig = {
  apiKey: "AIzaSyD067GEGRdeTiofnUXVYL-9tX0YXx5VCCw",
  authDomain: "contact-list-a6533.firebaseapp.com",
  databaseURL: "https://contact-list-a6533.firebaseio.com",
  projectId: "contact-list-a6533",
  storageBucket: "contact-list-a6533.appspot.com",
  messagingSenderId: "1023325700306",
  appId: "1:1023325700306:web:f26087382ecde1ab316d0b"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAuth = firebaseApp.auth();
const firebaseDb = firebaseApp.database();

export { firebaseAuth, firebaseDb };
