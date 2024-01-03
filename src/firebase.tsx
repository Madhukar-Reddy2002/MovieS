import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBlvzTWgfZMQP92DiGGaloiVTwooFBWM2k",
    authDomain: "movies-8f945.firebaseapp.com",
    projectId: "movies-8f945",
    storageBucket: "movies-8f945.appspot.com",
    messagingSenderId: "373499765520",
    appId: "1:373499765520:web:8565a7fe75a20704ec7b95",
    measurementId: "G-WN1S9KX3SE"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
