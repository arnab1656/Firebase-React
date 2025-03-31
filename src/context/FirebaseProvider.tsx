import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { getDatabase, ref, set, child, get } from "firebase/database";

import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

interface FireBaseContextProviderType {
  signUpWithFireBase: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => void;
  writeFunction: () => void;
  readFunction: () => void;
  loginWithFireBase: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => void;
  signUpWithGoogle: () => void;
  signOutHandle: () => void;
  userDetails: User | null;
}

interface FireBaseProviderProps {
  children: React.ReactNode;
}

const FireBaseContext = createContext<FireBaseContextProviderType | null>(null);

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
};

// Creating a App instance
const app = initializeApp(firebaseConfig);

// Creating a Auth instance and DB instance Respectively
const auth = getAuth(app);
const dataBase = getDatabase(app);
const dataBaseRef = ref(getDatabase());

const provider = new GoogleAuthProvider();

const useFireBaseContext = () => {
  const context = useContext(FireBaseContext);
  if (!context) {
    throw new Error("useFireBaseContext must be used within FireBaseProvider");
  }
  return context;
};

const FireBaseProvider = (props: FireBaseProviderProps) => {
  const [userDetails, setUserDetails] = useState<User | null>(null);

  const writeFunction = () => {
    set(ref(dataBase, "users/arnab"), {
      username: "Arnab Paul",
      email: "arnab.paul.1656@gmail.com",
      age: 27,
    });
  };

  const readFunction = () => {
    get(child(dataBaseRef, `users/arnab`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const signUpWithFireBase = ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert("The user is Created");
        const user = userCredential.user;
        console.log("The user Credentials --->", user);
      })
      .catch((error) => {
        console.log("The errror in sign Up", error);
        alert("The Error while Crearing user");
      });
  };

  const loginWithFireBase = ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        alert("Login Success");
        console.log("The login User details ", user);
      })
      .catch((error) => {
        alert("Failed to Login ");
        console.log("Failed to Login Details --->", error);
      });
  };

  const signUpWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;

        alert(`Successfully signed up with email: ${user.email}`);
        console.log("Token and User--->", credential?.accessToken, user);
      })
      .catch((error) => {
        alert("Google Signup Failed");
        console.log(error);

        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);

        console.log("Email and Credential--->", email, credential);
      });
  };

  const signOutHandle = () => {
    signOut(auth)
      .then(() => {
        alert("Sign Out Succesfull");
      })
      .catch((error) => {
        alert("Sign Out UnSuccesfull");
        console.log("Sign Out UnSuccesfull error", error);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUserDetails(user);
        console.log("user frpo mthe onAuthStateChanged", user);
        alert("The User is Authenticated and onAuthStateChanged triggered");
        console.log("The Login triggered with the uuid ---> ", uid);
      } else {
        setUserDetails(null);
        alert("The User is not Authenticated");
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <FireBaseContext.Provider
      value={{
        signUpWithFireBase,
        writeFunction,
        readFunction,
        loginWithFireBase,
        signUpWithGoogle,
        signOutHandle,
        userDetails,
      }}
    >
      {props.children}
    </FireBaseContext.Provider>
  );
};

// Export everything from this single file
export default FireBaseProvider;
export { useFireBaseContext, FireBaseContext };
