import React, { useCallback } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Warranty from './components/Warranty';
import EditProfile from './components/EditProfile';
import ForgotPassword from './components/ForgotPassword';
import SessionModal from './components/SessionModal';
import { useSessionTimeout } from './useSessionTimeout';

function AppRoutes() {
  const navigate = useNavigate();
  const handleLogout = useCallback(() => {
    localStorage.removeItem('session_token');
    navigate('/login');
  }, [navigate]);

  const handleRefresh = useCallback(async () => {
    const refresh = localStorage.getItem('refresh_token');
    if (!refresh) {
      handleLogout();
      return;
    }
    try {
      const res = await fetch('http://localhost:8000/token/refresh/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh })
      });
      const data = await res.json();
      if (res.ok && data.access) {
        localStorage.setItem('session_token', data.access);
        window.location.reload();
      } else {
        handleLogout();
      }
    } catch {
      handleLogout();
    }
  }, [handleLogout]);

  const [showSessionModal, setShowSessionModal] = useSessionTimeout(handleLogout, handleRefresh);

  return (
    <>
      {showSessionModal && (
        <SessionModal
          onRefresh={() => { handleRefresh(); setShowSessionModal(false); }}
          onLogout={handleLogout}
          onClose={() => setShowSessionModal(false)}
        />
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/warranty" element={<Warranty />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}