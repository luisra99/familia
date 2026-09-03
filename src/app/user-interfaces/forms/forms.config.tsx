import {
  Actividad,
  ApoyoLaboresDomesticas,
  Causas,
  CausasRemuneracion,
  Cual,
  Delincuencia,
  Discapacidad,
  Disponibilidad,
  EmbarazoAdolescente,
  EscogerOpcion,
  EstrategiasAlimentarias,
  FrecuenciaSuministro,
  FuentedeElectricidad,
  FuentedeProcedencia,
  HD,
  HEA,
  HED,
  HijoM,
  Ingresos,
  InstalacionRedAcueducto,
  MPA,
  MPD,
  MadreAdolescente,
  ManejoDesechos,
  Moneda,
  Monto,
  MontoMensual,
  MotivoDesicion,
  ND,
  NietoMenor,
  Ocupacion,
  Otros,
  PresentaDiscapacidad,
  ProblemaEconomico,
  ProcedenciaPrincipalAgua,
  SeEncuentra,
  ServicioInternet,
  SistemaDesague,
  SituacionDelictiva,
  SituacionEducativa,
  SuegroA,
  SuegroD,
  Ultimomeses,
  alimentacion,
  autorizacion,
  cantidadHoras,
  denominacion,
  escojaElMiembro,
  escojaElMiembro2,
  escojaLaOpción1,
  escojaLaOpción2,
  escojaMiembro4,
  escojaopcion,
  horarios,
  medicamentos5,
  otrasRazones,
  situacionNNA,
  tipo,
} from "../controls/controls.config.eviel";
import {
  Beneficios,
  CI,
  CarnetdeIdentidad,
  Codigo,
  Codigo1,
  Combustible,
  Direccion1,
  Direccion2,
  Direccion3,
  Discapacidad as Discap,
  Edad,
  Enfermedades,
  EscanerCI,
  FotoCi,
  Grado,
  GradoDeautonomia,
  LocalparaCocinar,
  Miembro,
  Nombre,
  NombredelaMadre,
  NucleoFamiliar,
  Observaciones,
  Organismo,
  Parentezco,
  PiezasdeTipoDormitorio,
  PiezasexclusivadeTipoDormitorio,
  PrimerApellido,
  Programasalimentarios,
  Sanitario,
  SegundoApellido,
  SegundoNombre,
  Sexo,
  SituacionLegal,
  SituacionSocial,
  TiposdeAyuda,
  accedeMedicamentos,
  ayudaFamiliarAmigo,
  ayudaFamiliarAmigo2,
  cantidad,
  cantidadDeMiembros,
  cantidadHijos,
  caracterizacion,
  carnetdeIdentidad,
  centroDeSalud,
  cocina,
  colorDeLaPiel,
  colorDePiel,
  considerograve,
  datosMoviles,
  dineroparaTransporte,
  ecojaLaOpcion,
  edad,
  electricidad,
  embarazada,
  enfermedadesCronicas,
  entrevistafecha,
  escojaMiembro,
  escojaMiembro2,
  estado,
  frecuenciaDeAgua,
  fueAtendido,
  gradoEstudio,
  horafinal,
  horainicial,
  intalacionDeAcueducto,
  jefeDeHogar,
  jefeDeHogar3,
  jefeDelHogar,
  jefeDelHogar1,
  lactando,
  lugarDeAtencion,
  madreantes,
  manejoDeDesechos,
  medicoEnfermera,
  medioTransporte,
  nivelDeEstudio,
  nivelEstudio,
  nombre,
  nombreyApellido,
  orientacionSexual,
  otrosMotivos,
  parentesco,
  patalogia,
  primerApellido,
  problemasdeSalud,
  procedenciaDelAgua,
  recursoNecesario,
  regconsumidor,
  registroDeConsumidores,
  seEncunetra,
  segundoApellido,
  segundoNombre,
  sistemaDeDesagüe,
  viaDeAcceso,
} from "../controls/controls.config.ponzoa";
import { Divider, Typography } from "@mui/material";

import { IGenericControls } from "@/_pwa-framework/genforms/types/controls/controls.types";
import TableView from "@/_pwa-framework/user-solicitudes/view";

//Formulario1 DB
export const Formulario1: IGenericControls[] = [
  GradoDeautonomia,
  TiposdeAyuda,
  Discap,
];
export const SelectMiembro: IGenericControls[] = [Miembro];

export const Formulario2: IGenericControls[] = [SituacionSocial];

// dat_unidaddealojamiento //

