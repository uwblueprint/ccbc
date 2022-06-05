import * as firebase from "firebase/app";

// It is ok to expose apiKey as per this slack article: https://stackoverflow.com/questions/37482366/is-it-safe-to-expose-firebase-apikey-to-the-public
const firebaseConfig =
  process.env.REACT_APP_NODE_ENV === "production"
    ? {
        apiKey: "AIzaSyAjB4g5t5AnVGUE3N9o-z4ltVhsjRkEz4w",
        authDomain: "ccbc-production.firebaseapp.com",
        projectId: "ccbc-production",
        storageBucket: "ccbc-production.appspot.com",
        messagingSenderId: "608032211266",
        appId: "1:608032211266:web:5788c7cde21ef0461d48db",
      }
    : {
        apiKey: "AIzaSyAwNMIWzK0LJfrC3JOefMynqnO4ICCtyoo",
        authDomain: "ccbc-95e66.firebaseapp.com",
        projectId: "ccbc-95e66",
        storageBucket: "ccbc-95e66.appspot.com",
        messagingSenderId: "692152917263",
        appId: "1:692152917263:web:42872c64b84155d682f27a",
      };

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp;
