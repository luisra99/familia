import { datico } from "@/app/user-interfaces/forms/models/model";
import { getHogar } from "@/app/hogarController/hogar.controller";
import { obtenerDatosPorLlave } from "@/app/user-interfaces/forms/models/controllers";

export async function tieneUso(arr: any) {
  const result = await Promise.all(
    arr.map(async (obj: any) => {
      const uso = await datico.dat_miembroencuesta
        .where({ idmiembrohogar: obj.idconcepto.toString() })
        .count();
      if (uso > 0) {
        return obj.idconcepto;
      } else {
        return 0;
      }
    })
  );
  const _result = result.filter((item) => item != 0);
  return _result.toString();
}
export const obtenerMiembroPorEncuesta = async (id: string) => {
  const datos_hogar = await obtenerDatosPorLlave(
    "dat_hogar",
    "idcodigohogar",
    parseInt(getHogar() ?? "")
  );
  if (id == "0") {
    return {
      problemasalud: datos_hogar[0]?.problemasalud,
      atendido: [],
      editMode: datos_hogar[0]?.problemasalud?true:false,
      idmiembrohogar: [],
    };
  }
  const datos_encuesta = await obtenerDatosPorLlave(
    "dat_miembroencuesta",
    "idmiembrohogar",
    id
  );
  const editData =
    datos_hogar?.[0]?.problemasalud?.[0] === "9832"
      ? datos_encuesta[0]
        ? {
            problemasalud: ["9832"],
            atendido: datos_encuesta[0].atendido,
            editMode:true,
            idmiembrohogar: [datos_encuesta[0].idmiembrohogar[0]],
          }
        : {
            problemasalud: ["9832"],
            atendido: [],
            editMode: true,
            idmiembrohogar: [id],
          }
      : {
          idmiembrohogar: [id],
          atendido: [],
          problemasalud: ["9832"],
          editMode: true,
        };
  return editData;
};

export const obtenerMotivoNoAtencion = async (
  id: string,
  motivo: any,
  respuestaMotivos: any,
  setConfiguracionRespuestaMotivos: any
) => {
  const dat_motivos = await datico.dat_motivonoatencion
    .where({ idmotivo: motivo.idconcepto, idmiembrohogar: id.toString() })
    .toArray();
  let datos;

  if (dat_motivos?.length) {
    datos = { 
      idrespuesta: [dat_motivos[0].idrespuesta],
      otrosmotivos: dat_motivos[0].otrosmotivos ?? "",
      editMode: true };

    setConfiguracionRespuestaMotivos((prev: any) => {
      prev[motivo.idconcepto] = {
        ...prev[motivo.idconcepto],
        
        idmotivo: motivo.idconcepto,
       // idrespuesta: `${dat_motivos[0].idrespuesta}`,
        otrosmotivos: dat_motivos[0].otrosmotivos ?? "",
        
      };
      
      return prev;
    });
  } else {
    setConfiguracionRespuestaMotivos((prev: any) => {
      delete prev[motivo.idconcepto];
      return prev;
    });
    datos = {
      idrespuesta: [],
      editMode: false,
    };
  }

  return datos;
};
