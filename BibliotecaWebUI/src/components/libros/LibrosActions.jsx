import React, { Fragment } from "react";
import { useLibros } from "../../context/libros/LibrosContext";
import { IconButton, Tooltip } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function LibrosActions() {
  const {
    handleObtenerLibros,
    handleAgregarLibro,
    handleActualizarLibro,
    libroSeleccionado,
  } = useLibros();
  return (
    <Fragment>
      <Tooltip title={"Agregar libro"}>
        <IconButton onClick={handleAgregarLibro}>
          <AddIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title={"Editar libro"}>
        <IconButton
          onClick={handleActualizarLibro}
          disabled={!libroSeleccionado}
        >
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Refrescar datos">
        <IconButton onClick={handleObtenerLibros}>
          <RefreshIcon />
        </IconButton>
      </Tooltip>
    </Fragment>
  );
}
