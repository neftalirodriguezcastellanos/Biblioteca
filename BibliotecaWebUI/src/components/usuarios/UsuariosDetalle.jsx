import { Grid, Typography } from "@mui/material";
import BibliotecaLabelInfo from "../utils/BibliotecaLabelInfo";

export default function UsuariosDetalle(props) {
  const { usuarioSeleccionado } = props;

  if (!usuarioSeleccionado) {
    return <Typography>Seleccione un registro para ver el detalle</Typography>;
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <BibliotecaLabelInfo label="Email:">
          {usuarioSeleccionado.sEmail}
        </BibliotecaLabelInfo>
      </Grid>
      <Grid item xs={12}>
        <BibliotecaLabelInfo label="Nombre:">
          {usuarioSeleccionado.sNombre}
        </BibliotecaLabelInfo>
      </Grid>
      <Grid item xs={12}>
        <BibliotecaLabelInfo label="Apellidos:">
          {usuarioSeleccionado.sApellidos}
        </BibliotecaLabelInfo>
      </Grid>
      <Grid item xs={12}>
        <BibliotecaLabelInfo label="Password:">
          {usuarioSeleccionado.sPassword}
        </BibliotecaLabelInfo>
      </Grid>
      <Grid item xs={12}>
        <BibliotecaLabelInfo label="Rol:">
          {usuarioSeleccionado.sRol}
        </BibliotecaLabelInfo>
      </Grid>
    </Grid>
  );
}
