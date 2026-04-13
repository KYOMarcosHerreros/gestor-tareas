import React from "react";
import { Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
import Footer from "./components/Footer";
import TaskList from "./pages/TaskList";
import TaskForm from "./pages/TaskForm";
import Login from "./pages/Login";
import Register from "./pages/Register";
import './App.css';

function App() {
  return (
    <div className="app-wrapper">
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/nueva-tarea" element={<TaskForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Register />} />
          {/* 🔥 La trampa: Si React Router se pierde, veremos este texto gigante */}
          <Route path="*" element={<h1 style={{color: 'red', textAlign: 'center', marginTop: '50px'}}>¡RUTA NO ENCONTRADA!</h1>} /> 
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;