
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-analytics.js";
  
  const firebaseConfig = {
    apiKey: "AIzaSyAsfbHv9FIt1o5hzyArlebh0X2n92ZeevQ",
    authDomain: "wsc-autos.firebaseapp.com",
    projectId: "wsc-autos",
    storageBucket: "wsc-autos.firebasestorage.app",
    messagingSenderId: "161409095481",
    appId: "1:161409095481:web:0e82c451534adb6647bae8",
    measurementId: "G-LP02CF98WG"
  };

  
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);


  export{
    app,
  }