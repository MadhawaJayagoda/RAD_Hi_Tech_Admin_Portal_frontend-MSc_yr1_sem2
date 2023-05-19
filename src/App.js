import React, { useState, useEffect } from "react";
import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login.jsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userCode, setUserCode] = useState("");

  // Check local storage for login state on component mount
  useEffect(() => {
    const storedLoggedIn = localStorage.getItem("isLoggedIn");
    const storedUserCode = localStorage.getItem("userCode");

    if (storedLoggedIn && storedUserCode) {
      setIsLoggedIn(true);
      setUserCode(storedUserCode);
    }
  }, []);

  return (
    <div className="App">
      {isLoggedIn ? (
        <Home
          userCode={userCode}
          setIsLoggedIn={setIsLoggedIn}
          setUserCode={setUserCode}
        />
      ) : (
        <Login setIsLoggedIn={setIsLoggedIn} setUserCode={setUserCode} />
      )}
    </div>
  );
}

export default App;
