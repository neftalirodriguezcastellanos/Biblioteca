import { Grid, Typography } from "@mui/material";
import BibliotecaLabelInfo from "../utils/BibliotecaLabelInfo";

export default function LibrosDetalle(props) {
  const { libroSeleccionado } = props;

  if (!libroSeleccionado) {
    return <Typography>Seleccione un registro para ver el detalle</Typography>;
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <BibliotecaLabelInfo label="Código:">
          {libroSeleccionado.sCodigo}
        </BibliotecaLabelInfo>
      </Grid>
      <Grid item xs={12}>
        <BibliotecaLabelInfo label="Título:">
          {libroSeleccionado.sTitulo}
        </BibliotecaLabelInfo>
      </Grid>
      <Grid item xs={12}>
        <BibliotecaLabelInfo label="Autor:">
          {libroSeleccionado.sAutor}
        </BibliotecaLabelInfo>
      </Grid>
      <Grid item xs={12}>
        <BibliotecaLabelInfo label="ISBN:">
          {libroSeleccionado.sISBN}
        </BibliotecaLabelInfo>
      </Grid>
      <Grid item xs={12}>
        <BibliotecaLabelInfo label="Editorial:">
          {libroSeleccionado.sEditorial}
        </BibliotecaLabelInfo>
      </Grid>
      <Grid item xs={12}>
        <BibliotecaLabelInfo label="Año:">
          {libroSeleccionado.iAnio}
        </BibliotecaLabelInfo>
      </Grid>
    </Grid>
  );
}
