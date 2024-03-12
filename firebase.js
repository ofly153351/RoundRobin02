// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC3dALwksVdGF_apsdyXMpxRVHcl1RktO0",
  authDomain: "roundrobin-45e2d.firebaseapp.com",
  projectId: "roundrobin-45e2d",
  storageBucket: "roundrobin-45e2d.appspot.com",
  messagingSenderId: "955113936034",
  appId: "1:955113936034:web:99970a4b9837ac487133fb",
  measurementId: "G-RXQT845GF6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);