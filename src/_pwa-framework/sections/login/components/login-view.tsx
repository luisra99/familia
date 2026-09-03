import "./login.css";

import { alpha, useTheme } from "@mui/material/styles";
import { identitys, localSignIn, selfSignUp } from "@/_pwa-framework/config";
import { logIng, offlineLogIng } from "@/_pwa-framework/session/helpers";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import Iconify from "@/_pwa-framework/components/iconify";
import InputAdornment from "@mui/material/InputAdornment";
import Link from "@mui/material/Link";
import LoadingButton from "@mui/lab/LoadingButton";
import { LogIn } from "../services/logIn.service";
import Logo from "@/_pwa-framework/components/logo";
import { RouterLink } from "@/_pwa-framework/routes/components";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { bgGradient } from "@/_pwa-framework/theme/css";
import { useLanguage } from "@/_pwa-framework/hooks/use-language";
import { useOnlineStatus } from "@/_pwa-framework/hooks/use-online-status";
import { useState } from "react";

export default function LoginView() {
  const online = useOnlineStatus();
  const theme = useTheme();
  const { t } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [offlineUsername, setOfflineUsername] = useState("");
  const [offlinePassword, setOfflinePassword] = useState("");

  const renderForm = (
    <>
      <Stack spacing={3}>
        <TextField
          name="email"
          label={t("email")}
          value={username}
          onChange={(e: any) => setUsername(e.target.value)}
        />

        <TextField
          name="password"
          label={t("password")}
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e: any) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  <Iconify
                    icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        sx={{ my: 3 }}
      >
        <Link variant="subtitle2" underline="hover">
          {t("forgot")}
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        sx={{ mb: 1 }}
        onClick={() => LogIn(username, password)}
      >
        {t("entrar")}
      </LoadingButton>
    </>
  );
  const renderOfflineForm = (
    <>
      <Stack spacing={3}>
        <TextField
          name="offlineUsername"
          label={t("Usuario")}
          value={offlineUsername}
          onChange={(e: any) => setOfflineUsername(e.target.value)}
        />

        <TextField
          name="password"
          label={t("Contraseña fuera de línea")}
          type={showPassword ? "text" : "password"}
          value={offlinePassword}
          onChange={(e: any) => setOfflinePassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  <Iconify
                    icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        disabled={!offlineUsername || !offlinePassword}
        onClick={() => offlineLogIng(offlineUsername, offlinePassword)}
        sx={{ mt: 1 }}
      >
        {t("entrar")}
      </LoadingButton>
    </>
  );
  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
        }),
        height: 1,
      }}
    >
      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Logo />

        <Card
          sx={{
            p: 5,
            mt: 2,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">{t("login")}</Typography>

          {selfSignUp && (
            <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
              {t("noAccount")}
              <Link
                variant="subtitle2"
                sx={{ ml: 0.5 }}
                component={RouterLink}
                href="/sign-up"
              >
                {t("signUp")}
              </Link>
            </Typography>
          )}
          {localSignIn && renderForm}
          {!!localStorage.getItem("offlineMode") && renderOfflineForm}
          <Box>
            {identitys?.map((identity: any) => (
              <LoadingButton
                fullWidth
                key={identity.is}
                size="large"
                type="submit"
                variant="contained"
                color="inherit"
                disabled={!online}
                sx={{ mt: 1 }}
                onClick={() => logIng(identity.is)}
              >
                {identity.name}
              </LoadingButton>
            ))}
          </Box>
        </Card>
      </Stack>
    </Box>
  );
}
