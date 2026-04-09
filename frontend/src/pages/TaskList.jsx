import React, { useState, useEffect } from 'react';
import TaskCard from '../components/TaskCard';
import { Link } from 'react-router-dom';

const API_URL = 'https://unsocialized-unstalemated-corie.ngrok-free.dev';

function TaskList() {
  const [tareas, setTareas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  
  const [tareaSeleccionada, setTareaSeleccionada] = useState(null);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [tareaEditada, setTareaEditada] = useState(null);

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
        
        // 🚨 EL CHIVATO: Imprimimos en consola lo que nos manda Marcos
        console.log("📦 DATOS RECIBIDOS DEL BACKEND:", data.datos); 
        
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

  useEffect(() => {
    fetchTareas();
  }, []);

  const abrirModal = (tarea) => {
    setTareaSeleccionada(tarea);
    setModoEdicion(false);
  };

  const iniciarEdicion = () => {
    setTareaEditada(tareaSeleccionada);
    setModoEdicion(true);
  };

 const guardarEdicion = async () => {

    try {

      const token = localStorage.getItem('token');

      // Comparamos solo la parte de la fecha (YYYY-MM-DD) para evitar errores de formato

      const fechaOriginal = tareaSeleccionada.fechaLimite?.split('T')[0];

      const fechaNueva = tareaEditada.fechaLimite?.split('T')[0];

      const copiaTarea = { ...tareaEditada };
 
      if (fechaOriginal !== fechaNueva) {

        copiaTarea.fechaModificada = true;

      }
 
      const response = await fetch(`${API_URL}/api/tareas/${copiaTarea.id}`, {

        method: 'PUT',

        headers: {

          'Content-Type': 'application/json',

          'Authorization': `Bearer ${token}`,

          'ngrok-skip-browser-warning': 'true'

        },

        body: JSON.stringify(copiaTarea), // Enviamos la copia con el flag actualizado

      });
 
      if (response.ok) {

        await fetchTareas(); // Refrescamos la lista del servidor

        setTareaSeleccionada(null); // Cerramos el modal para ver el cambio en la lista

        setModoEdicion(false);

      } else {

        alert("Hubo un error al guardar los cambios en el servidor.");

      }

    } catch (err) {

      alert("Error de conexión al intentar guardar.");

    }

  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2 style={{ color: '#1E6BA2', margin: 0 }}>Listado de Tareas</h2>
        <Link to="/nueva-tarea" className="btn-primary" style={{ textDecoration: 'none' }}>
          + Nueva Tarea
        </Link>
      </div>

      {cargando && <p style={{ textAlign: 'center' }}>Cargando tareas...</p>}
      {error && <div className="alert-message alert-error">{error}</div>}
      
      {!cargando && !error && tareas.length === 0 && (
        <p style={{ textAlign: 'center', color: '#888' }}>No hay tareas todavía. ¡Crea la primera!</p>
      )}

      <div className="task-list">
        {tareas.map((tarea) => (
          <div key={tarea.id} onClick={() => abrirModal(tarea)} style={{ cursor: 'pointer' }}>
            <TaskCard tarea={tarea} />
          </div>
        ))}
      </div>

      {tareaSeleccionada && (
        <div className="modal-overlay" onClick={() => setTareaSeleccionada(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            
            {/* Título centrado para equilibrar el diseño */}
            <h2 className="modal-header" style={{ textAlign: 'center' }}>
              {tareaSeleccionada.titulo}
            </h2>

            {/* ZONA DINÁMICA: ¿Editando o Viendo? */}
            {modoEdicion ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '25px', marginTop: '15px' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ color: '#64748b', fontWeight: 'bold' }}>Descripción</label>
                  <textarea 
                    className="form-input" 
                    rows="6"
                    maxLength="500" // Límite de HTML
                    style={{ width: '100%', boxSizing: 'border-box', resize: 'vertical', fontFamily: 'inherit', padding: '12px' }}
                    value={tareaEditada.descripcion || ''} 
                    onChange={(e) => setTareaEditada({...tareaEditada, descripcion: e.target.value})} 
                  />
                  {/* El contador de caracteres */}
                  <div style={{ textAlign: 'right', fontSize: '0.8rem', color: 'var(--dark-grey)', marginTop: '4px' }}>
                    {(tareaEditada.descripcion || '').length} / 500
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" style={{ color: '#64748b', fontWeight: 'bold' }}>Estado</label>
                    <select 
                      className="form-input" 
                      style={{ width: '100%', boxSizing: 'border-box', padding: '10px' }}
                      value={tareaEditada.estado} 
                      onChange={(e) => setTareaEditada({...tareaEditada, estado: e.target.value})}
                    >
                      <option value="Pendiente">Pendiente</option>
                      <option value="EnProgreso">En Progreso</option>
                      <option value="Completada">Completada</option>
                    </select>
                  </div>
                  
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" style={{ color: '#64748b', fontWeight: 'bold' }}>Prioridad</label>
                    <select 
                      className="form-input" 
                      style={{ width: '100%', boxSizing: 'border-box', padding: '10px' }}
                      value={tareaEditada.prioridad} 
                      onChange={(e) => setTareaEditada({...tareaEditada, prioridad: e.target.value})}
                    >
                      <option value="Baja">Baja</option>
                      <option value="Media">Media</option>
                      <option value="Alta">Alta</option>
                    </select>
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ color: '#64748b', fontWeight: 'bold' }}>Fecha Límite</label>
                  <input 
                    type="date" 
                    className="form-input" 
                    style={{ width: '100%', boxSizing: 'border-box', padding: '10px' }}
                    value={tareaEditada.fechaLimite ? tareaEditada.fechaLimite.split('T')[0] : ''} 
                    onChange={(e) => setTareaEditada({...tareaEditada, fechaLimite: new Date(e.target.value).toISOString()})} 
                  />
                </div>
              </div>
            ) : (
              <>
                <div style={{ marginBottom: '10px' }}>
                  <strong style={{ fontSize: '0.9rem', color: '#64748b', textTransform: 'uppercase' }}>Descripción</strong>
                </div>
                <div className="modal-description-box">
                  {tareaSeleccionada.descripcion || <span style={{ color: '#94a3b8', fontStyle: 'italic' }}>No se han añadido detalles adicionales a esta tarea.</span>}
                </div>

                <div className="modal-grid">
                  <div>
                    <strong>Estado</strong>
                    <span className={`badge ${tareaSeleccionada.estado}`}>{tareaSeleccionada.estado}</span>
                  </div>
                  <div>
                    <strong>Prioridad</strong>
                    <span className={`badge ${tareaSeleccionada.prioridad}`}>{tareaSeleccionada.prioridad}</span>
                  </div>
                  <div>
                    <strong>Fecha Límite</strong>
                    <p style={{ color: '#0f172a', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {tareaSeleccionada.fechaLimite ? new Date(tareaSeleccionada.fechaLimite).toLocaleDateString('es-ES') : 'Sin fecha'}
                      
                      {tareaSeleccionada.fechaModificada && (
                        <span style={{ fontSize: '0.75rem', color: '#d97706', backgroundColor: '#fef3c7', padding: '2px 8px', borderRadius: '12px', fontWeight: 'bold' }}>
                          (Modificada)
                        </span>
                      )}
                    </p>
                  </div>
                  <div>
                    <strong>Fecha de Creación</strong>
                    <p style={{ color: '#0f172a', fontWeight: '500' }}>
                      {new Date(tareaSeleccionada.fechaCreacion).toLocaleString('es-ES', { 
                        day: '2-digit', month: '2-digit', year: 'numeric', 
                        hour: '2-digit', minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
              </>
            )}

            {/* BOTONERA: Centrada para mayor armonía visual */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '20px' }}>
              {modoEdicion ? (
                <>
                  <button className="btn-icon" onClick={() => setModoEdicion(false)}>Cancelar</button>
                  <button className="btn-primary" onClick={guardarEdicion}>Guardar Cambios</button>
                </>
              ) : (
                <>
                  <button className="btn-icon" onClick={() => setTareaSeleccionada(null)}>Cerrar</button>
                  <button className="btn-primary" onClick={iniciarEdicion}>Editar Tarea</button>
                </>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default TaskList;