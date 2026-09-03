/*
=========================================================================================
//#region 3 puntos claves

Los tres cambios clave son:
1. La función sanitizeRow — procesa cada fila antes de exportar. 
Usa el propio $types de Dexie para detectar campos que se guardaron como undefined 
(marcados como "undef") y los convierte a null. También maneja referencias "#" 
y nunca toca el objeto $types en sí.

2. exportAllTablesAsJson — reemplaza el loop manual por 
sanitizeRow, que es más limpio y cubre todos los casos a la vez.

3. importEntrevista — agrega el if (key === '$types') continue que 
faltaba para no borrar metadata de Dexie al importar.

=========================================================================================
*/

import { CreateOrModify, descartarHogares, modificar } from "./controllers";
import { datico } from "./model";
import { exportDB, importDB } from "dexie-export-import";
import { obtenerTabla } from "./utilities";

// Convierte recursivamente undefined y 0-de-Dexie a null
function sanitizeRow(row: any): any {
  const sanitized: any = {};
  for (const [key, value] of Object.entries(row)) {
    if (key === "$types") {
      sanitized[key] = value; // nunca tocar $types
      continue;
    }
    if (value === undefined || value === null) {
      sanitized[key] = null;
      continue;
    }
    // Si $types marca este campo como "undef", vino de undefined → null
    if (row["$types"]?.[key] === "undef") {
      sanitized[key] = null;
      continue;
    }
    // Referencias internas de Dexie tipo "#campo" → null
    if (typeof value === "string" && value.startsWith("#")) {
      sanitized[key] = null;
      continue;
    }
    sanitized[key] = value;
  }
  return sanitized;
}

export async function exportAllTablesAsJson(profile: any) {
  try {
    const data = await datico.conf_dispositivos.toArray();
    await CreateOrModify(
      "conf_dispositivos",
      { iddispositivo: data?.[0]?.iddispositivo ?? "1" },
      {
        idestructura: profile?.ESTRUCTURA?.idestructura,
        tabletUserReference: localStorage.getItem("offlineMode") ?? "",
        userName: profile?.PI?.idpi ?? "",
      },
      "iddispositivo",
    );

    const blob = await exportDB(datico, {
      prettyJson: true,
      filter: (table, value, key) => true,
    });

    let json = JSON.parse(await blob.text());

    json.data.data.forEach((table: any, i: number) => {
      table.rows?.forEach((item: any, j: number) => {
        json.data.data[i].rows[j] = sanitizeRow(item);
      });
    });

    let file: any = { data: json.data.data };
    return file;
  } catch (error) {
    console.error("Error exporting tables:", error);
  }
}

export async function importEntrevista(file: any) {
  try {
    const blob = await exportDB(datico, {
      prettyJson: true,
      filter: (table, value, key) => true,
    });
    let json = JSON.parse(await blob.text());
    let { data } = JSON.parse(await file.text());

    json.data = { ...json.data, data };

    json.data.data.forEach((table: any, i: number) => {
      table.rows?.forEach((item: any, j: number) => {
        for (const [key, value] of Object.entries(item)) {
          if (key === "$types") continue; // nunca tocar $types
          if (value === null) {
            delete json.data.data[i].rows[j][key];
          }
        }
      });
    });

    const db = new Blob([JSON.stringify(json)], {
      type: "application/json",
    });

    indexedDB.deleteDatabase("FamiliaCubana");

    await importDB(db, {
      progressCallback: (result) => {
        console.log(result);
        return true;
      },
    });
  } catch (error) {
    console.error("Error exporting tables:", error);
  }
}

export const handleDownload = async (profile: any) => {
  const element = document.createElement("a");
  const data = await exportAllTablesAsJson(profile);

  const tabletUserReference = localStorage.getItem("offlineMode");
  data.tabletUserReference = tabletUserReference;
  data.idestructura = profile?.ESTRUCTURA?.idestructura;
  data.userName = profile?.PI?.idpi;
  data.version = __APP_VERSION__; // "2.3.0" del package.json
  data.buildVersion = __BUILD_VERSION__; // fecha del build

  const file = new Blob([JSON.stringify(data)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(file);

  element.href = url;
  const fileName = `Entrevista ${Date.now()}`;
  element.download = `${fileName}.json`;
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);

  const hogares = await obtenerTabla("dat_hogar");
  Promise.all(
    hogares.map(async (hogar: any) => {
      if (hogar.idestado == "2") {
        await modificar("dat_hogar", "idcodigohogar", hogar.idcodigohogar, {
          file: fileName,
        });
      }
    }),
  );
};
