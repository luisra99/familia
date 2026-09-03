import { IGenericControls } from "@/_pwa-framework/genforms/types/controls/controls.types";

//* Formulario 1 *//

export const GradoDeautonomia: IGenericControls = {
  type: "select",
  name: "idautonomia",
  gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
  label: "Grado de autonomía",
  url: "9369",
  hidden: (values: any) => values.idmiembro == "",
};
export const Miembro: IGenericControls = {
  type: "select",
  name: "idmiembro",
  label: "Miembros",
  gridValues: { md: 6 },
  options: [
    { idconcepto: "opt1", denominacion: "Juan Pérez Ascunse" },
    { idconcepto: "opt2", denominacion: "Pedro Pérez Gonzalez" },
    { idconcepto: "opt3", denominacion: "Juana Gonzalez Alfonso" },
  ],
};

//Falta nomenclador
export const TiposdeAyuda: IGenericControls = {
  type: "multiselect",
  name: "idtiposayuda",
  gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
  label: "Tipo de ayuda",

  url: "9373",
  hidden: (values: any) =>
    values.idmiembro == "" || values.idautonomia != "9371",
  // options: [
  //   { idconcepto: "opt1", denominacion: "ABVD" },
  //   { idconcepto: "opt2", denominacion: "AIVD" },
  // ],
};

export const Presentaalgunadiscapacidad: IGenericControls = {
  type: "radio",
  label: "¿Presenta alguna discapacidad?",
  name: "iddiscapacidad",
  url: "9376",

  direction: "row",
  labelPlacement: "top",
  hidden: (values: any) => values.idmiembro == "",
};

export const Discapacidad: IGenericControls = {
  type: "multiselect",
  name: "Discapacidad",
  label: "iddiscapacidad",

  url: "9376",
  hidden: (values: any) => values.idmiembro == "",
};

//en el nomenclador debe salir las enfermedades corespondientes al tipo
export const Enfermedades: IGenericControls = {
  type: "multiselect",
  name: "idenfermedad",
  label: "Enfermedades de baja prevalencia",
  gridValues: { xs: 6, lg: 6, md: 6, sm: 6, xl: 6 },
  url: "9390",

  hidden: (values: any) => values.idmiembrohogar == "",
};
//en el nomenclador debe salir las enfermedades corespondientes al tipo
export const Beneficios: IGenericControls = {
  type: "multiselect",
  name: "idbeneficio",
  label: "Beneficios focalizados de salud",
  url: "9802",

  gridValues: { xs: 6, lg: 6, md: 6, sm: 6, xl: 6 },
  hidden: (values: any) => values.idmiembrohogar == "",
};

export const BeneficiosProgramasalimentarios: IGenericControls = {
  type: "radio",
  label: "¿Recibe beneficios de programas alimentarios?",
  name: "idbeneficio",
  radios: [
    { idconcepto: "1", denominacion: "si" },
    { idconcepto: "2", denominacion: "no" },
  ],
  direction: "row",
  labelPlacement: "top",
};

export const CarnetdeIdentidad: IGenericControls = {
  type: "text",
  label: "Carnet de identidad",
  name: "cidentidad",
  pattern: /[0-9]/,
  validations: { length: { value: 11, message: "Carnet de Identidad" } },
};

export const NucleoFamiliar: IGenericControls = {
  type: "radio",
  label: "Nucleo familiar",
  name: "radiodos",
  radios: [
    { idconcepto: "1", denominacion: "OREGI" },
    { idconcepto: "2", denominacion: "SUIN" },
  ],
  direction: "row",
  labelPlacement: "top",
};

export const Nombre: IGenericControls = {
  type: "text",
  label: "Nombre",
  name: "pnombre",
};

export const PrimerApellido: IGenericControls = {
  type: "text",
  label: "Primer apellido",
  name: "pnombre",
};

export const SegundoApellido: IGenericControls = {
  type: "text",
  label: "Segundo apellido",
  name: "snombre",
};

export const SegundoNombre: IGenericControls = {
  type: "text",
  label: "Segundo nombre",
  name: "snombre",
};

