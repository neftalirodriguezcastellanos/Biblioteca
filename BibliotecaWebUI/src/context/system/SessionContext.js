import { apiLogin } from "../../settings/apiConfig";
import { createContext, useContext, useEffect, useState } from "react";
import { isErrorForm, isNullOrEmpty } from "../../settings/utils";
import { routeLogin, routeRoot } from "../../settings/routeConfig";
import { useLocation, useNavigate } from "react-router-dom";
import { useConfiguration } from "./ConfigurationContext";
import { useLayout } from "./LayoutContext";
import { getLoginForm } from "../../model/formsModel";

export const tokenName = "biblioteca-dashboard-token";
export const tokenRefreshName = "biblioteca-dashboard-tokenRefresh";

const getConfiguracionDefault = () => ({
  tituloNavegador: "BIBLIOTECA",
  tituloDependencia: "PLATAFORMA DE BIBLIOTECA",
  metaDescription: "Plataforma de biblioteca",
  colorPrimario: "#095fb4", //#FD8204
  colorSecundario: "#0A5DA6", //#16216A
  contrastePrimario: "#FFFFFF",
  contrasteSecundario: "#FFFFFF",
  urlFuente:
    "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap",
  nombreFuente: "Roboto",
  rutaImagenFondo: "",
  rutaImagenLogo: "",
  rutaImagenPortal: "",
});

export const SessionContext = createContext();