export const formulario4: IGenericControls[] = [
  NucleoFamiliar,
  Nombre,
  PrimerApellido,
  SegundoApellido,
  SegundoNombre,
  NombredelaMadre,
  CarnetdeIdentidad,
];

// dat_afectacionmatvivienda      *idsituacionlegal********
export const formulario5: IGenericControls[] = [SituacionLegal];

export const FormularioEviel1: IGenericControls[] = [
  // Aditamentos,
  Disponibilidad,
];

// dat_miembrogradodeautonomia / dat_tiposdeayuda /dat_miembrodiscapacidad / dat_miembroAditamentos //
export const FormularioEviel: IGenericControls[] = [
  //escojaElMiembro3,
  GradoDeautonomia,
  {
    type: "component",
    hidden: (values: any) =>
      values.idmiembro == "" || values.idautonomia != "9371",
    component: () => (
      <Typography>
        <b>Nota aclaratoria:</b> En el caso de niños y niñas se registran en "se
        vale solo" a menos que exista una discapacidad que impida las
        actividades propias del cilo de vida
      </Typography>
    ),
    label: "",
    name: "",
    gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
  },
  TiposdeAyuda,
  {
    type: "component",
    hidden: (values: any) =>
      values.idmiembro == "" || values.idautonomia != "9371",
    component: () => (
      <Typography>
        <b>
          Nota aclaratoria:
          <br />{" "}
        </b>{" "}
        <b>ABVD:</b> Se refiere a bañarse, vestirse, comer, usar el servicio
        sanitario y moverse dentro del hogar
        <br />
        <b>AIVD:</b>
        Se refiere a preparar y calentar los alimentos, manejar dinero, visitar
        al médico, tomar sus medicamentos, llamar por teléfono, hacer compras, y
        otros quehaceres. Una misma persona puede necesitar ambos tipos de
        ayuda.
      </Typography>
    ),
    label: "",
    name: "",
    gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
  },
  PresentaDiscapacidad,
  Discapacidad,
];

// dat_nvinculacionmiembro  y   dat_remuneraciones //
export const FormMiembrosAdults: IGenericControls[] = [
  //escojaElMiembro5,
  SeEncuentra,
  CausasRemuneracion,
  MotivoDesicion,
  MPD,
  MPA,
  HD,
  HijoM,
  ND,
  NietoMenor,
  SuegroD,
  SuegroA,
  HED,
  HEA,
  Otros,
  EscogerOpcion,
];

export const FormularioAdicion: IGenericControls[] = [
  MontoMensual,
  Moneda,
  FuentedeProcedencia,
  Cual,
];

export const FormularioSeguridadAlimentaria: IGenericControls[] = [
  ProblemaEconomico,
  ApoyoLaboresDomesticas,
  EstrategiasAlimentarias,
];

export const FormularioAdicionarServicios: IGenericControls[] = [
  InstalacionRedAcueducto,
  FrecuenciaSuministro,
  ProcedenciaPrincipalAgua,
  SistemaDesague,
  ManejoDesechos,
  FuentedeElectricidad,
  ServicioInternet,
];

export const FormularioOcupacion2: IGenericControls[] = [Ocupacion];
// dat_miembroocupacion //
export const FormularioOcupacion: IGenericControls[] = [Ultimomeses];

export const FormularioIUSituacion: IGenericControls[] = [
  SituacionEducativa,
  Causas,
  EmbarazoAdolescente,
  MadreAdolescente,
  SituacionDelictiva,
  Delincuencia,
];

// dat_miembrosfuentesingreso //
export const FormIngresos: IGenericControls[] = [escojaElMiembro2, Ingresos];

export const FormIngresos2: IGenericControls[] = [
  Moneda,
  Monto,
  FuentedeProcedencia,
  Cual,
];

// dat_situacnnaj / dat_causadesvnnaj / dat_nnaocupacion /dat_nnasitdelictiva

