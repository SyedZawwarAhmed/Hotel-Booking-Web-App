import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homescreen from "./screens/Homescreen";
import Bookingscreen from "./screens/Bookingscreen";
import Signinscreen from "./screens/Signinscreen";
import Signupscreen from "./screens/Signupscreen";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/home" exact element={<Homescreen />} />
          <Route path="/booking/:roomid/:toDate/:fromDate" exact element={<Bookingscreen />} />
          <Route path="/user/signup"  element={<Signupscreen />} />
          <Route path="/user/signin"  element={<Signinscreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
