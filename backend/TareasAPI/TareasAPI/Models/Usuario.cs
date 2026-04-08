namespace TareasAPI.Models
{
    public class Usuario
    {
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty;

        // La contraseña NUNCA se guarda en texto plano, 
        // guardaremos un hash (un código cifrado)
        public byte[] PasswordHash { get; set; } = new byte[0];
        public byte[] PasswordSalt { get; set; } = new byte[0];
    }
}