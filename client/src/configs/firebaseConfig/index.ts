// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// TODO: use process.env
// const firebaseConfig = {
//     apiKey:process.env.REACT_APP_apiKey,
//     authDomain:process.env.REACT_APP_authDomain ,
//     projectId: process.env.REACT_APP_projectId,
//     storageBucket: process.env.REACT_APP_storageBucket,
//     messagingSenderId: process.env.REACT_APP_messagingSenderId,
//     appId:process.env.REACT_APP_appId
//   };

const firebaseConfig = {
  apiKey: "AIzaSyCyHdPbO2dQr4W7Cyldmop0hntW3P-_SRg",
  authDomain: "brainbuildingapp.firebaseapp.com",
  projectId: "brainbuildingapp",
  storageBucket: "brainbuildingapp.appspot.com",
  messagingSenderId: "713949332165",
  appId: "1:713949332165:web:10c202504b6f2ac94ae6ac",
  measurementId: "G-643WMQ2450",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});
const fireDB = getFirestore(app);
// const analytics = getAnalytics(app);

export { auth, provider, fireDB };
