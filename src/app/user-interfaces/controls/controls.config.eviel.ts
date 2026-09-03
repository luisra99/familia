import { IGenericControls } from "@/_pwa-framework/genforms/types/controls/controls.types";

export const Monto: IGenericControls = {
  type: "number",
  label: "Monetario",
  name: "moneda",
  decimalScale: 2,
  format: "finance",
  gridValues: { xs: 12, sm: 12, lg: 6, md: 12, xl: 6 },
};

export const PresentaDiscapacidad: IGenericControls = {
  type: "select",
  label: "¿Presenta alguna discapacidad?",
  name: "idmiembrodiscapacidad",
  gridValues: { xs: 12 },
  options: [
    { idconcepto: "1", denominacion: "Sí" },
    { idconcepto: "2", denominacion: "No" },
  ],
  hidden: (values: any) => values.idmiembro == "",
};

export const Discapacidad: IGenericControls = {
  type: "multiselect",
  label: "Discapacidad",
  name: "iddiscapacidad",
  url: "9376",

  gridValues: { xs: 12 },
  hidden: (values: any) =>
    values.idmiembro == "" || values.idmiembrodiscapacidad != "1",
};

//Nomenclador incorrecto
export const enfermedades: IGenericControls = {
  type: "multiselect",
  label: "Enfermedades de baja prevalencia",
  name: "idenfermedad",
  url: "9409",
};

//Nomenclador incorrecto
export const BeneficiosSalud: IGenericControls = {
  type: "multiselect",
  label: "Beneficios focalizados de salud",
  name: "idbeneficio",
  url: "9802",
};
// url :"9351" misma opcion de radios
export const SeEncuentra: IGenericControls = {
  type: "radio",
  label: "Se Encuentra",
  name: "idtiposayuda",
  gridValues: { xs: 12, sm: 12, lg: 12, md: 12, xl: 12 },

  radios: [
    { idconcepto: "1", denominacion: "Apto" },
    { idconcepto: "2", denominacion: "No Apto o fuera de la edad laboral" },
  ],
  defaultValue: "1",
  direction: "row",
  labelPlacement: "end",
};

export const Remuneraciones: IGenericControls = {
  type: "select",
  label: "¿Recibe remuneraciones?",
  name: "idremuneraciones",
  options: [
    { idconcepto: "1", denominacion: "Si" },
    { idconcepto: "2", denominacion: "No" },
  ],
};

export const EscogerOpcion: IGenericControls = {
  type: "multiselect",
  label: "Escoja la opción",
  name: "idremuneraciones",

  gridValues: { xs: 12, sm: 12, lg: 12, md: 12, xl: 12 },
  url: "9363",
};

export const Ingresos: IGenericControls = {
  type: "radio",
  label: "¿Tiene ingresos propios?",
  name: "idmiembrofuentesingresos",
  gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
  radios: [
    { idconcepto: "1", denominacion: "Si" },
    { idconcepto: "2", denominacion: "No" },
  ],

  defaultValue: "1",
  direction: "row",
  labelPlacement: "end",
};

// dat_miembrosfuentesingreso //

export const MontoMensual: IGenericControls = {
  type: "number",
  label: "Monto mensual",
  name: "montomensual",
  format: "finance",
  hidden: (values: any) => values.idmiembrofuentesingresos != "2",
};

export const Moneda: IGenericControls = {
  type: "select",
  label: "Moneda",
  name: "idmoneda",
  gridValues: { xs: 12, sm: 12, lg: 6, md: 12, xl: 12 },
  url: "9309",
};

export const FuentedeProcedencia: IGenericControls = {
  type: "select",
  label: "Fuente de procedencia",
  name: "idfuente",
  gridValues: { xs: 12, sm: 12, lg: 6, md: 12, xl: 12 },
  url: "9318",
};

export const Cual: IGenericControls = {
  type: "text",
  label: "Cuál",
  name: "esotrafuente",
  multiline: { minRows: 1 },
  gridValues: { xs: 12, sm: 12, lg: 6, md: 12, xl: 6 },
  hidden: (values: any) => values.idfuente != "opt1",
};

