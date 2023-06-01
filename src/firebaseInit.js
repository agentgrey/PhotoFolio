// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_xXIyGJt4HvhlZu7ZzdWJyfXiKJPezUc",
  authDomain: "photofolio-9a969.firebaseapp.com",
  projectId: "photofolio-9a969",
  storageBucket: "photofolio-9a969.appspot.com",
  messagingSenderId: "294951305352",
  appId: "1:294951305352:web:e3abc968c0b556d4bd5f3d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export {db};