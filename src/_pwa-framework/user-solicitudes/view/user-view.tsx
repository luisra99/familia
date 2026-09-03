import { Button, DialogActions } from "@mui/material";
import { FC, useEffect } from "react";
import TablePagination, {
  LabelDisplayedRowsArgs,
} from "@mui/material/TablePagination";
import { applyFilter, emptyRows, getComparator } from "../utils";

import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Scrollbar from "../scrollbar";
import Stack from "@mui/material/Stack";
import type { SvgIconProps } from "@mui/material/SvgIcon";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableEmptyRows from "../table-empty-rows";
import TableNoData from "../table-no-data";
import Typography from "@mui/material/Typography";
import UserTableHead from "../user-table-head";
import UserTableRow from "../user-table-row";
import UserTableToolbar from "../user-table-toolbar";
import { useState } from "react";

// ----------------------------------------------------------------------

export function TableView({
  headers,
  title,
  values = [],
  filterBy,
  idKey,
  multiSelect,
  dataActions,
  rowActions,
  disabled,
  hidden,
  setState,
  defaultValues,
  name: formName,
  setFieldValue,
  setFieldTouched,
  useCheckBox,
  search,
  hideTableHead,
  defaultRowsPerPage,
  selectedRows,disableCheckBox
}: {
  headers: {
    name: string;
    align?: "left" | "right" | "center";
    label?: string;
  }[];
  title?: string;
  values: any[];
  idKey: string;
  multiSelect: boolean;
  filterBy?: string;
  dataActions?: { label: string; action: (values: any) => void }[];
  rowActions?: {
    label: string;
    action: (values: any) => void;
    icon?: FC<SvgIconProps>;
    disabled?: (values?: any) => boolean;
    color?: string;
  }[];
  disabled?: boolean;
  selectedRows?: any[];
  setState?: any;
  defaultValues?: any;
  name?: string;
  setFieldValue?: any;
  setFieldTouched?: any;
  useCheckBox?: boolean;
  search?: boolean;
  hidden?: any;
  hideTableHead?: boolean;
  defaultRowsPerPage?:number;
  disableCheckBox?:(row:any)=>boolean
}) {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState<any[]>(defaultValues ?? []);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage??20);

  useEffect(() => {
    if (defaultValues) {
      setSelected(defaultValues);
    } else {
      setSelected([]);
    }
  }, [defaultValues]);

  const handleSort = (event: any, id: any) => {
    const isAsc = orderBy === id && order === "asc";
    if (id !== "") {
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(id);
    }
  };
  const handleSelectAllClick = (event: any) => {
    if (!multiSelect) {
      return;
    } else {
      if (event.target.checked) {
        const newSelecteds = values.map((n) => n[idKey]);
        setSelected(newSelecteds);
        setState?.(newSelecteds);
        return;
      }
    }
    setSelected([]);
  };

  const handleClick = (event: any, name: any) => {
    const selectedIndex = (selectedRows ?? selected).indexOf(name);

    let newSelected: any[] = [];
    if (selectedIndex === -1) {
      if (!multiSelect) {
        newSelected = [name];
      } else {
        newSelected = newSelected.concat(selectedRows ?? selected, name);
      }
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat((selectedRows ?? selected).slice(1));
    } else if (selectedIndex === (selectedRows ?? selected).length - 1) {
      newSelected = newSelected.concat((selectedRows ?? selected).slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        (selectedRows ?? selected).slice(0, selectedIndex),
        (selectedRows ?? selected).slice(selectedIndex + 1)
      );
    }
    setFieldValue?.(formName, newSelected, true);
    setFieldTouched?.(formName);
    setSelected(newSelected);
    setState?.(newSelected);
  };

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event: any) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: values,
    comparator: getComparator(order, orderBy),
    filterName,
    headers,
  });

  const notFound = !dataFiltered.length && !!filterName;
  // useEffect(() => {
  //   if (defaultValues) setSelected(defaultValues);
  // }, [defaultValues]);

  return (
    <Container sx={{ minWidth: "100%", padding: "0 !important" }}>
      {title && (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
          display={disabled ? "none" : "unset"}
        >
          <Typography variant="h5">{title}</Typography>
        </Stack>
      )}
      <Card sx={{ display: disabled ? "none" : "unset", width: "100%" }}>
        {search && (
          <UserTableToolbar
            numSelected={(selectedRows ?? selected).length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            filterBy={filterBy}
          />
        )}

        <Scrollbar>
          <TableContainer sx={{ overflow: "unset" }}>
            <Table>
              {!hideTableHead && (
                <UserTableHead
                  order={order}
                  orderBy={orderBy}
                  rowCount={values.length}
                  numSelected={(selectedRows ?? selected).length}
                  onRequestSort={handleSort}
                  onSelectAllClick={handleSelectAllClick}
                  headLabel={headers}
                  rowActions={rowActions}
                  useCheckBox={useCheckBox ?? true}
                />
              )}
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  ?.map((row: any) => {
                    return (
                      <UserTableRow
                        key={row?.[idKey]}
                        row={row}
                        headers={headers.filter((item) => item.label)}
                        actions={rowActions}
                        selected={
                          (selectedRows ?? selected).indexOf(row?.[idKey]) !==
                          -1
                        }
                        handleClick={(event) =>
                          handleClick(event, row?.[idKey])
                        }
                        disableCheckBox={disableCheckBox}
                        useCheckBox={useCheckBox ?? true}
                      />
                    );
                  })}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, values.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
        <DialogActions>
          {dataActions?.map((action) => (
            <Button
              onClick={() => {
                const _selectedRows = values.filter((item) =>
                  (selectedRows ?? selected).includes(item[idKey])
                );
                action.action(_selectedRows);
              }}
              color="primary"
              variant="contained"
            >
              {action.label}
            </Button>
          ))}
        </DialogActions>
        <TablePagination
          style={{ marginTop: 100 }}
          page={page}
          component="div"
          count={values.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          labelRowsPerPage="Filas por página"
          rowsPerPageOptions={[5, 10, 15, 20, 25, 50]}
          labelDisplayedRows={(info: LabelDisplayedRowsArgs) =>
            `${info.from} - ${info.to} de ${info.count}`
          }
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
