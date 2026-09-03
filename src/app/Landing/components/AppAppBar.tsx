import { Link, PaletteMode } from "@mui/material";
import { identitys, selfSignUp } from "@/_pwa-framework/config";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import { LoadingButton } from "@mui/lab";
import Logo from "@/_pwa-framework/components/logo";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { RouterLink } from "@/_pwa-framework/routes/components";
import ToggleColorMode from "./ToggleColorMode";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { logIng } from "@/_pwa-framework/session/helpers";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const logoStyle = {
  width: "140px",
  height: "auto",
  cursor: "pointer",
};

interface AppAppBarProps {
  mode: PaletteMode;
  toggleColorMode: () => void;
}

function AppAppBar({ mode, toggleColorMode }: AppAppBarProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navegar = useNavigate();
  const entrar = () => {
    setLoading(true);
    logIng(identitys?.[0]?.is, setLoading);
  };

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = 128;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      sectionElement.scrollIntoView({ behavior: "smooth" });
      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
      setOpen(false);
    }
  };

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: "transparent",
          backgroundImage: "none",
          mt: 2,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            variant="regular"
            sx={(theme) => ({
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
              borderRadius: "999px",
              bgcolor:
                theme.palette.mode === "light"
                  ? "rgba(255, 255, 255, 0.4)"
                  : "rgba(0, 0, 0, 0.4)",
              backdropFilter: "blur(24px)",
              maxHeight: 40,
              border: "1px solid",
              borderColor: "divider",
              boxShadow:
                theme.palette.mode === "light"
                  ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                  : "0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)",
            })}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
                ml: "-18px",
                px: 0,
              }}
            >
              <Logo sx={{ width: "110px", mx: 2 }} />
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                {/* <MenuItem
                  onClick={() => scrollToSection("features")}
                  sx={{ py: "6px", px: "12px" }}
                >
                  <Typography variant="body2" color="text.primary">
                    Funcionalidades
                  </Typography>
                </MenuItem> */}
                {/* <MenuItem
                  onClick={() => scrollToSection("faq")}
                  sx={{ py: "6px", px: "12px" }}
                >
                  <Typography variant="body2" color="text.primary">
                    Preguntas frecuentes
                  </Typography>
                </MenuItem> */}
                {/* <MenuItem
                  onClick={() => scrollToSection("footer")}
                  sx={{ py: "6px", px: "12px" }}
                >
                  <Typography variant="body2" color="text.primary">
                    Términos y Políticas
                  </Typography>
                </MenuItem> */}
              </Box>
            </Box>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 0.5,
                alignItems: "center",
              }}
            >
              <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
              {identitys.length === 1 &&
              !localStorage.getItem("offlineSession") ? (
                <LoadingButton
                  color="primary"
                  variant="text"
                  size="small"
                  loading={loading}
                  onClick={entrar}
                >
                  Entrar
                </LoadingButton>
              ) : (
                <Button
                  color="primary"
                  variant="text"
                  size="small"
                  onClick={() => navegar("/sign-in")}
                >
                  Entrar
                </Button>
              )}

              {selfSignUp && (
                <Link component={RouterLink} href="/sign-up">
                  <Button
                    color="primary"
                    variant="contained"
                    size="small"
                    component="a"
                  >
                    Registrarse
                  </Button>
                </Link>
              )}
            </Box>
            <Box sx={{ display: { sm: "", md: "none" } }}>
              <Button
                variant="text"
                color="primary"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ minWidth: "30px", p: "4px" }}
              >
                <MenuIcon />
              </Button>
              <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <Box
                  sx={{
                    minWidth: "60dvw",
                    p: 2,
                    backgroundColor: "background.paper",
                    flexGrow: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "end",
                      flexGrow: 1,
                    }}
                  >
                    <ToggleColorMode
                      mode={mode}
                      toggleColorMode={toggleColorMode}
                    />
                  </Box>
                  <MenuItem onClick={() => scrollToSection("features")}>
                    Funcionalidades
                  </MenuItem>
                  {/* <MenuItem onClick={() => scrollToSection("faq")}>
                    Preguntas frecuentes
                  </MenuItem> */}
                  <MenuItem onClick={() => scrollToSection("footer")}>
                    Términos y Políticas
                  </MenuItem>
                  <Divider />
                  {selfSignUp && (
                    <MenuItem>
                      <Button
                        color="primary"
                        variant="contained"
                        component="a"
                        href="/sign-up"
                        sx={{ width: "100%" }}
                      >
                        Registrarse
                      </Button>
                    </MenuItem>
                  )}
                  <MenuItem>
                    <Button
                      color="primary"
                      variant="outlined"
                      sx={{ width: "100%" }}
                      size="small"
                      onClick={() => navegar("/sign-in")}
                    >
                      Iniciar Sesión
                    </Button>
                  </MenuItem>
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default AppAppBar;
