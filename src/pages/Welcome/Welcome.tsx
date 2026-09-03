import { Box } from "@mui/system";
import Meta from "@/_pwa-framework/components/Meta";
import { Typography } from "@mui/material";

function Welcome() {
  return (
    <>
      <Meta title="Bienvenido" />
      <Box justifyContent={"center"} width={"100%"} p={5}>
        <Typography variant="h3" color={"dimgray"}>
          Aplicación para la caracterización de hogares y familias
        </Typography>
        <Typography variant="h6" fontStyle={"italic"}>
          Para comenzar o continuar el proceso de caracterización diríjase al
          menú de componentes en la parte superior izquierda, simbolizado con
          tres líneas blancas.
        </Typography>
      </Box>
    </>
  );
}

export default Welcome;
