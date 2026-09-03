import AccesoProgramasProteccionSocialCuidados from "@/pages/AccesoProgramasProteccionSocialCuidados";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import Afectaciones from "@/pages/Afectaciones";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";
import Autonomía_y_Necesidades_Especiales from "@/pages/AutonomiayNecesidadesEspeciales";
import ConfiguracionDispositivo from "@/pages/Configuracion";
import DatosDeEntrevista from "@/pages/DatosDeEntrevista";
import Datos_del_Hogar from "@/pages/DatosHogar";
import Enfermedades from "@/pages/Enfermedades";
import Gastos from "@/pages/Gastos";
import HdrAutoIcon from "@mui/icons-material/HdrAuto";
import HomeIcon from "@mui/icons-material/Home";
import Ingresos from "@/pages/Ingresos";
import LocalesVivienda from "@/pages/LocalesVivienda";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import Materiales from "@/pages/Materiales";
import MobiliarioBasico from "@/pages/MobiliarioBasico";
//import NoVinculado from "@/pages/NoVinculado";
import Nomencladores from "@/pages/Nomencladores/Nomencladores";
import NucleoInfo from "@/pages/NucleoInfo";
import Ocupacion from "@/pages/Ocupacion";
import programasSsocial from "@/pages/ProgramasA_SituacionS";
import Otros_Datos from "@/pages/Otros_Datos";
import { Pages } from "./myPages.enum";
import { Routes } from "@/_pwa-framework/routes/types";
import SITUACIÓN_DE_NIÑOS_Y_NIÑAS_Y_ADOLESCENTES from "@/pages/SITUACIÓN_DE_NIÑOS_Y_NIÑAS_Y_ADOLESCENTES";
import SafetyCheckIcon from "@mui/icons-material/SafetyCheck";
import Seguridad_Alimentaria from "@/pages/Seguridad_Alimentaria";
import ServiciosVivienda from "@/pages/ServiciosVivienda";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import SubirDatos from "@/pages/SubirDatos";
import UsoServiciosSalud from "@/pages/UsoServiciosSalud";
import Usuario from "@/pages/Usuario";
import Vehiculos from "@/pages/Vehiculos";
import WcIcon from "@mui/icons-material/Wc";
import Welcome from "@/pages/Welcome";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import ZonasVulnerables from "@/pages/ZonasVulnerables";
import AyudaGuia from "@/pages/Ayuda";
import Soporte from "@/pages/Soporte";
import PeopleIcon from '@mui/icons-material/People';
import { IPWARoutes } from "faster-router-pwa";

