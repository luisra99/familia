import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useEffect, useState } from "react";

import Meta from "@/_pwa-framework/components/Meta";
import { Stack } from "@mui/system";
import { useSession } from "@/_pwa-framework/session/state";
import NotificationProvider from "@/_pwa-framework/sections/Notifications/provider";

function Usuario() {
  const [userData] = useSession();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
const notificar = NotificationProvider();
  const [nomencladoresCargados, setNomencladoresCargados] = useState<string[]>(
    []
  );
  useEffect(
    () =>
      addEventListener("storage", (event) => {
        if (!event.newValue) {
          setNomencladoresCargados((oldState) =>
            oldState.filter((key) => key !== event.key?.replace("/", ""))
          );
        }
      }),
    []
  );

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleChange = ({ target: { value } }: any) => setPassword(value);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  function load(id: string): void {
    throw new Error("Function not implemented.");
  }

  return (
    <>
      <Meta title="Configuración" />

      <Grid item xs={12}>
        <Stack>
          <Typography variant="h5">Credenciales fuera de línea</Typography>
          <Typography>
            <b>Usuario:</b> {userData?.PI?.idpi}
          </Typography>

          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handleChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          <Button
            variant="contained"
            sx={{ mt: 1 }}
            onClick={() => {
              const code = `${userData?.PI?.idpi}:${password}`;
              localStorage.setItem("offlineMode", code);
              localStorage.setItem("userData", JSON.stringify(userData));
              localStorage.setItem("offlineSession", "true");
              notificar({title:"Contraseña guardada"})
            }}
            disabled={!password}
          >
            Guardar
          </Button>
        </Stack>
      </Grid>
    </>
  );
}

export default Usuario;
