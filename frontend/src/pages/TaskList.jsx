import React from 'react';
import TaskCard from '../components/TaskCard';
import { Link } from 'react-router-dom';

function TaskList() {
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
        <Link to="/nueva-tarea" className="btn-primary" style={{ textDecoration: 'none' }}>
          + Nueva Tarea
        </Link>
      </div>

      <div className="task-list">
        {/* Magia de React: Por cada tarea en la lista, dibuja un componente TaskCard */}
        {tareasDePrueba.map((tarea) => (
          <TaskCard key={tarea.id} tarea={tarea} />
        ))}
      </div>
    </div>
  );
}

export default TaskList;