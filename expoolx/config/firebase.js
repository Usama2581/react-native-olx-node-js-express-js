import { createUserWithEmailAndPassword } from "firebase/auth";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { addDoc, collection } from "firebase/firestore";
import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'



const firebaseConfig = {
  apiKey: "AIzaSyC8vG7Cw92cfVM0PssVeYS0DXfqREUbqXU",
  authDomain: "olx-rn-6fde4.firebaseapp.com",
  projectId: "olx-rn-6fde4",
  storageBucket: "olx-rn-6fde4.appspot.com",
  messagingSenderId: "413166615018",
  appId: "1:413166615018:web:40880e5e824e5a698b1a93",
  measurementId: "G-J6C8PYK9V1"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app);
const db = getFirestore(app);
// const storage = getStorage();



async function login(email, password) {

  await signInWithEmailAndPassword(auth, email, password)

}


async function register(form) {

  let { name, email, password } = form
  await createUserWithEmailAndPassword(auth, email, password)

  await addDoc(collection(db, "users"), {
    name, email, password
  });

 
}
  


export {
  login,
  register,
  firebase,
  app
}