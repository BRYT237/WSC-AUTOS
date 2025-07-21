 import {
    getFirestore,
    collection,
    addDoc,
    doc,
    getDocs,
    deleteDoc,
    updateDoc,
    setDoc
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";

import { getAuth,
         createUserWithEmailAndPassword,
         signInWithEmailAndPassword
        
        } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";


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
  const auth = getAuth(app);
  const DB = getFirestore(app);
  const userColRef = collection(DB, "users");

  const signUpBtn = document.querySelector(".signup");

const SignUp = async () =>{
  const  emailEl = document.getElementById("email");
  const  usernameEl = document.getElementById("username");
const  passwordEl = document.getElementById("password");



  const email =  emailEl .value.trim();
   const password  =   passwordEl .value.trim();
   signUpBtn.textContent = "Signing Up..." 

try {
    const userCredential = await createUserWithEmailAndPassword(auth, email , password );
    const user = await userCredential.user

    const newUser ={
    id: user.uid,
    email: emailEl.value,
    username: usernameEl.value,     
  }
     if (user) {
     window.location.href = "../DASH/dash.html";
      const docRef = doc(userColRef, user.uid);
      await setDoc(docRef, newUser);
      alert("Account Created Sucessfully");
    }
 
 

} catch (error) {
    console.log(error);
}

}

signUpBtn.addEventListener("submit", (e)=>{
  e.preventDefault();
  SignUp();
});




// document.addEventListener("DOMContentLoaded", () => {
//   const emailEl2 = document.getElementById("email2");
//   const passwordEl2 = document.getElementById("password2");
//   const signInBtn = document.getElementById("signin");
//   const formEl = document.getElementById("signinForm");

//   const signIn = async () => {
//     const email = emailEl2.value.trim();
//     const password = passwordEl2.value.trim();
//     signInBtn.textContent = "Signing In...";

//     try {
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       if (user) {
//         alert("Sign in successful!");
//         window.location.href = "../DASH/dash.html";
//       }
//     } catch (error) {
//       console.error("Sign-in error:", error.message);
//       alert("Sign in failed: " + error.message);
//     } finally {
//       signInBtn.textContent = "Sign In";
//     }
//   };

//   formEl.addEventListener("submit", (e) => {
//     e.preventDefault();
//     signIn();
//   });
// });
