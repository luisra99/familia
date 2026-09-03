import { getHogar } from "@/app/hogarController/hogar.controller";
import {
  modificar,
  obtenerDatosPorLlave,
} from "@/app/user-interfaces/forms/models/controllers";
import { obtenerMiembros } from "@/app/user-interfaces/forms/models/controllers.miembrohogar";
import { datico } from "@/app/user-interfaces/forms/models/model";
import { tieneDiscapacidad } from "@/pages/AutonomiayNecesidadesEspeciales/helpers";
import { miembrosConEnfermedades } from "@/pages/Enfermedades/utils";
import { tieneIngresos } from "@/pages/Ingresos/Ingresos";
import { tieneOcupacion } from "@/pages/Ocupacion/utils";
import { tieneDatos } from "@/pages/Otros_Datos/Otros_Datos";
import { obtenerServiciosVivienda } from "@/pages/ServiciosVivienda/helpers";

export const autonomiaNecesidadesEspeciales = async () => {
  const miembros = await obtenerMiembros();
  const checkDiscapacidad = await tieneDiscapacidad(miembros);
  const miembrosCheck = checkDiscapacidad.includes(",")
    ? checkDiscapacidad?.split?.(",")?.length
    : checkDiscapacidad.length > 0
      ? 1
      : 0;
  return miembros?.length !== miembrosCheck;
};

export const AccesoProgramasProteccionSocialCuidados = async () => {
  const miembros = await obtenerMiembros();
  const result = await Promise.all(
    miembros.map(async (obj: any) => {
      const uso = await datico.dat_polprogsoc
        .where({ idmiembrohogar: obj.idconcepto.toString() })
        .count();
      if (uso > 0) {
        return obj.idconcepto;
      } else {
        return 0;
      }
    })
  );
  const checked = result.filter((item: any) => item != 0).toString();
  return miembros?.length !== checked?.split?.(",")?.length;
};

export const Ingresos = async () => {
  const miembros = await obtenerMiembros();
  const ingresos: any = await tieneIngresos(miembros);
  return miembros?.length == ingresos?.length;
};

export const Enfermedades = async () => {
  const miembros = await obtenerMiembros();
  const miembrosConDatos = await miembrosConEnfermedades(miembros);
  const miembrosCheckEnfermedad = miembrosConDatos
    .filter((item) => !!item)
    .join(",");
  const miembrosCheck = miembrosCheckEnfermedad.includes(",")
    ? miembrosCheckEnfermedad?.split?.(",")?.length
    : miembrosCheckEnfermedad.length > 0
      ? 1
      : 0;
  return miembros?.length !== miembrosCheck;
};

export const NoVinculado = async () => {
  const data: any = await obtenerMiembros();
  const miembros = data?.filter((persona: any) => {
    return miembros?.some((ocupacion: any) => {
      return (
        persona.idconcepto === parseInt(ocupacion.idmiembrohogar[0]) &&
        (ocupacion?.idtipoocupacion?.includes(9350) ||
          ocupacion?.idtipoocupacion?.includes(9344) ||
          ocupacion?.idtipoocupacion?.includes(9346) ||
          ocupacion?.idtipoocupacion?.includes("9329"))
      );
    });
  });
  const checkDiscapacidad = await tieneDiscapacidad(data);
  return checkDiscapacidad.length != miembros.length;
};

export const Ocupacion = async () => {
  const data = await obtenerMiembros();
  const miembros = data.filter((item) => item.edad > 15);
  const checkocupaciones = await tieneOcupacion(miembros);
  const data_ocupacion = await datico.dat_miembroocupacion.toArray();
  const filterdata = data?.filter((ele) => {
    return data_ocupacion?.some((ocupacion: any) => {
      return (
        ele.idconcepto === parseInt(ocupacion.idmiembrohogar[0]) &&
        (ocupacion?.idtipoocupacion?.includes("9329") ||
          ocupacion?.idtipoocupacion?.includes(9344) ||
          ocupacion?.idtipoocupacion?.includes(9346))
      );
    });
  });
  return checkocupaciones.length != miembros.length;
};

export const Otros_Datos = async () => {
  const data = await obtenerMiembros();
  const usito: any = await tieneDatos(data);
  const miembrosCheck = usito.includes(",")
    ? usito?.split?.(",")?.length
    : usito.length > 0
      ? 1
      : 0;
  return data?.length !== miembrosCheck;
};

export const SITUACIÓN_DE_NIÑOS_Y_NIÑAS_Y_ADOLESCENTES = async () => {
  const data = await obtenerMiembros();
  const miembros = data.filter((item) => item.edad < 18);
  const miembrosConDatos = await tieneDatos(miembros);
  const miembrosCheck = miembrosConDatos.includes(",")
    ? miembrosConDatos?.split?.(",")?.length
    : miembrosConDatos.length > 0
      ? 1
      : 0;
  return miembros?.length !== miembrosCheck;
};
export const materialesPredominantes = async () => {
  const datos: any = await obtenerDatosPorLlave(
    "dat_afectacionmatvivienda",
    "idcodigohogar",
    getHogar()
  );
  return !datos?.length;
};

export const localesDeLaVivienda = async () => {
  const datos: any = await obtenerDatosPorLlave(
    "dat_afectacionmatvivienda",
    "idcodigohogar",
    getHogar()
  );
  return !datos?.length;
};

export const servicios = async () => {
  const datos: any = await obtenerServiciosVivienda(getHogar() ?? "");
  return !datos?.iddesague?.length;
};

export const mobiliario = async () => {
  const datos: any = await obtenerDatosPorLlave(
    "dat_hogarmobiliarioequipos",
    "idhogarmobiliario",
    getHogar()
  );
  return !datos?.length;
};

export const finalizarHogar = () => {
  modificar("dat_hogar", "idcodigohogar", Number(getHogar()), { idestado: 2 });
};
