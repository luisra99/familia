import { IGenericControls } from "@/_pwa-framework/genforms/types/controls/controls.types";
import { datico } from "@/app/user-interfaces/forms/models/model";

export const Vehiculo: IGenericControls[] = [
  {
    type: "select",
    label: "Vehículo",
    name: "idmobiliariovehiculo",
    url: "9784",
    gridValues: { xs: 12, sm: 4 },
    validations: {
      required: { message: "Este campo es obligatorio" },
    },
    disabledOnEdit: true,
    //disabled: (value) => value.idtipo == "",
  },
  {
    type: "select",
    label: "Escoja la opción",
    name: "estado",
    validations: {
      required: { message: "Este campo es obligatorio" },
    },
    gridValues: { xs: 12, sm: 4 },
    options: [
      { idconcepto: "0", denominacion: "Propio" },
      { idconcepto: "1", denominacion: "Asignado" },
    ],
  },
  {
    type: "number",
    label: "Cantidad",
    name: "cantidad",
    format: "units",
    negativeValues: false,
    gridValues: { xs: 12, sm: 4 },

    validations: {
      required: { message: "Este campo es obligatorio" },
      max:{value: 9, message:"Límite máximo 1 caracteres"},
      moreThan: { value: 0, message: "No puede ser 0" },
    },
  },
];
export async function unionNomenclador(arr: any) {
  //
  const join = await Promise.all(
    arr.map(async (obj: any) => {
      //  ;
      const mobiliario = await datico.nom_concepto.get(
        parseInt(obj?.idmobiliariovehiculo ?? 0)
      );

      return {
        ...obj,
        mobiliario: mobiliario?.denominacion,
      };
    })
  );
  return join;
}