export const NombredelaMadre: IGenericControls = {
  type: "text",
  label: "Nombre de la madre",
  name: "idparentesco",
};

export const NombredelPadre: IGenericControls = {
  type: "text",
  label: "Nombre del padre",
  name: "idparentesco",
};

export const Nucleo: IGenericControls = {
  type: "text",
  label: "Nucleo",
  name: "nucleo",
};

export const SituacionLegal: IGenericControls = {
  type: "select",
  name: "idsituacionalegal",
  label: "Situación legal de la vivienda",
  url: "9299",

  gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
};

export const PiezasdeTipoDormitorio: IGenericControls = {
  type: "text",
  label: "Piezas utilizadas para dormir",
  name: "cantudormir",
  pattern: /[0-9]/,
  validations: { length: { value: 1, message: "Cantidad de Cuartos" } },
  gridValues: { xs: 6, lg: 6, md: 6, sm: 6, xl: 6 },
};

export const PiezasexclusivadeTipoDormitorio: IGenericControls = {
  type: "text",
  label: "Piezas exclusivas de tipo dormitorios",
  name: "cantedormir",
  pattern: /[0-9]/,
  gridValues: { xs: 6, lg: 6, md: 6, sm: 6, xl: 6 },
  validations: { length: { value: 1, message: "Cantidad de Cuartos" } },
};

export const cocina: IGenericControls = {
  type: "radio",
  label: "",
  name: "tipousococina",
  radios: [
    { idconcepto: "opt1", denominacion: "Exclusiva de la vivienda" },
    { idconcepto: "opt2", denominacion: "Común a varias viviendas" },
  ],
  direction: "row",
  labelPlacement: "end",
  gridValues: { xs: 4, lg: 4, md: 4, sm: 4, xl: 4 },
};

export const cantidadSegunCocina: IGenericControls = {
  type: "number",
  label: "Cantidad",
  name: "excl",
  gridValues: { xs: 2, lg: 2, md: 2, sm: 2, xl: 2 },

  format: "units",
  hidden: (values: any) => values.tipousococina != "opt1",
};
export const LocalparaCocinar: IGenericControls = {
  type: "multiselect",
  name: "cantidadcocina",
  label: "Local para cocinar",

  url: "9752",
  gridValues: { xs: 12, lg: 6, md: 6, sm: 6, xl: 6 },
};

export const Combustible: IGenericControls = {
  type: "select",
  name: "idcombustible",
  label: "Combustible para cocinar",
  gridValues: { xs: 12, lg: 6, md: 6, sm: 6, xl: 6 },
  url: "9461",
};

export const Sanitario: IGenericControls = {
  type: "radio",
  label: "¿Tiene servicios sanitario?",
  name: "tienesanitario",
  radios: [
    { idconcepto: "1", denominacion: "Si" },
    { idconcepto: "2", denominacion: "No" },
  ],
  direction: "row",
  labelPlacement: "start",
};

export const Uso: IGenericControls = {
  type: "select",
  label: "De Uso",
  name: "idtipousoservicio",
  options: [
    { idconcepto: "1", denominacion: "Exclusivo" },
    { idconcepto: "2", denominacion: "Común" },
  ],
};

// export const Serviciossanitario: IGenericControls = {
//   type: "select",
//   label: "Tipos de servicio sanitario",
//   name: "idtiposanitario",
//   options: [
//     { idconcepto: "1", denominacion: "Inodoro" },
//     { idconcepto: "2", denominacion: "Letrina" },
//   ],
//   gridValues: { xs: 2, lg: 2, md: 2, sm: 2, xl: 2 },
//   hidden: (values:any) => values.tienesanitario !=="1",
// };

export const letrina: IGenericControls = {
  type: "multiselect",
  label: "Letrina",
  name: "idletrina",

  options: [
    { idconcepto: "1", denominacion: "Dentro de la vivienda" },
    { idconcepto: "2", denominacion: "Fuera de la vivienda" },
  ],
  gridValues: { xs: 2, lg: 2, md: 2, sm: 2, xl: 2 },
  hidden: (values: any) => values.tienesanitario !== "1",
};