export const FormNiñasNiños: IGenericControls[] = [
  escojaElMiembro,
  SituacionEducativa,
  escojaLaOpción1,
  escojaLaOpción2,
  {
    type: "component",
    component: () => (
      <Typography>
        <b>Nota aclaratoria:</b>El programa educa a tu hijo es lo que se conoce
        como "vias no formales".
      </Typography>
    ),
    label: "",
    name: "",
    gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
  },
  {
    type: "component",
    component: () => <Divider sx={{ my: 1 }} />,
    label: "",
    name: "",
    gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
  },
  Causas,
  otrasRazones,
  {
    type: "component",
    component: () => <Divider sx={{ my: 1 }} />,
    label: "",
    name: "",
    gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
  },
  {
    type: "component",
    component: () => (
      <TableView
        values={[]}
        headers={[
          { name: "pat", label: "Actividad" },
          { name: "12", label: "Cantidad de horas" },
          { name: "d22", label: "Horarios" },
          { name: "2wd", label: "Autorización del MTSS" },
        ]}
        idKey="idcodigohogar"
        title="Ocupación"
        multiSelect={true}
        dataActions={[
          { label: "Adicionar", action: () => console.log("accion") },
        ]}
        rowActions={[
          {
            label: "Exportar fila",
            action: (values: any) => console.log(values),
          },
        ]}
      />
    ),
    label: "",
    name: "",
    gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
  },
  {
    type: "component",
    component: () => (
      <Typography>
        <b>Nota aclaratoria:</b>Esta información no se pregunta se completa con
        información previa".
      </Typography>
    ),
    label: "",
    name: "",
    gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
  },
  {
    type: "component",
    component: () => <Divider sx={{ m: 2 }} />,
    label: "",
    name: "",
    gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
  },
  {
    type: "component",
    component: () => (
      <Typography>
        Situación de NNA que cometen hechos que la ley tipifíca como delito, con
        comportamiento social inadecuado y/o víctimas de violencia.
      </Typography>
    ),
    label: "",
    name: "",
    gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
  },
  situacionNNA,
];

// dat_caracterizacion //
export const formulario6: IGenericControls[] = [
  //  NombreyApellido,
  entrevistafecha,
  horainicial,
  horafinal,
  Observaciones,
];

// dat_miembroencuesta / dat_motivonoatencion //
export const formulario7: IGenericControls[] = [
  {
    type: "component",
    component: () => (
      <Typography mt={"12px"}>
        En los últimos 30 días algún miembro del hogar ha presentado algún
        problema de salud
      </Typography>
    ),
    label: "",
    name: "",
    gridValues: { xs: 12, lg: 7, md: 6, sm: 6, xl: 6 },
    //hidden: (values:any) => values.atendido != "opt2",
  },
  problemasdeSalud,
  // escojaMiembro1,
  {
    type: "component",
    component: () => <Typography mt={"12px"}>Fue atendido</Typography>,
    label: "",
    name: "",
    gridValues: { xs: 12, lg: 7, md: 6, sm: 6, xl: 6 },
    //hidden: (values:any) => values.atendido != "opt2",
  },
  fueAtendido,
  {
    type: "component",
    component: () => (
      <Typography mt={"12px"}>El lugar de atención está lejos</Typography>
    ),
    label: "",
    name: "",
    gridValues: { xs: 12, lg: 7, md: 6, sm: 6, xl: 6 },
    //hidden: (values:any) => values.atendido != "opt2",
  },
  lugarDeAtencion,
  {
    type: "component",
    component: () => (
      <Typography mt={"12px"}>
        Falta de dinero para el transporte hacia el centro de salud
      </Typography>
    ),
    label: "",
    name: "",
    gridValues: { xs: 12, lg: 7, md: 6, sm: 6, xl: 6 },
    //hidden: (values:any) => values.atendido != "opt2",
  },
  dineroparaTransporte,
  {
    type: "component",
    component: () => (
      <Typography mt={"12px"}>No había medio de transporte</Typography>
    ),
    label: "",
    name: "",
    gridValues: { xs: 12, lg: 7, md: 6, sm: 6, xl: 6 },
    //hidden: (values:any) => values.atendido != "opt2",
  },
  medioTransporte,
  {
    type: "component",
    component: () => (
      <Typography mt={"12px"}>No había un médico o enfermero/a</Typography>
    ),
    label: "",
    name: "",
    gridValues: { xs: 12, lg: 7, md: 6, sm: 6, xl: 6 },
    // hidden: (values:any) => values.atendido != "opt2",
  },
  medicoEnfermera,
  {
    type: "component",
    component: () => (
      <Typography mt={"12px"}>
        Demasiado tiempo de espera en el centro de salud
      </Typography>
    ),
    label: "",
    name: "",
    gridValues: { xs: 12, lg: 7, md: 6, sm: 6, xl: 6 },
    //hidden: (values:any) => values.atendido != "opt2",
  },
  centroDeSalud,
  {
    type: "component",
    component: () => (
      <Typography mt={"12px"}>
        Falta del medicamento o recurso necesario
      </Typography>
    ),
    label: "",
    name: "",
    gridValues: { xs: 12, lg: 7, md: 6, sm: 6, xl: 6 },
    //hidden: (values:any) => values.atendido != "opt2",
  },
  recursoNecesario,
  {
    type: "component",
    component: () => (
      <Typography mt={"12px"}>No lo considero grave o necesario</Typography>
    ),
    label: "",
    name: "",
    gridValues: { xs: 12, lg: 7, md: 6, sm: 6, xl: 6 },
    // hidden: (values:any) => values.atendido != "opt2",
  },
  considerograve,
  {
    type: "component",
    component: () => <Typography mt={"12px"}>Otros Motivos</Typography>,
    label: "",
    name: "",
    gridValues: { xs: 12, lg: 7, md: 6, sm: 6, xl: 6 },
    //hidden: (values:any) => values.atendido != "opt2",
  },
  otrosMotivos,
];

