// Decodifica el token JWT y devuelve el nombre del usuario
export function getUsuarioActual() {
  const token = sessionStorage.getItem('token');
  if (!token) return null;
 
  try {
    // El token tiene 3 partes separadas por puntos, la del medio son los datos
    const payload = token.split('.')[1];
    // Decodificamos el base64
    const decoded = JSON.parse(atob(payload));
    // ClaimTypes.Name de C# se traduce a esta clave en el JWT
    return decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
  } catch {
    return null;
  }
}
 
// Cierra la sesión borrando el token
export function logout() {
  sessionStorage.removeItem('token');
}