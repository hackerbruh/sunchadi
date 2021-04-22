import fb from "firebase";

fb.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
});

fb.app();

fb.firestore().settings({
  timestampsInSnapshots: true
});

export const provider = new fb.auth.EmailAuthProvider();
export const auth = fb.auth();
export const firebase = fb;

export default fb.firestore();
