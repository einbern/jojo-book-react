import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  // Navigate,
} from "react-router-dom";
import Register from "./pages/register/Register";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import Profile from "./pages/profile/Profile";
import Friend from "./pages/friend/Friend";
import Messenger from "./pages/messenger/Messenger";

function App() {
  const {user} = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route path="/" exact element={user ? <Home/> : <Login/>}/>
        <Route path="/login" element={user ? <Navigate to="/"/> : <Login/>}/>
        <Route path="/register" element={user ? <Navigate to="/"/> : <Register/>}/>
        <Route path="/profile/:username" element={user ? <Profile/> : <Navigate to="/"/>}/>
        <Route path="/friend" element={user ? <Friend/> : <Navigate to="/"/>}/>
        <Route path="/friend/:username" element={user ? <Friend/> : <Navigate to="/"/>}/>
        <Route path="/messenger" element={user ? <Messenger/> : <Navigate to="/"/>}/>
      </Routes>
    </Router>
  );
}

export default App;
