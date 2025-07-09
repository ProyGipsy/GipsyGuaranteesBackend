import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/styles.css';
import { fetchWithAuth } from '../fetchWithAuth';
import { useSessionTimeout } from '../useSessionTimeout';
import SessionModal from './SessionModal';

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
    fetchWithAuth('http://localhost:8000/current_user/')
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(() => setUser(null));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('session_token');
    localStorage.removeItem('refresh_token');
    navigate('/login');
  };

  const [showSessionModal, setShowSessionModal] = useSessionTimeout(handleLogout);

  return (
    <>
      {showSessionModal && (
        <SessionModal
          onRefresh={() => { window.location.reload(); setShowSessionModal(false); }}
          onLogout={handleLogout}
          onClose={() => setShowSessionModal(false)}
        />
      )}
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
          <div style={{ display: 'flex', gap: '12px', flexDirection: 'row' }}>
            <button className="appButton" onClick={() => navigate('/warranty')}>
              Registrar nueva garantía
            </button>
            {user && user.is_staff && (
              <button className="appButton" onClick={() => navigate('/servicio-tecnico')}>
                Servicio técnico
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;