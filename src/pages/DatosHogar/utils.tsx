import { Chip } from "@mui/material";
import { IGenericControls } from "@/_pwa-framework/genforms/types/controls/controls.types";
import { datico as db } from "@/app/user-interfaces/forms/models/model";

export async function unionUnidadAlojamiento(arr: any) {
  const join = await Promise.all(
    arr.map(async (obj: any) => {
      const unidaddealojamiento = await db.dat_unidaddealojamiento.get(
        obj.idunidaddealojamiento
      );
      const miembros = await db.dat_miembrohogar
        .where({ idcodigohogar: obj.idcodigohogar.toString() })
        .toArray();
      const cantmiembros = miembros.length;
      const jefeHogar = miembros.find((obj) => {
        return obj?.idparentesco[0] == "9270";
      });
      const jefehogar = jefeHogar ? (
        `${jefeHogar.pnombre} ${jefeHogar.papellido}`
      ) : (
        <span style={{ color: "red" }}>Pendiente a definir...</span>
      );
      return {
        ...obj,
        ...unidaddealojamiento,
        numero: obj.idcodigohogar,
        detalles: (
          <p style={{ textAlign: "left", width: "max-content" }}>
            <b>Dirección: </b>
            {unidaddealojamiento?.direccion}
            <br />
            <b>Jefe Hogar: </b> {jefehogar}
          </p>
        ),
        cantmiembros: cantmiembros > 0 ? cantmiembros : "",
        jefehogar: jefehogar,
        estado: estados[obj.idestado],
        idEstado: parseInt(obj.idestado),
        estadotext: (
          <Chip
            label={
              obj.file
                ? `Exportado en \n${obj.file}`
                : estados[parseInt(obj.idestado)]
            }
            color={obj.file ? "info" : estadoscolor[parseInt(obj.idestado)]}
          />
        ),
      };
    })
  );
  return join;
}

export const circunscripcion: IGenericControls = {
  type: "text",
  label: "Circunscripción",
  gridValues: { xl: 6, lg: 6, md: 6, sm: 12, xs: 12 },
  name: "circunscripcion",
  pattern: /^[0-9]+$/,
  validations: {
    required: { message: "Este campo es obligatorio" },
    regex: {
      value: /^(?!0)[1-9]\d{0,2}$/,
      message: "Válido para número de 1 a 3 cifras",
    },
  },
};

export const cdr: IGenericControls = {
  type: "text",
  label: "CDR",
  gridValues: { xl: 6, lg: 6, md: 6, sm: 12, xs: 12 },
  name: "cdr",
  pattern: /^[0-9]+$/,
  validations: {
    required: { message: "Este campo es obligatorio" },
    regex: {
      value: /^(?!0)[1-9]\d{0,2}$/,
      message: "Válido para número de 1 a 3 cifras",
    },
  },
};

export const direccion: IGenericControls = {
  type: "text",
  label: "Dirección",
  gridValues: { xl: 12, lg: 12, md: 12, sm: 12, xs: 12 },
  name: "direccion",
  multiline: { minRows: 1 },
  pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s\/\-#]+$/,

  validations: {
    required: { message: "Este campo es obligatorio" },
    tests: [
      {
        test: (values: any) => {
          return values.direccion?.length >= 100;
        },
        message: "Límite máximo 100 caracteres.",
      },
      {
        test: (values: any) => {
          const pattern =
            /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\d#\/-]+(?:\s[a-zA-ZáéíóúÁÉÍÓÚñÑ\d#\/-]+)*$/;
          const validExp = pattern.test(values.direccion);
          // console.log(validExp);
          return !validExp;
        },
        message:
          "Solo admite caracteres alfanuméricos y los caracteres especiales (- / #).",
      },
    ],
  },
  hidden: (values: any) =>
    values.idtipovivienda != "9293" &&
    values.idtipovivienda != "9294" &&
    values.idtipovivienda != "9295" &&
    values.idtipovivienda != "9296" &&
    values.idtipovivienda != "9297" &&
    values.idtipovivienda != "9298",
};

export const apto: IGenericControls = {
  type: "text",
  label: "Apto",
  gridValues: { xl: 12, lg: 12, md: 12, sm: 12, xs: 12 },
  name: "apto",
  validations: {
    tests: [
      {
        test: (values: any) => {
          return values.apto?.length >= 20;
        },
        message: "Límite máximo 20 caracteres",
      },
    ],
  },
  pattern: /^[a-zA-Z0-9]+$/,
  hidden: (values: any) =>
    values.idtipovivienda !== "9293" &&
    values.idtipovivienda != "9294" &&
    values.idtipovivienda !== "9295" &&
    values.idtipovivienda !== "9296" &&
    values.idtipovivienda !== "9297" &&
    values.idtipovivienda !== "9298",
};

