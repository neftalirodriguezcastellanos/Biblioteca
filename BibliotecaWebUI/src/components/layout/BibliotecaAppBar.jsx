import { AppBar, Hidden, IconButton, Toolbar, Tooltip, Badge } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { useLayout } from "../../context/system/LayoutContext";

export default function BibliotecaAppBar() {
    const { handleOpenMenuClient, menuDashboardOpen, handleOpenMenuDashboard, handleCloseMenuDashboard } = useLayout();

    return (
        <AppBar position="static" color="transparent" variant="elevation" style={{ overflowX: "auto" }}>
            <Toolbar variant="dense" style={{ marginTop: 2, marginBottom: 2 }}>
                <Hidden lgUp>
                    <IconButton color="primary" sx={{ marginRight: 2 }} onClick={handleOpenMenuClient}>
                        <MenuIcon />
                    </IconButton>
                </Hidden>
                <Hidden lgDown>
                    {menuDashboardOpen ? (
                        <Tooltip title="Ocultar menú">
                            <IconButton color="primary" sx={{ marginRight: 2 }} onClick={handleCloseMenuDashboard}>
                                <MenuOpenIcon />
                            </IconButton>
                        </Tooltip>
                    ) : (
                        <Tooltip title="Mostrar menú">
                            <IconButton color="primary" sx={{ marginRight: 2 }} onClick={handleOpenMenuDashboard}>
                                <MenuIcon />
                            </IconButton>
                        </Tooltip>
                    )}
                </Hidden>
            </Toolbar>
        </AppBar>
    );
}
