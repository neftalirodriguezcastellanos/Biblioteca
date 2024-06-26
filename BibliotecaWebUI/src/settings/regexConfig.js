//export const rxCorreo = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
export const rxCorreo = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
export const rxCaracteresEsp = /^[^$%&|<>[\]{}°¬~^`¨¡?=/!'"]*$/;
export const rxCaracteresEsp1 = /^[^$%&|<>[\]{}°¬~^`¨¡?=!'"]*$/;
export const rxPuntoDecimal = /^\d+(\.\d{1,2})?$/;
export const rxEntero = /^\d+(\\d{1,2})?$/;
export const rxRFC = // /^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/;
  /^(([ÑA-Z|ña-z|&]{3}|[A-Z|a-z]{4})\d{2}((0[1-9]|1[012])(0[1-9]|1\d|2[0-8])|(0[13456789]|1[012])(29|30)|(0[13578]|1[02])31)(\w{2})([A|a|0-9]{1}))$|^(([ÑA-Z|ña-z|&]{3}|[A-Z|a-z]{4})([02468][048]|[13579][26])0229)(\w{2})([A|a|0-9]{1})$/;
export const rxAlfanumeric = /^[a-zA-Z0-9]*$/;

export const rxNumerics = /^\d+(\.\d{1,4})?$/;
export const rxCurp =
  /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/;
