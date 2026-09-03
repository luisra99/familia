import Button from "@mui/material/Button";
import { 
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,} from "@mui/material";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";

function Soporte() {

    const contactos = [
    {nombre:"Soporte", telefono: "45264002"},
    ];

    return (
    <Grid container spacing={2} my={2} mx={2}>
        <Grid item xs={12}>
        <Typography variant="h4" sx={{ mt: 4 }} textAlign="center" margin={5}>
            <strong>Información de contacto</strong>
        </Typography>
        </Grid>

        {/* <Grid item xs={12}>
        <Typography variant="h6" mx={4}>
            Información de contacto
        </Typography>
      </Grid> */}

      {/* Tabla de contactos */}
        <Grid item xs={12}>
        <TableContainer component={Paper}>
            <Table>
            <TableHead>
                <TableRow>
                <TableCell><strong>Nombre</strong></TableCell>
                <TableCell><strong>Teléfono</strong></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {contactos.map((contacto, index) => (
                <TableRow key={index}>
                    <TableCell>{contacto.nombre}</TableCell>
                    <TableCell>
                    <a href={`https://wa.me/${contacto.telefono.replace(/[^0-9]/g, '')}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ textDecoration: 'none', color: 'inherit' }}>
                        {contacto.telefono}
                    </a>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
        </Table>
        </TableContainer>
        </Grid>
    </Grid>
    
    )
}

export default Soporte;
