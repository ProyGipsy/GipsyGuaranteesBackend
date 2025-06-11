import React, { useState } from 'react';
import './loginStyle.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Send data to Flask backend using fetch or axios
    console.log({ username, password });
  };

  return (
    <div className="login-container">
      <h2>Registro de Garantías</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Usuario"
          required
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Iniciar Sesión</button>
      </form>
      <p>
        ¿No tienes una cuenta? <a href="/register">Regístrate</a>
      </p>
    </div>
  );
}

export default Login;