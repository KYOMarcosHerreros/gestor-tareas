// src/services/api.js

const API_URL = 'https://unsocialized-unstalemated-corie.ngrok-free.dev';

// Auxiliar para los headers (maneja el token automáticamente si existe)
const getHeaders = () => {
  const token = sessionStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

// ==========================================
// 🔐 SERVICIOS DE AUTENTICACIÓN
// ==========================================

export const loginUser = async (email, password) => {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ username: email, password }),
  });

  if (!response.ok) {
    const msg = await response.text();
    throw new Error(msg || 'Usuario o contraseña incorrectos');
  }
  return await response.text();
};

export const registerUser = async (nombre, email, password) => {
  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ nombre, username: email, password }),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || 'Error al registrar el usuario');
  }
  return true;
};

// ==========================================
// 📝 SERVICIOS DE TAREAS
// ==========================================

export const getTareas = async () => {
  const response = await fetch(`${API_URL}/api/tareas`, {
    headers: getHeaders(),
  });
  if (!response.ok) throw new Error('Error al cargar las tareas');
  const data = await response.json();
  return data.datos;
};

export const updateTarea = async (id, tareaData) => {
  const response = await fetch(`${API_URL}/api/tareas/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(tareaData),
  });
  if (!response.ok) throw new Error('Error al actualizar la tarea');
  return true;
};

export const deleteTarea = async (id) => {
  const response = await fetch(`${API_URL}/api/tareas/${id}`, {
    method: 'DELETE',
    headers: getHeaders(),
  });
  if (!response.ok) throw new Error('Error al borrar la tarea');
  return true;
};