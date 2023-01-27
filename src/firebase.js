import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDM-AdQvs63m7c0QXGwp1cu4xmORxDIEeE",
  authDomain: "hicagong-f6bcb.firebaseapp.com",
  projectId: "hicagong-f6bcb",
  storageBucket: "hicagong-f6bcb.appspot.com",
  messagingSenderId: "1011974124347",
  appId: "1:1011974124347:web:82cf126bb97011946ebd1e",
};

const app = initializeApp(firebaseConfig);
const authService = getAuth(app);
const dbService = getFirestore(app);
const storageService = getStorage(app);
export { app, authService, dbService, storageService };
