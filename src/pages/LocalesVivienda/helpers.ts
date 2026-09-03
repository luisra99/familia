import { datico } from "@/app/user-interfaces/forms/models/model";
import { obtenerDatosPorLlave } from "@/app/user-interfaces/forms/models/controllers";

export const obtenerLocalesViviendas = async (id: string) => {
  const datos_locales = await obtenerDatosPorLlave(
    "dat_localesvivienda",
    "idcodigohogar",
    id
  );

  const dat_ubicacionlocales = await obtenerUbicacionlocales(datos_locales);
  const dat_ubicacion = await obtenerUbicacionsanitaria(datos_locales);
 // console.log("ubicacionnnn", dat_ubicacion);
  const lolo = datos_locales?.length
    ? {
        cantudormir: datos_locales?.[0]?.cantudormir, //ya
        cantedormir: datos_locales?.[0]?.cantedormir, // ya
        tipousococina: datos_locales?.[0]?.tipousococina, //
        cantidadcocina: datos_locales?.[0]?.cantidadcocina, //ya
        idtipoubicacion: dat_ubicacionlocales?.[0]?.idtipoubicacion,
        idcombustible: datos_locales?.[0]?.idcombustible,
        tienesanitario: datos_locales?.[0]?.tienesanitario,
        idtipousoservicio: datos_locales?.[0]?.idtipousoservicio,
        cantidad: datos_locales?.[0]?.cantidadsanitario,
        inodoro:
          dat_ubicacion?.filter(
            (elemento: any) => elemento.idtiposanitario === "10221"
          )?.[0]?.idubicacion ?? [],
        letrina:
          dat_ubicacion?.filter(
            (elemento: any) => elemento.idtiposanitario === "10222"
          )?.[0]?.idubicacion ?? [],
        idcodigohogar: [id], //ya
        editMode: true,
      }
    : {
        cantudormir: "", //ya
        cantedormir: "", // ya
        tipousococina: "", //
        cantidadcocina: "", //ya
        idtipoubicacion: [], //ya
        idcombustible: [], //ya
        tienesanitario: "", //
        idtipousoservicio: [], //
        cantidad: "", //ya
        inodoro: [], //
        letrina: [], //
        idcodigohogar: [id], //ya
        editMode: false,
      };

  return lolo;
};
export const obtenerUbicacionsanitaria = async (locales: any) => {
  let dat_ubicacion: any;
  locales.length
    ? (dat_ubicacion = await datico.dat_ubicacionsanitaria
        .where({ idlocalesvivienda: locales[0]?.idlocalesvivienda })
        .toArray())
    : [];
  // console.log("dat_ubicacion", dat_ubicacion);
  return dat_ubicacion;
};
export const obtenerUbicacionlocales = async (locales: any) => {
  let dat_ubicacion: any;
  locales.length
    ? (dat_ubicacion = await datico.dat_ubicacionlocales
        .where({ idlocalesvivienda: locales[0]?.idlocalesvivienda })
        .toArray())
    : [];

  return dat_ubicacion;
};

export const obtenerMotivoNoAtencion = async (id: number, motivo: any) => {
  const dat_motivos = await datico.dat_motivonoatencion
    .where({ idmotivo: motivo.idconcepto, idmiembrohogar: id })
    .toArray();

  const datos = dat_motivos?.length
    ? { idrespuesta: dat_motivos[0].idrespuesta, editMode: true }
    : {
        idrespuesta: "",
        editMode: false,
      };
  return datos;
};
