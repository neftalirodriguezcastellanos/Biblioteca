import { Drawer, Hidden } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { Fragment, useEffect } from "react";
import BiblotecaMenu from "./BibliotecaMenu";
import { dashboardPaginas } from "../../model/menuModel";
import { useConfiguration } from "../../context/system/ConfigurationContext";
import { useLayout } from "../../context/system/LayoutContext";
import { useSession } from "../../context/system/SessionContext";
import imgBiblioteca from "../../img/books-library.jpg"

const BibliotecaDashboard = () => {
    const { definicionMenu, usuario, connection } = useSession();
    const { menuClientOpen, menuDashboardOpen, handleCloseMenuClient } = useLayout();

    const { theme } = useConfiguration();

    return (
        <Fragment>
            <Hidden lgDown>
                {menuDashboardOpen && (
                    <div className="menu-area" style={{ backgroundColor: theme.palette.primary.main }}>
                        <BiblotecaMenu />
                    </div>
                )}
            </Hidden>
            <Drawer
                open={menuClientOpen}
                anchor="left"
                onClose={handleCloseMenuClient}
                PaperProps={{ style: { backgroundColor: theme.palette.primary.main, width: 600, color: "initial" } }}
            >
                <div className="menu-area">
                    <BiblotecaMenu />
                </div>
            </Drawer>
            <Routes>
                {Object.keys(definicionMenu)
                    .filter((clave_modulo) => clave_modulo !== "_paths")
                    .map((clave_modulo) =>
                        Object.keys(definicionMenu[clave_modulo]["_paginas"]).map((clave_pagina) => (
                            <Route
                                path={definicionMenu[clave_modulo]["_paginas"][clave_pagina].path}
                                element={dashboardPaginas[clave_pagina]}
                            />
                        ))
                    )}

                <Route
                    path="/*"
                    element={
                        <div
                            className="login-container"
                            style={{
                                backgroundImage: `url(${imgBiblioteca})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",

                            }}
                        >
                        </div>
                    }
                />
            </Routes>
        </Fragment>
    );
};

export default BibliotecaDashboard;