export const seEncunetra: IGenericControls = {
  type: "multiselect",
  label: "Inodoro",
  name: "idlocalesvivienda",

  options: [
    { idconcepto: "1", denominacion: "Dentro de la vivienda" },
    { idconcepto: "2", denominacion: "Fuera de la vivienda" },
  ],
  gridValues: { xs: 2, lg: 2, md: 2, sm: 2, xl: 2 },
  hidden: (values: any) => values.tienesanitario !== "1",
};

// formulario 6 //

export const entrevistafecha: IGenericControls = {
  type: "date",
  gridValues: { xs: 4, lg: 3, md: 3, sm: 2, xl: 3 },
  label: "Fecha",
  disableFuture:true,
  name: "fechaentrev",
};
export const horainicial: IGenericControls = {
  type: "time",
  label: "Hora inicial",
  gridValues: { xs: 4, lg: 3, md: 3, sm: 2, xl: 3 },
  name: "hinicio",
};

export const horafinal: IGenericControls = {
  type: "time",
  label: "Hora fin",
  gridValues: { xs: 4, lg: 3, md: 3, sm: 2, xl: 3 },
  name: "hfin",
};

export const NombreyApellido: IGenericControls = {
  type: "text",
  label: "Nombre y apellido del entrevistado",
  gridValues: { xs: 3, lg: 3, md: 3, sm: 3, xl: 3 },
  name: "identrevistador",
  pattern: /[A-z]/,
};

export const Observaciones: IGenericControls = {
  type: "text",
  label: "Observaciones E/R y del trabajador social a cargo",
  name: "observaciones",
  gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
  // validations: { required: { message: "Este campo es obligatorio" } },
  multiline: { minRows: 6 },
};

// formulario 7 //

export const escojaMiembro1: IGenericControls = {
  type: "select",
  label: "Miembro del hogar",
  name: "idmiembrohogar",
  gridValues: { xs: 6, lg: 6, md: 6, sm: 6, xl: 6 },
  options: [
    { idconcepto: "opt1", denominacion: "Alejandro Hernandez" },
    { idconcepto: "opt2", denominacion: "Alberto Rodriguez" },
    { idconcepto: "opt3", denominacion: "José Alejandro" },
  ],
  hidden: (values: any) => values.problemasalud != "opt2",
};

export const problemasdeSalud: IGenericControls = {
  type: "select",
  label:
    "¿En los últimos 30 días algún miembro del hogar ha presentado algún problema de salud?",
  name: "problemasalud",
  gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
  url: "9831",
};

export const fueAtendido: IGenericControls = {
  type: "select",
  gridValues: { xs: 6, lg: 6, md: 6, sm: 6, xl: 6 },
  label: "¿Fue atendido?",
  name: "atendido",
  url: "9831",
};

export const lugarDeAtencion: IGenericControls = {
  type: "select",
  label: "",
  // label: "El lugar de atención está lejos",
  url: "9831",
  gridValues: { md: 6 },
  name: "atendido",
};

export const dineroparaTransporte: IGenericControls = {
  type: "select",
  label: "",
  // label: "Falta de dinero para el transporte hacia el centro de salud",
  name: "idmotivo",
  gridValues: { md: 6 },
  url: "9831",
};

export const medioTransporte: IGenericControls = {
  type: "select",
  label: "",
  // label: "No había medio de transporte",
  gridValues: { md: 6 },
  name: "idmotivo",
  url: "9831",
};

export const medicoEnfermera: IGenericControls = {
  type: "select",
  label: "",
  // label: "No había un médico o enfermero/a",
  gridValues: { md: 6 },
  url: "9831",
  name: "idmotivo",
};

export const centroDeSalud: IGenericControls = {
  type: "select",
  label: "",
  // label: "Demasiado tiempo de espera en el centro de salud",
  gridValues: { md: 6 },
  name: "idmotivo",
  url: "9831",
};

