import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function TaskForm() {
  const navigate = useNavigate();

  // 1. Estados para atrapar lo que el usuario escribe
  const [titulo, setTitulo] = useState('');
  const [prioridad, setPrioridad] = useState('Baja');
  const [fechaLimite, setFechaLimite] = useState('');
  const [error, setError] = useState('');

  // 2. Función que envía la tarea al túnel
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Preparamos el paquete de datos (JSON)
    const nuevaTarea = {
      titulo: titulo,
      prioridad: prioridad,
      estado: 'Pendiente', 
      fechaCreacion: new Date().toISOString(),
      fechaLimite: fechaLimite ? new Date(fechaLimite).toISOString() : null
    };

    try {
      const token = localStorage.getItem('token');

      const response = await fetch('https://unsocialized-unstalemated-corie.ngrok-free.dev/api/tareas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true', 
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(nuevaTarea),
      });

      if (response.ok) {
        navigate('/'); // Nos vamos directamente a la lista
      } else {
        const data = await response.json();
        setError(data.message || 'Error al guardar la tarea. Revisa los datos.');
      }
    } catch (err) {
      setError('No se pudo conectar. ¿Se ha cerrado el túnel de ngrok?');
    }
  };

  return (
    <div className="form-card" style={{ marginTop: '40px' }}>
      <h2 className="form-title">Crear Nueva Tarea</h2>

      {/* SOLO DEJAMOS EL MENSAJE DE ERROR */}
      {error && (
        <div className="alert-message alert-error">
          {error}
        </div>
      )}

      <form className="main-form" onSubmit={handleSubmit}>
        {/* ... el resto de tus inputs de titulo, prioridad y fecha quedan exactamente igual ... */}
        <div className="form-group">
          <label className="form-label">Título de la tarea</label>
          <input 
            type="text" 
            className="form-input" 
            placeholder="Ej: Preparar informe trimestral" 
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Prioridad</label>
          <select 
            className="form-input"
            value={prioridad}
            onChange={(e) => setPrioridad(e.target.value)}
          >
            <option value="Baja">Baja</option>
            <option value="Media">Media</option>
            <option value="Alta">Alta</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Fecha Límite</label>
          <input 
            type="date" 
            className="form-input" 
            value={fechaLimite}
            onChange={(e) => setFechaLimite(e.target.value)}
            required
          />
        </div>

        <div className="form-actions">
          <Link to="/" className="btn-icon" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            Cancelar
          </Link>
          <button type="submit" className="btn-primary">
            Guardar Tarea
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;