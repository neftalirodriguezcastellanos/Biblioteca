import React, { createContext, useState, useContext } from "react";
import { useRequest } from "../system/RequestContext";
import { useLayout } from "../system/LayoutContext";
import { isNullOrEmpty } from "../../settings/utils";
import {
  apiFilterUsuarios,
  apiLibrosDisponibles,
  apiLibrosPrestar,
  apiPrestamoUsuarios,
  apiLibrosDevolver,
} from "../../settings/apiConfig";

export const PrestamosContext = createContext();

export const PrestamosProvider = (props) => {
  const { GetRequest, PostRequest, PutRequest, DeleteRequest } = useRequest();
  const { handleOpenAlert } = useLayout();

  const [filterUsuario, setFilterUsuario] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [librosDisponibles, setLibrosDisponibles] = useState([]);
  const [libroSeleccionado, setLibroSeleccionado] = useState(null);

  const [prestamosUsuario, setPrestamosUsuario] = useState([]);

  const handleFiltrarUsuarios = async (query) => {
    const response = await GetRequest({
      url: apiFilterUsuarios.replace("{query}", query),
    });

    if (response.hasError) {
      setFilterUsuario([]);
    } else {
      setFilterUsuario(response.result);
    }
  };

  const handleObtenerLibrosDisponibles = async () => {
    const response = await GetRequest({
      url: apiLibrosDisponibles,
      loader: "Consultando libros...",
    });

    if (response.hasError) {
      setLibrosDisponibles([]);
      handleOpenAlert(response.message);
    } else {
      response.result.forEach((libro) => {
        libro.bSeleccionado = false;
      });
      setLibrosDisponibles(response.result);
    }
  };

  const handleSeleccionarUsuario = (usuario) => {
    setUsuarioSeleccionado(usuario);
  };

  const handleSeleccionarLibro = (libro) => {
    setLibroSeleccionado(libro);
  };

  const handleChangeCheck = (event, row) => {
    setLibrosDisponibles((prevState) => {
      const newLibros = prevState.map((libro) => {
        if (libro.uIdLibro === row.uIdLibro) {
          return { ...libro, bSeleccionado: event.target.checked };
        }
        return libro;
      });
      return newLibros;
    });
  };

  const handleChangeCheckDevolver = (event, row) => {
    setPrestamosUsuario((prevState) => {
      const newPrestamo = prevState.map((prestamo) => {
        if (prestamo.uIdPrestamo === row.uIdPrestamo) {
          return { ...prestamo, bSeleccionado: event.target.checked };
        }
        return prestamo;
      });
      return newPrestamo;
    });
  };

  const handleSavePrestamo = async () => {
    if (isNullOrEmpty(usuarioSeleccionado)) {
      handleOpenAlert("Debe seleccionar un usuario");
      return;
    }

    const librosPrestamo = librosDisponibles.filter(
      (libro) => libro.bSeleccionado
    );

    if (librosPrestamo.length === 0) {
      handleOpenAlert("Debe seleccionar al menos un libro");
      return;
    }

    let body = [];
    librosPrestamo.forEach((libro) => {
      body.push({
        uIdLibro: libro.uIdLibro,
        uIdUsuario: usuarioSeleccionado,
        bActivo: true,
      });
    });

    const response = await PostRequest({
      url: apiLibrosPrestar,
      loader: "Guardando préstamo...",
      body: body,
    });

    if (response.hasError) {
      handleOpenAlert(response.message);
    } else {
      handleOpenAlert("Préstamo guardado correctamente", "success");
      setLibrosDisponibles([]);
      setUsuarioSeleccionado(null);
      setLibroSeleccionado(null);
      await handleObtenerLibrosDisponibles();
    }
  };

  const handleObtenerPrestamosUsuario = async () => {
    const response = await GetRequest({
      url: apiPrestamoUsuarios,
      loader: "Obteniendo préstamos...",
    });

    if (response.hasError) {
      setPrestamosUsuario([]);
    } else {
      response.result.forEach((prestamo) => {
        prestamo.bSeleccionado = false;
      });
      setPrestamosUsuario(response.result);
    }
  };

  const handleDevolverLibros = async () => {
    const librosDevolver = prestamosUsuario.filter(
      (prestamo) => prestamo.bSeleccionado
    );

    if (librosDevolver.length === 0) {
      handleOpenAlert("Debe seleccionar al menos un libro para devolver");
      return;
    }

    let body = [];
    librosDevolver.forEach((libro) => {
      body.push({
        uIdPrestamo: libro.uIdPrestamo,
        bActivo: false,
      });
    });

    const response = await PostRequest({
      url: apiLibrosDevolver,
      loader: "Devolviendo libros...",
      body: body,
    });

    if (response.hasError) {
      handleOpenAlert(response.message);
    } else {
      handleOpenAlert("Libros devueltos correctamente", "success");
      await handleObtenerPrestamosUsuario();
    }
  };

  return (
    <PrestamosContext.Provider
      value={{
        filterUsuario,
        usuarioSeleccionado,
        librosDisponibles,
        libroSeleccionado,
        prestamosUsuario,
        handleFiltrarUsuarios,
        handleSeleccionarUsuario,
        handleObtenerLibrosDisponibles,
        handleSeleccionarLibro,
        handleChangeCheck,
        handleChangeCheckDevolver,
        handleSavePrestamo,
        handleObtenerPrestamosUsuario,
        handleDevolverLibros,
      }}
    >
      {props.children}
    </PrestamosContext.Provider>
  );
};

export const usePrestamos = () => useContext(PrestamosContext);
