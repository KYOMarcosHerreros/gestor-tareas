import React, { useState } from 'react';

import { useNavigate, Link } from 'react-router-dom';
 
// URL base de la API (Asegúrate de que sea la de tu ngrok actual)

const API_URL = 'https://unsocialized-unstalemated-corie.ngrok-free.dev';
 
function Login() {

  const [email, setEmail] = useState(''); // Lo usamos como username

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

          // IMPORTANTE: Tu Backend (UsuarioDto) espera "username"

          // Pasamos el estado 'email' a la propiedad 'username'

          username: email, 

          password: password,

        }),

      });
 
      if (response.ok) {

        // Tu AuthController devuelve el token directamente como string (text)

        const token = await response.text();
 
        // Guardamos el token en el almacenamiento local del navegador

        localStorage.setItem('token', token);
 
        // Si el login es correcto, navegamos a la raíz (donde están las tareas)

        navigate('/');

      } else {

        // Intentamos leer el error que envíe el API

        const msg = await response.text();

        setError(msg || 'Usuario o contraseña incorrectos');

      }

    } catch (err) {

      console.error(err);

      setError('No se pudo conectar con el servidor. ¿Está encendido el Backend?');

    }

  };
 
  return (
<div className="auth-container">
<div className="form-card">
<h2 className="form-title">Iniciar Sesión</h2>
 
        {/* Mensajes de error */}

        {error && (
<div className="alert-message alert-error">

            {error}
</div>

        )}
 
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

            style={{ 

              marginTop: '10px', 

              width: '100%', 

              border: 'none', 

              cursor: 'pointer',

              padding: '12px',

              borderRadius: '4px',

              backgroundColor: '#0056b3',

              color: 'white',

              fontWeight: 'bold'

            }}
>

            Entrar al Gestor
</button>
 
          <div className="auth-footer-text" style={{ marginTop: '15px', textAlign: 'center' }}>

            ¿No eres usuario? <Link to="/registro" className="auth-footer-link">Regístrate aquí</Link>
</div>
</form>
</div>
</div>

  );

}
 
export default Login;
 