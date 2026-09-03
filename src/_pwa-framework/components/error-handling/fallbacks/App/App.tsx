import { email, env, messages } from "../../../../config";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import EmailIcon from "@mui/icons-material/Email";
import { FullSizeCenteredFlexBox } from "@/_pwa-framework/components/styled";
import Paper from "@mui/material/Paper";
import RestartIcon from "@mui/icons-material/RestartAlt";
import Typography from "@mui/material/Typography";
import axios from "axios";
import resetApp from "@/utils/reset-app";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AppErrorBoundaryFallback({ error, resetErrorBoundary }: any) {
  axios.post(`${env.ENV_SERVER_URL}/gw/errorLog`, {
    message: JSON.stringify(error),
  });
  console.log(Date.now(), "Control de error de la plantilla ", error);
  const navegar = useNavigate();

  useEffect(() => {
    navegar(`/`);
  }, []);

  return (
    <Box height={400}>
      <FullSizeCenteredFlexBox>
        <Paper sx={{ p: 5 }}>
          <Typography variant="h5" component="h3">
            {messages.app.crash.title}
          </Typography>
          <Button
            startIcon={<EmailIcon />}
            variant="outlined"
            target="_blank"
            rel="noreferrer"
            href={`mailto: ${email}`}
            sx={{ my: 3 }}
          >
            {messages.app.crash.options.email}
          </Button>
          <Typography component="h6">or</Typography>
          <Button
            startIcon={<RestartIcon />}
            sx={{ mt: 3 }}
            variant="outlined"
            onClick={resetApp}
          >
            {messages.app.crash.options.reset}
          </Button>
          <Button
            startIcon={<RestartIcon />}
            sx={{ mt: 3 }}
            variant="outlined"
            onClick={resetErrorBoundary}
          >
            Reintentar
          </Button>
        </Paper>
      </FullSizeCenteredFlexBox>
    </Box>
  );
}

export default AppErrorBoundaryFallback;
