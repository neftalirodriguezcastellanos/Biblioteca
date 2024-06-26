import React, { Fragment, useEffect } from "react";
import { useLayout } from "../../context/system/LayoutContext";
import { usePrestamos } from "../../context/prestamos/PrestamosContext";
import { useSession } from "../../context/system/SessionContext";
import { getDateTimeString } from "../../settings/utils";
import { useConfiguration } from "../../context/system/ConfigurationContext";
import BibliotecaLayout from "../layout/BibliotecaLayout";
import BibliotecaTable from "../utils/BibliotecaTable";
import LibrosDetalle from "../libros/LibrosDetalle";
import { Checkbox, Tooltip, IconButton, Typography } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

export default function Devoluciones() {
  const { theme } = useConfiguration();
  const { getPermisoBoton, getNombreBoton } = useSession();
  const { handleChangeTitle, handleChangeClavePaginaActual } = useLayout();
  const {
    handleSeleccionarLibro,
    libroSeleccionado,
    handleObtenerPrestamosUsuario,
    prestamosUsuario,
    handleChangeCheckDevolver,
    handleDevolverLibros,
  } = usePrestamos();

  useEffect(() => {
    handleChangeTitle("Devoluciones");
    handleChangeClavePaginaActual("devoluciones");
    handleSeleccionarLibro(null);
    handleObtenerPrestamosUsuario();
  }, []);

  return (
    <BibliotecaLayout
      titlePage={"Devoluciones"}
      detailComponent={<LibrosDetalle libroSeleccionado={libroSeleccionado} />}
      buttonActions={
        <Fragment>
          {getPermisoBoton("libro_devolver") && (
            <Tooltip title={getNombreBoton("libro_devolver")}>
              <span>
                <IconButton onClick={handleDevolverLibros}>
                  <AssignmentReturnIcon />
                </IconButton>
              </span>
            </Tooltip>
          )}
          <Tooltip title="Refrescar datos">
            <span>
              <IconButton onClick={handleObtenerPrestamosUsuario}>
                <RefreshIcon />
              </IconButton>
            </span>
          </Tooltip>
        </Fragment>
      }
    >
      <BibliotecaTable
        columns={[
          {
            title: "SELECT",
            render: (row) => (
              <div>
                <Checkbox
                  checked={row.bSeleccionado}
                  onChange={(event) => {
                    handleChangeCheckDevolver(event, row);
                  }}
                />
              </div>
            ),
          },
          { title: "USUARIO", field: "sNombre" },
          { title: "EMAIL", field: "sEmail" },
          { title: "CODIGO", field: "sCodigo" },
          {
            title: "TITULO",
            field: "sTitulo",
            render: (row) => (
              <div>
                <Typography noWrap>{row.sTitulo}</Typography>
              </div>
            ),
          },
          {
            title: "AUTOR",
            field: "sAutor",
            render: (row) => (
              <div>
                <Typography noWrap>{row.sAutor}</Typography>
              </div>
            ),
          },
          {
            title: "FECHA PRESTAMO",
            field: "dtFechaPrestamo",
            render: (row) => (
              <div
                style={{
                  display: "flex",
                  flexWrap: "nowrap",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <CalendarMonthIcon
                  style={{ color: theme.palette.orange.main }}
                />
                <Typography noWrap>
                  {getDateTimeString(row.dtFechaPrestamo, false)}
                </Typography>
              </div>
            ),
          },
          {
            title: "FECHA VIGENCIA",
            field: "dtFechaExpiracion",
            render: (row) => (
              <div
                style={{
                  display: "flex",
                  flexWrap: "nowrap",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <CalendarMonthIcon
                  style={{ color: theme.palette.orange.main }}
                />
                <Typography noWrap>
                  {getDateTimeString(row.dtFechaExpiracion, false)}
                </Typography>
              </div>
            ),
          },
        ]}
        data={prestamosUsuario}
        id="uIdPrestamo"
        row={libroSeleccionado}
        setRow={handleSeleccionarLibro}
      />
    </BibliotecaLayout>
  );
}
