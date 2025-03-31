import "./App.css";
import SignUpPage from "./pages/SignUp";
import LogInPage from "./pages/Login";

import { useFireBaseContext } from "./context/FirebaseProvider";

function App() {
  const { writeFunction, readFunction, signUpWithFireBase, loginWithFireBase } =
    useFireBaseContext();

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
