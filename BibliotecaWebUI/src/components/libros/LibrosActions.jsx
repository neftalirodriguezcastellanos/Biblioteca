import React, { Fragment } from "react";
import { useLibros } from "../../context/libros/LibrosContext";
import { useSession } from "../../context/system/SessionContext";
import { IconButton, Tooltip } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function LibrosActions() {
  const { getPermisoBoton, getNombreBoton } = useSession();
  const {
    handleObtenerLibros,
    handleAgregarLibro,
    handleActualizarLibro,
    libroSeleccionado,
    handleEliminarLibro,
  } = useLibros();
  return (
    <Fragment>
      {getPermisoBoton("libro_agregar") && (
        <Tooltip title={getNombreBoton("libro_agregar")}>
          <span>
            <IconButton onClick={handleAgregarLibro}>
              <AddIcon />
            </IconButton>{" "}
          </span>
        </Tooltip>
      )}
      {getPermisoBoton("libro_editar") && (
        <Tooltip title={getNombreBoton("libro_editar")}>
          <span>
            <IconButton
              onClick={handleActualizarLibro}
              disabled={!libroSeleccionado}
            >
              <EditIcon />
            </IconButton>
          </span>
        </Tooltip>
      )}
      {getPermisoBoton("libro_eliminar") && (
        <Tooltip title={getNombreBoton("libro_eliminar")}>
          <span>
            <IconButton
              onClick={handleEliminarLibro}
              disabled={!libroSeleccionado}
            >
              <DeleteIcon />
            </IconButton>
          </span>
        </Tooltip>
      )}
      <Tooltip title="Refrescar datos">
        <span>
          <IconButton onClick={handleObtenerLibros}>
            <RefreshIcon />
          </IconButton>
        </span>
      </Tooltip>
    </Fragment>
  );
}
