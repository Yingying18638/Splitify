import "./App.css";
import RootLayout from "./common_components/RootLayout";
import LandingPage from './pages/landingpage'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import Loading from "./common_components/Loading.jsx"

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
                {/* <LandingPage /> */}
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