export const EstrategiasAlimentarias: IGenericControls = {
  type: "radio",
  label: "Estrategias",
  name: "idestrategia",
  radios: [
    {
      idconcepto: "1",
      denominacion:
        "Miembros adultos que no hacen trabajos ociasionales para ganar algún dinero",
    },
    {
      idconcepto: "2",
      denominacion: "Miembros adultos que no encontraron empleo fijo",
    },
    {
      idconcepto: "3",
      denominacion:
        "Miembros adultos que ya trabajanhacen trabajos adicionales",
    },
    {
      idconcepto: "4",
      denominacion:
        "Niñas, niños y adolescentes hacen algunos trabajos por los que reciben pagos",
    },
    {
      idconcepto: "5",
      denominacion:
        "Miembros adultos ayudan a otras familias y amigos para recibir algún apoyo en dinero o bienes",
    },
    {
      idconcepto: "6",
      denominacion:
        "Sembrar alimentos o criar animales en el patio o en tierras de amigos y/o familiares",
    },
    {
      idconcepto: "7",
      denominacion:
        "Elaboran algunos productos para vender(p.e.alimentos, café, durofrío)",
    },
    {
      idconcepto: "8",
      denominacion: "Venden objetos de miembros de la familia",
    },
    { idconcepto: "9", denominacion: "Vender la casa o parte de ella" },
  ],
  direction: "row",
  labelPlacement: "end",
  gridValues: { xl: 12, lg: 12, md: 12, sm: 12, xs: 12 },
};

export const ProblemaEconomico: IGenericControls = {
  type: "select",
  label: "Ayuda ante un problema económico",
  name: "ayudaprob",

  options: [
    { idconcepto: "1", denominacion: "Si" },
    { idconcepto: "2", denominacion: "No" },
  ],
  gridValues: { xl: 6, lg: 6, md: 6, sm: 6, xs: 6 },
};

export const ApoyoLaboresDomesticas: IGenericControls = {
  type: "select",
  label: "Ayuda ante un problema doméstico, por enfermedad u otra razón",
  name: "idayuda",
  url: "9409",

  gridValues: { xl: 6, lg: 6, md: 6, sm: 6, xs: 6 },
};

export const InstalacionRedAcueducto: IGenericControls = {
  type: "select",
  label: "Instalación por red de acueducto",
  name: "idserviciosvivienda",
  gridValues: { xs: 12, lg: 4, md: 4, sm: 12, xl: 4 },
  url: "9644",
};

export const FrecuenciaSuministro: IGenericControls = {
  type: "select",
  label: "Frecuencia de suministro del agua",
  name: "idserviciosvivienda",
  gridValues: { xs: 12, lg: 4, md: 4, sm: 12, xl: 4 },
  url: "9644",
};

export const ProcedenciaPrincipalAgua: IGenericControls = {
  type: "select",
  label: "Procedencia principal del agua",
  name: "idserviciosvivienda",
  gridValues: { xs: 12, lg: 4, md: 4, sm: 12, xl: 4 },
  url: "9644",
};

export const SistemaDesague: IGenericControls = {
  type: "select",
  label: "Sistema de Desagüe",
  name: "idserviciosvivienda",
  gridValues: { xs: 12, lg: 4, md: 4, sm: 12, xl: 4 },
  url: "9644",
};

export const ManejoDesechos: IGenericControls = {
  type: "multiselect",
  label: "Manejo de desechos",
  name: "idserviciosvivienda",
  url: "9644",

  gridValues: { xs: 12, lg: 4, md: 4, sm: 12, xl: 4 },
};

export const FuentedeElectricidad: IGenericControls = {
  type: "select",
  label: "Electricidad",
  name: "idserviciosvivienda",
  gridValues: { xs: 12, lg: 4, md: 4, sm: 12, xl: 4 },
  url: "9644",
};

export const ServicioInternet: IGenericControls = {
  type: "select",
  label: "¿Servicio de internet en el hogar(nauta Hogar)?",
  name: "idserviciosvivienda",
  url: "9644",
  gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
};

// dat_miembroocupacion //

export const escojaElMiembro: IGenericControls = {
  type: "select",
  label: "Miembro del hogar",
  name: "idmiembro",
  gridValues: { xs: 6, lg: 4, md: 4, sm: 4, xl: 4 },
};
//url 9327 ver como se cargan visualmente,
export const Ultimomeses: IGenericControls = {
  type: "radio",
  label:
    " Se pregunta a qué se dedican los miembros adultos del hogar, sus actividades laborales, de estudios u otras, habituales y tomando de referencia los últimos 6 meses",

  name: "idocupacion",
  url: "9327",
  defaultValue: "9328",
  radios: [
    // { idconcepto: "9328", denominacion: "Trabajando" },
    // { idconcepto: "9329", denominacion: "Sin Trabajar" },
  ],
  direction: "row",
  labelPlacement: "end",
  gridValues: { xl: 12, lg: 12, md: 12, sm: 12, xs: 12 },
  hidden: (values: any) => values.idmiembrohogar == "",
};

