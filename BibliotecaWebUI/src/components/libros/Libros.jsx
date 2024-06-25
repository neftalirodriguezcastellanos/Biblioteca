import React, { useEffect } from 'react'
import { useLibros } from '../../context/libros/LibrosContext';
import { useLayout } from '../../context/system/LayoutContext'
import BibliotecaLayout from '../layout/BibliotecaLayout'
import BibliotecaTable from '../utils/BibliotecaTable'
import LibrosForm from './LibrosForm';
import LibrosActions from './LibrosActions';
import LibrosDetalle from './LibrosDetalle';

export default function Libros() {
    const { handleChangeTitle, handleChangeClavePaginaActual } = useLayout();
    const { listaLibros, handleObtenerLibros, handleSeleccionarLibro, libroSeleccionado, openForm } = useLibros();

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
            detailComponent={<LibrosDetalle />}
        >
            <BibliotecaTable
                columns={
                    [
                        { title: "CODIGO", field: "sCodigo" },
                        { title: "TITULO", field: "sTitulo" },
                        { title: "AUTOR", field: "sAutor" },
                        { title: "ISBN", field: "sISBN" },
                        { title: "EDITORIAL", field: "sEditorial" },
                        { title: "AÑO", field: "iAnio" },
                    ]
                }
                data={listaLibros}
                id="uIdLibro"
                row={libroSeleccionado}
                setRow={handleSeleccionarLibro}
            />
            {openForm && <LibrosForm />}
        </BibliotecaLayout>
    )
}