// dat_miembrohogar //

export const modificarMiembrosDelNucleoFamiliar: IGenericControls[] = [
  nombre,
  segundoNombre,
  primerApellido,
  segundoApellido,
  CI,
  Edad,
  colorDePiel,
  Sexo,
  EscanerCI,
  FotoCi,
  {
    type: "component",
    component: () => <Typography mt={"12px"}>Datos de escolaridad</Typography>,
    label: "",
    name: "",
    gridValues: { xs: 12, lg: 7, md: 6, sm: 6, xl: 7 },
  },
  {
    type: "component",
    component: () => <Divider sx={{ mt: 0, mb: 1 }} />,
    label: "",
    name: "",
    gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
  },
  nivelDeEstudio,
  // gradoDeEstudio1,
  // gradoDeEstudio2,
  // gradoDeEstudio3,
  // gradoDeEstudio4,
  // gradoDeEstudio5,
  // gradoDeEstudio6,
  // gradoDeEstudio7,
  // gradoDeEstudio8,
  // gradoPrimaria,
  //  gradoSecundaria,
  //  gradoObreroCalificado,
  //  gradoPreuniversitario,
  //  gradoPedagogiaNivelMedio,
  //  gradoTecnicoMedio,
  //  gradoUniversitario,

  {
    type: "component",
    component: () => <Typography mt={"12px"}>Otros datos</Typography>,
    label: "",
    name: "",
    gridValues: { xs: 12, lg: 7, md: 6, sm: 6, xl: 7 },
  },
  {
    type: "component",
    component: () => <Divider sx={{ mt: 0, mb: 1 }} />,
    label: "",
    name: "",
    gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
  },
  {
    type: "component",
    component: () => (
      <Typography mt={"12px"}>
        <b>Nota aclaratoria:</b> El parentesco se establece con relación al{" "}
        <br /> jefe o la jefa de hogar
      </Typography>
    ),
    label: "",
    name: "",
    gridValues: { xs: 12, lg: 6, md: 6, sm: 6, xl: 7 },
  },
  parentesco,

  {
    type: "component",
    component: () => (
      <Typography mt={"12px"}>
        <b>Nota aclaratoria:</b> Si al preguntar el sexo la persona no responde
        femenino o masculino selecciona la opción correspondiente{" "}
      </Typography>
    ),
    label: "",
    name: "",
    gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
  },
  Sexo,
  orientacionSexual,

  registroDeConsumidores,
  datosMoviles,
  embarazada,
  lactando,
  madreantes,
  cantidadHijos,
];

export const GestionarDatosDelHogar: IGenericControls[] = [
  Codigo,
  Direccion1,
  jefeDelHogar,
  cantidadDeMiembros,
  estado,
];

export const GestionarDatosDeLosMiembrosDelHogar: IGenericControls[] = [
  carnetdeIdentidad,
  nombreyApellido,
  jefeDeHogar,
  Parentezco,
  colorDeLaPiel,
  nivelEstudio,
  gradoEstudio,
  Grado,
  edad,
  Sexo,
  regconsumidor,
];

export const enfermedades: IGenericControls[] = [
  escojaMiembro,
  {
    type: "component",
    component: () => <Divider sx={{ mt: 0, mb: 1 }} />,
    label: "",
    name: "",
    gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
  },
  enfermedadesCronicas,
  Enfermedades,
  Beneficios,
];

// dat_miembrobeneficio / dat_miembroenfconicas //
export const AdicionarEnfermedadesCronicas: IGenericControls[] = [
  patalogia,
  accedeMedicamentos,
  viaDeAcceso,
];

// dat_localesvivienda / dat_ubicacionlocales

export const localesDeLaVivienda: IGenericControls[] = [
  PiezasdeTipoDormitorio,
  PiezasexclusivadeTipoDormitorio,
  cocina,
  LocalparaCocinar,
  Combustible,
  Sanitario,
  ecojaLaOpcion,
  cantidad,
  // Serviciossanitario,
  seEncunetra,
];

