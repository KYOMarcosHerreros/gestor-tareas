import React from 'react';
import { Link } from 'react-router-dom';

function TaskForm() {
  return (
    <div className="form-card" style={{ marginTop: '40px' }}>
      <h2 className="form-title">Crear Nueva Tarea</h2>

      <form className="main-form">
        <div className="form-group">
          <label className="form-label">Título de la tarea</label>
          <input type="text" className="form-input" placeholder="Ej: Preparar informe trimestral" />
        </div>

        <div className="form-group">
          <label className="form-label">Prioridad</label>
          <select className="form-input">
            <option value="Baja">Baja</option>
            <option value="Media">Media</option>
            <option value="Alta">Alta</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Fecha Límite</label>
          <input type="date" className="form-input" />
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