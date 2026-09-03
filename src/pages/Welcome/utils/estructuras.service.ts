import { env } from "@/_pwa-framework/config";
import axios from "axios";

export async function cargarEstructuras(idEstructura: any) {
  try {
    const { data } = await axios.get(
      `${
        env.ENV_SERVER_URL
      }/gw/external/estructuras/infoEstructura/${idEstructura}`
    );
    return data;
  } catch (error) {
    return [];
  }
}
export const crearArbolEstructura = (args: any[]) => {
  if (typeof args === "string") args = JSON.parse(args);
  if (Array.isArray(args))
    return args?.map((item: any) => {
      let leaf: any = {};
      leaf.value = item.id.toString();
      leaf.label = item.denominacion;
      if (item.children.length) {
        leaf.children = crearArbolEstructura(item.children);
      }
      return leaf;
    });
  else return [];
};
