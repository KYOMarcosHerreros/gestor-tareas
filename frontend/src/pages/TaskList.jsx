import React from 'react';

function TaskList() {
  // 1. Datos actualizados con las fechas de Marcos
  const tareasDePrueba = [
    { id: 1, titulo: "Hacer la compra", estado: "Pendiente", prioridad: "Alta", fechaCreacion: "07/04/2026", fechaLimite: "09/04/2026" },
    { id: 2, titulo: "Estudiar React", estado: "EnProgreso", prioridad: "Media", fechaCreacion: "05/04/2026", fechaLimite: "15/04/2026" },
    { id: 3, titulo: "Llamar al médico", estado: "Completada", prioridad: "Baja", fechaCreacion: "01/04/2026", fechaLimite: "02/04/2026" },
    { id: 4, titulo: "Pagar facturas", estado: "Pendiente", prioridad: "Alta", fechaCreacion: "07/04/2026", fechaLimite: "10/04/2026" },
    { id: 5, titulo: "Preparar presentación para el cliente", estado: "EnProgreso", prioridad: "Alta", fechaCreacion: "06/04/2026", fechaLimite: "12/04/2026" },
    { id: 6, titulo: "Actualizar base de datos de usuarios", estado: "Pendiente", prioridad: "Media", fechaCreacion: "07/04/2026", fechaLimite: "14/04/2026" },
    { id: 7, titulo: "Revisar código del backend de Marcos", estado: "Completada", prioridad: "Alta", fechaCreacion: "03/04/2026", fechaLimite: "06/04/2026" },
    { id: 8, titulo: "Planificar la reunión de equipo semanal", estado: "Pendiente", prioridad: "Baja", fechaCreacion: "07/04/2026", fechaLimite: "10/04/2026" }
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2 style={{ color: '#1E6BA2', margin: 0 }}>Listado de Tareas</h2>
        <button className="btn-primary">+ Nueva Tarea</button>
      </div>

      <div className="task-list">
        {tareasDePrueba.map((tarea) => (
          <div key={tarea.id} className="task-card">
            
            {/* Título arriba del todo con línea separadora (gracias al CSS) */}
            <h3 className="task-title">{tarea.titulo}</h3>
            
            {/* Información ordenada */}
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

            {/* Botones abajo y separados */}
            <div className="task-actions">
              <button className="btn-icon btn-edit">Editar</button>
              <button className="btn-icon btn-delete">Borrar</button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskList;