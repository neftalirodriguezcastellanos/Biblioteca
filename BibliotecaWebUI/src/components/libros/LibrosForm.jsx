import React from "react";
import { Grid, TextField } from "@mui/material";
import { useLibros } from "../../context/libros/LibrosContext";
import BibliotecaModal from "../utils/BibliotecaModal";

export default function LibrosForm() {
  const {
    openForm,
    handleOpenForm,
    libroForm,
    handleSubmitForm,
    handleChangeText,
    isEdit,
  } = useLibros();
  const { txtCodigo, txtTitulo, txtAutor, txtISBN, txtEditorial, txtAnio } =
    libroForm;
  return (
    <BibliotecaModal
      form
      open={openForm}
      title={isEdit ? "Editar libro" : "Nuevo libro"}
      onClose={() => handleOpenForm(false)}
      onSuccess={handleSubmitForm}
      success={"Agregar"}
    >
      <Grid container>
        <Grid item xs={12}>
          <TextField
            name={txtCodigo.id}
            label="Código"
            value={txtCodigo.value}
            error={txtCodigo.error}
            helperText={txtCodigo.error ? "Campo requerido" : ""}
            required
            inputProps={{ maxLength: 5, pattern: "[a-zA-z0-9]{0,5}" }}
            onChange={handleChangeText}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name={txtTitulo.id}
            label="Título"
            value={txtTitulo.value}
            onChange={handleChangeText}
            error={txtTitulo.error}
            helperText={txtTitulo.error ? "Campo requerido" : ""}
            required
            inputProps={{
              maxLength: 500,
              pattern: "[a-zA-Z´ÁÉÍÓÚáéíóúñÑ ]{0,500}",
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name={txtAutor.id}
            label="Autor"
            value={txtAutor.value}
            onChange={handleChangeText}
            error={txtAutor.error}
            helperText={txtAutor.error ? "Campo requerido" : ""}
            required
            inputProps={{
              maxLength: 100,
              pattern: "[a-zA-Z´ÁÉÍÓÚáéíóúñÑ ]{0,100}",
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name={txtISBN.id}
            label="ISBN"
            value={txtISBN.value}
            onChange={handleChangeText}
            error={txtISBN.error}
            helperText={txtISBN.error ? "Campo requerido" : ""}
            required
            inputProps={{
              maxLength: 20,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name={txtEditorial.id}
            label="Editorial"
            value={txtEditorial.value}
            onChange={handleChangeText}
            error={txtEditorial.error}
            helperText={txtEditorial.error ? "Campo requerido" : ""}
            required
            inputProps={{
              maxLength: 100,
              pattern: "[a-zA-Z´ÁÉÍÓÚáéíóúñÑ ]{0,100}",
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name={txtAnio.id}
            label="Año"
            value={txtAnio.value}
            onChange={handleChangeText}
            error={txtAnio.error}
            helperText={txtAnio.error ? "Campo requerido" : ""}
            required
            inputProps={{ pattern: "[0-9]{0,4}" }}
          />
        </Grid>
      </Grid>
    </BibliotecaModal>
  );
}
