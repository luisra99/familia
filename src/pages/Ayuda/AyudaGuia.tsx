import { Typography, Grid, Button } from "@mui/material";

function AyudaGuia() {
  return (
    <Grid container spacing={2} my={2} mx={2}>
      <Grid item xs={5}>
        <Typography variant="h6" mx={4}>
          Ayuda
        </Typography>{" "}
      </Grid>
      <Grid item xs={3}>
        <Button
          onClick={() => {
            window.open("/documentos/Manual APK(16-12-24).pdf");
          }}
          variant="contained"
          color="primary"
          size="medium"
          fullWidth
        >
          Descargar
        </Button>
      </Grid>
      <Grid item xs={5}>
        <Typography variant="h6" mx={4}>
          ICS_H
        </Typography>{" "}
      </Grid>
      <Grid item xs={3}>
        <Button
          onClick={() => {
            window.open("/documentos/Bases_D2_ICS_H.pdf");
          }}
          variant="contained"
          color="primary"
          size="medium"
          fullWidth
        >
          Descargar
        </Button>
      </Grid>
      <Grid item xs={5}>
        <Typography variant="h6" mx={4}>
          Guia
        </Typography>{" "}
      </Grid>
      <Grid item xs={3}>
        <Button
          onClick={() => {
            window.open("/documentos/Bases_D3_Guia_ICS_H.pdf");
          }}
          variant="contained"
          color="primary"
          size="medium"
          fullWidth
        >
          Descargar
        </Button>
      </Grid>
    </Grid>
  );
}
export default AyudaGuia;