export const edificio: IGenericControls = {
  type: "text",
  label: "Edificio",
  gridValues: { xl: 12, lg: 12, md: 12, sm: 12, xs: 12 },
  name: "edificio",
  multiline: { minRows: 1 },
  validations: {
    tests: [
      {
        test: (values: any) => {
          return values.edificio?.length >= 20;
        },
        message: "Límite máximo 20 caracteres",
      },
    ],
  },
  pattern: /^[a-zA-Z0-9]+$/,
  hidden: (values: any) =>
    values.idtipovivienda !== "9293" &&
    values.idtipovivienda != "9294" &&
    values.idtipovivienda !== "9295" &&
    values.idtipovivienda !== "9296" &&
    values.idtipovivienda !== "9297" &&
    values.idtipovivienda !== "9298",
};

export const sentrecalle: IGenericControls = {
  type: "text",
  label: "Y",
  gridValues: { xl: 12, lg: 12, md: 12, sm: 12, xs: 12 },
  name: "sentrecalle",
  validations: {
    tests: [
      {
        test: (values: any) => {
          return values.sentrecalle?.length >= 100;
        },
        message: "Límite máximo 100 caracteres",
      },
    ],
  },
  pattern: /^[a-z A-Z 0-9]+$/,
  hidden: (values: any) =>
    values.idtipovivienda != "9293" &&
    values.idtipovivienda != "9294" &&
    values.idtipovivienda != "9295" &&
    values.idtipovivienda != "9296" &&
    values.idtipovivienda != "9297" &&
    values.idtipovivienda != "9298",
};

export const pentrecalle: IGenericControls = {
  type: "text",
  label: "Entre",
  gridValues: { xl: 12, lg: 12, md: 12, sm: 12, xs: 12 },
  name: "pentrecalle",
  validations: {
    tests: [
      {
        test: (values: any) => {
          return values.pentrecalle?.length >= 100;
        },
        message: "Límite máximo 100 caracteres",
      },
    ],
  },
  pattern: /^[a-z A-Z 0-9]+$/,
  hidden: (values: any) =>
    values.idtipovivienda != "9293" &&
    values.idtipovivienda != "9294" &&
    values.idtipovivienda != "9295" &&
    values.idtipovivienda != "9296" &&
    values.idtipovivienda != "9297" &&
    values.idtipovivienda != "9298",
};

export const numero: IGenericControls = {
  type: "text",
  label: "Número",
  gridValues: { xl: 12, lg: 12, md: 12, sm: 12, xs: 12 },
  name: "numero",
  validations: {
    tests: [
      {
        test: (values: any) => {
          return values.numero?.length >= 20;
        },
        message: "Límite máximo 20 caracteres",
      },
    ],
  },
  hidden: (values: any) =>
    values.idtipovivienda != "9293" &&
    values.idtipovivienda != "9294" &&
    values.idtipovivienda != "9295" &&
    values.idtipovivienda != "9296" &&
    values.idtipovivienda != "9297" &&
    values.idtipovivienda != "9298",
  pattern: /^[A-Za-záéíóúÁÉÍÓñÑ0-9 ]+$/,
};

export const zonaresidencial: IGenericControls = {
  type: "select",
  name: "idzonaresidencia",
  label: "Zona de residencia",
  gridValues: { xl: 4, lg: 4, md: 4, sm: 12, xs: 12 },
  url: "9289",
  validations: {
    required: { message: "Este campo es obligatorio" },
  },
};

export const tipovivienda: IGenericControls = {
  type: "select",
  name: "idtipovivienda",
  label: "Tipo de vivienda",
  gridValues: { xl: 4, lg: 4, md: 4, sm: 12, xs: 12 },
  url: "9292",
  validations: {
    required: { message: "Este campo es obligatorio" },
  },
};

// export const asentamiento: IGenericControls = {
//   type: "text",
//   name: "idasentamiento",
//   label: "Asentamiento",
//   gridValues: { xl: 4, lg: 4, md: 4, sm: 12, xs: 12 },
// };

export const planturquino: IGenericControls = {
  type: "select",
  label: "Plan turquino",
  name: "planturquino",
  gridValues: { xl: 4, lg: 4, md: 4, sm: 12, xs: 12 },
  options: [
    { idconcepto: "1", denominacion: "Sí" },
    { idconcepto: "2", denominacion: "No" },
  ],
  validations: {
    required: {
      message: "Este campo es obligatorio",
      when: {
        name: "idzonaresidencia",
        expression: (value: any) => value?.[0] != "9291",
      },
    },
  },
  hidden: (values) => values?.idzonaresidencia?.[0] == "9291",
};

const estados: any = {
  "1": "En elaboración",
  "2": "Finalizado",
};

const estadoscolor: any = { 1: "error", 2: "success" };
