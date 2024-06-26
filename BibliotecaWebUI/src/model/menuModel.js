import PersonIcon from "@mui/icons-material/Person";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";

import Libros from "../components/libros/Libros";
import Prestamos from "../components/prestamos/Prestamos";
import Devoluciones from "../components/prestamos/Devoluciones";
import Usuarios from "../components/usuarios/Usuarios";

export const dashboardPaginas = {
  usuarios: <Usuarios />,
  libros: <Libros />,
  prestamos: <Prestamos />,
  devoluciones: <Devoluciones />,
};

export const menuModuloIcons = {
  mnuUsuarios: <PersonIcon />,
  mnuLibros: <LibraryBooksIcon />,
  mnuPrestamos: <AutoStoriesIcon />,
};
