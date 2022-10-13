// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-G3Jr-mWKnff2Jkpd2W_CCrkgh_D3PAY",
  authDomain: "slowtape-dcf48.firebaseapp.com",
  projectId: "slowtape-dcf48",
  storageBucket: "slowtape-dcf48.appspot.com",
  messagingSenderId: "41148374480",
  appId: "1:41148374480:web:26ddb70d64fd14b535edd5",
  measurementId: "G-BCHVEVF7GP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);
export default storage;
