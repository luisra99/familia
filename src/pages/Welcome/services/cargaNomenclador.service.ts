import axios from "axios";
import { setItem } from "../utils/almacenarOffline";
import { env } from "@/_pwa-framework/config";

export const getNomenclador = async (nomenclador: string): Promise<any> => {
  try {
    const { data } = await axios.get(
      `${
        env.ENV_SERVER_URL
      }/gw/external/nomencladores/buscarconceptoxid?idconcepto=${nomenclador}`
    );
    if (Object.keys(data).length) setItem(nomenclador, Object.values(data)[0]);
    return Object.keys(data).length;
  } catch (error: any) {
    return false;
  }
};
