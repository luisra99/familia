import { datico } from "@/app/user-interfaces/forms/models/model";

export const tieneOcupacion = async (arr: any) => {
  const result = await Promise.all(
    arr.map(async (obj: any) => {
      const ocupa = await datico.dat_miembroocupacion
        .where({ idmiembrohogar: [obj.idconcepto.toString()] })
        .count();
      if (ocupa > 0) {
        return obj.idconcepto.toString();
      } else {
        return 0;
      }
    })
  );
  const _result = result.filter((item) => item != 0);
  return _result;
};

export const obtenerMiembroOcupacion = async (idMiembro: any) => {
  const datos = await datico.dat_miembroocupacion
    .where({ idmiembrohogar: [idMiembro] })
    .toArray();
  const element = datos.length
    ? { ...datos[0], editMode: true }
    : {
        idmiembrohogar: [idMiembro.toString()],
        idocupacion: "",
        idcodigohogar: "",
        idtipoocupacion: [],
        editMode: false,
      };

  return element;
};
