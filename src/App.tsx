import { SignIn, SignedIn, SignedOut } from "@clerk/clerk-react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import RootLayout from "./common_components/RootLayout";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootLayout />}></Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
