import "./App.css";
import { getDatabase, ref, set, child, get } from "firebase/database";
import { app } from "./firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import SignUpPage from "./pages/SignUp";
import LogInPage from "./pages/Login";
import React from "react";

// Getting the Reference of the auth from the getAuth function
const auth = getAuth(app);

const dataBase = getDatabase(app);
const dataBaseRef = ref(getDatabase());

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

function App() {
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        alert("The onAuthStateChanged is triggered ");
        console.log("The Login triggered with the uuid ---> ", uid);
      } else {
        alert("The user is not found");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h1>FireBase React</h1>
      <button onClick={writeFunction}>Click to write Data</button>
      <button onClick={readFunction}> Click to Read Data</button>

      <LogInPage loginWithFireBase={loginWithFireBase}></LogInPage>
      <SignUpPage signUpWithFireBase={signUpWithFireBase}></SignUpPage>
    </div>
  );
}

export default App;
