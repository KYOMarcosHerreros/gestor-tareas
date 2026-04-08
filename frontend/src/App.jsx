import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import TaskList from './pages/TaskList';
import TaskForm from './pages/TaskForm';
import Login from './pages/Login';
import './App.css';

function App() {
  return (
    <div className="app-wrapper">
      <Header />
      <main className="container">
        <Routes>
          {/* Aquí están las 3 páginas de tu aplicación */}
          <Route path="/" element={<TaskList />} />
          <Route path="/nueva-tarea" element={<TaskForm />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;