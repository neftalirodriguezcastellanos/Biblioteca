import React, { Fragment, useEffect } from "react";
import { useLayout } from "../../context/system/LayoutContext";
import { usePrestamos } from "../../context/prestamos/PrestamosContext";
import { useSession } from "../../context/system/SessionContext";
import BibliotecaLayout from "../layout/BibliotecaLayout";
import BibliotecaSearchAutocomplete from "../utils/BibliotecaSearchAutocomplete";
import BibliotecaTable from "../utils/BibliotecaTable";
import LibrosDetalle from "../libros/LibrosDetalle";
import { Grid, Checkbox, Tooltip, IconButton } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import SaveIcon from "@mui/icons-material/Save";

export default function Prestamos() {
  const { getPermisoBoton, getNombreBoton } = useSession();
  const { handleChangeTitle, handleChangeClavePaginaActual } = useLayout();
  const {
    filterUsuario,
    handleFiltrarUsuarios,
    handleSeleccionarUsuario,
    librosDisponibles,
    handleSeleccionarLibro,
    libroSeleccionado,
    handleObtenerLibrosDisponibles,
    handleChangeCheck,
    handleSavePrestamo,
  } = usePrestamos();

  useEffect(() => {
    handleChangeTitle("Prestamos");
    handleChangeClavePaginaActual("prestamos");
    handleObtenerLibrosDisponibles();
    handleSeleccionarLibro(null);
  }, []);

  return (
    <BibliotecaLayout
      titlePage={"Préstamos"}
      detailComponent={<LibrosDetalle libroSeleccionado={libroSeleccionado} />}
      buttonActions={
        <Fragment>
          {getPermisoBoton("libro_prestar") && (
            <Tooltip title={getNombreBoton("libro_prestar")}>
              <span>
                <IconButton onClick={handleSavePrestamo}>
                  <SaveIcon />
                </IconButton>
              </span>
            </Tooltip>
          )}
          <Tooltip title="Refrescar datos">
            <span>
              <IconButton onClick={handleObtenerLibrosDisponibles}>
                <RefreshIcon />
              </IconButton>
            </span>
          </Tooltip>
        </Fragment>
      }
    >
      <Grid container spacing={2} sx={{ padding: 1 }}>
        <Grid item xs={6}>
          <BibliotecaSearchAutocomplete
            options={filterUsuario}
            fnFiltrar={handleFiltrarUsuarios}
            label={"Buscar usuario"}
            setUsuario={handleSeleccionarUsuario}
          />
        </Grid>
        <Grid item xs={6}></Grid>
        <Grid item xs={12}>
          <BibliotecaTable
            columns={[
              {
                title: "SELECT",
                render: (row) => (
                  <div>
                    <Checkbox
                      checked={row.bSeleccionado}
                      onChange={(event) => handleChangeCheck(event, row)}
                    />
                  </div>
                ),
              },
              { title: "CODIGO", field: "sCodigo" },
              { title: "TITULO", field: "sTitulo" },
              { title: "AUTOR", field: "sAutor" },
              { title: "ISBN", field: "sISBN" },
              { title: "EDITORIAL", field: "sEditorial" },
              { title: "AÑO", field: "iAnio" },
            ]}
            data={librosDisponibles}
            id="uIdLibro"
            row={libroSeleccionado}
            setRow={handleSeleccionarLibro}
          />
        </Grid>
      </Grid>
    </BibliotecaLayout>
  );
}
