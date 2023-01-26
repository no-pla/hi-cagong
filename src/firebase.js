import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyApXqfClX9B93pT0kGVgoQlmTC1vkR8w_c',
  authDomain: 'hicagong.firebaseapp.com',
  projectId: 'hicagong',
  storageBucket: 'hicagong.appspot.com',
  messagingSenderId: '890667475492',
  appId: '1:890667475492:web:8b52a7c1a893907b256eb1',
};

const app = initializeApp(firebaseConfig);
const authService = getAuth(app);
const dbService = getFirestore(app);
const storageService = getStorage(app);
export { app, authService, dbService, storageService };
