import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import FireBaseProvider from "./context/FirebaseProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FireBaseProvider>
      <App />
    </FireBaseProvider>
  </StrictMode>
);
