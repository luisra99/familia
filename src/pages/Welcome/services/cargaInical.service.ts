import axios from "axios";
import { env, mode } from "@/_pwa-framework/config";
import { nomencladoresMock } from "./mockNomencladores";
import { zonasVulnerablesMock } from "./mockZonasVulnerables";
import { setToLocalStorage } from "../utils/almacenarOffline";
import { cargarEstructuras } from "../utils/estructuras.service";
import { mockEstructura } from "./estrucutrasMock";

export const getCargaInicial = async (
  nomencladores: string[],
  idEstructura: any,
): Promise<any> => {
  try {
    if (!mode) {
      const { data } = await axios.get(
        `${
          env.ENV_SERVER_URL
        }/gw/external/nomencladores/buscarconceptoxid?idconcepto=${nomencladores.join(
          ",",
        )}`,
      );

      const zonasVulnerables = await axios
        .get(
          `${env.ENV_SERVER_URL}/gw/bk_familia_cubana/configurar_zona/estructura/${idEstructura}`,
        )
        .then(({ data }) => data)
        .catch(() => []);

      const estructuras = await cargarEstructuras(idEstructura);
      localStorage.setItem("estructuras", JSON.stringify(estructuras));

      return setToLocalStorage({
        ...data,
        "999999999": zonasVulnerables.map((item: any) => {
          return {
            idconcepto: item.idzonavulnerable,
            denominacion: item.nombre,
          };
        }),
      });
    } else {
      localStorage.setItem("estructuras", JSON.stringify(mockEstructura));

      return setToLocalStorage({
        ...nomencladoresMock,
        "999999999": zonasVulnerablesMock.map((item: any) => {
          return { denominacion: item.nombre, hijos: [] };
        }),
      });
    }
  } catch (error: any) {
    return setToLocalStorage({});
  } finally {
    // Cleanup or final actions
  }
};
