import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuth } from "./useAuth";
import Login from "./components/Login";
import VideoList from "./components/VideoList";
import Header from "./components/Header";
import "./App.css";

function AppContent() {
  const { isAuthenticated, login, logout } = useAuth();

  return (
    <div className="App">
      {isAuthenticated && <Header logout={logout} />}
      <main className="container">
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/videos" />
              ) : (
                <Login login={login} />
              )
            }
          />
          <Route
            path="/videos"
            element={isAuthenticated ? <VideoList /> : <Navigate to="/" />}
          />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
