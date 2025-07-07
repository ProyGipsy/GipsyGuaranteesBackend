import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Example: check for a token in localStorage (adjust as needed for your auth logic)
    const token = localStorage.getItem('session_token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="home-container">
      <h1>Bienvenido a la página principal</h1>
      <p>¡Has iniciado sesión correctamente!</p>
    </div>
  );
};

export default Home;
