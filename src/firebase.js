// Import Firebase SDK
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbLYlnsq7fRRyhpEBSSwNgrWRblvKYBYU",
  authDomain: "notepilot-app.firebaseapp.com",
  projectId: "notepilot-app",
  storageBucket: "notepilot-app.appspot.com",
  messagingSenderId: "356117391394",
  appId: "1:356117391394:web:f2f70cde5ccae8cfcde27b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
