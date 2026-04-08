import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// ⚠️ Mantén la URL de ngrok
const API_URL = 'https://unsocialized-unstalemated-corie.ngrok-free.dev';

function TaskForm() {
  const navigate = useNavigate();

  const [titulo, setTitulo] = useState('');
  const [prioridad, setPrioridad] = useState('Baja');
  const [fechaLimite, setFechaLimite] = useState('');
  const [descripcion, setDescripcion] = useState(''); // <-- 1. NUEVO ESTADO
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const nuevaTarea = {
      titulo: titulo,
      prioridad: prioridad,
      estado: 'Pendiente', 
      fechaCreacion: new Date().toISOString(),
      fechaLimite: fechaLimite ? new Date(fechaLimite).toISOString() : null,
      descripcion: descripcion
    };

    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`${API_URL}/api/tareas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true', 
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(nuevaTarea),
      });

      if (response.ok) {
        navigate('/'); 
      } else {
        const data = await response.json();
        setError(data.message || 'Error al guardar la tarea. Revisa los datos.');
      }
    } catch (err) {
      setError('No se pudo conectar. ¿Se ha cerrado el túnel de ngrok?');
    }
  };

  return (
    <div className="form-card" style={{ marginTop: '10px ' }}>
      <h2 className="form-title">Crear Nueva Tarea</h2>

      {error && (
        <div className="alert-message alert-error">
          {error}
        </div>
      )}

      <form className="main-form" onSubmit={handleSubmit}>
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

        {/* 3. NUEVO CAMPO: LA DESCRIPCIÓN CON TEXTAREA */}
        <div className="form-group">
          <label className="form-label">Descripción (Opcional)</label>
          <textarea 
            className="form-input" 
            placeholder="Añade más detalles sobre la tarea..." 
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            maxLength="500"
            rows="4" /* Lo hace más alto que un input normal */
            style={{ resize: 'vertical', fontFamily: 'inherit' }} /* Permite al usuario estirarlo solo hacia abajo */
          />
          {/* Contador de caracteres dinámico */}
          <div style={{ textAlign: 'right', fontSize: '0.8rem', color: 'var(--dark-grey)', marginTop: '4px' }}>
            {descripcion.length} / 500
          </div>
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