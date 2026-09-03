import { datico } from "@/app/user-interfaces/forms/models/model";
import { obtenerDatosPorLlave } from "@/app/user-interfaces/forms/models/controllers";

export const obtenerGradoAutonomia = async (id: string) => {
  const datos = await obtenerDatosPorLlave(
    "dat_miembrogradoautonomia",
    "idmiembrohogar",
    id.toString()
  );
  return datos.length
    ? { ...datos[0], editMode: true }
    : {
        idmiembro: [id],
        idautonomia: [],
        idtiposayuda: "",
        idmiembrodiscapacidad: [],
        iddiscapacidad: [],
        aditamentos: "",
        editMode: false,
      };
};
export async function tieneDiscapacidad(arr: any) {
  const result = await Promise.all(
    arr.map(async (obj: any) => {
      const disca = await datico.dat_miembrogradoautonomia
        .where({ idmiembrohogar: obj.idconcepto.toString() })
        .count();
      return disca > 0 ? obj.idconcepto : 0;
    })
  );
  const _result = result.filter((item: any) => item != 0);
  return _result.toString();
}
export async function obtenerDatos(idmiembro: any) {
  const data = await datico.dat_miembroaditamentos
    .where({ idmiembrohogar: parseInt(idmiembro) })
    .toArray();
  const result = await unionNomenclador(data);
  return result;
}
export async function unionNomenclador(arr: any) {
  const join = await Promise.all(
    arr.map(async (obj: any) => {
      const aditamento = await datico.nom_concepto.get(
        parseInt(obj?.idaditamento[0] ?? 0)
      );
      const disponibilidad = await datico.nom_concepto.get(
        parseInt(obj?.disponeadit[0] ?? 0)
      );
      return {
        ...obj,
        aditamento: aditamento?.denominacion,
        disponibilidad: disponibilidad?.denominacion,
      };
    })
  );
  return join;
}
