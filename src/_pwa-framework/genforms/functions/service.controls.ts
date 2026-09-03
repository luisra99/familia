import { IConnectionMode } from "../types/forms.types";
import { obtenerDatosPorLlave } from "@/app/user-interfaces/forms/models/controllers";

export const getItems = async ({
  name,
  url,
  connectionMode,
}: {
  name: string;
  url?: string;
  connectionMode?: IConnectionMode;
}): Promise<any> => {
  // try {
  //   const { data } = await axios.get(
  //     `${env.ENV_SERVER_URL}/gw/${url}`
  //   );
  //   return Array.isArray(data)
  //     ? data
  //     : JSON.parse(localStorage.getItem(url ?? name) ?? "{}") ?? [];
  // } catch (error: any) {
  //  //const fallback = JSON.parse(localStorage.getItem(url ?? name) ?? "{}");
  const fallback = url
    ? await obtenerDatosPorLlave("nom_concepto", "idpadre", url)
    : [];

  //
  return Array.isArray(fallback) ? fallback : [];
};
//}
