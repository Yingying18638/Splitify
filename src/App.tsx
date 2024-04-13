import "./App.css";
import Header from "./common components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Mainpage from "./pages/mainpage/";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route path="main" element={<Mainpage />}></Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
