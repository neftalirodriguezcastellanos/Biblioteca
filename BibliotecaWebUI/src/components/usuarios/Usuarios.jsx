import React, { Fragment, useEffect } from "react";
import { useLayout } from "../../context/system/LayoutContext";
import { useUsuarios } from "../../context/usuarios/UsuariosContext";
import BibliotecaLayout from "../layout/BibliotecaLayout";
import BibliotecaTable from "../utils/BibliotecaTable";
import UsuariosDetalle from "./UsuariosDetalle";
import { Tooltip, IconButton } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

export default function Usuarios() {
  const { handleChangeTitle, handleChangeClavePaginaActual } = useLayout();
  const {
    handleObtenerUsuarios,
    listaUsuarios,
    usuarioSeleccionado,
    handleSeleccionarUsuario,
  } = useUsuarios();

  useEffect(() => {
    handleChangeTitle("Usuarios");
    handleChangeClavePaginaActual("usuarios");
    handleObtenerUsuarios();
    handleSeleccionarUsuario(null);
  }, []);

  return (
    <BibliotecaLayout
      titlePage={"Usuarios"}
      buttonActions={
        <Fragment>
          <Tooltip title="Refrescar datos">
            <span>
              <IconButton onClick={handleObtenerUsuarios}>
                <RefreshIcon />
              </IconButton>
            </span>
          </Tooltip>
        </Fragment>
      }
      detailComponent={
        <UsuariosDetalle usuarioSeleccionado={usuarioSeleccionado} />
      }
    >
      <BibliotecaTable
        data={listaUsuarios}
        columns={[
          { title: "EMAIL", field: "sEmail" },
          { title: "NOMBRE", field: "sNombre" },
          { title: "APELLIDOS", field: "sApellidos" },
          { title: "PASSWORD", field: "sPassword" },
          { title: "ROL", field: "sRol" },
        ]}
        id="uIdUsuario"
        row={usuarioSeleccionado}
        setRow={handleSeleccionarUsuario}
      />
    </BibliotecaLayout>
  );
}
