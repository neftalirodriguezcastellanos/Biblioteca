import dayjs from "dayjs";
import "dayjs/locale/es-mx";

import numeral from "numeral";
import { rxCaracteresEsp } from "../settings/regexConfig";

export const getDateTimeString = (date, toLocal = false) => {
  if (!date) return "";
  let parsedDate;
  if (typeof date === "string") {
    const parsedDateObj = new Date(date);
    if (!isNaN(parsedDateObj.getTime())) {
      parsedDate = toLocal
        ? dayjs(parsedDateObj).locale("es").format("DD/MM/YYYY h:mm A")
        : dayjs(parsedDateObj).format("DD/MM/YYYY h:mm A");
    } else {
      throw new Error("Invalid date string");
    }
  } else if (date instanceof Date) {
    parsedDate = toLocal
      ? dayjs(date).locale("es").format("DD/MM/YYYY h:mm A")
      : dayjs(date).format("DD/MM/YYYY h:mm A");
  } else {
    throw new Error("Invalid date type");
  }
  return parsedDate;
};

export const isDefaultDate = (date) => {
  if (!date) return false; // Si date es null o undefined, retornar falso
  if (date instanceof Date) {
    return date.getTime() === 0;
  }
  const parsedDate = dayjs(date);
  return parsedDate.isValid() && parsedDate.valueOf() === 0;
};

export const isErrorForm = (form) => {
  const errorValues = Object.values(form).map((x) => x.error);
  return errorValues.some((x) => x);
};

export const isNullOrEmpty = (value) => !value || value === "";

export const isNullNumber = (valor) => {
  const regex = /^\s*-?\d+(\.\d{1,2})?\s*$/;
  return !regex.test(valor);
};

export const getMoney = (value) => {
  return !value && value !== 0
    ? ""
    : "$" + value.toLocaleString("en-EN", { minimumFractionDigits: 2 });
};

export const obtenerFormatoMonedaMXN = (unNumero) => {
  return !unNumero && unNumero !== 0
    ? ""
    : numeral(parseFloat(unNumero).toFixed(2)).format("$0,0.00");
};

export const getPercent = (value) => {
  return !value && value !== 0
    ? ""
    : value.toLocaleString("en-EN", { minimumFractionDigits: 2 }) + "%";
};
export const getNumber = (value) => {
  return !value && value !== 0
    ? ""
    : value.toLocaleString("en-EN", { minimumFractionDigits: 0 });
};

export const getFormatoTarjeta = (value, espacios) => {
  return value.toString().padStart(espacios, "0");
};

export const IsValidId = (Uniqueidentifier) => {
  const regex =
    /^(?!.*00000000)[{]?[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}[}]?$/gm;
  return regex.test(Uniqueidentifier);
};

export const isJsonString = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

export const ValoresGenericos = {
  GUI_DEFAULT: "00000000-0000-0000-0000-000000000000",
};

/**
 * Valida la longitud de una cadena.
 * @param {string} value - Texto.
 * @param {string} minLength - Longitud minima del texto.
 * @param {string} maxLength - Longitud maxima del texto.
 */
export const StringLength = (value, minLength = 1, maxLength = 1) => {
  //eslint-disable-next-line
  const regex = `/^(?!.*  )(?=.*[\w-])[\w -]{${minLength},${maxLength}}$/gm`;
  return regex.test(value);
};

/**
 * Valida cadenas alfanuméricas excluyendo los caracteres especiales.
 * @param {string} value - Texto.
 */
