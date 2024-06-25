import {
  Button,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useSession } from "../../context/system/SessionContext";
import KeyIcon from "@mui/icons-material/LockOutlined";
import imgBiblioteca from "../../img/books-library.jpg";
import PersonIcon from "@mui/icons-material/PersonOutlineSharp";
import { useConfiguration } from "../../context/system/ConfigurationContext";
import { Link, useParams } from "react-router-dom";

export default function BibliotecaLogin() {
  const {
    loginForm: { username, password },
    handleChangeLoginForm,
    handleSubmitLoginForm,
  } = useSession();
  const { theme } = useConfiguration();

  return (
    <div className="login-container">
      <Grid container>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={6}
          xl={6}
          display="flex"
          justifyContent="center"
        >
          <Paper sx={{ padding: 6 }} className="login-content">
            <form noValidate onSubmit={handleSubmitLoginForm}>
              <Grid container>
                <Grid
                  container
                  sx={{ paddingTop: 0, paddingLeft: 12, paddingRight: 12 }}
                >
                  <Grid item justify="center" alignItems="center" xs={12}>
                    <Typography
                      style={{
                        color: "#242D61",
                        textAlign: "center",
                        fontWeight: "bold",
                        fontSize: "20px",
                      }}
                    >
                      {`Ingresa a tu cuenta`}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <InputLabel className="lbl" required>
                      Usuario
                    </InputLabel>
                    <TextField
                      name="username"
                      // label="Usuario:"
                      value={username.value}
                      onChange={handleChangeLoginForm}
                      error={username.error}
                      helperText={
                        username.error && "Nombre de usuario requerido"
                      }
                      autoComplete="new-password"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputLabel className="lbl" required>
                      Contraseña
                    </InputLabel>
                    <TextField
                      name="password"
                      value={password.value}
                      onChange={handleChangeLoginForm}
                      error={password.error}
                      helperText={password.error && "Contraseña requerida"}
                      type="password"
                      autoComplete="new-password"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <KeyIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={12}
                    display="flex"
                    justifyContent="right"
                    alignItems="right"
                  ></Grid>
                  <Grid item xs={12} textAlign="center">
                    <Button
                      type="submit"
                      style={{ backgroundColor: "#00A7E5" }}
                      fullWidth
                    >
                      Entrar
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid item xs={12} className="center">
                      <Typography variant="caption">
                        &copy; {new Date().getFullYear()} - Biblioteca
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={6}
          xl={6}
          display="flex"
          className="imagen-container"
        >
          <img
            src={imgBiblioteca}
            alt="logo_biblioteca"
            className="imagen-ocupar-pantalla"
          />
        </Grid>
      </Grid>
    </div>
  );
}
