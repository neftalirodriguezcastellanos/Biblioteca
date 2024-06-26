export const bibliotecaService = "https://localhost:7108/api";

export const apiLogin = bibliotecaService + "/login";
export const apiLibros = bibliotecaService + "/libros";
export const apiFilterUsuarios =
  bibliotecaService + "/Prestamos/filtrar-usuarios/{query}";
export const apiLibrosDisponibles =
  bibliotecaService + "/Prestamos/libros-disponibles";
export const apiLibrosPrestar = bibliotecaService + "/Prestamos/prestar";
export const apiPrestamoUsuarios =
  bibliotecaService + "/Prestamos/prestamos-usuario";
export const apiLibrosDevolver = bibliotecaService + "/Prestamos/devolver";
export const apiUsuarios = bibliotecaService + "/usuarios";
