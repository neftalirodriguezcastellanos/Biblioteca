import PersonIcon from "@mui/icons-material/Person";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";

import Libros from "../components/libros/Libros";

export const dashboardPaginas = {
  usuarios: null,
  libros: <Libros />,
  prestamos: null,
};

export const menuModuloIcons = {
  mnuUsuarios: <PersonIcon />,
  mnuLibros: <LibraryBooksIcon />,
  mnuPrestamos: <AutoStoriesIcon />,
};