export const Ocupacion: IGenericControls = {
  type: "select",
  label: "Ocupación",
  name: "idocupacion",
  options: [
    { idconcepto: "opt1", denominacion: "" },
    { idconcepto: "opt2", denominacion: "No" },
  ],
};
export const Ocupaciones: IGenericControls = {
  type: "radio",
  label: "Ocupación",
  name: "idocupacion",
  radios: [
    { idconcepto: "1", denominacion: "Organización política y de masas" },
    { idconcepto: "2", denominacion: "Institución sin fines de lucro" },
    {
      idconcepto: "3",
      denominacion:
        "Empresa mixta u otro tipo de asociación económica internacional",
    },
    { idconcepto: "4", denominacion: "Cooperativa agropecuaria (CCS y UBPC)" },
    {
      idconcepto: "5",
      denominacion: "Contratado(a) por cooperativa agropecuaria",
    },
    { idconcepto: "6", denominacion: "Firma o representación extranjera" },
    {
      idconcepto: "7",
      denominacion:
        "Pequeño(a) agricultor(a), asociado(a) o no a cooperativa de crédito y servicios",
    },
    { idconcepto: "8", denominacion: "Usufructuario(a) de tierras" },
    {
      idconcepto: "9",
      denominacion: "Micro, pequeña o mediana empresa (dueño/a o socio/a)",
    },
    { idconcepto: "10", denominacion: "Cooperativa no agropecuaria" },
    {
      idconcepto: "11",
      denominacion: "Cuenta Propia titular con trabajadores contratados",
    },
    {
      idconcepto: "12",
      denominacion: "Cuenta Propia titular sin trabajadores contratados",
    },
    {
      idconcepto: "13",
      denominacion: "Contratado/a por cuentapropista, hogares o MIPYME",
    },
    {
      idconcepto: "14",
      denominacion: "Familiar auxiliar (con remuneración ocasional o sin ella)",
    },
    {
      idconcepto: "15",
      denominacion: "En trabajos informales(sin contrato acordado)",
    },
    { idconcepto: "16", denominacion: "Tareas del Hogar" },
    {
      idconcepto: "17",
      denominacion: "Licencia de Maternidad o certificado medico",
    },
    { idconcepto: "18", denominacion: "Servicio militar activo" },
    { idconcepto: "19", denominacion: "Estudiante" },
    { idconcepto: "20", denominacion: "NTNE" },
  ],
  hidden: (values: any) => values.idocupacion == "opt2",
  direction: "row",
  labelPlacement: "end",
  gridValues: { xl: 12, lg: 12, md: 12, sm: 12, xs: 12 },
};

// situacion de los niños y las niñas

export const SituacionEducativa: IGenericControls = {
  type: "select",
  label:
    "Situación educativa de niños y niñas, adolecentes y jóvenes del hogar",
  name: "idsituacnnaj",
  url: "9472",
};

export const escojaLaOpción1: IGenericControls = {
  type: "select",
  label: "Escoja la opción",
  name: "idsituacioneduc",
  options: [
    { idconcepto: "opt1", denominacion: "Educación y cuidado en el hogar" },
    { idconcepto: "opt2", denominacion: "Enseñanza Técnico-Personal" },
  ],
};

