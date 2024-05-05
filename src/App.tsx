import "./App.css";
import RootLayout from "./common_components/RootLayout";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <SignedIn>
                <RootLayout children="signedIn" />
              </SignedIn>
              <SignedOut>
                <RootLayout />
              </SignedOut>
            </>
          }
        ></Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
