import { crearNomenclador } from "@/app/user-interfaces/forms/models/controllers";

export const setToLocalStorage = (data: any) => {
  const idNomencladores = Object.keys(data);

  // idNomencladores.forEach((id) => setItem(id, data[id]));
  idNomencladores.forEach((id) => {
    data[id].forEach((obj: any) => {
      crearNomenclador(id, obj.idconcepto, obj.denominacion, obj.hijos);
    });
  });
  return idNomencladores;
};

export const setItem = async (id: string, value: any) =>
  localStorage.setItem(`/${id}`, JSON.stringify(value));
