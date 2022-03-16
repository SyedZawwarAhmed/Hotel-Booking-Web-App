import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homescreen from "./screens/Homescreen";
import Bookingscreen from "./screens/Bookingscreen";

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/home" exact element={<Homescreen />} />
          <Route path="/booking/:roomid" exact element={<Bookingscreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
