import { Routes, Route } from 'react-router-dom'
import TaskList from './pages/TaskList'
import './App.css'

function App() {
  return (
    <div className="container">
      <nav style={{ paddingBottom: '20px', borderBottom: '2px solid #eee', marginBottom: '20px' }}>
        <h1>Gestor de Tareas 📋</h1>
      </nav>

      <Routes>
        {/* Usamos el componente TaskList en lugar del <h2> */}
        <Route path="/" element={<TaskList />} />
        <Route path="/nueva" element={<h2>Aquí irá el Formulario de Creación</h2>} />
        <Route path="/editar/:id" element={<h2>Aquí irá el Formulario de Edición</h2>} />
      </Routes>
    </div>
  )
}

export default App