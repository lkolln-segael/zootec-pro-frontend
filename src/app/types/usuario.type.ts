
export type UsuarioForm = {
  id?: string;
  nombre: string;
  nombreUsuario: string;
  contraseña: string;
  password?: string;
  idRol: string;
  fechaCreacion?: string
}

export type Rol = {
  id: string;
  nombre: string;
}