export const SessionProvider = (props) => {
  const { handleOpenAlert, handleOpenLoader, handleCloseLoader } = useLayout();
  const { handleChangeConfiguration } = useConfiguration();
  const location = useLocation();
  const navigate = useNavigate();

  const menuDefault = {
    mnuLibros: {
      mostrar: true,
      nombre: "Libros",
      _paginas: {
        libros: {
          mostrar: true,
          path: "/libros",
          nombre: "Libros",
        },
      },
    },
    _paths: {},
  };

  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState("");
  const [permisosBotones, setPermisosBotones] = useState([]);
  const [configuracion, setConfiguracion] = useState(getConfiguracionDefault());
  const [definicionMenu, setDefinicionMenu] = useState(menuDefault);

  const [usuarioEnSesion, setUsuarioEnSesion] = useState(false);
  const [loginForm, setLoginForm] = useState(getLoginForm());
  const [previousRoute, setPreviousRoute] = useState("");

  const handleChangeLoginForm = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: {
        value: e.target.value,
        error: false,
      },
    });
  };

  const handleClickCerrarSesion = () => {
    setToken("");
    setPermisosBotones([]);
    setConfiguracion(getConfiguracionDefault());
    setUsuarioEnSesion(false);
    setLoginForm(getLoginForm());
    setDefinicionMenu(menuDefault);

    localStorage.removeItem(tokenName);
    localStorage.removeItem(tokenRefreshName);
    setPreviousRoute(location.pathname);
    setUsuario(null);
  };

  const handleSubmitLoginForm = async (e) => {
    e.preventDefault();

    const { password, username } = loginForm;

    const form = {
      ...loginForm,
      password: { ...password, error: password.value === "" },
      username: { ...username, error: username.value === "" },
    };
    setLoginForm(form);
    if (isErrorForm(form)) {
      return;
    }

    const loginRequest = {
      sEmail: username.value,
      sPassword: password.value,
    };

    try {
      handleOpenLoader("");
      const loginResponse = await fetch(apiLogin, {
        method: "POST",
        body: JSON.stringify(loginRequest),
        headers: {
          "content-type": "application/json",
        },
      });
      handleCloseLoader();
      const response = await loginResponse.json();
      if (response.hasError) {
        handleOpenAlert(response.message, "error");
        return;
      }

      saveLoginResponse(response);
    } catch (error) {
      handleCloseLoader();
      handleOpenAlert(
        "Ocurrió un error inesperado al intentar validar las credenciales",
        "error"
      );
    }
  };

  const saveLoginResponse = (loginResponse) => {
    localStorage.setItem(tokenName, loginResponse.result.token?.token);

    setUsuario(loginResponse.result.usuario);
    setToken(loginResponse.result.token?.token);
    if (loginResponse.result.usuario.roles.sNombre === "Administrador") {
      setDefinicionMenu({
        mnuLibros: {
          mostrar: true,
          nombre: "Libros",
          _paginas: {
            libros: {
              mostrar: true,
              path: "/libros",
              nombre: "Libros",
            },
            prestamos: {
              mostrar: true,
              path: "/prestamos",
              nombre: "Prestamos",
            },
            devoluciones: {
              mostrar: true,
              path: "/devoluciones",
              nombre: "Devoluciones",
            },
          },
        },
        mnuUsuarios: {
          mostrar: true,
          nombre: "Usuarios",
          _paginas: {
            usuarios: {
              mostrar: true,
              path: "/usuarios",
              nombre: "Administar",
            },
          },
        },
        _paths: {},
      });

      setPermisosBotones([
        {
          claveBoton: "libro_agregar",
          nombreBoton: "Agregar libro",
          tienePermiso: true,
        },
        {
          claveBoton: "libro_editar",
          nombreBoton: "Editar libro",
          tienePermiso: true,
        },
        {
          claveBoton: "libro_eliminar",
          nombreBoton: "Eliminar libro",
          tienePermiso: true,
        },
        {
          claveBoton: "libro_prestar",
          nombreBoton: "Prestar libros",
          tienePermiso: true,
        },
        {
          claveBoton: "libro_devolver",
          nombreBoton: "Devolver libros",
          tienePermiso: true,
        },
      ]);
    } else if (loginResponse.result.usuario.roles.sNombre === "Bibliotecario") {
      setDefinicionMenu({
        mnuLibros: {
          mostrar: true,
          nombre: "Libros",
          _paginas: {
            libros: {
              mostrar: true,
              path: "/libros",
              nombre: "Libros",
            },
            prestamos: {
              mostrar: true,
              path: "/prestamos",
              nombre: "Prestamos",
            },
            devoluciones: {
              mostrar: true,
              path: "/devoluciones",
              nombre: "Devoluciones",
            },
          },
        },
        _paths: {},
      });

      setPermisosBotones([
        {
          claveBoton: "libro_editar",
          nombreBoton: "Editar libro",
          tienePermiso: true,
        },
        {
          claveBoton: "libro_prestar",
          nombreBoton: "Prestar libros",
          tienePermiso: true,
        },
        {
          claveBoton: "libro_devolver",
          nombreBoton: "Devolver libros",
          tienePermiso: true,
        },
      ]);
    }

    // setPermisosBotones(loginResponse.result.permisosBotones);
    // setDefinicionMenu(JSON.parse(loginResponse.result.menu));
    setUsuarioEnSesion(true);

    navigate("/");
  };

  const getPermisoBoton = (clave) => {
    const boton = permisosBotones.find((x) => x.claveBoton === clave);
    return !boton ? false : boton.tienePermiso;
  };

  const getNombreBoton = (clave) => {
    const boton = permisosBotones.find((x) => x.claveBoton === clave);
    return !boton ? null : boton.nombreBoton;
  };

  useEffect(() => {
    if (!configuracion) {
      return;
    }

    handleChangeConfiguration(
      configuracion.urlFuente,
      configuracion.nombreFuente,
      configuracion.colorPrimario,
      configuracion.colorSecundario,
      configuracion.contrastePrimario,
      configuracion.contrasteSecundario,
      configuracion.tituloNavegador,
      configuracion.metaDescription
    );
  }, [configuracion]);

  const handleClickRegresarLogin = async (e) => {
    navigate(routeLogin);
  };

  return (
    <SessionContext.Provider
      value={{
        usuario,
        token,
        permisosBotones,
        usuarioEnSesion,
        configuracion,
        loginForm,
        previousRoute,
        definicionMenu,
        handleChangeLoginForm,
        handleSubmitLoginForm,
        handleClickCerrarSesion,
        getPermisoBoton,
        getNombreBoton,
        handleClickRegresarLogin,
      }}
    >
      {props.children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);
