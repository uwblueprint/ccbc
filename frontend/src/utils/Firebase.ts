import * as firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAwNMIWzK0LJfrC3JOefMynqnO4ICCtyoo",
  authDomain: "ccbc-95e66.firebaseapp.com",
  projectId: "ccbc-95e66",
  storageBucket: "ccbc-95e66.appspot.com",
  messagingSenderId: "692152917263",
  appId: "1:692152917263:web:42872c64b84155d682f27a",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp;
