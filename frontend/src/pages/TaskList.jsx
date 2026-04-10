import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import TaskCard from '../components/TaskCard';
import { getTareas, updateTarea, deleteTarea } from '../services/api'; // 👈 El mando a distancia del Backend

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
    setTimeout(() => setNotificacion({ visible: false, mensaje: '', tipo: '' }), 3000);
  };

  // 🚀 Lógica limpia usando el servicio centralizado
  const fetchTareas = async () => {
    try {
      const datos = await getTareas();
      setTareas(datos);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return; 
    }
    fetchTareas();

    if (location.state?.mensajeExito) {
      mostrarNotificacion(location.state.mensajeExito, 'success');
      navigate('.', { replace: true, state: {} });
    }
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
      const fechaOriginal = tareaSeleccionada.fechaLimite?.split('T')[0];
      const fechaNueva = tareaEditada.fechaLimite?.split('T')[0];
      const copiaTarea = { ...tareaEditada };

      if (fechaOriginal !== fechaNueva) copiaTarea.fechaModificada = true;

      await updateTarea(copiaTarea.id, copiaTarea);
      await fetchTareas(); 
      setTareaSeleccionada(null); 
      setModoEdicion(false);
      mostrarNotificacion('Cambios guardados correctamente');
    } catch (err) {
      alert("Error al guardar: " + err.message);
    }
  };

  const ejecutarBorrado = async () => {
    try {
      await deleteTarea(tareaABorrar.id);
      setTareaABorrar(null); 
      fetchTareas(); 
      mostrarNotificacion('Tarea eliminada', 'error');
    } catch (err) {
      alert("Error al borrar: " + err.message);
    }
  };

  const tareasPendientes = tareas.filter(t => t.estado === 'Pendiente').length;
  const tareasEnProgreso = tareas.filter(t => t.estado === 'EnProgreso').length;
  const tareasCompletadas = tareas.filter(t => t.estado === 'Completada').length;
  const tareasFiltradas = filtroActual === 'Todas' ? tareas : tareas.filter(t => t.estado === filtroActual);

  return (
    <div>
      {/* 🔔 Notificaciones */}
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
          
          <div className="counter-box" onClick={() => setFiltroActual('Pendiente')} style={{ cursor: 'pointer', opacity: filtroActual === 'Pendiente' ? 1 : 0.6 }}>
            <span className="counter-label" style={{ fontWeight: filtroActual === 'Pendiente' ? 'bold' : '500' }}>{filtroActual === 'Pendiente' ? '▶ ' : ''}Pendientes</span>
            <span className="counter-number badge Pendiente">{tareasPendientes}</span>
          </div>
          
          <div className="counter-box" onClick={() => setFiltroActual('EnProgreso')} style={{ cursor: 'pointer', opacity: filtroActual === 'EnProgreso' ? 1 : 0.6 }}>
            <span className="counter-label" style={{ fontWeight: filtroActual === 'EnProgreso' ? 'bold' : '500' }}>{filtroActual === 'EnProgreso' ? '▶ ' : ''}En Progreso</span>
            <span className="counter-number badge EnProgreso">{tareasEnProgreso}</span>
          </div>
          
          <div className="counter-box" onClick={() => setFiltroActual('Completada')} style={{ cursor: 'pointer', opacity: filtroActual === 'Completada' ? 1 : 0.6 }}>
            <span className="counter-label" style={{ fontWeight: filtroActual === 'Completada' ? 'bold' : '500' }}>{filtroActual === 'Completada' ? '▶ ' : ''}Completadas</span>
            <span className="counter-number badge Completada">{tareasCompletadas}</span>
          </div>
          
          <div className="counter-box" onClick={() => setFiltroActual('Todas')} style={{ cursor: 'pointer', marginTop: '10px', borderTop: '2px solid #eee', paddingTop: '15px', opacity: filtroActual === 'Todas' ? 1 : 0.6 }}>
            <span className="counter-label" style={{ fontWeight: 'bold', color: 'var(--primary-blue)' }}>{filtroActual === 'Todas' ? '▶ ' : ''}Total Tareas</span>
            <span className="counter-number" style={{ fontWeight: 'bold', color: 'var(--primary-blue)' }}>{tareas.length}</span>
          </div>
        </aside>

        <div className="main-content">
          <div className="task-list">
            {tareas.length === 0 && !cargando && !error && (
              <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '60px 20px', backgroundColor: '#f8fafc', borderRadius: '12px', border: '2px dashed #cbd5e1', margin: '20px 0' }}>
                <p style={{ color: '#64748b', fontSize: '1.2rem', margin: '0 0 10px 0' }}>No tienes ninguna tarea creada todavía.</p>
                <p style={{ color: 'var(--primary-blue)', fontWeight: 'bold', margin: 0 }}>Haz clic en "+ Nueva Tarea" para empezar</p>
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

      {/* 🔍 Modal de Detalle/Edición */}
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
                    style={{ width: '100%', boxSizing: 'border-box', resize: 'vertical', padding: '12px' }}
                    value={tareaEditada.descripcion || ''} 
                    onChange={(e) => setTareaEditada({...tareaEditada, descripcion: e.target.value})} 
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <select className="form-input" value={tareaEditada.estado} onChange={(e) => setTareaEditada({...tareaEditada, estado: e.target.value})}>
                    <option value="Pendiente">Pendiente</option>
                    <option value="EnProgreso">En Progreso</option>
                    <option value="Completada">Completada</option>
                  </select>
                  <select className="form-input" value={tareaEditada.prioridad} onChange={(e) => setTareaEditada({...tareaEditada, prioridad: e.target.value})}>
                    <option value="Baja">Baja</option>
                    <option value="Media">Media</option>
                    <option value="Alta">Alta</option>
                  </select>
                </div>
                <input type="date" className="form-input" value={tareaEditada.fechaLimite ? tareaEditada.fechaLimite.split('T')[0] : ''} 
                  onChange={(e) => setTareaEditada({...tareaEditada, fechaLimite: new Date(e.target.value).toISOString()})} />
              </div>
            ) : (
              <>
                <div className="modal-description-box">{tareaSeleccionada.descripcion || 'Sin descripción.'}</div>
                <div className="modal-grid">
                  <div><strong>Estado</strong><span className={`badge ${tareaSeleccionada.estado}`}>{tareaSeleccionada.estado}</span></div>
                  <div><strong>Prioridad</strong><span className={`badge ${tareaSeleccionada.prioridad}`}>{tareaSeleccionada.prioridad}</span></div>
                  <div><strong>Límite</strong> {tareaSeleccionada.fechaLimite ? new Date(tareaSeleccionada.fechaLimite).toLocaleDateString() : 'Sin fecha'}</div>
                </div>
              </>
            )}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '20px' }}>
              {modoEdicion ? (
                <><button className="btn-icon" onClick={() => setModoEdicion(false)}>Cancelar</button><button className="btn-primary" onClick={guardarEdicion}>Guardar</button></>
              ) : (
                <><button className="btn-icon" onClick={() => setTareaSeleccionada(null)}>Cerrar</button><button className="btn-primary" onClick={iniciarEdicion}>Editar</button></>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 🗑️ Modal de Borrado */}
      {tareaABorrar && (
        <div className="modal-overlay" onClick={() => setTareaABorrar(null)}>
          <div className="modal-content" style={{ maxWidth: '400px', textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ color: '#e11d48' }}>Confirmar Borrado</h2>
            <p>¿Borrar <strong>"{tareaABorrar.titulo}"</strong>?</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '20px' }}>
              <button className="btn-icon" onClick={() => setTareaABorrar(null)}>No</button>
              <button className="btn-primary" style={{ backgroundColor: '#e11d48', border: 'none' }} onClick={ejecutarBorrado}>Sí, Borrar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskList;