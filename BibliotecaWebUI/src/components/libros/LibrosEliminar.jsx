import React from "react";
import { useLibros } from "../../context/libros/LibrosContext";
import BibliotecaModal from "../utils/BibliotecaModal";
import { Grid } from "@mui/material";

export default function LibrosEliminar() {
  const { openConfirm, handleOpenConfirm, handleSubmitEliminar } = useLibros();
  return (
    <BibliotecaModal
      open={openConfirm}
      title={"Eliminar libro"}
      onClose={() => handleOpenConfirm(false)}
      success={"Eliminar"}
      onSuccess={handleSubmitEliminar}
    >
      <Grid container>
        <Grid item xs={12}>
          ¿Está seguro de eliminar el libro seleccionado?
        </Grid>
      </Grid>
    </BibliotecaModal>
  );
}
