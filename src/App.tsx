import "./App.css";
import { getDatabase, ref, set, child, get } from "firebase/database";
import { app } from "./firebase";

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

function App() {
  return (
    <div>
      <h1>FireBase React</h1>
      <button onClick={writeFunction}>Click to write Data</button>
      <button onClick={readFunction}> Click to Read Data</button>
    </div>
  );
}

export default App;
