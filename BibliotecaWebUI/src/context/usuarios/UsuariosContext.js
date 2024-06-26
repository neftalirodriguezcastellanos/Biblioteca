import React, { createContext, useContext, useState } from "react";
import { useRequest } from "../system/RequestContext";
import { apiUsuarios } from "../../settings/apiConfig";
import { useLayout } from "../system/LayoutContext";

export const UsuariosContext = createContext();

export const UsuariosProvider = (props) => {
  const { GetRequest } = useRequest();
  const { handleOpenAlert } = useLayout();
  const [listaUsuarios, setListaUsuarios] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

  const handleObtenerUsuarios = async () => {
    const response = await GetRequest({
      url: apiUsuarios,
      loader: "Consultando usuarios...",
    });

    if (response.hasError) {
      setListaUsuarios([]);
      handleOpenAlert(response.message);
    } else {
      setListaUsuarios(response.result);
    }
  };

  const handleSeleccionarUsuario = (usuario) => {
    setUsuarioSeleccionado(usuario);
  };

  return (
    <UsuariosContext.Provider
      value={{
        listaUsuarios,
        usuarioSeleccionado,
        handleObtenerUsuarios,
        handleSeleccionarUsuario,
      }}
    >
      {props.children}
    </UsuariosContext.Provider>
  );
};

export const useUsuarios = () => useContext(UsuariosContext);
