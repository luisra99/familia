import Paper from "@mui/material/Paper";
import PropTypes from "prop-types";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

// ----------------------------------------------------------------------

export default function TableNoData({ query }: any) {
  return (
    <TableRow>
      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
        <Paper
          sx={{
            textAlign: "center",
          }}
        >
          <Typography variant="h6" paragraph>
            No se encontró
          </Typography>
          <Typography variant="body2">
            No hay resultados para&nbsp;
            <strong>&quot;{query}&quot;</strong>.
            <br /> Revise su criterio de búsqueda.
          </Typography>
        </Paper>
      </TableCell>
    </TableRow>
  );
}

TableNoData.propTypes = {
  query: PropTypes.string,
};
