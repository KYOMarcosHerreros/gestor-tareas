import React from 'react';
import { Calendar, Clock, BarChart2, Zap, Eye, Trash2 } from 'lucide-react';

function TaskCard({ tarea, onBorrar }) {
  return (
    <div className={`task-card ${tarea.estado}`}>
      <h3 className="task-title">{tarea.titulo}</h3>
      
      <div className="task-details">
        <div className="task-info-row">
          <Calendar size={16} className="icon-lucide" /> 
          <span><strong>Creación:</strong> {new Date(tarea.fechaCreacion).toLocaleString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
        </div>
        
        <div className="task-info-row">
          <Clock size={16} className="icon-lucide" />
          <span>
            <strong>Límite:</strong> {tarea.fechaLimite ? new Date(tarea.fechaLimite).toLocaleDateString('es-ES') : 'Sin límite'}
            {tarea.fechaModificada && (
              <span className="badge-modified">(Modificada)</span>
            )}
          </span>
        </div>
        
        <div className="task-info-row">
          <BarChart2 size={16} className="icon-lucide" />
          <span><strong>Estado:</strong></span>
          {/* 🔥 Aquí está el parche mágico para separar la palabra */}
          <span className={`badge ${tarea.estado}`}>
            {tarea.estado.replace('EnProgreso', 'En Progreso')}
          </span>
        </div>
        
        <div className="task-info-row">
          <Zap size={16} className="icon-lucide" />
          <span><strong>Prioridad:</strong></span>
          <span className={`badge ${tarea.prioridad}`}>{tarea.prioridad}</span>
        </div>
      </div>

      <div className="task-actions" style={{ marginTop: '20px' }}>
        <button className="btn-icon btn-edit" title="Ver Detalles">
          <Eye size={20} />
        </button>
        
        <button 
          className="btn-icon btn-delete" 
          title="Eliminar Tarea"
          onClick={(e) => {
            e.stopPropagation(); 
            onBorrar(tarea); 
          }}
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
}

export default TaskCard;