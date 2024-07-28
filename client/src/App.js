import Home from "./Pages/home/Home.js";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./Pages/login/Login.js";
import Register from "./Pages/register/Register.js";
import Profile from "./Pages/profile/Profile.js";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext.js";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={user ? <Home /> : <Register />} />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/register"
            element={user ? <Navigate to="/" /> : <Register />}
          />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
