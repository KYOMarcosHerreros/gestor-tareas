import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createTarea } from "../services/api"; // 👈 Usamos el servicio

function TaskForm() {
  const navigate = useNavigate();

  const [titulo, setTitulo] = useState("");
  const [prioridad, setPrioridad] = useState("Baja");
  const [fechaLimite, setFechaLimite] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [error, setError] = useState("");

  // 🛡️ Magia antifechas del pasado: sacamos la fecha de hoy en formato YYYY-MM-DD
  const hoy = new Date().toISOString().split("T")[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const nuevaTarea = {
      titulo,
      prioridad,
      estado: "Pendiente",
      fechaCreacion: new Date().toISOString(),
      fechaLimite: fechaLimite ? new Date(fechaLimite).toISOString() : null,
      descripcion,
    };

    try {
      await createTarea(nuevaTarea); // 🚀 Llamada súper limpia
      navigate("/", {
        state: { mensajeExito: "Nueva tarea creada con éxito" },
      });
    } catch (err) {
      setError(err.message || "No se pudo conectar.");
    }
  };

  return (
    <div className="form-card" style={{ marginTop: "30px" }}>
      <h2 className="form-title">Crear Nueva Tarea</h2>

      {error && <div className="alert-message alert-error">{error}</div>}

      <form className="main-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Título de la tarea</label>
          <input
            type="text"
            className="form-input"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Ej: Preparar informe trimestral"
            maxLength="100"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Prioridad</label>
          <select
            className="form-input"
            value={prioridad}
            onChange={(e) => setPrioridad(e.target.value)}
          >
            <option value="Baja">Baja</option>
            <option value="Media">Media</option>
            <option value="Alta">Alta</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Fecha Límite</label>
          {/* 🔥 Aquí metemos la restricción 'min' para evitar el bug */}
          <input
            type="date"
            className="form-input"
            min={hoy}
            value={fechaLimite}
            onChange={(e) => setFechaLimite(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Descripción (Opcional)</label>
          <textarea
            className="form-input"
            placeholder="Añade más detalles sobre la tarea..."
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            maxLength="500"
            rows="4"
          />
          <div className="char-counter">{descripcion.length} / 500</div>
        </div>

        <div className="form-actions">
          {/* 🔥 Lo cambiamos de <Link> a <button> con navigate */}
          <button type="button" className="btn-secondary"
            onClick={() => navigate("/")}
          >
            Cancelar
          </button>

          <button type="submit" className="btn-primary">
            Guardar Tarea
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;
