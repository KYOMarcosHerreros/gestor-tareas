import React from 'react';

function TaskCard({ tarea, onBorrar }) {
  return (
    <div className="task-card">
      <h3 className="task-title">{tarea.titulo}</h3>
      
      <div className="task-details">
        <div className="task-info-row">
          <span>📅 <strong>Creación:</strong> {new Date(tarea.fechaCreacion).toLocaleString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
        </div>
        <div className="task-info-row">
          <span>
            ⏰ <strong>Límite:</strong> {tarea.fechaLimite ? new Date(tarea.fechaLimite).toLocaleDateString('es-ES') : 'Sin límite'}

            {tarea.fechaModificada && (
              <span className="badge-modified">(Modificada)</span>
            )}
          </span>
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

      {/* Los estilos de actions ya están en el CSS */}
      <div className="task-actions">
        <button className="btn-icon btn-edit">
          👁️ Ver Detalles
        </button>
        
        <button 
          className="btn-icon btn-delete" 
          onClick={(e) => {
            e.stopPropagation(); 
            onBorrar(tarea); 
          }}
        >
          Borrar
        </button>
      </div>
    </div>
  );
}

export default TaskCard;