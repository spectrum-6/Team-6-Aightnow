import { getApps, initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import {
  browserSessionPersistence,
  getAuth,
  setPersistence,
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Firebase 앱이 이미 초기화되지 않았다면 초기화합니다.
const firebasedb = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApps()[0];
let analytics;

if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(firebasedb);
    }
  });
}

const firestore = getFirestore(firebasedb);
const auth = getAuth(firebasedb);

// 브라우저 세션 동안만 인증 상태를 유지하도록 설정
setPersistence(auth, browserSessionPersistence);

export { firebasedb, firestore, auth, analytics };
