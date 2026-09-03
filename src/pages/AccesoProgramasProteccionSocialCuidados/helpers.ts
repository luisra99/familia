import { obtenerDatosPorLlave } from "@/app/user-interfaces/forms/models/controllers";

export const obtenerMiembroPorBeneficios = async (id: string) => {
  const datos_polprog = await obtenerDatosPorLlave(
    "dat_polprogsoc",
    "idmiembrohogar",
    id
  );
  return datos_polprog?.length
    ? { ...datos_polprog[0], editMode: true, idmiembrohogar: [id.toString()] }
    : {
        idmiembrohogar: [id.toString()],
        atendido: [],
        problemasalud: [],
        editMode: false,
      };
};
