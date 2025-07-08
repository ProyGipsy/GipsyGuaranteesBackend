import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/styles.css';

const Home = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('session_token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('session_token');
    navigate('/login');
  };

  return (
    <div className="menuContainer">
      <div className="menuBar">
        <button className="menuToggle" onClick={() => setMenuOpen(!menuOpen)}>
          &#128100;
        </button>
        {menuOpen && (
          <div className="menuDropdown">
            <button onClick={() => { setMenuOpen(false); navigate('/edit-profile'); }}>Editar perfil</button>
            <button onClick={handleLogout}>Cerrar sesión</button>
          </div>
        )}
      </div>
      <div className="cardContainer">
        <h1>Bienvenido a la página principal</h1>
        <p>¡Has iniciado sesión correctamente!</p>
        <button className="appButton" onClick={() => navigate('/warranty')}>
          Registrar nueva garantía
        </button>
      </div>
    </div>
  );
};

export default Home;
