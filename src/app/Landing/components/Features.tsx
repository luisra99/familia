import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ViewQuiltRoundedIcon from "@mui/icons-material/ViewQuiltRounded";

const items = [
  {
    icon: <ViewQuiltRoundedIcon />,
    title: "Componente 1",
    description:
      "Registra información general de los hogares, la vivienda y los miembros que la componen.",
    imageLight:
      'url("/static/images/templates/templates-images/dash-light.png")',
    imageDark: 'url("/static/images/templates/templates-images/dash-dark.png")',
    body: "Descripción detallada....",
  },
  {
    icon: <ViewQuiltRoundedIcon />,
    title: "Componente 2",
    description:
      "Registra las entradas monetarias que reciben todos los miembros del hogar.",
    imageLight:
      'url("/static/images/templates/templates-images/dash-light.png")',
    imageDark: 'url("/static/images/templates/templates-images/dash-dark.png")',
    body: "Descripción detallada....",
  },
  {
    icon: <ViewQuiltRoundedIcon />,
    title: "Componente 3",
    description:
      "Registra las actividades laborales, de estudios u otras, habituales de los miembros adultos del hogar.",
    imageLight:
      'url("/static/images/templates/templates-images/dash-light.png")',
    imageDark: 'url("/static/images/templates/templates-images/dash-dark.png")',
    body: "Descripción detallada....",
  },
  {
    icon: <ViewQuiltRoundedIcon />,
    title: "Componente 4",
    description:
      "Capta la situación de los miembros del hogar en cuanto a sus condiciones de vida, incluyendo la cobertura de sus necesidades.",
    imageLight:
      'url("/static/images/templates/templates-images/dash-light.png")',
    imageDark: 'url("/static/images/templates/templates-images/dash-dark.png")',
    body: "Descripción detallada....",
  },
  {
    icon: <ViewQuiltRoundedIcon />,
    title: "Componente 5",
    description:
      "Registra los beneficios de programas de protección social y cuidados a los que acceden o necesitan acceder los miembros de la familia.",
    imageLight:
      'url("/static/images/templates/templates-images/dash-light.png")',
    imageDark: 'url("/static/images/templates/templates-images/dash-dark.png")',
    body: "Descripción detallada....",
  },
  {
    icon: <ViewQuiltRoundedIcon />,
    title: "Componente 6",
    description:
      "Se registra la situación de niños, niñas, adolescentes y jóvenes del hogar.",
    imageLight:
      'url("/static/images/templates/templates-images/dash-light.png")',
    imageDark: 'url("/static/images/templates/templates-images/dash-dark.png")',
    body: "Descripción detallada....",
  },
  {
    icon: <ViewQuiltRoundedIcon />,
    title: "Componente 7",
    description:
      "Se registran las condiciones de la vivienda, acceso a servicios y equipamiento del hogar.",
    imageLight:
      'url("/static/images/templates/templates-images/dash-light.png")',
    imageDark: 'url("/static/images/templates/templates-images/dash-dark.png")',
    body: "Descripción detallada....",
  },
  {
    icon: <ViewQuiltRoundedIcon />,
    title: "Componente 8",
    description:
      "Se registran los gastos, consumo y disponibilidad de alimentos y estrategias de solución de problemas en el hogar de conjunto.",
    imageLight:
      'url("/static/images/templates/templates-images/dash-light.png")',
    imageDark: 'url("/static/images/templates/templates-images/dash-dark.png")',
    body: "Descripción detallada....",
  },
  {
    icon: <ViewQuiltRoundedIcon />,
    title: "Componente 9",
    description:
      "Se consolida la información y se muestra según los modelos aestablecidos.",
    imageLight:
      'url("/static/images/templates/templates-images/dash-light.png")',
    imageDark: 'url("/static/images/templates/templates-images/dash-dark.png")',
    body: "Descripción detallada....",
  },
];

