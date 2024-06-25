import { Grid, List, Typography, Button } from "@mui/material";
import { useSession } from "../../context/system/SessionContext";
import { menuModuloIcons } from "../../model/menuModel";
import { Fragment } from "react";
import BibliotecaMenuGroup from "./BibliotecaMenuGroup";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const BibliotecaMenu = () => {
    const {
        definicionMenu,
        usuario,
        handleClickCerrarSesion,
    } = useSession();

    const style = {
        mr: 1,
        ml: 1,
        verticalAlign: "bottom",
    };

    return (
        <Fragment>
            <Grid container spacing={1} sx={{ backgroundColor: "white", paddingTop: 2, paddingBottom: 2 }}>
                <Grid item xs={12} textAlign="center">
                    <Typography variant="h5" color="secondary">
                        {usuario !== null ? usuario.nombrePerfil : "Invitado"}
                    </Typography>
                    <Typography variant="body1" color="secondary">
                        {usuario !== null ? usuario.nombres + " " + usuario.apellidos : "Invitado"}
                    </Typography>
                </Grid>
            </Grid>
            <List>
                {Object.keys(definicionMenu)
                    .filter((clave_modulo) => clave_modulo !== "_paths" && definicionMenu[clave_modulo].mostrar)
                    .map((clave_modulo) => (
                        <BibliotecaMenuGroup
                            key={clave_modulo}
                            icon={menuModuloIcons[clave_modulo]}
                            name={definicionMenu[clave_modulo].nombre}
                            clavesPaginas={definicionMenu[clave_modulo]["_paginas"]}
                        />
                    ))}
            </List>

            <Grid item xs={12} sx={style}>
                <Button
                    onClick={handleClickCerrarSesion}
                    size="large"
                    style={{ width: "100%", bottom: "0%" }}
                    startIcon={<ExitToAppIcon />}
                >
                    Cerrar sesión
                </Button>
            </Grid>
        </Fragment>
    );
};

export default BibliotecaMenu;
