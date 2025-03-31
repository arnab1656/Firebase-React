import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDKvlaXtCFn_-8ZShLFe5kFWYNE-Dec2Is",
  authDomain: "arnab-first-app.firebaseapp.com",
  projectId: "arnab-first-app",
  storageBucket: "arnab-first-app.firebasestorage.app",
  messagingSenderId: "961231844531",
  appId: "1:961231844531:web:a75f37dc9e4476c5ececc6",
  databaseURL: "https://arnab-first-app-default-rtdb.firebaseio.com/",
};

export const app = initializeApp(firebaseConfig);
export const dataBase = getDatabase(app);
