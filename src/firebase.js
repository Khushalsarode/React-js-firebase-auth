import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut, // Rename the imported function to avoid conflict with the variable name
  onAuthStateChanged,
} from "firebase/auth";

const FirebaseContext = createContext(null);

const firebaseConfig = {
  // Add your Firebase configuration here
  //best create a .env file and add the following
  REACT_APP_FIREBASE_API_KEY="your_api_key",
  REACT_APP_FIREBASE_AUTH_DOMAIN="your_auth_domain",
  REACT_APP_FIREBASE_PROJECT_ID="your_project_id",
  REACT_APP_FIREBASE_STORAGE_BUCKET="your_storage_bucket",
  REACT_APP_FIREBASE_MESSAGING_SENDER_ID="your_messaging_sender_id",
  REACT_APP_FIREBASE_APP_ID="your_app_id",
  };

export const useFirebase = () => useContext(FirebaseContext);

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });

    return () => unsubscribe();
  }, []);

  const signupUserWithEmailAndPassword = (email, password) =>
    createUserWithEmailAndPassword(firebaseAuth, email, password);

  const signinUserWithEmailAndPassword = (email, password) =>
    signInWithEmailAndPassword(firebaseAuth, email, password);

  const signinWithGoogle = () => signInWithPopup(firebaseAuth, googleProvider);

  const signOut = () => firebaseSignOut(firebaseAuth); // Define the signOut function

  return (
    <FirebaseContext.Provider
      value={{
        signupUserWithEmailAndPassword,
        signinUserWithEmailAndPassword,
        signinWithGoogle,
        signOut, // Include the signOut function in the context value
        user,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
