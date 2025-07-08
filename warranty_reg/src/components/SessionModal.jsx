import React from 'react';

export default function SessionModal({ onRefresh, onLogout, onClose }) {
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      background: 'rgba(0,0,0,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
    }}>
      <div style={{
        background: '#fff', borderRadius: 10, padding: 32, minWidth: 320, boxShadow: '0 4px 24px rgba(0,0,0,0.18)', textAlign: 'center'
      }}>
        <h3>Sesión a punto de expirar</h3>
        <p>¿Deseas extender tu sesión?</p>
        <div style={{ display: 'flex', gap: 16, marginTop: 24, justifyContent: 'center' }}>
          <button style={{ background: '#007BFF', color: '#fff', border: 'none', borderRadius: 6, padding: '10px 18px', cursor: 'pointer', fontWeight: 500 }} onClick={onRefresh}>Extender sesión</button>
          <button style={{ background: '#eee', color: '#333', border: 'none', borderRadius: 6, padding: '10px 18px', cursor: 'pointer', fontWeight: 500 }} onClick={onLogout}>Cerrar sesión</button>
        </div>
        <button style={{ marginTop: 18, background: 'none', border: 'none', color: '#007BFF', cursor: 'pointer' }} onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}
