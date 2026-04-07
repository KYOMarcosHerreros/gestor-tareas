import React from 'react';
// Luego importaremos aquí la tarjetita de la tarea

function TaskList() {
  // 1. Datos falsos para probar el diseño
  const tareasDePrueba = [
    { id: 1, titulo: "Hacer la compra", estado: "Pendiente", prioridad: "Alta" },
    { id: 2, titulo: "Estudiar React", estado: "EnProgreso", prioridad: "Media" },
    { id: 3, titulo: "Llamar al médico", estado: "Completada", prioridad: "Baja" }
  ];

  return (
    <div>
      <h2>Listado de Tareas</h2>
      <button style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px' }}>
        + Nueva Tarea
      </button>

      {/* 2. Recorremos la lista para mostrar cada tarea */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {tareasDePrueba.map((tarea) => (
          <div key={tarea.id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', textAlign: 'left' }}>
            <h3 style={{ margin: '0 0 10px 0' }}>{tarea.titulo}</h3>
            <p style={{ margin: '5px 0' }}><strong>Estado:</strong> {tarea.estado}</p>
            <p style={{ margin: '5px 0' }}><strong>Prioridad:</strong> {tarea.prioridad}</p>
            <button style={{ marginRight: '10px', padding: '5px 10px', cursor: 'pointer' }}>✏️ Editar</button>
            <button style={{ padding: '5px 10px', color: 'red', cursor: 'pointer' }}>🗑️ Borrar</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskList;