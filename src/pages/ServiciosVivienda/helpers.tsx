import { Divider } from "rsuite";
import { IGenericControls } from "@/_pwa-framework/genforms/types/controls/controls.types";
import { Typography } from "@mui/material";
import { datico } from "@/app/user-interfaces/forms/models/model";

export const obtenerServiciosVivienda = async (
  id: string
  // setIdMiemarginBottomroHogar: any
) => {
  const data_servicios = await datico.dat_seviciosvivienda
    .where({ idcodigohogar: id.toString() })
    .toArray();

  return data_servicios?.length
    ? { ...data_servicios[0], editMode: true }
    : {
        idcodigohogar: id,
        iddesague: [], //
        idelectricidad: [], //
        idfrecsumagua: [], //
        idinstalacionacueducto: [], //
        idprocedenciaagua: [], //
        idtipomanejo: [], //
        nautahogar: [], //
        editMode: false,
      };
};
export const controles: IGenericControls[] = [
  {
    type: "component",
    component: () => (
      <Typography>
        <b>Servicio de agua</b>
      </Typography>
    ),
    label: "",
    name: "",
    gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
  },
  {
    type: "component",
    component: () => <Divider style={{ marginBottom: 2 }} />,
    label: "",
    name: "",
    gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
  },
  {
    type: "select",
    label: "Instalación por red de acueducto",
    name: "idinstalacionacueducto",
    gridValues: { xs: 12, lg: 4, md: 4, sm: 12, xl: 4 },
    url: "9649",
    validations: {
      required: { message: "Este campo es obligatorio" },
    },
  },
  {
    type: "select",
    label: "Frecuencia de suministro del agua",
    name: "idfrecsumagua",
    gridValues: { xs: 12, lg: 4, md: 4, sm: 12, xl: 4 },
    url: "9650",
    validations: {
      required: { message: "Este campo es obligatorio" },
    },
  },
  {
    type: "select",
    label: "Procedencia principal del agua",
    name: "idprocedenciaagua",
    gridValues: { xs: 12, lg: 4, md: 4, sm: 12, xl: 4 },
    url: "9651",
    validations: {
      required: { message: "Este campo es obligatorio" },
    },
  },
  {
    type: "component",
    component: () => (
      <Typography>
        <b>Nota aclaratoria: </b>Escoger la procedencia principal del agua que
        se consume.
      </Typography>
    ),
    label: "",
    name: "",
    gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
  },
  {
    type: "component",
    component: () => (
      <Typography style={{ marginTop: 2 }}>
        <b>Otros servicios</b>
      </Typography>
    ),
    label: "",
    name: "",
    gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
  },
  {
    type: "component",
    component: () => <Divider style={{ marginBottom: 2 }} />,
    label: "",
    name: "",
    gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
  },
  {
    type: "select",
    label: "Sistema de desagüe",
    name: "iddesague",
    gridValues: { xs: 12, lg: 4, md: 4, sm: 12, xl: 4 },
    url: "9646",
    validations: {
      required: { message: "Este campo es obligatorio" },
    },
  },
  {
    type: "select",
    label: "Manejo de desechos más frecuentes",
    name: "idtipomanejo",
    url: "9647",

    gridValues: { xs: 12, lg: 4, md: 4, sm: 12, xl: 4 },
    validations: {
      min: { value: 1, message: "Este campo es obligatorio" },
    },
  },
  {
    type: "select",
    label: "Electricidad",
    name: "idelectricidad",
    gridValues: { xs: 12, lg: 4, md: 4, sm: 12, xl: 4 },
    url: "9648",
    validations: {
      required: { message: "Este campo es obligatorio" },
    },
  },
  {
    type: "component",
    component: () => (
      <Typography style={{ marginTop: 2 }}>
        <b>Acceso a redes</b>
      </Typography>
    ),
    label: "",
    name: "",
    gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
  },
  {
    type: "component",
    component: () => <Divider style={{ marginBottom: 2 }} />,
    label: "",
    name: "",
    gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
  },
  {
    type: "select",
    label: "¿Servicio de internet en el hogar(nauta hogar)?",
    name: "nautahogar",
    options: [
      { idconcepto: "1", denominacion: "Si" },
      { idconcepto: "2", denominacion: "No" },
    ],
    gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
    validations: {
      required: { message: "Este campo es obligatorio" },
    },
  },
];
