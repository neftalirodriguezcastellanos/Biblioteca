export const getLibroForm = () => ({
  txtCodigo: { id: "txtCodigo", value: "", error: false },
  txtTitulo: { id: "txtTitulo", value: "", error: false },
  txtAutor: { id: "txtAutor", value: "", error: false },
  txtISBN: { id: "txtISBN", value: "", error: false },
  txtEditorial: { id: "txtEditorial", value: "", error: false },
  txtAnio: { id: "txtAnio", value: "", error: false },
});

export const getLoginForm = () => ({
  username: { value: "", error: false },
  password: { value: "", error: false },
});
