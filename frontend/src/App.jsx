import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import TaskList from './pages/TaskList';
import './App.css';

function App() {
  return (
    <div className="app-wrapper">
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/nueva" element={<h2>Formulario</h2>} />
          <Route path="/editar/:id" element={<h2>Formulario</h2>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;