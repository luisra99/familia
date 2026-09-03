import { datico } from "@/app/user-interfaces/forms/models/model";

export const obtenerDatosByMiembro = async (id: string) => {
  async function getNnaocupacion(idsitu: any) {
    return await datico.dat_nnaocupacion
      .where({ idsituacnnaj: idsitu })
      .toArray();
  }

  async function getNnasitdelictiva(idsitu: any) {
    const elemen = await datico.dat_nnasitdelictiva
      .where({ idsituacnnaj: idsitu })
      .toArray();
    return elemen;
  }
  async function getCausas(idsitu: any) {
    return await datico.dat_causadesvnnaj
      .where({ idsituacnnaj: idsitu })
      .toArray();
  }
  async function gtSituacnnaj(id: any) {
    const element = await datico.dat_situacnnaj
      .where({ idmiembrohogar: [id] })
      .toArray();
    return element;
  }

  const existen_idsituacnnaj = await gtSituacnnaj(id);

  const idsituacnnaj = existen_idsituacnnaj.length
    ? existen_idsituacnnaj[0].idsituacnnaj
    : null;
  const existe_nnaocupacion = idsituacnnaj
    ? await getNnaocupacion(idsituacnnaj)
    : "";
  const existe_nnasitdelictiva = idsituacnnaj
    ? await getNnasitdelictiva(idsituacnnaj)
    : [];
  const existe_causas = idsituacnnaj ? await getCausas(idsituacnnaj) : [];

  const elementos = existen_idsituacnnaj.length
    ? {
      ...existen_idsituacnnaj[0],
      idcausadesv: existe_causas.length ? existe_causas[0].idcausadesv : [], //otra tabla
      otrascausas: existe_causas.length ? existe_causas[0].otrascausas : "", //otra tabla
      idtiposituacion: existe_nnasitdelictiva.length
        ? existe_nnasitdelictiva[0].idtiposituacion
        : [], //otra tabla
      editMode: true,
    }
    : {
      idmiembrohogar: [id], //
      idsituacioneduc: [], //
      idcuidadoprimerainf: [], //
      idcuidadohogar: [], //
      idsne: [], //
      idetp: [],
      idcausadesv: [], //otra tabla
      otrascausas: "", //itras causas
      idtiposituacion: [],
      editMode: false,
    };
  return elementos;
};