export const recursoNecesario: IGenericControls = {
  type: "select",
  label: "",
  // label: "Falta del medicamento o recurso necesario",
  gridValues: { md: 6 },
  name: "idmotivo",
  url: "9831",
};

export const considerograve: IGenericControls = {
  type: "select",
  label: "",
  // label: "No lo considero grave o necesario",
  gridValues: { md: 6 },
  name: "idmotivo",
  url: "9831",
};

export const otrosMotivos: IGenericControls = {
  type: "select",
  label: "",
  // label: "Otros Motivos",
  gridValues: { md: 6 },
  name: "idmotivo",
  url: "9831",
};

// dat_miembrohogar //

export const nombre: IGenericControls = {
  type: "text",
  label: "Nombre",
  name: "pnombre",
  pattern: /[A-z]/,
  gridValues: { xs: 6, lg: 6, md: 6, sm: 6, xl: 6 },
  validations: { required: { message: "Nombre" } },
};

export const primerApellido: IGenericControls = {
  type: "text",
  label: "Primer apellido",
  name: "papellido",
  pattern: /[A-z]/,
  gridValues: { xs: 6, lg: 6, md: 6, sm: 6, xl: 6 },
  //validations: { required:{message: 'Primer Apellido'} }
};

export const segundoApellido: IGenericControls = {
  type: "text",
  label: "Segundo apellido",
  name: "sapellido",
  pattern: /[A-z]/,
  gridValues: { xs: 6, lg: 6, md: 6, sm: 6, xl: 6 },
};

export const segundoNombre: IGenericControls = {
  type: "text",
  label: "Segundo nombre",
  name: "snombre",
  pattern: /[A-z]/,
  gridValues: { xs: 6, lg: 6, md: 6, sm: 6, xl: 6 },
};

export const CI: IGenericControls = {
  type: "text",
  label: "Carnet de identidad",
  name: "cidentidad",
  gridValues: { xs: 6, lg: 6, md: 6, sm: 6, xl: 6 },
  pattern: /[0-9]/,
  //validations: { required:{message: 'Carnet de identidad '} }
};

export const Edad: IGenericControls = {
  type: "text",
  label: "Edad",
  gridValues: { xs: 6, lg: 6, md: 6, sm: 6, xl: 6 },
  name: "edad",
  pattern: /[]/,
  validations: { length: { value: 2, message: "Edad estimada en su CI" } },
};

export const colorDePiel: IGenericControls = {
  type: "select",
  label: "Color de piel",
  name: "idcolorpiel",
  gridValues: { xs: 6, lg: 6, md: 6, sm: 6, xl: 6 },
  url: "9280",
};

export const EscanerCI: IGenericControls = {
  type: "text",
  label: "Escanear Qr del carnet de identidad",
  gridValues: { xs: 6, lg: 6, md: 6, sm: 6, xl: 6 },
  name: "dirscan",
};

export const FotoCi: IGenericControls = {
  type: "text",
  label: "Foto del carnet de identidad",
  name: "fotocarne",
  gridValues: { xs: 6, lg: 6, md: 6, sm: 6, xl: 6 },
};

export const Sexo: IGenericControls = {
  type: "select",
  label: "Sexo",
  name: "idsexo",
  gridValues: { xs: 6, lg: 6, md: 6, sm: 6, xl: 6 },
  url: "9284",
};

export const parentesco: IGenericControls = {
  type: "select",
  label: "Parentesco",
  gridValues: { xs: 12, lg: 6, md: 12, sm: 12, xl: 12 },
  name: "idparentesco",
  url: "9269",
};
//Falta  nomencaldro en BD
export const orientacionSexual: IGenericControls = {
  type: "select",
  label: "Orientación sexual",
  gridValues: { xs: 6, lg: 6, md: 6, sm: 6, xl: 6 },
  name: "idorientacionsex",
  url: "",

  // options: [
  //   { idconcepto: "opt1", denominacion: "Otro" },
  //   { idconcepto: "opt2", denominacion: "PND" },
  // ],
};