export default function Features() {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);

  const handleItemClick = (index: number) => {
    setSelectedItemIndex(index);
  };

  const selectedFeature = items[selectedItemIndex];

  return (
    <Container id="features" sx={{ py: { xs: 8, sm: 16 } }}>
      <Grid container spacing={6}>
        <Grid item xs={12} >
          <div>
            <Typography component="h2" variant="h4" color="text.primary">
              Funcionalidades
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: { xs: 2, sm: 4 } }}
            >
              Al alcance todo lo que necesitas
            </Typography>
          </div>
          {/* <Grid
            container
            item
            gap={1}
            sx={{ display: { xs: "auto", sm: "none" } }}
          >
            {items.map(({ title }, index) => (
              <Chip
                key={index}
                label={title}
                onClick={() => handleItemClick(index)}
                sx={{
                  borderColor: (theme) => {
                    if (theme.palette.mode === "light") {
                      return selectedItemIndex === index ? "primary.light" : "";
                    }
                    return selectedItemIndex === index ? "primary.light" : "";
                  },
                  background: (theme) => {
                    if (theme.palette.mode === "light") {
                      return selectedItemIndex === index ? "none" : "";
                    }
                    return selectedItemIndex === index ? "none" : "";
                  },
                  backgroundColor:
                    selectedItemIndex === index ? "primary.main" : "",
                  "& .MuiChip-label": {
                    color: selectedItemIndex === index ? "#fff" : "",
                  },
                }}
              />
            ))}
          </Grid> */}
          {/* <Box
            component={Card}
            variant="outlined"
            sx={{
              display: { xs: "auto", sm: "none" },
              mt: 4,
            }}
          > */}
            {/* <Box
              sx={{
                backgroundImage: (theme) =>
                  theme.palette.mode === "light"
                    ? items[selectedItemIndex].imageLight
                    : items[selectedItemIndex].imageDark,
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: 280,
              }}
            /> */}
            {/* <Box sx={{ px: 2, pb: 2 }}>
              <Typography
                color="text.primary"
                variant="body2"
                fontWeight="bold"
              >
                {selectedFeature.title}
              </Typography>
              <Typography
                color="text.secondary"
                variant="body2"
                sx={{ my: 0.5 }}
              >
                {selectedFeature.description}
              </Typography>
              <Link
                color="primary"
                variant="body2"
                fontWeight="bold"
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  "& > svg": { transition: "0.2s" },
                  "&:hover > svg": { transform: "translateX(2px)" },
                }}
              >
                <span>Ver más</span>
                <ChevronRightRoundedIcon
                  fontSize="small"
                  sx={{ mt: "1px", ml: "2px" }}
                />
              </Link>
            </Box> */}
          {/* </Box> */}
          {/* <Stack
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
            spacing={2}
            useFlexGap
            sx={{ width: "100%", display: { xs: "none", sm: "flex" } }}
          > */}
          <Grid container spacing={2}>
            {items.map(({ icon, title, description }, index) => (
              <Grid item sx={{ borderColor: "red" }} xs={6} lg={4}>
                <Card
                  key={index}
                  variant="outlined"
                  component={Button}
                  onClick={() => handleItemClick(index)}
                  sx={{
                    p: 3,
                    height: "fit-content",
                    width: "100%",
                    background: "none",
                    backgroundColor:
                      selectedItemIndex === index
                        ? "action.selected"
                        : undefined,
                    borderColor: (theme) => {
                      if (theme.palette.mode === "light") {
                        return selectedItemIndex === index
                          ? "primary.light"
                          : "grey.200";
                      }
                      return selectedItemIndex === index
                        ? "primary.dark"
                        : "grey.800";
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      textAlign: "left",
                      flexDirection: { xs: "column", md: "row" },
                      alignItems: { md: "center" },
                      gap: 2.5,
                    }}
                  >
                    <Box
                      sx={{
                        color: (theme) => {
                          if (theme.palette.mode === "light") {
                            return selectedItemIndex === index
                              ? "primary.main"
                              : "grey.300";
                          }
                          return selectedItemIndex === index
                            ? "primary.main"
                            : "grey.700";
                        },
                      }}
                    >
                      {icon}
                    </Box>
                    <Box sx={{ textTransform: "none" }}>
                      <Typography
                        color="text.primary"
                        variant="body2"
                        fontWeight="bold"
                      >
                        {title}
                      </Typography>
                      <Typography
                        color="text.secondary"
                        variant="body2"
                        sx={{ my: 0.5 }}
                      >
                        {description}
                      </Typography>
                      {/* <Link
                      color="primary"
                      variant="body2"
                      fontWeight="bold"
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        "& > svg": { transition: "0.2s" },
                        "&:hover > svg": { transform: "translateX(2px)" },
                      }}
                      onClick={(event) => {
                        event.stopPropagation();
                      }}
                    > */}
                      {/* <span>Leer más...</span>
                      <ChevronRightRoundedIcon
                        fontSize="small"
                        sx={{ mt: "1px", ml: "2px" }}
                      />
                    </Link> */}
                    </Box>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* </Stack> */}
        </Grid>
        {/* <Grid
          item
          xs={12}
          md={6}
          sx={{ display: { xs: "none", sm: "flex" }, width: "100%" }}
        >
          <Card
            variant="outlined"
            sx={{
              height: "100%",
              width: "100%",
              display: { xs: "none", sm: "flex" },
              pointerEvents: "none",
            }}
          >
            <Box
              sx={{
                m: "auto",
                width: 420,
                height: 500,
                backgroundSize: "contain",
              }}
            >
              <Typography variant="h4" color={"primary"}>
                {items[selectedItemIndex].title}
              </Typography>
              <Typography variant="h6">
                {items[selectedItemIndex].body}
              </Typography>
            </Box>
          </Card>
        </Grid> */}
      </Grid>
    </Container>
  );
}
