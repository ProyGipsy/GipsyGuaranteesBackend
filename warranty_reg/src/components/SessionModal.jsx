import React from 'react';

export default function SessionModal({ onRefresh, onLogout, onClose }) {
  // Wrap the handlers to close the modal after the action
  const handleRefresh = () => {
    onRefresh();
    onClose();
  };
  const handleLogout = () => {
    onLogout();
    onClose();
  };
  return (
    <div className="session-modal-overlay">
      <div className="session-modal-box">
        <h3>Sesión a punto de expirar</h3>
        <p>¿Deseas extender tu sesión?</p>
        <div className="session-modal-actions">
          <button className="session-modal-btn-primary" onClick={handleRefresh}>Extender sesión</button>
          <button className="session-modal-btn-secondary" onClick={handleLogout}>Cerrar sesión</button>
        </div>
      </div>
    </div>
  );
}