const myRoutes:IPWARoutes  = {
  [Pages.Welcome]: {
    component: Welcome,
    path: "/",
  },
  [Pages.Usuario]: {
    component: Usuario,
    path: "/usuario",
    icon: SettingsRoundedIcon,
  },
  [Pages.Nomencladores]: {
    component: Nomencladores,
    path: "/nomencladores",
    icon: SettingsRoundedIcon,
  },
  [Pages.Configuracion]: {
    component: ConfiguracionDispositivo,
    path: "/Configuración",
    title: "Configuración",
    icon: SettingsRoundedIcon,
  },
  [Pages.DatosHogar]: {
    component: Datos_del_Hogar,
    path: "/datos-hogar",
    title: "Información general de la vivienda",
    icon: HomeIcon,
  },
  [Pages.DatosMiembrosNucleo]: {
    component: NucleoInfo,
    path: "/nucleo-info",
    title: "Información general de los miembros del hogar",
    icon: AutoStoriesRoundedIcon,
  },
  [Pages.Ingresos]: {
    component: Ingresos,
    path: "/ingresos",
    title: "Ingresos",
    icon: AttachMoneyIcon,
  },
  [Pages.Ocupación]: {
    component: Ocupacion,
    path: "/principal",
    title: "Ocupación",
    icon: WorkOutlineIcon,
  },
  // [Pages.Ocupación]: {
  //   path: "/ocupacion",
  //   title: "Ocupación",
  //   icon: WorkOutlineIcon,
  //   subPath: {
    
  //     [Pages.NoVinculado]: {
  //       component: NoVinculado,
  //       path: "/no-vinculado",
  //       title: "Miembros adultos no vinculados al trabajo remunerado",
  //       icon: WorkOutlineIcon,
  //     },
  //   },
  // },
  [Pages.AutonomíaNecesidadesEspeciales]: {
    path: "/autonomia",
    title: "Autonomía y necesidades especiales",
    icon: HdrAutoIcon,
    subPath: {
      [Pages.GradoAutonomia]: {
        component: Autonomía_y_Necesidades_Especiales,
        path: "/discapacidad",
        title: "Grado de autonomía y situación de discapacidad",
        icon: HdrAutoIcon,
      },
      [Pages.Enfermedades]: {
        component: Enfermedades,
        path: "/enfermedades",
        title: "Enfermedades",
        icon: HdrAutoIcon,
      },
      [Pages.UsoServiciosSalud]: {
        component: UsoServiciosSalud,
        path: "/servicios",
        title: "Uso de servicios de salud",
        icon: HdrAutoIcon,
      },
    },
  },
  [Pages.AccesoProgramasDeProtección]: {
    component: AccesoProgramasProteccionSocialCuidados,
    path: "/proteccion",
    title: "Acceso a programas de protección social y cuidados",
    icon: SafetyCheckIcon,
  },
  [Pages.SituacionNiñosAdolecentes]: {
    component: SITUACIÓN_DE_NIÑOS_Y_NIÑAS_Y_ADOLESCENTES,
    path: "/adolecentes",
    title: "Situación de niños, niñas y adolescentes",
    icon: WcIcon,
  },
  [Pages.ServiciosEquipamiento]: {
    path: "/servicios-equipamientos",
    title:
      "Condiciones de la vivienda, acceso a servicios y equipamiento del hogar",
    icon: MapsHomeWorkIcon,
    subPath: {
      [Pages.MaterialesPredominantes]: {
        component: Materiales,
        path: "/materiales",
        title: "Materiales predominantes de la vivienda",
        icon: MapsHomeWorkIcon,
      },
      [Pages.AfectacionesVivienda]: {
        component: Afectaciones,
        path: "/afectaciones",
        title: "Afectaciones que presenta la vivienda",
        icon: MapsHomeWorkIcon,
      },
      [Pages.LocalesVivienda]: {
        component: LocalesVivienda,
        path: "/locales",
        title: "Locales de la vivienda",
        icon: MapsHomeWorkIcon,
      },
      [Pages.ServiciosVivienda]: {
        component: ServiciosVivienda,
        path: "/servicios",
        title: "Servicios de la vivienda",
        icon: MapsHomeWorkIcon,
      },
      [Pages.MobiliarioBasico]: {
        component: MobiliarioBasico,
        path: "/mobiliario",
        title: "Mobiliario básico y equipos funcionando",
        icon: MapsHomeWorkIcon,
      },
      [Pages.Vehiculos]: {
        component: Vehiculos,
        path: "/vehiculos",
        title: "Vehículos de que dispone el hogar",
        icon: MapsHomeWorkIcon,
      },
    },
  },

  [Pages.SeguridadAlimentariaEstrategias]: {
    path: "/estrategia",
    title: "Seguridad alimentaria y estrategias de afrontamiento en el hogar",
    icon: AdminPanelSettingsIcon,
    subPath: {
      [Pages.Gastos]: {
        component: Gastos,
        path: "/gastos",
        title: "Gastos mensuales del hogar",
        icon: AdminPanelSettingsIcon,
      },
      [Pages.SeguridadAlimentaria]: {
        component: Seguridad_Alimentaria,
        path: "/alimentos",
        title: "Grupos de alimentos y estrategias de afrontamiento en el hogar",
        icon: AdminPanelSettingsIcon,
      },
      [Pages.OtrosDatos]: {
        component: Otros_Datos,
        path: "/otros",
        title:
          "Estrategias de solución de problemas y redes de apoyo",
        icon: AdminPanelSettingsIcon,
      },
      [Pages.ProgramasA_SituacionS]: {
        component: programasSsocial,
        path: "/programas_situacion_social",
        title: "Programas alimentario y situación social",
        icon: AdminPanelSettingsIcon,
      },
    },
  },
  [Pages.DatosEntrevista]: {
    component: DatosDeEntrevista,
    path: "/datos",
    title: "Datos de la entrevista",
    icon: AssignmentIcon,
  },
  [Pages.SubirDatos]: {
    component: SubirDatos,
    path: "/subirdatos",
    icon: SettingsRoundedIcon,
  },
  [Pages.ZonasVulnerables]: {
    component: ZonasVulnerables,
    path: "/zonas-vulnerables",
    icon: SettingsRoundedIcon,
  }, [Pages.Ayuda]: {
    component: AyudaGuia,
    path: "/ayuda",
  },
  [Pages.Soporte]: {
    component: Soporte,
    path: "/Soporte",
    
    icon: SettingsRoundedIcon,
  },
};

export default myRoutes;
