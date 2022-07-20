import "./App.css";
import { useState } from "react";
import userContext from "./Context/userContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Main from "./Components/Main";

function App() {
  const [user, setUser] = useState();
  return (
    <BrowserRouter>
      <userContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/main" element={<Main />} />
        </Routes>
      </userContext.Provider>
    </BrowserRouter>
  );
}

export default App;