export const escojaLaOpción2: IGenericControls = {
  type: "select",
  label: "Escoja la opción",
  name: "idsituacioneduc",
  options: [
    { idconcepto: "opt1", denominacion: "Cuidado informal" },
    {
      value: "opt2",
      label: "Cuidado de niños por formas de gestión no estatal",
    },
    { idconcepto: "opt3", denominacion: "Círculo, jardín o casita infantil" },
    { idconcepto: "opt4", denominacion: "Aplica programa Educa a tu hijo" },
    {
      idconcepto: "opt5",
      denominacion: "Sin aplicar programa Educa a tu hijo",
    },
    { idconcepto: "opt6", denominacion: "Otro" },
    { idconcepto: "opt7", denominacion: "Prescolar en círculo infantil" },
    { idconcepto: "opt8", denominacion: "Escuela primaria regular" },
    { idconcepto: "opt9", denominacion: "Escuela secundaria regular" },
    {
      idconcepto: "opt10",
      label: "Preuniversitario ( en cualquier modalidad )",
    },
    { idconcepto: "opt11", denominacion: "Escuela de oficio" },
    { idconcepto: "opt12", denominacion: "Obrero calificado " },
    { idconcepto: "opt13", denominacion: "Técnico medio" },
    { idconcepto: "opt14", denominacion: "Escuela pedagógica" },
    { idconcepto: "opt15", denominacion: "Escuela especial" },
    { idconcepto: "opt16", denominacion: "Escuela de formación integral" },
    {
      value: "opt17",
      label: "Educación de adultos ( Facultad Obrero-campesina )",
    },
    {
      value: "opt18",
      label: "Universidad ( en cualquiera de sus modalidades )",
    },
    { idconcepto: "opt19", denominacion: "Situación de discapacidad" },
    {
      value: "opt20",
      label: "Adolescente con sanción penal con internamiento",
    },
    { idconcepto: "opt21", denominacion: "Trabaja" },
    { idconcepto: "opt22", denominacion: "Al cuidado de un hijo/a" },
    {
      idconcepto: "opt23",
      denominacion: "Al cuidado de uno o varios familiares",
    },
    { idconcepto: "opt24", denominacion: "Embarazo" },
    { idconcepto: "opt25", denominacion: "Otras razones ( explicite )" },
  ],
};

export const Causas: IGenericControls = {
  type: "select",
  label: "Causas",
  name: "idcausadesv",
  options: [
    { idconcepto: "opt1", denominacion: "Embarazo" },
    { idconcepto: "opt2", denominacion: "No" },
  ],
};

export const otrasRazones: IGenericControls = {
  type: "text",
  label: "Otras Razones",
  name: "otrascausas",
  gridValues: { md: 6 },
  multiline: { minRows: 2 },
  hidden: (values: any) => values.idcausadesv == "opt1",
};

export const situacionNNA: IGenericControls = {
  type: "multiselect",
  label: "Situación de NNA que cometen hechos que la ley tipifica como delito",
  name: "idsituacnnaj",

  gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },

  url: "9421",
};

export const EmbarazoAdolescente: IGenericControls = {
  type: "select",
  label: "Se encuentra embrarazada",
  name: "estaembarazada",
  options: [
    { idconcepto: "opt1", denominacion: "Si" },
    { idconcepto: "opt2", denominacion: "No" },
  ],
};
export const MadreAdolescente: IGenericControls = {
  type: "select",
  label: "Fue madre antes de los 19",
  name: "madremenor19",
  options: [
    { idconcepto: "opt1", denominacion: "Si" },
    { idconcepto: "opt2", denominacion: "No" },
  ],
};

export const SituacionDelictiva: IGenericControls = {
  type: "select",
  label: "Situación delictiva",
  name: "idsituacnnaj",
  options: [
    { idconcepto: "opt1", denominacion: "En revisión por el CDO" },
    { idconcepto: "opt2", denominacion: "No" },
  ],
};

export const Delincuencia: IGenericControls = {
  type: "radio",
  label: "Situación",
  name: "idsituacnnaj",
  radios: [
    { idconcepto: "1", denominacion: "CAM MNED" },
    { idconcepto: "2", denominacion: "Matriculado en escuela de conducta" },
    { idconcepto: "3", denominacion: "En revisión por el CDO" },
    { idconcepto: "3", denominacion: "Sanción penal privación de libertad" },
  ],
  direction: "col",
  labelPlacement: "end",
  gridValues: { md: 6 },
};

export const MPD: IGenericControls = {
  type: "text",
  gridValues: { xs: 12, sm: 6, lg: 6, md: 6, xl: 6 },
  label: "MPD (Madre o padre en situación de discapacidad)",
  name: "idmotivocuida",
  hidden: (values: any) => values.idmotivodecision != "opt1",
};

export const MPA: IGenericControls = {
  type: "text",
  gridValues: { xs: 12, sm: 6, lg: 6, md: 6, xl: 6 },

  label: "MPD (Madre o padre ancianos)",
  name: "idmotivocuida",
  hidden: (values: any) => values.idmotivodecision != "opt1",
};

