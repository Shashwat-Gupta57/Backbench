import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAYnd63Dwmhq0F-AWlWo1nTmoYX9TPO9DM",
  authDomain: "backbench-ef95e.firebaseapp.com",
  databaseURL: "https://backbench-ef95e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "backbench-ef95e",
  storageBucket: "backbench-ef95e.firebasestorage.app",
  messagingSenderId: "806379718696",
  appId: "1:806379718696:web:14924eda0e2f548f344d1d",
  measurementId: "G-TZMVVSH1FJ"
};

// Initialize Firebase exactly once
export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);
