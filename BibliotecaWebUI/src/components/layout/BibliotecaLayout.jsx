import { AppBar, Drawer, Hidden, IconButton, Toolbar, Tooltip, Typography, Breadcrumbs, Box, Grid } from "@mui/material";
import { Fragment, useState } from "react";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";
import BibliotecaBody from "../utils/BibliotecaBody";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import { useLayout } from "../../context/system/LayoutContext";

export default function BibliotecaLayout({
    children,
    titlePage,
    buttonActions,
    detailComponent,
}) {
    const [detailOpen, setDetailOpen] = useState(false);
    const { detailDashboardOpen, handleOpenDetailDashboard, handleCloseDetailDashboard } = useLayout();

    const handleOpenDetail = () => {
        setDetailOpen(true);
    };

    const handleCloseDetail = () => {
        setDetailOpen(false);
    };

    return (
        <Fragment>
            <div className="biblioteca-elementos">
                <div className="work">
                    <BibliotecaBody>
                        <AppBar
                            className="title"
                            position="static"
                            color="secondary"
                            style={{ zIndex: 100, overflowX: "auto" }}
                        >
                            <Toolbar variant="dense" style={{ gap: 4 }}>
                                <Typography variant="h6" color="inherit" style={{ flexGrow: 1 }}>
                                    {titlePage}
                                </Typography>
                                {buttonActions && (
                                    <Fragment>
                                        {buttonActions}
                                        <Hidden mdUp>
                                            {detailComponent && (
                                                <Tooltip title="Ver detalles">
                                                    <IconButton onClick={handleOpenDetail}>
                                                        <ReadMoreIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            )}
                                        </Hidden>
                                        <Hidden mdDown>
                                            {detailComponent && !detailDashboardOpen && (
                                                <Tooltip title="Mostrar panel de detalle">
                                                    <IconButton onClick={handleOpenDetailDashboard}>
                                                        <ReadMoreIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            )}
                                        </Hidden>
                                    </Fragment>
                                )}
                            </Toolbar>
                        </AppBar>
                        <div className="elements">
                            <BibliotecaBody>{children}</BibliotecaBody>
                        </div>
                    </BibliotecaBody>
                </div>
                <Hidden mdDown>
                    {detailComponent && detailDashboardOpen && (
                        <div className="detail" style={{ display: "flex", flexDirection: "column" }}>
                            <AppBar color="primary" position="static" variant="elevation">
                                <Toolbar variant="dense" style={{ gap: 4 }}>
                                    <Typography variant="h6" color="inherit" style={{ flexGrow: 1 }}>
                                        Detalles
                                    </Typography>
                                    <Tooltip title="Ocultar panel de detalle" placement="left">
                                        <IconButton color="primary" onClick={handleCloseDetailDashboard}>
                                            <ChevronRightIcon />
                                        </IconButton>
                                    </Tooltip>
                                </Toolbar>
                            </AppBar>
                            <BibliotecaBody padding={10}>{detailComponent}</BibliotecaBody>
                        </div>
                    )}
                </Hidden>
            </div>
            <Hidden mdUp>
                {detailComponent && (
                    <Drawer
                        open={detailOpen}
                        anchor="right"
                        onClose={handleCloseDetail}
                        BackdropProps={{
                            sx: { backgroundColor: "transparent" },
                        }}
                        PaperProps={{
                            sx: { boxShadow: "-15px 0px 50px rgba(44, 47, 61, 0.15);" },
                        }}
                    >
                        <AppBar color="primary" position="static">
                            <Toolbar variant="dense">
                                <Typography variant="h6" color="inherit" style={{ flexGrow: 1 }}>
                                    Detalles
                                </Typography>
                                <Tooltip title="Cerrar panel de detalle" placement="left">
                                    <IconButton color="inherit" onClick={handleCloseDetail}>
                                        <CloseIcon />
                                    </IconButton>
                                </Tooltip>
                            </Toolbar>
                        </AppBar>
                        <div style={{ width: 250, padding: 10 }}>{detailComponent}</div>
                    </Drawer>
                )}
            </Hidden>
        </Fragment>
    );
}