export const HD: IGenericControls = {
  gridValues: { xs: 12, sm: 6, lg: 6, md: 6, xl: 6 },
  type: "text",

  label: "HD (Hijo/a en situación de discapacidad )",
  name: "idmotivocuida",
  hidden: (values: any) => values.idmotivodecision != "opt1",
};

export const HijoM: IGenericControls = {
  gridValues: { xs: 12, sm: 6, lg: 6, md: 6, xl: 6 },
  type: "text",

  label: "HM (Hijo/a menor)",
  name: "idmotivocuida",
  hidden: (values: any) => values.idmotivodecision != "opt1",
};

export const ND: IGenericControls = {
  gridValues: { xs: 12, sm: 6, lg: 6, md: 6, xl: 6 },
  type: "text",

  label: "ND (Nieto/a en situación de discapacidad)",
  name: "idmotivocuida",
  hidden: (values: any) => values.idmotivodecision != "opt1",
};

export const NietoMenor: IGenericControls = {
  gridValues: { xs: 12, sm: 6, lg: 6, md: 6, xl: 6 },
  type: "text",

  label: "NM (Nieto/a menor)",
  name: "idmotivocuida",
  hidden: (values: any) => values.idmotivodecision != "opt1",
};

export const SuegroD: IGenericControls = {
  gridValues: { xs: 12, sm: 6, lg: 6, md: 6, xl: 6 },
  type: "text",

  label: "SD (Suegro/a en situación de discapacidad)",
  name: "idmotivocuida",
  hidden: (values: any) => values.idmotivodecision != "opt1",
};

export const SuegroA: IGenericControls = {
  gridValues: { xs: 12, sm: 6, lg: 6, md: 6, xl: 6 },
  type: "text",

  label: "SA (Suegro p suegra ancianos)",
  name: "idmotivocuida",
  hidden: (values: any) => values.idmotivodecision != "opt1",
};

export const HED: IGenericControls = {
  type: "text",
  gridValues: { xs: 12, sm: 6, lg: 6, md: 6, xl: 6 },

  label: "HED (Hermano/a en situación de discapacidad)",
  name: "idmotivocuida",
  hidden: (values: any) => values.idmotivodecision != "opt1",
};

export const HEA: IGenericControls = {
  type: "text",
  gridValues: { xs: 12, sm: 6, lg: 6, md: 6, xl: 6 },

  label: "HEA (Hermano/a ancianos)",
  name: "idmotivocuida",
  hidden: (values: any) => values.idmotivodecision != "opt1",
};

export const Otros: IGenericControls = {
  type: "text",
  gridValues: { xs: 12, sm: 6, lg: 6, md: 6, xl: 6 },

  label: "Otros",
  name: "idmotivocuida",
  hidden: (values: any) => values.idmotivodecision != "opt1",
};

export const MotivoDesicion: IGenericControls = {
  type: "select",
  label: "Motivo de la decisión",
  name: "idmotivodecision",
  gridValues: { xs: 12, sm: 12, lg: 12, md: 12, xl: 12 },
  url: "9360",
};

export const CausasRemuneracion: IGenericControls = {
  type: "select",
  gridValues: { xs: 12, sm: 12, lg: 12, md: 12, xl: 12 },
  label: "Causas por la que no se encuentra vinculado al trabajo remunerado",
  name: "idremuneraciones",
  url: "9354",
};

// dat_miembrosfuentesingreso //

export const escojaElMiembro2: IGenericControls = {
  type: "select",
  label: "Miembro del hogar",
  name: "idmiembro",
  gridValues: { xs: 5, lg: 5, md: 5, sm: 5, xl: 4 },
  options: [
    { idconcepto: "opt1", denominacion: "Jose Alejandro Rodriguez Rodriguies" },
    { idconcepto: "opt2", denominacion: "Alberto Rodriguez" },
    { idconcepto: "opt3", denominacion: "José Alejandro" },
  ],
};

// dat_miembrogradodeautonomia / dat_tiposdeayuda /dat_miembrodiscapacidad / dat_miembroAditamentos //

export const escojaElMiembro3: IGenericControls = {
  type: "select",
  label: "Miembro del hogar",
  name: "idmiembro",
  gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
  options: [
    { idconcepto: "opt1", denominacion: "Alejandro Hernandez" },
    { idconcepto: "opt2", denominacion: "Alberto Rodriguez" },
    { idconcepto: "opt3", denominacion: "José Alejandro" },
  ],
};

