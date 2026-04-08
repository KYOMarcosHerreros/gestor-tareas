import React, { useState, useEffect } from 'react';
import TaskCard from '../components/TaskCard';
import { Link } from 'react-router-dom';
 
const API_URL = 'https://unsocialized-unstalemated-corie.ngrok-free.dev';
function TaskList() {
  const [tareas, setTareas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
 
  // Se ejecuta al cargar la página y obtiene las tareas de la API
  useEffect(() => {
    const fetchTareas = async () => {
      try {
        const token = localStorage.getItem('token');
 
        const response = await fetch(`${API_URL}/api/tareas`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'ngrok-skip-browser-warning': 'true'
          }
        });
 
        if (response.ok) {
          const data = await response.json();
          // La API devuelve un objeto paginado con los datos en "datos"
          setTareas(data.datos);
        } else if (response.status === 401) {
          setError('Sesión expirada, vuelve a iniciar sesión');
        } else {
          setError('Error al cargar las tareas');
        }
      } catch (err) {
        setError('No se pudo conectar. ¿Está encendido el backend?');
      } finally {
        setCargando(false);
      }
    };
 
    fetchTareas();
  }, []);
 
  return (
<div>
<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
<h2 style={{ color: '#1E6BA2', margin: 0 }}>Listado de Tareas</h2>
<Link to="/nueva-tarea" className="btn-primary" style={{ textDecoration: 'none' }}>
          + Nueva Tarea
</Link>
</div>
 
      {/* Mientras carga mostramos un mensaje */}
      {cargando && <p style={{ textAlign: 'center' }}>Cargando tareas...</p>}
 
      {/* Si hay error lo mostramos */}
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
 
      {/* Si no hay tareas y ya terminó de cargar */}
      {!cargando && !error && tareas.length === 0 && (
<p style={{ textAlign: 'center', color: '#888' }}>No hay tareas todavía. ¡Crea la primera!</p>
      )}
 
      <div className="task-list">
        {tareas.map((tarea) => (
<TaskCard key={tarea.id} tarea={tarea} />
        ))}
</div>
</div>
  );
}
 
export default TaskList;