import * as firebase from "firebase/app";

const firebaseConfig = JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG || "");
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp;
