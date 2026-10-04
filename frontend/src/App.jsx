import { useState } from "react";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Kandidat from "./components/Kandidat";
import "./App.css";

function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    const savedSiswa = localStorage.getItem("siswa");
    return savedSiswa ? JSON.parse(savedSiswa) : null;
  });

  const [currentView, setCurrentView] = useState("landing");

  const handleLoginSuccess = (siswaData) => {
    setCurrentUser(siswaData);
  };

  const handleLogout = () => {
    localStorage.removeItem("siswa");
    setCurrentUser(null);
    setCurrentView("landing");
  };

  return (
    <div className="app">
      {currentUser ? (
        <Kandidat
          currentUser={currentUser}
          onLogout={handleLogout}
          onUpdateUser={(updated) => setCurrentUser(updated)}
        />
      ) : currentView === "login" ? (
        <Login
          onLoginSuccess={handleLoginSuccess}
          onBackToHome={() => setCurrentView("landing")}
        />
      ) : (
        <LandingPage onGoToLogin={() => setCurrentView("login")} />
      )}
    </div>
  );
}

export default App;