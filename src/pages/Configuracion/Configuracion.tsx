import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { UpdatePWAButton } from "@/app/components/UpdatePWAButton";
import { importEntrevista } from "@/app/user-interfaces/forms/models/export";
import { VisuallyHiddenInput } from "@/_pwa-framework/sections/Sidebar/Sidebar";
import { mode } from "@/_pwa-framework/config";
import { useSession } from "@/_pwa-framework/session/state";
declare const __BUILD_VERSION__: string;

function Configuracion() {
  const [user]=useSession()
  return (
    <Grid container spacing={2} my={2} mx={2} justifyContent={"center"}>
      <Grid item xs={12} textAlign={"center"}>
        <Typography variant="h4" sx={{ my: 4 }} textAlign={"center"}>
          <b>Configuración general </b>
        </Typography>
      </Grid>

      <Grid item xs={5}>
        <Typography variant="h6" mx={4}>
          Usuario
        </Typography>{" "}
      </Grid>
      <Grid item xs={3}>
        <Button
          component={Link}
          to="/usuario"
          variant="contained"
          color="primary"
          size="medium"
          fullWidth
        >
          Abrir
        </Button>
      </Grid>
      <Grid item xs={5}>
        <Typography variant="h6" mx={4}>
          Nomencladores{" "}
        </Typography>{" "}
      </Grid>
      <Grid item xs={3}>
        <Button
          component={Link}
          to="/nomencladores"
          variant="contained"
          color="primary"
          fullWidth
        >
          Importar
        </Button>
      </Grid>
      {
        (mode || user?.PI?.idpi=="iportela" ) && (<><Grid item xs={5}>
          <Typography variant="h6" mx={4}>
            Subir entrevista
          </Typography>{" "}
        </Grid>
          <Grid item xs={3}>
            <Button
              component="label"
              role={undefined}
              fullWidth
              variant="contained"
              tabIndex={-1}
            >
              Buscar Archivo
              <VisuallyHiddenInput
                type="file"
                onChange={(event) => {
                  importEntrevista(event.target.files?.[0])
                  console.log(event.target.files?.[0])
                }}

              />
            </Button>
          </Grid>
        </>)}

      <Grid item xs={8} justifyContent={"center"} textAlign={"center"}>
        <Typography><strong>Versión 2.3.0:</strong> {__BUILD_VERSION__}</Typography>
      </Grid>
    </Grid>
  );
}

export default Configuracion;
