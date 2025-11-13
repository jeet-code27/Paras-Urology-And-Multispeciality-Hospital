import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ||  "cast-api-key" ,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||  "cast-auth-domain" ,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ||  " cast-project-id" ,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||  "cast-storage-bucket" ,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ||  "cast-messaging-sender-id" ,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ||  "cast-app-id" ,
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;