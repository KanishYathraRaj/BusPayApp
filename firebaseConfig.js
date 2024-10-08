import { initializeApp } from "firebase/app";
import { getAuth , initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyA-YIpvaNNps3XlNvGhZmPfX5UEaFB1Kak",
  authDomain: "leetcoderoaster-db-d1704.firebaseapp.com",
  projectId: "leetcoderoaster-db-d1704",
  storageBucket: "leetcoderoaster-db-d1704.appspot.com",
  messagingSenderId: "76877381410",
  appId: "1:76877381410:web:4faf7685c06aed2143af7b",
  measurementId: "G-7L4BB1LZ57"
};

// Initialize Firebase
export const firebase_app = initializeApp(firebaseConfig);
export const firebase_db = getFirestore(firebase_app)
let firebase_auth 
if (firebase_auth == 'undefined'){
  firebase_auth = initializeAuth(firebase_app , { persistence: getReactNativePersistence(AsyncStorage) }) 
} else {
  firebase_auth = getAuth(firebase_app)
}
// console.log(firebase_auth)
export {firebase_auth};
// const analytics = getAnalytics(app);