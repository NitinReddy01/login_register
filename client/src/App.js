import Login from "./Components/Login";
import "./App.css";
import Register from "./Components/Register";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Homepage from "./Components/Homepage";
import UserInfo from "./Components/Users";
import Update from "./Components/Udpate";

function App() {
  const [loginUser, setLoginUser] = useState({});
  return (
    <Router>
      <Routes>
        {/* if the user is logged in then hompage will be displayed else login page */}
        <Route path="/" element={(loginUser && loginUser._id) ? <Homepage setLoginUser={setLoginUser} /> : <><Login setLoginUser={setLoginUser} /></>} />
        <Route path="/login" element={<><Login setLoginUser={setLoginUser} /></>} />
        <Route path="/register" element={<><Register /></>} />
        <Route path="/allUsers" element={<><UserInfo /></>} />
        <Route path="/update/:id" element={<><Update /></>} />
      </Routes>
    </Router>
  );
}

export default App;