export const nivelDeEstudio: IGenericControls = {
  type: "multiselect",
  label: "¿Cuál es el nivel de estudio más alto que terminó?",
  gridValues: { md: 6 },
  name: "idnivelescolar",
  url: "9287",
};

export const gradoDeEstudio: IGenericControls = {
  type: "multiselect",
  label: "¿Cual es el grado de estudio más alto que aprobó?",
  gridValues: { md: 6 },
  name: "idgradovencido",
  persist: true,
  url: "9287",
};
//Busscar nomneclador falta en BD
export const grado: IGenericControls = {
  type: "select",
  label: "Grado",
  gridValues: { md: 6 },
  name: "idgradovencido",
  persist: true,
  url: "",
};

export const registroDeConsumidores: IGenericControls = {
  type: "select",
  label: "¿Usted es miembro de la libreta de productos alimenticios del hogar?",
  gridValues: { xs: 12, lg: 6, md: 12, sm: 12, xl: 12 },
  name: "registroconsum",
  options: [
    { idconcepto: "opt1", denominacion: "Si" },
    { idconcepto: "opt2", denominacion: "No" },
  ],
};

export const datosMoviles: IGenericControls = {
  type: "select",
  label: "¿Tiene plan de datos en el teléfono móvil?",
  gridValues: { xs: 12, lg: 6, md: 12, sm: 12, xl: 12 },
  name: "datosmoviles",
  options: [
    { idconcepto: "opt1", denominacion: "Si" },
    { idconcepto: "opt2", denominacion: "No" },
  ],
};

export const embarazada: IGenericControls = {
  type: "select",
  label: "Se encuentra embarazada",
  gridValues: { xs: 3, lg: 3, md: 3, sm: 3, xl: 3 },
  name: "estaembarazada",
  hidden: (values: any) => values.idsexo != "9285",
  options: [
    { idconcepto: "opt1", denominacion: "Si" },
    { idconcepto: "opt2", denominacion: "No" },
  ],
};

export const lactando: IGenericControls = {
  type: "select",
  label: "Se encuentra lactando",
  gridValues: { xs: 3, lg: 3, md: 3, sm: 3, xl: 3 },
  name: "lactando",
  options: [
    { idconcepto: "opt1", denominacion: "Si" },
    { idconcepto: "opt2", denominacion: "No" },
  ],
  hidden: (values: any) => values.idsexo != "9285",
};

export const madreantes: IGenericControls = {
  type: "select",
  label: "Fue madre antes de los 19",
  gridValues: { xs: 3, lg: 3, md: 3, sm: 3, xl: 3 },
  name: "madremenor19",
  options: [
    { idconcepto: "opt1", denominacion: "Si" },
    { idconcepto: "opt2", denominacion: "No" },
  ],
  hidden: (values: any) => values.idsexo != "9285",
};

export const cantidadHijos: IGenericControls = {
  type: "text",
  label: "Cantidad de hijos",
  pattern: /[0-9]/,
  gridValues: { xs: 3, lg: 3, md: 3, sm: 3, xl: 3 },
  name: "cantidadHijos",
  validations: {
    length: { value: 2, message: "Cantidad de Hijos" },
  },

  hidden: (values: any) => values.idsexo != "9285",
};

//Formulario 9

export const Codigo: IGenericControls = {
  type: "text",
  label: "Código ",
  name: "idcodigohogar",
};