export const hasSpecialCharacter = (value) => {
  // eslint-disable-next-line no-useless-escape
  const regex = /[!"`#%&,: ;<>=@{ }~\$\(\)\*\+\/\\\?\[\]\^\|]+/;
  return regex.test(value);
};

/**
 * Reemplaza los parámetros basado en Template String route/{id}.
 * @param {string} template - String Templete.
 * @param {object} data - Datos a reemplazar {id:value}.
 */
export const setPathParameters = (template, data) => {
  const pattern = /{\s*(\w+?)\s*}/g; // {property}
  return template.replace(pattern, (_, token) => data[token] || "");
};

/**
 * Reemplaza los prametros basado en Template String route/:id.
 * @param {string} template - String Templete.
 * @param {object} data - Datos a reemplazar {id:value}.
 */
export const setUrlParameters = (url, params) => {
  var newObj = {};
  Object.keys(params).forEach(function (key) {
    newObj[":" + key] = params[key];
  });

  var regex = new RegExp(Object.keys(newObj).join("|"), "gi");
  return url.replace(regex, function (matched) {
    return newObj[matched];
  });
};

/**
 * Genera un nuevo UUID (Universally Unique IDentifier),
 * también conocido como GUID (Globally Unique IDentifier).
 */
export const newId = () => {
  var d = new Date().getTime(); //Timestamp
  var d2 =
    (typeof performance !== "undefined" &&
      performance.now &&
      performance.now() * 1000) ||
    0; //Time in microseconds since page-load or 0 if unsupported
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = Math.random() * 16; //random number between 0 and 16
    if (d > 0) {
      //Use timestamp until depleted
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      //Use microseconds since page-load if supported
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
};

/**
 * Valida si la fecha es valida en sql
 * @param {Date} date - Fecha.
 */
export const isSqlValid = function (date) {
  return (
    date > new Date("1/1/1753 12:00:00 AM") &&
    this < new Date("12/31/9999 11:59:59 PM")
  );
};

export const NumberFormat = (numStr) => {
  if (numStr === "") return "";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(numStr);
};

//Jaragon catálogos
//Función para bus de errores tanto mainframe como context usan esta función
export const handleValidarStrings = (valor, label) => {
  let tError = "";
  if (valor === undefined || valor === null || valor.length === 0) {
    tError = "Campo " + label + " requerido";
    return tError;
  }

  if (!rxCaracteresEsp.test(valor)) {
    tError = "Caracteres no válidos";
    return tError;
  }
  return "";
};

export const handleValidarTelefono = (valor, label) => {
  let tError = "";
  if (valor === undefined || valor === null || valor.length === 0) {
    tError = "Campo " + label + " requerido";
    return tError;
  }

  if (valor.length < 10) {
    tError = "El campo " + label + " no debe ser menor a 10 dígitos";
    return tError;
  }

  const regex = /^[\d\s()-]+$/;
  if (!regex.test(valor)) {
    tError =
      "El número de teléfono debe contener solo caracteres numéricos y los caracteres especiales permitidos '()'.";
    return tError;
  }

  if (!rxCaracteresEsp.test(valor)) {
    tError = "Caracteres no válidos";
    return tError;
  }
  return "";
};

export const handleValidarCorreo = (valor, label) => {
  let tError = "";
  if (valor === undefined || valor === null || valor.length === 0) {
    tError = "Campo " + label + " requerido";
    return tError;
  }

  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!regex.test(valor)) {
    tError = "Estructura de correo no válida";
    return tError;
  }
  return "";
};

export const handleValidarNumerico = (valor, label) => {
  let tError = "";
  if (valor === undefined || valor === null || valor.length === 0) {
    tError = "Campo " + label + " requerido";
    return tError;
  }

  let last = valor.substring(valor.length - 1, valor.length);
  if (last == ".") {
    if (valor.toString().split(".").length - 1 == 1) {
      return "";
    }
  }

  const regex = /^\s*-?\d+(\.\d{1,2})?\s*$/;
  if (!regex.test(valor)) {
    tError = "Solo caracteres numéricos permitidos y decimales";
    return tError;
  }
  return "";
};

export const handleValidarNumericoEntero = (valor, label) => {
  let tError = "";
  if (valor === undefined || valor === null || valor.length === 0) {
    tError = "Campo " + label + " requerido";
    return tError;
  }

  const regex = /^\d+$/;
  if (!regex.test(valor)) {
    tError = "Solo números enteros permitidos";
    return tError;
  }
  return "";
};

export const handleValidarPorcentual = (valor, label) => {
  let tError = "";
  if (valor === undefined || valor === null || valor.length === 0) {
    tError = "Campo " + label + " requerido";
    return tError;
  }

  const regex = /^(0(\.\d{1,2})?|1(\.0{1,2})?)$/;
  if (!regex.test(valor)) {
    tError =
      "Solo caracteres numéricos permitidos entre 0 y 1 y decimales hasta 2 dígitos ejemplo de entrada = 0.99 anteponiento al punto el cero en todo caso";
    return tError;
  }
  return "";
};

export const handleValidarHoras = (valor, label) => {
  let tError = "";
  if (valor === undefined || valor === null || valor.length === 0) {
    tError = "Campo " + label + " requerido";
    return tError;
  }

  const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
  if (!regex.test(valor)) {
    tError =
      "Solo caracteres numéricos permitidos y caracteres de formato hora hh:mm";
    return tError;
  }
  return "";
};

export const handleValidarMoney = (valor, label) => {
  let tError = "";
  if (valor === undefined || valor === null || valor.length === 0) {
    tError = "Campo " + label + " requerido";
    return tError;
  }

  const regex = /^-?\d+(\.\d{1,4})?$/;
  if (!regex.test(valor)) {
    tError = "Solo caracteres numéricos permitidos y decimales a 2 dígitos";
    return tError;
  }

  return "";
};

export const tiempoCierreSession = 1200000; //10000= 10 segundos 1200000
