import { getHogar } from "@/app/hogarController/hogar.controller";
import { obtenerPrimero } from "@/app/user-interfaces/forms/models/controllers";

export const obtenerMobiliarios = async (
  id: any,
  setConfiguracionMobiliarioBasico: any
) => {
  const hogar = getHogar();
  if (hogar) {
    const observ = await obtenerPrimero("dat_hogarmobiliarioequipos", {
      idmobiliarioequipo: parseFloat(id),
      idcodigohogar: hogar,
    });

    return (
      observ ?? {
        cantidad: "",
        idmobiliarioequipo: 9760,
        estado: "",
      }
    );
  }
};
