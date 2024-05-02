import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ClerkProvider, ClerkLoading } from "@clerk/clerk-react";
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <ClerkLoading>
        <div className="text-md bg-[#fefae0] w-full h-[100vh]">Loading...</div>
      </ClerkLoading>
      <App />
    </ClerkProvider>
  </React.StrictMode>
);
