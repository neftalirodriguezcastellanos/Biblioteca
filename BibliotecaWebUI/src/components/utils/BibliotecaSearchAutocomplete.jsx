import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const BibliotecaSearchAutocomplete = (props) => {
  const { options, fnFiltrar, label, setUsuario } = props;
  const [open, setOpen] = useState(false);

  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    let active = true;

    if (open && searchValue) {
      fnFiltrar(searchValue);
    }

    return () => {
      active = false;
    };
  }, [open, searchValue]);

  const handleSearch = (event, value) => {
    setSearchValue(event.target.value);
    if (value === null || value === undefined) setUsuario(null);
    else setUsuario(value.key);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Autocomplete
      id="biblioteca-search-autocomplete"
      open={open}
      onOpen={handleOpen}
      onClose={handleClose}
      onChange={handleSearch}
      options={options}
      getOptionLabel={(option) => option.id + " - " + option.descripcion}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          variant="outlined"
          value={searchValue}
          onChange={handleSearch}
        />
      )}
    />
  );
};

export default BibliotecaSearchAutocomplete;