export const escojaMiembro4: IGenericControls = {
  type: "select",
  label: "Miembro del hogar",
  name: "idmiembro",
  options: [
    { idconcepto: "opt1", denominacion: "Alejandro Hernandez" },
    { idconcepto: "opt2", denominacion: "Alberto Rodriguez" },
    { idconcepto: "opt3", denominacion: "José Alejandro" },
  ],
};

// datnvinculacionmiembro  y   dat_remuneraciones //

export const escojaElMiembro5: IGenericControls = {
  type: "select",
  label: "Miembro del hogar",
  name: "idmiembro",
  gridValues: { xs: 6, sm: 6, lg: 6, md: 6, xl: 6 },
  options: [
    { idconcepto: "opt1", denominacion: "Alejandro Hernandez" },
    { idconcepto: "opt2", denominacion: "Alberto Rodriguez" },
    { idconcepto: "opt3", denominacion: "José Alejandro" },
  ],
};

export const Aditamentos: IGenericControls = {
  type: "select",
  label: "Aditamentos",
  name: "idaditamento",
  url: "9383",
  validations: {
    required: { message: "Debe seleccionar un aditamento" },
  },
  disabledOnEdit: true,
  gridValues: { xs: 12, sm: 6, lg: 6, md: 6, xl: 6 },
};

export const Disponibilidad: IGenericControls = {
  type: "select",
  label: "Disponibilidad",
  name: "disponeadit",
  url: "9395",
  validations: {
    required: { message: "Debe seleccionar la disponibilidad" },
  },
  gridValues: { xs: 12, sm: 6, lg: 6, md: 6, xl: 6 },
};

export const Actividad: IGenericControls = {
  type: "select",
  label: "Actividad",
  name: "idtipoactividad",
  gridValues: { xs: 12, sm: 6, lg: 6, md: 6, xl: 6 },
  url: "9501",
};

export const cantidadHoras: IGenericControls = {
  type: "select",
  label: "Cantidad de horas",
  name: "idcanthoras",
  gridValues: { xs: 12, sm: 6, lg: 6, md: 6, xl: 6 },
  url: "10136",
};

export const horarios: IGenericControls = {
  type: "select",
  label: "Horarios",
  name: "idhorario",
  gridValues: { xs: 12, sm: 6, lg: 6, md: 6, xl: 6 },
  url: "10140",
};
export const autorizacion: IGenericControls = {
  type: "select",
  label: "Autorización del MTSS",
  name: "autorizadomtss",
  gridValues: { xs: 12, sm: 6, lg: 6, md: 6, xl: 6 },
  options: [
    { idconcepto: "1", denominacion: "Si" },
    { idconcepto: "0", denominacion: "No" },
  ],
};
// Adicionar y modificar vehiculos y equipos

export const tipo: IGenericControls = {
  type: "select",
  label: "Tipo",
  name: "idtipoactividad",
  options: [
    {
      idconcepto: "opt1",
      denominacion: "Vehículo",
    },
    {
      idconcepto: "opt2",
      denominacion: "Equipo",
    },
  ],
};

export const denominacion: IGenericControls = {
  type: "select",
  label: "Denominación",
  name: "idtipoactividad",
  options: [
    { idconcepto: "opt1", denominacion: "Carro" },
    { idconcepto: "opt2", denominacion: "Microondas" },
  ],
};

export const escojaopcion: IGenericControls = {
  type: "select",
  label: "Escoja la opción",
  name: "idtipoactividad",
  options: [
    { idconcepto: "0", denominacion: "Propio" },
    { idconcepto: "1", denominacion: "Asignado" },
  ],
};

export const cantidad: IGenericControls = {
  type: "number",
  label: "Cantidad",
  name: "idcanthoras",
  format: "units",
};

// gasto

export const gastocup: IGenericControls = {
  type: "select",
  label: "Tipo de ordenamiento de los gastos",
  name: "montocup",
  url: "9639",
};

export const alimentacion: IGenericControls = {
  type: "select",
  label: "Alimentación",
  name: "proporciongastoalimentacion",
  url: "9639",
  gridValues: { xs: 12, sm: 6, lg: 6, md: 6, xl: 6 },
};

export const medicamentos5: IGenericControls = {
  type: "select",
  label: "Medicamentos",
  name: "proporciongastomedicamento",
  gridValues: { xs: 12, sm: 6, lg: 6, md: 6, xl: 6 },
  url: "9639",
};