//dat_serviciosvivienda

export const serviciosDeLaVivienda: IGenericControls[] = [
  intalacionDeAcueducto,
  frecuenciaDeAgua,
  procedenciaDelAgua,
  sistemaDeDesagüe,
  manejoDeDesechos,
  electricidad,
];

// dat_miembrosituacionsocial / dat_miembrobeneficioprogalim / dat_miembroestrategias
export const OtrosDatos: IGenericControls[] = [
  escojaMiembro2,
  {
    type: "component",
    component: () => (
      <Typography>
        Estrategias de solución de problemas que afectan al hogar
      </Typography>
    ),
    label: "",
    name: "",
    gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
  },
  {
    type: "component",
    component: () => (
      <Typography marginTop={2}>
        Marca la(s) estrategias que utiliza para darle solución de problemas que
        afectan al hogar
      </Typography>
    ),
    label: "",
    name: "",
    gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
  },
  {
    type: "component",
    component: () => (
      <Typography>
        <b>Nota aclaratoria:</b>Se pregunta si en los últimos 6 meses, se vió en
        la necesidad de hacer alguna de estas activiadades debido a que no había
        suficiente dinero para comprar alimentos o satisfacer otras necesidades
        básicas.
      </Typography>
    ),
    label: "",
    name: "",
    gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
  },
  {
    type: "component",
    component: () => (
      <TableView
        values={[
          {
            pat: "Miembros adultos que no trabajan hacen trabajos ocasionales para ganar algún dinero",
          },
          {
            pat: "Miembros adultos que no trabajan encontraron empleo fijo",
          },
        ]}
        headers={[{ name: "pat", label: "Estrategias" }]}
        idKey="idcodigohogar"
        multiSelect={true}
      />
    ),
    label: "",
    name: "",
    gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
  },

  {
    type: "component",
    component: () => <Typography mt={3}>Redes de apoyo del hogar</Typography>,
    label: "",
    name: "",
    gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
  },
  {
    type: "component",
    component: () => <Divider sx={{ mt: 0, mb: 1 }} />,
    label: "",
    name: "",
    gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
  },
  {
    type: "component",
    component: () => (
      <Typography>
        Tiene a quien pedir ayuda ( a un familiar y/o amigo fuera del hogar)
      </Typography>
    ),
    label: "",
    name: "",
    gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
  },
  ayudaFamiliarAmigo,
  ayudaFamiliarAmigo2,
  {
    type: "component",
    component: () => <Divider sx={{ mb: 2 }} />,
    label: "",
    name: "",
    gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
  },
  Programasalimentarios,
  {
    type: "component",
    component: () => <Divider sx={{ mt: 2 }} />,
    label: "",
    name: "",
    gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
  },
  {
    type: "component",
    component: () => <Typography mt={3}>Situación social</Typography>,
    label: "",
    name: "",
    gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
  },
  {
    type: "component",
    component: () => <Divider sx={{ mt: 0, mb: 1 }} />,
    label: "",
    name: "",
    gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
  },
  {
    type: "component",
    component: () => (
      <Typography sx={{ mb: 2 }}>
        <b>Nota aclaratoria:</b>La información de la situación social no se
        pregunta, se completa a partir de registros oficiales precedentes, con
        apoyo de TS.
      </Typography>
    ),
    label: "",
    name: "",
    gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
  },

  SituacionSocial,
  Organismo,
];

// polprogsoc / dat_estadonoacceso //

export const proteccionSocial: IGenericControls[] = [escojaMiembro4];

// dat_hogardiversidadalimentaria //
export const seguridadAlimentariaEnElHogar: IGenericControls[] = [
  Programasalimentarios,
];

export const asociarHogarExistente: IGenericControls[] = [
  jefeDeHogar3,
  Direccion3,
  Codigo1,
  Direccion2,
  jefeDelHogar1,
];

export const adicionarModificar: IGenericControls[] = [
  Actividad,
  cantidadHoras,
  horarios,
  autorizacion,
];

// dat_hogarmobiliarioequipo //

export const adicionarModificarvehiculos: IGenericControls[] = [
  tipo,
  denominacion,
  escojaopcion,
  cantidad,
];

//hogargastos //

export const gastosmensualesdelhogar: IGenericControls[] = [
  alimentacion,
  medicamentos5,
];

export const estadoCaracterizacion: IGenericControls[] = [caracterizacion];

export { caracterizacion };
