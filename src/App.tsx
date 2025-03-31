import "./App.css";
import SignUpPage from "./pages/SignUp";
import LogInPage from "./pages/Login";

import { useFireBaseContext } from "./context/FirebaseProvider";

function App() {
  const {
    writeFunction,
    readFunction,
    signUpWithFireBase,
    loginWithFireBase,
    signUpWithGoogle,
    signOutHandle,
    userDetails,
  } = useFireBaseContext();

  return (
    <div>
      <h1>FireBase React</h1>
      <button onClick={writeFunction}>Click to write Data</button>
      <button onClick={readFunction}> Click to Read Data</button>
      <button onClick={signUpWithGoogle}>Sign Up with Google</button>
      <button onClick={signOutHandle}>Sign Out</button>

      {!userDetails && (
        <LogInPage loginWithFireBase={loginWithFireBase}></LogInPage>
      )}
      {!userDetails && (
        <SignUpPage signUpWithFireBase={signUpWithFireBase}></SignUpPage>
      )}

      {userDetails && (
        <h1>You Are Signed in with the Email {userDetails?.email}</h1>
      )}
    </div>
  );
}

export default App;
