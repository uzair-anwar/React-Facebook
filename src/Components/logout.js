import React from "react";
import { useNavigate } from "react-router-dom";
function Logout(userID) {
  const navigate = useNavigate();

  function logOut() {
    localStorage.removeItem("currentUser");
    navigate("/");
  }

  return userID.userID !== null ? (
    <div>
      <button className="logout" type="submit" onClick={() => logOut()}>
        Log Out
      </button>
    </div>
  ) : null;
}

export default Logout;
