import {
    Button,
    Collapse,
    IconButton,
    InputAdornment,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
    Typography,
    Paper,
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import { useLayout } from "../../context/system/LayoutContext";

import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import PropTypes from "prop-types";
import SearchIcon from "@mui/icons-material/Search";
import { Stack } from "@mui/material";
import { esES } from "@mui/material/locale";
import getObjectValue from "lodash.get";
import { isNullOrEmpty } from "../../settings/utils";

export default function BibliotecaTable(props) {
    const {
        ref,
        data,
        columns,
        id,
        row,
        setRow,
        defaultRow,
        fnDoubleClick,
        fnMiddleClick,
        disableStickyHeader,
        SubRow,
        reiniciarTabla
    } = props;
    const pager = [10, 50, 100];

    const theme = createTheme(esES);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(pager[0]);
    const [dataRows, setDataRows] = useState(data);
    const [filters, setFilters] = useState({});
    const [orderBy, setOrderBy] = useState("");
    const [order, setOrder] = useState(true);

    const { tablaReferencia } = useLayout();

    //Cambiar de pagina
    const handleChangePage = (e, page) => {
        setPage(page);
    };

    //Cambiar las filas por pagina
    const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(parseInt(e.target.value));
        setPage(0);
    };

    //Capturar al escribir en los filtros
    const handleChangeFilter = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value,
        });
        setPage(0);
    };

    const parseDate = (dateString) => {
        if (typeof dateString === 'string') {
            const parts = dateString.split(/[-/]/);
            if (parts.length === 3) {
                const [day, month, year] = parts;
                return new Date(`${year}-${month}-${day}`);
            }
        }
        return new Date(dateString);
    };

    //Ordenar tabla
    const handleClickOrder = (field, param = false) => {
        const orderField = field === orderBy ? (param ? order : !order) : order;

        //Función de ordenamiento para Fechas, Numéricos y String´s
        const orderList = [...dataRows].sort((a, b) => {
            const valueA = getObjectValue(a, field);
            const valueB = getObjectValue(b, field);

            if (valueA == null || valueA === "") {
                return -1;
            }
            if (valueB == null || valueB === "") {
                return 1;
            }

            //Comparación valores tipo fecha
            const dateA = parseDate(valueA);
            const dateB = parseDate(valueB);
            const isDateA = !isNaN(dateA.getTime());
            const isDateB = !isNaN(dateB.getTime());

            //Validación de fechas en componente
            if (isDateA && isDateB) {
                return orderField ? dateA - dateB : dateB - dateA;
            }

            //Checa si es valor numérico
            const isNumericA = !isNaN(Number(valueA));
            const isNumericB = !isNaN(Number(valueB));

            if (isNumericA && isNumericB) {
                return orderField ? valueA - valueB : valueB - valueA;
            } else if (isNumericA) {
                //Solo si valueA es numérico
                return orderField ? -1 : 1;
            } else if (isNumericB) {
                //Solo si valueB es numérico
                return orderField ? 1 : -1;
            } else {
                //Comparación de string´s
                const stringA = valueA.toString().toLowerCase();
                const stringB = valueB.toString().toLowerCase();
                return orderField ? (stringA < stringB ? -1 : stringA > stringB ? 1 : 0) : (stringA > stringB ? -1 : stringA < stringB ? 1 : 0);
            }
        });

        setDataRows(orderList);

        if (field === orderBy) {
            setOrder(orderField);
            return;
        }

        setOrderBy(field);
    };

    //Al hacer clic en un fila de la tabla
    const handleClickRow = (valueRow) => () => {
        if (!defaultRow) {
            setRow(valueRow);
            return;
        }

        if (!row) {
            setRow(valueRow);
            return;
        }

        if (valueRow[id] === row[id]) {
            setRow(defaultRow);
            return;
        }

        setRow(valueRow);
    };

    const handleClickMiddleMouseButton = (e, valueRow) => {
        if (e.button === 1) {
            fnMiddleClick(valueRow);
        }
    };

    //Crear objecto de filtro
    useEffect(() => {
        const filterObj = {};

        columns.forEach((column) => {
            filterObj[column.field] = "";
        });

        setFilters(filterObj);
        // eslint-disable-next-line
    }, []);

    //Filtrar al escribir
    useEffect(() => {
        const keys = Object.keys(filters);
        const values = Object.values(filters);
        if (keys.length <= 0) {
            return;
        }

        if (values.every((x) => x === "")) {
            setDataRows(data);
            return;
        }

        let filterList = [...data];
        keys.forEach((key, i) => {
            const filterText = values[i].trim().toUpperCase();

            if (filterText === "") {
                return;
            }

            filterList = filterList.filter((x) => {
                const valueKey = getObjectValue(x, key, null);
                return !valueKey ? false : valueKey.toString().toUpperCase().includes(filterText);
            });
        });

        setDataRows(filterList);
        // eslint-disable-next-line
    }, [filters]);

    //Actualizar datos originales
    useEffect(() => {
        const filterObj = { ...filters };
        const keys = Object.keys(filterObj);

        if (keys.length === 0) {
            setDataRows(data);
        }

        setFilters(filterObj);
        // eslint-disable-next-line
        if (reiniciarTabla == true) {
            setPage(0);
        }
    }, [data]);

    return (
        <Fragment>
            <TableContainer component={Paper}>
                <Table
                    size="small"
                    ref={tablaReferencia}
                    stickyHeader={!disableStickyHeader}
                    className="biblioteca-table"
                >
                    <TableHead>
                        <TableRow>
                            {SubRow && <TableCell></TableCell>}
                            {columns.map((column, i) => (
                                <TableCell
                                    key={i}
                                    style={{
                                        minWidth: !column.width ? "initial" : column.width,
                                        verticalAlign: "top",
                                    }}
                                >
                                    {!column.hideSort && (
                                        <Button
                                            style={{
                                                textOverflow: "ellipsis",
                                                overflow: "hidden",
                                                whiteSpace: "nowrap",
                                                textTransform: "none",
                                                fontSize: "large",
                                            }}
                                            variant="text"
                                            color="inherit"
                                            className={orderBy === column.field ? "sort" : "no-sort"}
                                            onClick={() => handleClickOrder(column.field)}
                                            startIcon={
                                                orderBy === column.field ? (
                                                    order ? (
                                                        <ArrowUpwardIcon />
                                                    ) : (
                                                        <ArrowDownwardIcon />
                                                    )
                                                ) : (
                                                    <ArrowUpwardIcon />
                                                )
                                            }
                                        >
                                            <Typography color="secondary" variant="button" sx={{ fontWeight: "600" }}>
                                                {column.title}
                                            </Typography>
                                        </Button>
                                    )}
                                    {!column.hideFilter && (
                                        <TextField
                                            name={column.field}
                                            placeholder={"Buscar"}
                                            onChange={handleChangeFilter}
                                            autoComplete="off"
                                            value={!filters[column.field] ? "" : filters[column.field]}
                                            size="small"
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <SearchIcon />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    )}
                                    {column.showRenderHeader && column.renderHeader()}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dataRows.length > 0 ? (
                            dataRows.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((dataRow, i) =>
                                SubRow ? (
                                    <RowWithSubRow
                                        dataRow={dataRow}
                                        onClick={handleClickRow(dataRow)}
                                        onDoubleClick={!fnDoubleClick ? () => { } : fnDoubleClick}
                                        onMouseDown={
                                            !fnMiddleClick ? () => { } : (e) => handleClickMiddleMouseButton(e, dataRow)
                                        }
                                        row={row}
                                        id={id}
                                        columns={columns}
                                        SubRow={SubRow}
                                    />
                                ) : (
                                    <TableRow
                                        key={i}
                                        onClick={handleClickRow(dataRow)}
                                        style={{ height: 55 }}
                                        onDoubleClick={!fnDoubleClick ? () => { } : fnDoubleClick}
                                        onMouseDown={
                                            !fnMiddleClick ? () => { } : (e) => handleClickMiddleMouseButton(e, dataRow)
                                        }
                                        className={!row ? "no-row" : dataRow[id] === row[id] ? "row" : "no-row"}
                                    >
                                        {columns.map((column, j) => (
                                            <TableCell key={j}>
                                                {!column.render ? (
                                                    <Typography>{dataRow[column["field"]]}</Typography>
                                                ) : (
                                                    column.render(dataRow)
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                )
                            )
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} align="center">
                                    <Typography>No se encontraron registros para mostrar</Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                {props.disablePager !== true ? (
                    <TablePagination
                        count={dataRows.length}
                        component="div"
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        rowsPerPageOptions={pager}
                        labelRowsPerPage="Registros por página"
                    />
                ) : (
                    <div></div>
                )}
            </TableContainer>
        </Fragment>
    );
}

function RowWithSubRow({ dataRow, onClick, onDoubleClick, onMouseDown, row, id, columns, SubRow }) {
    const [show, setShow] = useState(false);

    const handleClickShow = () => {
        setShow(true);
    };

    const handleClickHide = () => {
        setShow(false);
    };

    return (
        <Fragment>
            <TableRow
                onClick={onClick}
                onDoubleClick={onDoubleClick}
                onMouseDown={onMouseDown}
                className={!row ? "no-row" : dataRow[id] === row[id] ? "row" : "no-row"}
            >
                <TableCell>
                    {show && (
                        <IconButton onClick={handleClickHide}>
                            <KeyboardArrowDownIcon />
                        </IconButton>
                    )}
                    {!show && (
                        <IconButton onClick={handleClickShow}>
                            <KeyboardArrowRightIcon />
                        </IconButton>
                    )}
                </TableCell>
                {columns.map((column, j) => (
                    <TableCell key={j}>{!column.render ? dataRow[column["field"]] : column.render(dataRow)}</TableCell>
                ))}
            </TableRow>
            <TableRow>
                <TableCell colSpan={columns.length + 1} style={{ paddingBottom: 0, paddingTop: 0 }}>
                    <Collapse in={show}>
                        <SubRow row={dataRow} />
                    </Collapse>
                </TableCell>
            </TableRow>
        </Fragment>
    );
}

BibliotecaTable.propTypes = {
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            field: PropTypes.string,
            title: PropTypes.string,
            render: PropTypes.func,
            hideFilter: PropTypes.bool,
            hideSort: PropTypes.bool,
            width: PropTypes.number,
            showRenderHeader: PropTypes.bool,
            renderHeader: PropTypes.func,
        })
    ),
    data: PropTypes.array,
    defaultRow: PropTypes.object,
    fnDoubleClick: PropTypes.func,
    fnMiddleClick: PropTypes.func,
    id: PropTypes.string,
    row: PropTypes.object,
    setRow: PropTypes.func,
    disableStickyHeader: PropTypes.bool,
};
