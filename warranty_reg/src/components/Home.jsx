import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/styles.css';

const Home = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('session_token');
    if (!token) {
      navigate('/login');
      return;
    }
    // Fetch user info
    fetch('http://localhost:8000/current_user/', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(() => setUser(null));
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
        <h2>Bienvenido, {user ? user.firstName : ''}</h2>
        <p>¡Has iniciado sesión correctamente!</p>
        <button className="appButton" onClick={() => navigate('/warranty')}>
          Registrar nueva garantía
        </button>
      </div>
    </div>
  );
};

export default Home;