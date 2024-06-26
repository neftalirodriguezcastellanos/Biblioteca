import { Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Fragment, useState } from "react";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import BibliotecaMenuItem from "./BibliotecaMenuItem";
import { useEffect } from "react";
import { useLayout } from "../../context/system/LayoutContext";

export default function BibliotecaMenuGroup({ icon, name, clavesPaginas }) {
    const [open, setOpen] = useState(false);
    const { clavePaginaActual } = useLayout();

    const handleChangeOpen = (value) => {
        setOpen(value);
    };

    useEffect(() => {
        handleChangeOpen(Object.keys(clavesPaginas).includes(clavePaginaActual));
    }, [clavePaginaActual]);

    return (
        <Fragment>
            <ListItem disablePadding>
                <ListItemButton onClick={() => handleChangeOpen(!open)}>
                    <ListItemIcon style={{ minWidth: "33px", color: "white" }}>{icon}</ListItemIcon>
                    <ListItemText
                        primary={name}
                        primaryTypographyProps={{
                            style: { fontWeight: open ? "bold" : "initial", fontSize: "0.9rem", color: "white" },
                        }}
                    />
                    {open ? <ExpandLess style={{ color: "white" }} /> : <ExpandMore style={{ color: "white" }} />}
                </ListItemButton>
            </ListItem>
            <Collapse in={open}>
                <List>
                    {Object.keys(clavesPaginas)
                        .filter((clave_pagina) => clavesPaginas[clave_pagina].mostrar)
                        .map((clave_pagina) => (
                            <BibliotecaMenuItem
                                key={clave_pagina}
                                route={clavesPaginas[clave_pagina].path}
                                clavePagina={clave_pagina}
                            >
                                {clavesPaginas[clave_pagina].nombre}
                            </BibliotecaMenuItem>
                        ))}

                </List>
            </Collapse>
        </Fragment>
    );
}
