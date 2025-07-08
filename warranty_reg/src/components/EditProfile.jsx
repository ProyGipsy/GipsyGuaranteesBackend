import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/styles.css';

const EditProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ firstName: '', lastName: '', email: '', address: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('session_token');
    if (!token) {
      navigate('/login');
      return;
    }
    fetch('http://localhost:8000/current_user/', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(() => setUser({ firstName: '', lastName: '', email: '', address: '' }));
  }, [navigate]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    const token = localStorage.getItem('session_token');
    try {
      const response = await fetch('http://localhost:8000/edit_profile/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('Perfil actualizado correctamente.');
      } else {
        setMessage(data.message || 'Error al actualizar el perfil.');
      }
    } catch (error) {
      setMessage('Error de conexión con el servidor.');
    }
  };

  return (
    <div className="cardContainer">
      <h2>Editar Perfil</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="Nombre"
          value={user.firstName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Apellido"
          value={user.lastName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={user.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Dirección"
          value={user.address || ''}
          onChange={handleChange}
        />
        <button type="submit">Guardar cambios</button>
      </form>
      {message && <p>{message}</p>}
      <button className="appButton" onClick={() => navigate('/home')}>Volver</button>
    </div>
  );
};

export default EditProfile;
