import * as firebase from "firebase/app";

import "firebase/auth";
import "firebase/database";

let firebaseConfig = {
  apiKey: "Put Yours here",
  authDomain: "Put Yours here",
  databaseURL: "Put Yours here",
  projectId: "Put Yours here",
  storageBucket: "Put Yours here",
  messagingSenderId: "Put Yours here",
  appId: "Put Yours here"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAuth = firebaseApp.auth();
const firebaseDb = firebaseApp.database();

export { firebaseAuth, firebaseDb };
