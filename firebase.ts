import { initializeApp, getApps } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyDa6dL31mGbWADPe41b-2pB7Z8X9xCyq14",
  authDomain: "argon-firebase-fc798.firebaseapp.com",
  projectId: "argon-firebase-fc798",
  storageBucket: "argon-firebase-fc798.appspot.com",
  messagingSenderId: "403920125858",
  appId: "1:403920125858:web:2f691caee98c72ce09fcfb",
  measurementId: "G-1CGNPTC370"
};

// Initialize Firebase
const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export default firebaseApp;