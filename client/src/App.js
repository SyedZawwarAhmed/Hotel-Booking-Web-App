import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homescreen from "./screens/Homescreen";
import Bookingscreen from "./screens/Bookingscreen";
import Signinscreen from "./screens/Signinscreen";
import Signupscreen from "./screens/Signupscreen";
import Profilescreen from "./screens/Profilescreen";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/home" exact element={<Homescreen />} />
          <Route path="/booking/:roomid/:fromDate/:toDate" exact element={<Bookingscreen />} />
          <Route path="/user/signup"  element={<Signupscreen />} />
          <Route path="/user/signin"  element={<Signinscreen />} />
          <Route path="/user/profile" element={<Profilescreen />} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
