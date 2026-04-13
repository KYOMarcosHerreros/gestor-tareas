import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import TaskCard from '../components/TaskCard';
import { getTareas, updateTarea, deleteTarea } from '../services/api'; 

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

      {/* 🛑 Header */}
      <div className="page-header">
        <h2 className="page-title">Listado de Tareas</h2>
        <Link to="/nueva-tarea" className="btn-primary">
          + Nueva Tarea
        </Link>
      </div>

      {cargando && <p className="text-center">Cargando tareas...</p>}
      {error && <div className="alert-message alert-error">{error}</div>}

      <div className="dashboard-layout">
        <aside className="dashboard-sidebar">
          <h3 className="sidebar-title">Resumen</h3>
          
          <div 
            className={`counter-box filter-box ${filtroActual === 'Pendiente' ? 'active' : ''}`} 
            onClick={() => setFiltroActual('Pendiente')}
          >
            <span className="counter-label">{filtroActual === 'Pendiente' ? '▶ ' : ''}Pendientes</span>
            <span className="counter-number badge Pendiente">{tareasPendientes}</span>
          </div>
          
          <div 
            className={`counter-box filter-box ${filtroActual === 'EnProgreso' ? 'active' : ''}`} 
            onClick={() => setFiltroActual('EnProgreso')}
          >
            <span className="counter-label">{filtroActual === 'EnProgreso' ? '▶ ' : ''}En Progreso</span>
            <span className="counter-number badge EnProgreso">{tareasEnProgreso}</span>
          </div>
          
          <div 
            className={`counter-box filter-box ${filtroActual === 'Completada' ? 'active' : ''}`} 
            onClick={() => setFiltroActual('Completada')}
          >
            <span className="counter-label">{filtroActual === 'Completada' ? '▶ ' : ''}Completadas</span>
            <span className="counter-number badge Completada">{tareasCompletadas}</span>
          </div>
          
          <div 
            className={`counter-box filter-box ${filtroActual === 'Todas' ? 'active' : ''}`} 
            onClick={() => setFiltroActual('Todas')}
          >
            <span className="counter-label page-title">{filtroActual === 'Todas' ? '▶ ' : ''}Total Tareas</span>
            <span className="counter-number page-title">{tareas.length}</span>
          </div>
        </aside>

        <div className="main-content">
          <div className="task-list">
            {tareas.length === 0 && !cargando && !error && (
              <div className="empty-state">
                <p>No tienes ninguna tarea creada todavía.</p>
                <p>Haz clic en "+ Nueva Tarea" para empezar</p>
              </div>
            )}

            {tareasFiltradas.map((tarea) => (
              <div key={tarea.id} onClick={() => abrirModal(tarea)}>
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
            <h2 className="modal-header text-center">{tareaSeleccionada.titulo}</h2>
            {modoEdicion ? (
              <div className="main-form">
                <div className="form-group">
                  <label className="form-label">Descripción</label>
                  <textarea 
                    className="form-input" rows="6" maxLength="500"
                    value={tareaEditada.descripcion || ''} 
                    onChange={(e) => setTareaEditada({...tareaEditada, descripcion: e.target.value})} 
                  />
                </div>
                <div className="modal-grid modal-grid-transparent">
                  <div className="form-group">
                    <label className="form-label">Estado</label>
                    <select className="form-input" value={tareaEditada.estado} onChange={(e) => setTareaEditada({...tareaEditada, estado: e.target.value})}>
                      <option value="Pendiente">Pendiente</option>
                      <option value="EnProgreso">En Progreso</option>
                      <option value="Completada">Completada</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Prioridad</label>
                    <select className="form-input" value={tareaEditada.prioridad} onChange={(e) => setTareaEditada({...tareaEditada, prioridad: e.target.value})}>
                      <option value="Baja">Baja</option>
                      <option value="Media">Media</option>
                      <option value="Alta">Alta</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Fecha Límite</label>
                  <input type="date" className="form-input" value={tareaEditada.fechaLimite ? tareaEditada.fechaLimite.split('T')[0] : ''} 
                    onChange={(e) => setTareaEditada({...tareaEditada, fechaLimite: new Date(e.target.value).toISOString()})} />
                </div>
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
            <div className="modal-actions">
              {modoEdicion ? (
                <><button className="btn-icon" onClick={() => setModoEdicion(false)}>Cancelar</button><button className="btn-primary" onClick={guardarEdicion}>Guardar</button></>
              ) : (
                <><button className="btn-icon" onClick={() => setTareaSeleccionada(null)}>Cerrar</button><button className="btn-primary" onClick={iniciarEdicion}>Editar</button></>
              )}
            </div>
          </div>
        </div>
      )}
      
      {tareaABorrar && (
        <div className="modal-overlay" onClick={() => setTareaABorrar(null)}>
          <div className="modal-content modal-sm" onClick={(e) => e.stopPropagation()}>
            <h2 className="danger-text">Confirmar Borrado</h2>
            <p>¿Borrar <strong>"{tareaABorrar.titulo}"</strong>?</p>
            <div className="modal-actions">
              <button className="btn-icon" onClick={() => setTareaABorrar(null)}>No</button>
              <button className="btn-primary btn-danger" onClick={ejecutarBorrado}>Sí, Borrar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskList;