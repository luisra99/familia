import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import PropTypes from "prop-types";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "./utils";

// ----------------------------------------------------------------------

export default function UserTableHead({
  order,
  orderBy,
  rowCount,
  headLabel,
  numSelected,
  onRequestSort,
  onSelectAllClick,
  rowActions,
  useCheckBox,
}: any) {
  const onSort = (property: any) => (event: any) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {useCheckBox && (
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
        )}
        {headLabel.map(
          (headCell: any) =>
            headCell.label && (
              <TableCell
                key={headCell.name}
                align={headCell.align || "left"}
                sortDirection={orderBy === headCell.id ? order : false}
                sx={{
                  width: headCell.width,
                  minWidth: headCell.minWidth,
                  color: "primary.main",
                  fontWeight: "bold",
                }}
              >
                <TableSortLabel
                  hideSortIcon
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : "asc"}
                  onClick={onSort(headCell.id)}
                >
                  {headCell.label}
                  {orderBy === headCell.id ? (
                    <Box sx={{ ...visuallyHidden }}>
                      {order === "desc"
                        ? "sorted descending"
                        : "sorted ascending"}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            )
        )}
        {rowActions && (
          <TableCell align={"left"} sortDirection={false}>
            <TableSortLabel hideSortIcon></TableSortLabel>
            <TableSortLabel hideSortIcon></TableSortLabel>
            <TableSortLabel hideSortIcon></TableSortLabel>
            <TableSortLabel hideSortIcon></TableSortLabel>
          </TableCell>
        )}
      </TableRow>
    </TableHead>
  );
}

UserTableHead.propTypes = {
  order: PropTypes.oneOf(["asc", "desc"]),
  orderBy: PropTypes.string,
  rowCount: PropTypes.number,
  headLabel: PropTypes.array,
  numSelected: PropTypes.number,
  onRequestSort: PropTypes.func,
  onSelectAllClick: PropTypes.func,
  rowActions: PropTypes.array,
  useCheckBox: PropTypes.bool,
};
