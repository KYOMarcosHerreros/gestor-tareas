import React from 'react';

function TaskCard({ tarea }) {
  return (
    <div className="task-card">
      <h3 className="task-title">{tarea.titulo}</h3>
      
      <div className="task-details">
        <div className="task-info-row">
          <span>📅 <strong>Creación:</strong> {tarea.fechaCreacion}</span>
        </div>
        <div className="task-info-row">
          <span>⏰ <strong>Límite:</strong> {tarea.fechaLimite}</span>
        </div>
        <div className="task-info-row">
          <span>📊 <strong>Estado:</strong></span> 
          <span className={`badge ${tarea.estado}`}>{tarea.estado}</span>
        </div>
        <div className="task-info-row">
          <span>⚡ <strong>Prioridad:</strong></span>
          <span className={`badge ${tarea.prioridad}`}>{tarea.prioridad}</span>
        </div>
      </div>

      <div className="task-actions">
        <button className="btn-icon btn-edit">Editar</button>
        <button className="btn-icon btn-delete">Borrar</button>
      </div>
    </div>
  );
}

export default TaskCard;