export const Direccion1: IGenericControls = {
  type: "text",
  label: "Dirección",
  gridValues: { md: 3 },
  name: "direccion",
  validations: {
    regex: {
      value: /^[a-zA-Z0-9\s,.'-]{3,}$/,
      message: "Añade su Dirección Particular como la de su CI",
    },
  },
};

export const jefeDelHogar: IGenericControls = {
  type: "text",
  label: "Jefe del hogar ",
  name: "idparentesco",
};

export const cantidadDeMiembros: IGenericControls = {
  type: "text",
  label: "Cantidad de miembros",
  name: "idmiembro",
  pattern: /[0-9]/,
  validations: {
    length: { value: 2, message: "Cantidad de miembros en el hogar" },
  },
};

export const estado: IGenericControls = {
  type: "select",
  label: "Estado",
  gridValues: { md: 6 },
  name: "estado",
  options: [
    { idconcepto: "opt1", denominacion: "Creado" },
    { idconcepto: "opt2", denominacion: "Elaboración" },
    { idconcepto: "opt3", denominacion: "Caracterizado" },
  ],
};

// formulario 10

export const carnetdeIdentidad: IGenericControls = {
  type: "text",
  label: "Carnet de identidad",
  name: "cidentidad",
  pattern: /[0-9]/,
  validations: {
    length: {
      value: 11,
      message:
        "Complete el campo de Carné de Identidad como esta en su identificación",
    },
  },
};

export const nombreyApellido: IGenericControls = {
  type: "text",
  label: "Nombre y apellido",
  name: "pnombre",
  gridValues: { md: 6 },
};

export const jefeDeHogar: IGenericControls = {
  type: "text",
  label: "Jefe de hogar ",
  name: "idparentesco",
};

export const Parentezco: IGenericControls = {
  type: "select",
  label: "Parentesco",
  name: "parentezco",
  url: "9269",
};

export const colorDeLaPiel: IGenericControls = {
  type: "text",
  label: "Color de piel",
  name: "idcolorpiel",
};

export const nivelEstudio: IGenericControls = {
  type: "select",
  label: "¿Cuál es el nivel de estudio más alto que terminó?",
  gridValues: { md: 6 },
  name: "idnivelescolar",
  url: "9287",
};
export const gradoEstudio: IGenericControls = {
  type: "select",
  label: "¿Cual es el grado de estudio más alto que aprobó?",
  gridValues: { md: 6 },
  name: "idgradovencido",
  persist: true,
  url: "9287",
};

export const Grado: IGenericControls = {
  type: "text",
  label: "Grado",
  name: "idgradovencido",
  persist: true,
};

export const edad: IGenericControls = {
  type: "text",
  label: "Edad",
  name: "edad",
  pattern: /[]/,
  validations: { length: { value: 2, message: "Edad estimada en su CI" } },
};

export const regconsumidor: IGenericControls = {
  type: "text",
  label: "Registro del consumidor",
  name: "registroconsum",
};

// cable segun el id de hogar cargar los miembros

export const escojaMiembro: IGenericControls = {
  type: "select",
  label: "Miembro del hogar",
  name: "idmiembrohogar",
  options: [
    { idconcepto: "opt1", denominacion: "Alejandro Hernandez" },
    { idconcepto: "opt2", denominacion: "Alberto Rodriguez" },
    { idconcepto: "opt3", denominacion: "José Alejandro" },
  ],
  gridValues: { md: 12, lg: 12, sm: 12, xl: 12, xs: 12 },
};

export const enfermedadesCronicas: IGenericControls = {
  type: "radio",
  label: "¿Padece enfermedades crónicas?",
  name: "idmiembroenfcronica",
  defaultValue: "2",
  radios: [
    { idconcepto: "1", denominacion: "Si" },
    { idconcepto: "2", denominacion: "No" },
  ],
  hidden: (values: any) => values.idmiembro == 0,

  direction: "row",
  labelPlacement: "end",
  gridValues: { md: 12, lg: 12, sm: 12, xl: 12, xs: 12 },
};

// dat_miembrobeneficio / dat_miembroenfconicas //

export const patalogia: IGenericControls = {
  type: "select",
  name: "idtipoenfermedad",
  label: "Patalogía",
  url: "9793",
  gridValues: { md: 4, lg: 4, sm: 4, xl: 4, xs: 4 },
};

export const accedeMedicamentos: IGenericControls = {
  type: "select",
  name: "accede",
  label: "Accede a medicamentos",
  options: [
    { idconcepto: "1", denominacion: "Si" },
    { idconcepto: "2", denominacion: "No" },
  ],
  gridValues: { md: 4, lg: 4, sm: 4, xl: 4, xs: 4 },
};
export const viaDeAcceso: IGenericControls = {
  type: "multiselect",
  name: "idtipoviaacceso",
  label: "Vía de acceso",
  url: "9416",

  gridValues: { md: 4, lg: 4, sm: 4, xl: 4, xs: 4 },
};

//Formulario12

export const ecojaLaOpcion: IGenericControls = {
  type: "select",
  label: "Escoja la opción",
  name: "idsituacioneduc",
  options: [
    { idconcepto: "1", denominacion: "Exclusivo" },
    { idconcepto: "2", denominacion: "Común" },
  ],
  gridValues: { xs: 2, lg: 2, md: 2, sm: 2, xl: 2 },
  hidden: (values: any) => values.tienesanitario !== "1",
};

export const cantidad: IGenericControls = {
  type: "number",
  label: "Cantidad",
  name: "cantidad",
  format: "other",
  gridValues: { xs: 3, sm: 3, lg: 3, md: 3, xl: 3 },
};

//Formulario 13

export const intalacionDeAcueducto: IGenericControls = {
  type: "select",
  label: "Intalación por red de acueducto",
  name: "idserviciosvivienda",
  url: "9644",
};

export const frecuenciaDeAgua: IGenericControls = {
  type: "select",
  label: "Frecuencia del suminstro de agua",
  name: "idserviciosvivienda",
  url: "9644",
};

export const procedenciaDelAgua: IGenericControls = {
  type: "select",
  label: "Procedencia principal de agua",
  name: "idserviciosvivienda",
  url: "9644",
};

export const sistemaDeDesagüe: IGenericControls = {
  type: "select",
  label: "Sistema de desagüe",
  name: "idserviciosvivienda",
  url: "9644",
  options: [
    { idconcepto: "1", denominacion: "Red de alcantarillado" },
    { idconcepto: "2", denominacion: "Fosa o tanque séptico" },
    { idconcepto: "3", denominacion: "Otro" },
    { idconcepto: "4", denominacion: "No tiene" },
  ],
};

export const manejoDeDesechos: IGenericControls = {
  type: "multiselect",
  label: "Manejos de desechos",
  name: "idserviciosvivienda",
  url: "9644",
};

export const electricidad: IGenericControls = {
  type: "select",
  label: "Electricidad",
  name: "idserviciosvivienda",
  url: "9644",
};

//Formulario Otros Datos//

export const escojaMiembro2: IGenericControls = {
  type: "select",
  label: "Miembro del hogar",
  name: "idmiembrohogar",
  options: [
    { idconcepto: "opt1", denominacion: "Alejandro Hernandez" },
    { idconcepto: "opt2", denominacion: "Alberto Rodriguez" },
    { idconcepto: "opt3", denominacion: "José Alejandro" },
  ],
  gridValues: { xs: 2, lg: 2, md: 2, sm: 2, xl: 2 },
};

export const ayudaFamiliarAmigo: IGenericControls = {
  type: "check",
  label:
    "Si alguien en el hogar requiere apoyo con labores domésticas y de cuidado, por enfermedades u otra razón",
  name: "idtiposayudafamiliar",
  hidden: (values: any) => values.idmiembro == "",
  gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
};
export const ayudaFamiliarAmigo2: IGenericControls = {
  type: "check",
  label: "Ante un problema económico",
  name: "idtiposayudaeconomica",
  hidden: (values: any) => values.idmiembro == "",
  gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
};

export const Programasalimentarios: IGenericControls = {
  type: "multiselect",
  name: "idtiposayuda",
  label: "Programas alimentarios",

  url: "9610",
  hidden: (values: any) => values.idmiembro == "",
  gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
};

export const SituacionSocial: IGenericControls = {
  type: "multiselect",
  name: "idsituacionsocial",
  label: "Situación social",
  url: "9593",
  hidden: (values: any) => values.idmiembro == "",

  gridValues: { xs: 12, lg: 6, md: 6, sm: 6, xl: 6 },
};

//Buscar el nomenclador
export const Organismo: IGenericControls = {
  type: "multiselect",
  name: "idocupacion",
  label: "Organismo",

  gridValues: { xs: 12, lg: 6, md: 6, sm: 6, xl: 6 },
  url: "",
  hidden: (values: any) => values.idmiembro == "",
  options: [
    { idconcepto: "opt1", denominacion: "MINSAP" },
    { idconcepto: "opt2", denominacion: "FAR" },
    { idconcepto: "opt3", denominacion: "EDUCACIÓN" },
    { idconcepto: "opt4", denominacion: "MÉDICO" },
  ],
};

// Asociar a hogar existente

export const jefeDeHogar3: IGenericControls = {
  type: "select",
  label: "Miembro del hogar",
  name: "idmiembrohogar",
  options: [
    { idconcepto: "opt1", denominacion: "Alejandro Hernandez" },
    { idconcepto: "opt2", denominacion: "Alberto Rodriguez" },
    { idconcepto: "opt3", denominacion: "José Alejandro" },
  ],
};

export const Direccion3: IGenericControls = {
  type: "text",
  label: "Dirección",
  gridValues: { md: 3 },
  name: "direccion",
  validations: {
    regex: {
      value: /^[a-zA-Z0-9\s,.'-]{3,}$/,
      message: "Añade su Dirección Particular como la de su CI",
    },
  },
};

export const Codigo1: IGenericControls = {
  type: "text",
  label: "Código ",
  name: "idcodigohogar",
};

export const Direccion2: IGenericControls = {
  type: "text",
  label: "Dirección",
  gridValues: { md: 3 },
  name: "direccion",
  validations: {
    regex: {
      value: /^[a-zA-Z0-9\s,.'-]{3,}$/,
      message: "Añade su Dirección Particular como la de su CI",
    },
  },
};

export const jefeDelHogar1: IGenericControls = {
  type: "text",
  label: "Jefe del hogar ",
  name: "idparentesco",
};

// estado de carecterización

export const caracterizacion: IGenericControls = {
  type: "multiselect",
  name: "idcaracterizacion",
  label: "Estado de la caracterización",

  options: [
    { idconcepto: "opt1", denominacion: "Datos del hogar" },
    { idconcepto: "opt2", denominacion: "Datos de los miembros" },
    { idconcepto: "opt3", denominacion: "Ingresos" },
    { idconcepto: "opt4", denominacion: "Ocupación" },
    {
      idconcepto: "opt5",
      denominacion: "Miembros no vinculados al trabajo remunerado",
    },
    {
      idconcepto: "opt6",
      denominacion: "Grado de autonomía y necesidades especiales",
    },
    { idconcepto: "opt7", denominacion: "Enfermedades" },
    { idconcepto: "opt8", denominacion: "Usos de servicios de salud" },
    {
      idconcepto: "opt9",
      denominacion: "Acceso a programas de proteccion social y cuidados",
    },
    { idconcepto: "opt10", denominacion: "Otros datos" },
    {
      idconcepto: "opt11",
      denominacion: "Situación de niños y niñas y adolecentes (NNA)",
    },
    {
      idconcepto: "opt12",
      denominacion: "Materiales predominantes de la vivienda",
    },
    {
      idconcepto: "opt13",
      denominacion: "Afectaciones que presenta la vivienda",
    },
    { idconcepto: "opt14", denominacion: "Locales de la vivienda" },
    { idconcepto: "opt15", denominacion: "Servicios de la vivienda" },
    {
      idconcepto: "opt16",
      denominacion: "Mobiliario básico y equipos funcionando",
    },
    {
      idconcepto: "opt17",
      denominacion: "Vehículos y equipos de que dispone el hogar",
    },
    {
      idconcepto: "opt18",
      denominacion:
        "Seguridad alimentaria y estrategias de afrontamiento en el hogar",
    },
    { idconcepto: "opt19", denominacion: "Gastos" },
    { idconcepto: "opt20", denominacion: "Datos de la entrevista" },
  ],
};
