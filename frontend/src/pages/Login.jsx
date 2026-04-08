import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
 
// URL base de la API, cambiar cuando ngrok cambie de URL

const API_URL = 'https://unsocialized-unstalemated-corie.ngrok-free.dev';
 
function Login() {

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

  const navigate = useNavigate();
 
  const handleSubmit = async (e) => {

    e.preventDefault();

    setError('');
 
    try {

      const response = await fetch(`${API_URL}/api/auth/login`, {

        method: 'POST',

        headers: {

          'Content-Type': 'application/json',

          // Header necesario para que ngrok no bloquee la petición

          'ngrok-skip-browser-warning': 'true',

        },

        body: JSON.stringify({

          // Tu UsuarioDto espera "username" y "password"

          username: email,

          password: password,

        }),

      });
 
      if (response.ok) {

        // Tu AuthController devuelve el token directamente como string

        const token = await response.text();

        localStorage.setItem('token', token);

        navigate('/');

      } else {

        const msg = await response.text();

        setError(msg || 'Credenciales incorrectas');

      }

    } catch (err) {

      setError('No se pudo conectar con el servidor. ¿Está encendido el Back?');

    }

  };
 
  return (
<div className="auth-container">
<div className="form-card">
<h2 className="form-title">Iniciar Sesión</h2>
 
        {error && <p style={{ color: 'red', textAlign: 'center', fontSize: '14px' }}>{error}</p>}
 
        <form className="main-form" onSubmit={handleSubmit}>
<div className="form-group">
<label className="form-label">Correo Corporativo</label>
<input

              type="email"

              className="form-input"

              placeholder="usuario@kyocera.es"

              value={email}

              onChange={(e) => setEmail(e.target.value)}

              required

            />
</div>
 
          <div className="form-group">
<label className="form-label">Contraseña</label>
<input

              type="password"

              className="form-input"

              placeholder="••••••••"

              value={password}

              onChange={(e) => setPassword(e.target.value)}

              required

            />
</div>
 
          <button

            type="submit"

            className="btn-primary"

            style={{ marginTop: '10px', width: '100%', border: 'none', cursor: 'pointer' }}
>

            Entrar al Gestor
</button>
</form>
</div>
</div>

  );

}
 
export default Login;
 