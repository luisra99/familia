/** Controlado de la vista hogar */

import { datico as db } from "./model";
import { getHogar } from "@/app/hogarController/hogar.controller";
import { useLiveQuery } from "dexie-react-hooks";

export function obtenerMiembrosHogar(metadata: boolean = false) {
  const idhogar = getHogar();
  return useLiveQuery(() => {
    const data = db.dat_miembrohogar
      .where({ idcodigohogar: idhogar ?? 0 })
      .toArray();
    return data;
  });
}

export function obtenerMiembrosSelect() {
  const datosMiembros = obtenerMiembrosHogar()?.map((miembro) => {
    const denom = `${miembro.pnombre} ${
      miembro.papellido
    }`;
    return {
      idconcepto: miembro.idmiembrohogar,
      denominacion: denom,
    };
  });
  return datosMiembros;
}

export async function obtenerMiembros() {
  const idhogar = getHogar() ?? 0;
  const data = await db.dat_miembrohogar
    .where({ idcodigohogar: idhogar })
    .toArray()
    .then((arr) =>
      arr.map((obj) => {
        const denom = `${obj.pnombre} ${obj.papellido}`;
        return { ...obj, idconcepto: obj.idmiembrohogar, denominacion: denom };
      })
    );

  return data;
}
export async function obtenerMiembrosPorHogar(idhogar: any) {
  const data = await db.dat_miembrohogar
    .where({ idcodigohogar: idhogar })
    .toArray()
    .then((arr) =>
      arr.map((obj) => {
        const denom = `${obj.pnombre} ${obj.papellido}`;
        return { ...obj, idconcepto: obj.idmiembrohogar, denominacion: denom };
      })
    );

  return data;
}
export async function obtenerMiembrosMayoresDe18() {
  const idhogar = getHogar() ?? 0;
  const data = await db.dat_miembrohogar
    .where({ idcodigohogar: idhogar })
    .and((miembro) => miembro.edad > 18)
    .toArray()
    .then((arr) =>
      arr.map((obj) => {
        const denom = `${obj.pnombre} ${obj.papellido}`;
        return { idconcepto: obj.idmiembrohogar, denominacion: denom };
      })
    );
  return data;
}
export async function obtenerMiembrosMayoresDe15() {
  const idhogar = getHogar() ?? 0;
  const data = await db.dat_miembrohogar
    .where({ idcodigohogar: idhogar })
    .and((miembro) => miembro.edad > 15)
    .toArray()
    .then((arr) =>
      arr.map((obj) => {
        const denom = `${obj.pnombre} ${obj.pnombre ?? ""} ${obj.papellido}`;
        return { idconcepto: obj.idmiembrohogar, denominacion: denom };
      })
    );
  return data;
}

export async function obtenerMiembrosMenoresDe18() {
  const idhogar = getHogar() ?? 0;
  const data = await db.dat_miembrohogar
    .where({ idcodigohogar: idhogar })
    .and((miembro) => miembro.edad < 18)
    .toArray()
    .then((arr) =>
      arr.map((obj) => {
        const denom = `${obj.pnombre} ${obj.papellido}`;
        return { idconcepto: obj.idmiembrohogar, denominacion: denom };
      })
    );
  return data;
}
export async function obtenerMiembrosNoVinculados() {
  //En ocupación
  //Auxiliar
  //Tareas Hogar
  //NTNE
  const idhogar = getHogar() ?? 0;
  const data = await db.dat_miembrohogar
    .where({ idcodigohogar: idhogar })
    // .and((miembro) => miembro.edad < 18)
    .toArray()
    .then((arr) =>
      arr.map((obj) => {
        const denom = `${obj.pnombre} ${obj.papellido}`;
        return { idconcepto: obj.idmiembrohogar, denominacion: denom };
      })
    );
  return data;
}
