import { createContext, useContext, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { getDatabase, ref, set, child, get } from "firebase/database";

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
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
};

// Creating a App instance
const app = initializeApp(firebaseConfig);

// Creating a Auth instance and DB instance Respectively
const auth = getAuth(app);
const dataBase = getDatabase(app);
const dataBaseRef = ref(getDatabase());

const useFireBaseContext = () => {
  const context = useContext(FireBaseContext);
  if (!context) {
    throw new Error("useFireBaseContext must be used within FireBaseProvider");
  }
  return context;
};

const FireBaseProvider = (props: FireBaseProviderProps) => {
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        alert("The onAuthStateChanged is triggered ");
        console.log("The Login triggered with the uuid ---> ", uid);
      } else {
        alert("The user is not found");
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
      }}
    >
      {props.children}
    </FireBaseContext.Provider>
  );
};

// Export everything from this single file
export default FireBaseProvider;
export { useFireBaseContext, FireBaseContext };
