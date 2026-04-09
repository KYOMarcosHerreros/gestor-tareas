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
            
            {/* --- EL CARTEL DE MODIFICADA --- */}
            {tarea.fechaModificada && (
              <span style={{ 
                fontSize: '0.7rem', color: '#d97706', backgroundColor: '#fef3c7', 
                padding: '2px 6px', borderRadius: '8px', fontWeight: 'bold', marginLeft: '8px' 
              }}>
                (Modificada)
              </span>
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

      <div className="task-actions" style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
        {/* El botón de ver detalles es decorativo, porque la tarjeta entera ya es clickable */}
        <button className="btn-icon btn-edit" style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
          👁️ Ver Detalles
        </button>
        
        {/* 🔥 AQUÍ ESTÁ LA MAGIA PARA QUE NO SE ABRA EL POP-UP DE EDICIÓN */}
        <button 
          className="btn-icon btn-delete" 
          onClick={(e) => {
            e.stopPropagation(); // Pincha la burbuja del clic
            onBorrar(tarea); // Llama a la función de borrar
          }}
        >
          Borrar
        </button>
      </div>
    </div>
  );
}

export default TaskCard;