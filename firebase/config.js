import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// this approach is for VITE, change it according to your framework

const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,

  authDomain: import.meta.env.VITE_authDomain,

  projectId: import.meta.env.VITE_projectId,

  storageBucket: import.meta.env.VITE_storageBucket,

  messagingSenderId: import.meta.env.VITE_messagingSenderId,

  appId: import.meta.env.VITE_appId,
};

// initializes the app with the given config
const app = initializeApp(firebaseConfig);

// exports the auth module for further use
export const auth = getAuth(app);
