import "./App.css";
import { useState } from "react";
import userContext from "./Context/userContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Main from "./Components/Main";
import Editpost from "./Components/editPost";
import Showpost from "./Components/showComments";
import EditComment from "./Components/editComment";

function App() {
  const [user, setUser] = useState();
  return (
    <BrowserRouter>
      {/* This will be used to store the current loggedIn user into useContext hook
       and which we can access in its child components for restricting unauthorized access
       and for further relevant use cases. */}
      <userContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/posts" element={<Main />} />
          <Route path="/Post/:id" element={<Showpost />} />
          <Route path="/Post/:id/edit" element={<Editpost />} />
          <Route path="/Post/:id/Comment/:id/edit" element={<EditComment />} />
        </Routes>
      </userContext.Provider>
    </BrowserRouter>
  );
}

export default App;
