// src/services/api.js

const API_URL = 'https://tareasapi-dlf7.onrender.com';

const getHeaders = () => {
  const token = sessionStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',

  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

export const loginUser = async (email, password) => {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ username: email, password }),
  });

  if (!response.ok) {
    const textMsg = await response.text();
    try {
      const errorObj = JSON.parse(textMsg);
      // 🔥 Magia: Si el backend manda errores de validación de .NET, sacamos el primero
      if (errorObj.errors) {
        const primerError = Object.keys(errorObj.errors)[0];
        throw new Error(errorObj.errors[primerError][0]); 
      }
      throw new Error(errorObj.message || 'Usuario o contraseña incorrectos');
    } catch (e) {
      // Si el parseo falla, es que no era JSON, lanzamos el error normal
      if (e.name === 'SyntaxError') throw new Error(textMsg || 'Error de conexión');
      throw e; 
    }
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

export const createTarea = async (tareaData) => {
  const response = await fetch(`${API_URL}/api/tareas`, {
    method: 'POST',
    headers: getHeaders(), // 👈 Usa nuestra función centralizada
    body: JSON.stringify(tareaData),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || 'Error al guardar la tarea');
  }
  return true;
};