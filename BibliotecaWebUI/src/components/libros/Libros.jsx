import React, { useEffect } from "react";
import { useLibros } from "../../context/libros/LibrosContext";
import { useLayout } from "../../context/system/LayoutContext";
import BibliotecaLayout from "../layout/BibliotecaLayout";
import BibliotecaTable from "../utils/BibliotecaTable";
import LibrosForm from "./LibrosForm";
import LibrosActions from "./LibrosActions";
import LibrosDetalle from "./LibrosDetalle";
import LibrosEliminar from "./LibrosEliminar";

export default function Libros() {
  const { handleChangeTitle, handleChangeClavePaginaActual } = useLayout();
  const {
    listaLibros,
    handleObtenerLibros,
    handleSeleccionarLibro,
    libroSeleccionado,
    openForm,
    openConfirm,
  } = useLibros();

  useEffect(() => {
    handleChangeTitle("Catálogo de libros");
    handleChangeClavePaginaActual("libros");
    handleObtenerLibros();
    handleSeleccionarLibro(null);
  }, []);

  return (
    <BibliotecaLayout
      titlePage={"Libros"}
      buttonActions={<LibrosActions />}
      detailComponent={<LibrosDetalle libroSeleccionado={libroSeleccionado} />}
    >
      <BibliotecaTable
        columns={[
          { title: "CODIGO", field: "sCodigo" },
          { title: "TITULO", field: "sTitulo" },
          { title: "AUTOR", field: "sAutor" },
          { title: "ISBN", field: "sISBN" },
          { title: "EDITORIAL", field: "sEditorial" },
          { title: "AÑO", field: "iAnio" },
          { title: "PRESTADO", field: "sPrestado" },
        ]}
        data={listaLibros}
        id="uIdLibro"
        row={libroSeleccionado}
        setRow={handleSeleccionarLibro}
      />
      {openForm && <LibrosForm />}
      {openConfirm && <LibrosEliminar />}
    </BibliotecaLayout>
  );
}
