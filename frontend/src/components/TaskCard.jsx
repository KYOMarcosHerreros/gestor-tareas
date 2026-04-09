import React from 'react';
 
function TaskCard({ tarea }) {

  return (
<div className="task-card">
<h3 className="task-title">{tarea.titulo}</h3>
<div className="task-details">
<div className="task-info-row">
<span>📅 <strong>Creación:</strong> {new Date(tarea.fechaCreacion).toLocaleString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
</div>
<div className="task-info-row">
<span>

            ⏰ <strong>Límite:</strong> {new Date(tarea.fechaLimite).toLocaleDateString('es-ES')}

            {/* --- ESTE ES EL CARTEL QUE FALTABA --- */}

            {tarea.fechaModificada && (
<span style={{ 

                fontSize: '0.7rem', 

                color: '#d97706', 

                backgroundColor: '#fef3c7', 

                padding: '2px 6px', 

                borderRadius: '8px', 

                fontWeight: 'bold',

                marginLeft: '8px' 

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
 
      <div className="task-actions">
<button className="btn-icon btn-edit">Editar</button>
<button className="btn-icon btn-delete">Borrar</button>
</div>
</div>

  );

}
 
export default TaskCard;
 