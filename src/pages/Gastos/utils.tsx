import { Divider, Typography } from "@mui/material";

import { IGenericControls } from "@/_pwa-framework/genforms/types/controls/controls.types";

export const headControls: IGenericControls[] = [
  {
    type: "component",
    component: () => (
      <Typography sx={{ mb: 2 }}>
        <b>Nota aclaratoria: </b> Preguntar el monto aproximado de gastos (en
        CUP) para los destinos principales. Si la persona entrevistada no puede
        responder el monto, pedir que ordene los destinos posibles de acuerdo con
        el peso de los gastos.
      </Typography>
    ),
    label: "",
    name: "",
    gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
  },
  {
    type: "select",
    label: "Tipo de ordenamiento de los gastos",
    name: "montocup",
    options: [
      { idconcepto: "1", denominacion: "Monto en CUP" },
      { idconcepto: "2", denominacion: "Orden de Prioridad" },
    ],
    gridValues: { xs: 12, sm: 6, lg: 5, md: 6, xl: 5 },
    validations: {
      required: { message: "Este campo es obligatorio" },
    },
  },
  {
    type: "component",
    component: () => <Divider sx={{ mt: 0, mb: 1 }} />,
    label: "",
    name: "",
    gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
    hidden: (values: any) => values.montocup == "2" || values.montocup == "",
  },
  {
    type: "component",
    component: () => (
      <Typography sx={{ mt: 4, mb: 1 }}>
        <b>Destino de los gastos principales </b>
      </Typography>
    ),
    label: "",
    name: "",
    gridValues: { xs: 5, lg: 5, md: 5, sm: 5, xl: 5 },
    hidden: (values: any) => values.montocup == "2" || values.montocup == "",
  },
];
export const mediumControls: IGenericControls[] = [
  {
    type: "component",
    component: () => (
      <Typography sx={{ mt: 4, mb: 2 }} flex={1} textAlign={"center"}>
        <b>Monto en cup </b>
      </Typography>
    ),
    label: "",
    name: "",
    gridValues: { xs: 6, lg: 6, md: 6, sm: 6, xl: 6 },
    hidden: (values: any) => values.montocup == "2" || values.montocup == "",
  },
  {
    type: "component",
    component: () => <Divider sx={{ mt: 0, mb: 1 }} />,
    label: "",
    name: "",
    gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
    hidden: (values: any) => values.montocup == "2" || values.montocup == "",
  },
];
export const lastControls: IGenericControls[] = [
  {
    type: "component",
    component: () => <Divider sx={{ mt: 0, mb: 1 }} />,
    label: "",
    name: "",
    gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
    hidden: (values: any) => values.montocup == "2" || values.montocup == "",
  },
  {
    type: "component",
    component: () => (
      <Typography sx={{ mt: 2, mb: 2 }}>
        <b>Proporción del gasto total del hogar que se destina a</b>
      </Typography>
    ),
    label: "",
    name: "",
    gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
  },
  {
    type: "component",
    component: () => <Divider sx={{ mb: 2 }} />,
    label: "",
    name: "",
    gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
  },
  {
    type: "select",
    label: "Alimentación",
    name: "proporciongastoalimentacion",
    url: "9639",
    gridValues: { xs: 12, sm: 6, lg: 6, md: 6, xl: 6 },
    validations: {
      required: { message: "Este campo es obligatorio" },
    },
  },
  {
    type: "select",
    label: "Medicamentos",
    name: "proporciongastomedicamento",
    gridValues: { xs: 12, sm: 6, lg: 6, md: 6, xl: 6 },
    url: "10420",
    validations: {
      required: { message: "Este campo es obligatorio" },
    },
  },
];
