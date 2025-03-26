import { Platform, PermissionsAndroid } from "react-native";
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { MMKV } from 'react-native-mmkv';

// Initialize MMKV
const storage = new MMKV();
console.log(config.FIREBASE_API_KEY,"process.env.FIREBASE_API_KEY");
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: config.FIREBASE_API_KEY,
  authDomain: config.FIREBASE_AUTH_DOMAIN,
  projectId: config.FIREBASE_PROJECT_ID,
  storageBucket: config.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: config.FIREBASE_MESSAGING_SENDER_ID,
  appId: config.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication with MMKV persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(storage)
});
