import React, { useState, useEffect } from 'react';
import TaskCard from '../components/TaskCard';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const API_URL = 'https://unsocialized-unstalemated-corie.ngrok-free.dev';

function TaskList() {
  const [tareas, setTareas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  
  const [tareaSeleccionada, setTareaSeleccionada] = useState(null);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [tareaEditada, setTareaEditada] = useState(null);
  const [tareaABorrar, setTareaABorrar] = useState(null);
  const [filtroActual, setFiltroActual] = useState('Todas');
  
  const [notificacion, setNotificacion] = useState({ visible: false, mensaje: '', tipo: '' });
  const location = useLocation();
  const navigate = useNavigate();

  const mostrarNotificacion = (mensaje, tipo = 'success') => {
    setNotificacion({ visible: true, mensaje, tipo });
    setTimeout(() => {
      setNotificacion({ visible: false, mensaje: '', tipo: '' });
    }, 3000);
  };

  const fetchTareas = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/tareas`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'ngrok-skip-browser-warning': 'true'
        }
      });
      if (response.ok) {
        const data = await response.json();
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
    // 🛑 EL PORTERO: Si no hay token, lo mandamos al login
    const token = sessionStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return; 
    }

    fetchTareas();

    if (location.state && location.state.mensajeExito) {
      mostrarNotificacion(location.state.mensajeExito, 'success');
      navigate('.', { replace: true, state: {} });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, navigate]);

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
      const token = sessionStorage.getItem('token');
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
        body: JSON.stringify(copiaTarea), 
      });

      if (response.ok) {
        await fetchTareas(); 
        setTareaSeleccionada(null); 
        setModoEdicion(false);
        mostrarNotificacion('Cambios guardados correctamente', 'success');
      } else {
        alert("Hubo un error al guardar los cambios en el servidor.");
      }
    } catch (err) {
      alert("Error de conexión al intentar guardar.");
    }
  };

  const ejecutarBorrado = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/tareas/${tareaABorrar.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'ngrok-skip-browser-warning': 'true'
        }
      });

      if (response.ok) {
        setTareaABorrar(null); 
        fetchTareas(); 
        mostrarNotificacion('Tarea eliminada', 'error');
      } else {
        alert("Hubo un error al intentar borrar la tarea.");
      }
    } catch (err) {
      alert("Error de conexión al intentar borrar.");
    }
  };

  const tareasPendientes = tareas.filter(t => t.estado === 'Pendiente').length;
  const tareasEnProgreso = tareas.filter(t => t.estado === 'EnProgreso').length;
  const tareasCompletadas = tareas.filter(t => t.estado === 'Completada').length;

  const tareasFiltradas = filtroActual === 'Todas' 
    ? tareas 
    : tareas.filter(tarea => tarea.estado === filtroActual);

  return (
    <div>
      {notificacion.visible && (
        <div className={`toast-notification ${notificacion.tipo === 'error' ? 'toast-error' : ''}`}>
          {notificacion.mensaje}
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2 style={{ color: '#1E6BA2', margin: 0 }}>Listado de Tareas</h2>
        <Link to="/nueva-tarea" className="btn-primary" style={{ textDecoration: 'none' }}>
          + Nueva Tarea
        </Link>
      </div>

      {cargando && <p style={{ textAlign: 'center' }}>Cargando tareas...</p>}
      {error && <div className="alert-message alert-error">{error}</div>}

      <div className="dashboard-layout">
        <aside className="dashboard-sidebar">
          <h3 style={{ marginTop: 0, color: '#334155', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
             Resumen
          </h3>
          
          <div 
            className="counter-box" 
            onClick={() => setFiltroActual('Pendiente')}
            style={{ cursor: 'pointer', opacity: filtroActual === 'Pendiente' ? 1 : 0.6 }}
          >
            <span className="counter-label" style={{ fontWeight: filtroActual === 'Pendiente' ? 'bold' : '500' }}>
              {filtroActual === 'Pendiente' ? '▶ ' : ''}Pendientes
            </span>
            <span className="counter-number badge Pendiente">{tareasPendientes}</span>
          </div>
          
          <div 
            className="counter-box" 
            onClick={() => setFiltroActual('EnProgreso')}
            style={{ cursor: 'pointer', opacity: filtroActual === 'EnProgreso' ? 1 : 0.6 }}
          >
            <span className="counter-label" style={{ fontWeight: filtroActual === 'EnProgreso' ? 'bold' : '500' }}>
              {filtroActual === 'EnProgreso' ? '▶ ' : ''}En Progreso
            </span>
            <span className="counter-number badge EnProgreso">{tareasEnProgreso}</span>
          </div>
          
          <div 
            className="counter-box" 
            onClick={() => setFiltroActual('Completada')}
            style={{ cursor: 'pointer', opacity: filtroActual === 'Completada' ? 1 : 0.6 }}
          >
            <span className="counter-label" style={{ fontWeight: filtroActual === 'Completada' ? 'bold' : '500' }}>
              {filtroActual === 'Completada' ? '▶ ' : ''}Completadas
            </span>
            <span className="counter-number badge Completada">{tareasCompletadas}</span>
          </div>
          
          <div 
            className="counter-box" 
            onClick={() => setFiltroActual('Todas')}
            style={{ cursor: 'pointer', marginTop: '10px', borderTop: '2px solid #eee', paddingTop: '15px', opacity: filtroActual === 'Todas' ? 1 : 0.6 }}
          >
            <span className="counter-label" style={{ fontWeight: 'bold', color: 'var(--primary-blue)' }}>
              {filtroActual === 'Todas' ? '▶ ' : ''}Total Tareas
            </span>
            <span className="counter-number" style={{ fontWeight: 'bold', color: 'var(--primary-blue)' }}>
              {tareas.length}
            </span>
          </div>

          <p style={{
            position: 'absolute',
            bottom: '-35px', 
            left: 0,
            width: '100%',
            textAlign: 'center',
            fontSize: '0.8rem',
            color: '#94a3b8',
            margin: 0
          }}>
             Haz clic en una sección para filtrar
          </p>
        </aside>

        <div className="main-content">
          <div className="task-list">
            
            {/* CASO 1: Cero tareas en TODA la cuenta */}
            {tareas.length === 0 && !cargando && !error && (
              <div style={{ 
                gridColumn: '1 / -1', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                padding: '60px 20px', 
                backgroundColor: '#f8fafc', 
                borderRadius: '12px', 
                border: '2px dashed #cbd5e1', 
                margin: '20px 0'
              }}>
                <p style={{ color: '#64748b', fontSize: '1.2rem', margin: '0 0 10px 0' }}>
                  No tienes ninguna tarea creada todavía. 
                </p>
                <p style={{ color: 'var(--primary-blue)', fontWeight: 'bold', margin: 0 }}>
                  Haz clic en "+ Nueva Tarea" para empezar
                </p>
              </div>
            )}

            {/* CASO 2: Sí hay tareas, pero 0 en el FILTRO actual */}
            {tareas.length > 0 && tareasFiltradas.length === 0 && (
              <div style={{ 
                gridColumn: '1 / -1', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                padding: '60px 20px', 
                backgroundColor: '#f8fafc', 
                borderRadius: '12px', 
                border: '2px dashed #cbd5e1', 
                margin: '20px 0'
              }}>
                <p style={{ color: '#64748b', fontSize: '1.1rem', margin: 0 }}>
                  No tienes ninguna tarea en este estado.
                </p>
              </div>
            )}

            {tareasFiltradas.map((tarea) => (
              <div key={tarea.id} onClick={() => abrirModal(tarea)} style={{ cursor: 'pointer' }}>
                <TaskCard tarea={tarea} onBorrar={(t) => setTareaABorrar(t)} />
              </div>
            ))}

          </div>
        </div>
      </div>

      {/* POP-UP AZUL Y ROJO (Sin cambios, idéntico al que tenías funcionando) */}
      {tareaSeleccionada && (
        <div className="modal-overlay" onClick={() => setTareaSeleccionada(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-header" style={{ textAlign: 'center' }}>{tareaSeleccionada.titulo}</h2>
            {modoEdicion ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '25px', marginTop: '15px' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ color: '#64748b', fontWeight: 'bold' }}>Descripción</label>
                  <textarea 
                    className="form-input" rows="6" maxLength="500"
                    style={{ width: '100%', boxSizing: 'border-box', resize: 'vertical', fontFamily: 'inherit', padding: '12px' }}
                    value={tareaEditada.descripcion || ''} 
                    onChange={(e) => setTareaEditada({...tareaEditada, descripcion: e.target.value})} 
                  />
                  <div style={{ textAlign: 'right', fontSize: '0.8rem', color: 'var(--dark-grey)', marginTop: '4px' }}>
                    {(tareaEditada.descripcion || '').length} / 500
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" style={{ color: '#64748b', fontWeight: 'bold' }}>Estado</label>
                    <select className="form-input" style={{ width: '100%', boxSizing: 'border-box', padding: '10px' }}
                      value={tareaEditada.estado} onChange={(e) => setTareaEditada({...tareaEditada, estado: e.target.value})}>
                      <option value="Pendiente">Pendiente</option>
                      <option value="EnProgreso">En Progreso</option>
                      <option value="Completada">Completada</option>
                    </select>
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" style={{ color: '#64748b', fontWeight: 'bold' }}>Prioridad</label>
                    <select className="form-input" style={{ width: '100%', boxSizing: 'border-box', padding: '10px' }}
                      value={tareaEditada.prioridad} onChange={(e) => setTareaEditada({...tareaEditada, prioridad: e.target.value})}>
                      <option value="Baja">Baja</option>
                      <option value="Media">Media</option>
                      <option value="Alta">Alta</option>
                    </select>
                  </div>
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ color: '#64748b', fontWeight: 'bold' }}>Fecha Límite</label>
                  <input type="date" className="form-input" style={{ width: '100%', boxSizing: 'border-box', padding: '10px' }}
                    value={tareaEditada.fechaLimite ? tareaEditada.fechaLimite.split('T')[0] : ''} 
                    onChange={(e) => setTareaEditada({...tareaEditada, fechaLimite: new Date(e.target.value).toISOString()})} />
                </div>
              </div>
            ) : (
              <>
                <div style={{ marginBottom: '10px' }}><strong style={{ fontSize: '0.9rem', color: '#64748b', textTransform: 'uppercase' }}>Descripción</strong></div>
                <div className="modal-description-box">
                  {tareaSeleccionada.descripcion || <span style={{ color: '#94a3b8', fontStyle: 'italic' }}>No se han añadido detalles adicionales a esta tarea.</span>}
                </div>
                <div className="modal-grid">
                  <div><strong>Estado</strong><span className={`badge ${tareaSeleccionada.estado}`}>{tareaSeleccionada.estado}</span></div>
                  <div><strong>Prioridad</strong><span className={`badge ${tareaSeleccionada.prioridad}`}>{tareaSeleccionada.prioridad}</span></div>
                  <div><strong>Fecha Límite</strong>
                    <p style={{ color: '#0f172a', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {tareaSeleccionada.fechaLimite ? new Date(tareaSeleccionada.fechaLimite).toLocaleDateString('es-ES') : 'Sin fecha'}
                      {tareaSeleccionada.fechaModificada && <span style={{ fontSize: '0.75rem', color: '#d97706', backgroundColor: '#fef3c7', padding: '2px 8px', borderRadius: '12px', fontWeight: 'bold' }}>(Modificada)</span>}
                    </p>
                  </div>
                  <div><strong>Fecha de Creación</strong>
                    <p style={{ color: '#0f172a', fontWeight: '500' }}>
                      {new Date(tareaSeleccionada.fechaCreacion).toLocaleString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </>
            )}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '20px' }}>
              {modoEdicion ? (
                <><button className="btn-icon" onClick={() => setModoEdicion(false)}>Cancelar</button><button className="btn-primary" onClick={guardarEdicion}>Guardar Cambios</button></>
              ) : (
                <><button className="btn-icon" onClick={() => setTareaSeleccionada(null)}>Cerrar</button><button className="btn-primary" onClick={iniciarEdicion}>Editar Tarea</button></>
              )}
            </div>
          </div>
        </div>
      )}
      {tareaABorrar && (
        <div className="modal-overlay" onClick={() => setTareaABorrar(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '400px', textAlign: 'center' }}>
            <h2 style={{ color: '#e11d48', marginTop: 0, fontSize: '1.5rem' }}>⚠️ Confirmar Borrado</h2>
            <p style={{ fontSize: '1rem', color: '#334155', margin: '20px 0' }}>¿Estás seguro de que quieres eliminar la tarea <br/><strong>"{tareaABorrar.titulo}"</strong>?</p>
            <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '25px' }}>Esta acción no se puede deshacer.</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
              <button className="btn-icon" onClick={() => setTareaABorrar(null)}>Cancelar</button>
              <button className="btn-primary" style={{ backgroundColor: '#e11d48', border: 'none' }} onClick={ejecutarBorrado}>Sí, Borrar Tarea</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskList;