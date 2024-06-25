import React, { createContext, useContext, useState } from "react";
import { useRequest } from "../system/RequestContext";
import { useLayout } from "../system/LayoutContext";
import { apiLibros } from "../../settings/apiConfig";
import { getLibroForm } from "../../model/formsModel";
import { isNullOrEmpty, isErrorForm } from "../../settings/utils";

export const LibrosContext = createContext();

export const LibrosProvider = (props) => {
  const { GetRequest, PostRequest, PutRequest, DeleteRequest } = useRequest();
  const { handleOpenAlert } = useLayout();

  const [listaLibros, setListaLibros] = useState([]);
  const [libroSeleccionado, setLibroSeleccionado] = useState(null);
  const [libroForm, setLibroForm] = useState(getLibroForm());
  const [openForm, setOpenForm] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const handleObtenerLibros = async () => {
    const response = await GetRequest({
      url: apiLibros,
      loader: "Consultando libros...",
    });

    if (response.hasError) {
      handleOpenAlert(response.message);
    } else {
      setListaLibros(response.result);
    }
  };

  const handleSeleccionarLibro = (libro) => {
    setLibroSeleccionado(libro);
  };

  const handleOpenForm = (value) => {
    setOpenForm(value);
  };

  const handleOpenConfirm = (value) => {
    setOpenConfirm(value);
  };

  const handleAgregarLibro = () => {
    setIsEdit(false);
    setLibroForm(getLibroForm());
    handleOpenForm(true);
  };

  const handleActualizarLibro = () => {
    setIsEdit(true);

    const { txtCodigo, txtTitulo, txtAutor, txtISBN, txtEditorial, txtAnio } =
      libroForm;

    const form = {
      ...libroForm,
      txtCodigo: {
        ...txtCodigo,
        error: false,
        value: libroSeleccionado.sCodigo,
      },
      txtTitulo: {
        ...txtTitulo,
        error: false,
        value: libroSeleccionado.sTitulo,
      },
      txtAutor: { ...txtAutor, error: false, value: libroSeleccionado.sAutor },
      txtISBN: { ...txtISBN, error: false, value: libroSeleccionado.sISBN },
      txtEditorial: {
        ...txtEditorial,
        error: false,
        value: libroSeleccionado.sEditorial,
      },
      txtAnio: { ...txtAnio, error: false, value: libroSeleccionado.iAnio },
    };

    setLibroForm(form);
    handleOpenForm(true);
  };

  const handleEliminarLibro = () => {
    handleOpenConfirm(true);
  };

  const handleChangeText = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    let esValido = e.target.validity.valid || String(value).length === 0;

    if (esValido) {
      setLibroForm({
        ...libroForm,
        [name]: {
          ...libroForm[name],
          value: value,
        },
      });
    }
  };

  const handleSubmitForm = async () => {
    const { txtCodigo, txtTitulo, txtAutor, txtISBN, txtEditorial, txtAnio } =
      libroForm;

    const form = {
      ...libroForm,
      txtCodigo: { ...txtCodigo, error: isNullOrEmpty(txtCodigo.value) },
      txtTitulo: { ...txtTitulo, error: isNullOrEmpty(txtTitulo.value) },
      txtAutor: { ...txtAutor, error: isNullOrEmpty(txtAutor.value) },
      txtISBN: { ...txtISBN, error: isNullOrEmpty(txtISBN.value) },
      txtEditorial: {
        ...txtEditorial,
        error: isNullOrEmpty(txtEditorial.value),
      },
      txtAnio: { ...txtAnio, error: isNullOrEmpty(txtAnio.value) },
    };

    setLibroForm(form);
    if (isErrorForm(form)) {
      return;
    }

    const body = {
      uIdLibro: isEdit ? libroSeleccionado.uIdLibro : null,
      sCodigo: txtCodigo.value,
      sTitulo: txtTitulo.value,
      sAutor: txtAutor.value,
      sISBN: txtISBN.value,
      sEditorial: txtEditorial.value,
      iAnio: txtAnio.value,
    };

    let response = null;
    if (isEdit) {
      response = await PutRequest({
        url: apiLibros,
        loader: "Editando libro...",
        body: body,
      });
    } else {
      response = await PostRequest({
        url: apiLibros,
        loader: "Creando libro...",
        body: body,
      });
    }

    if (response.hasError) {
      handleOpenAlert(response.message);
    } else {
      await handleObtenerLibros();
      handleOpenAlert("Libro creado correctamente", "success");
      setLibroForm(getLibroForm());
      handleOpenForm(false);
    }
  };

  const handleSubmitEliminar = async () => {
    const response = await DeleteRequest({
      url: apiLibros + "/" + libroSeleccionado.uIdLibro,
      loader: "Eliminando libro...",
    });

    if (response.hasError) {
      handleOpenAlert(response.message);
    } else {
      await handleObtenerLibros();
      handleOpenAlert("Libro eliminado correctamente", "success");
      handleSeleccionarLibro(null);
      handleOpenConfirm(false);
    }
  };

  return (
    <LibrosContext.Provider
      value={{
        listaLibros,
        libroSeleccionado,
        libroForm,
        openForm,
        isEdit,
        openConfirm,
        handleObtenerLibros,
        handleSeleccionarLibro,
        handleOpenForm,
        handleAgregarLibro,
        handleSubmitForm,
        handleChangeText,
        handleActualizarLibro,
        handleOpenConfirm,
        handleEliminarLibro,
        handleSubmitEliminar,
      }}
    >
      {props.children}
    </LibrosContext.Provider>
  );
};

export const useLibros = () => useContext(LibrosContext);
