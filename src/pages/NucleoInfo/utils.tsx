import { Divider, Typography } from "@mui/material";
import { datico as db } from "@/app/user-interfaces/forms/models/model";

import { IGenericControls } from "@/_pwa-framework/genforms/types/controls/controls.types";
import { parseQrToCi } from "@/utils/parse/qr-to-ci";

export function calcularEdadByCi(ci: string) {
  if (ci?.length === 11) {
    let fechaNacStr = ci.substring(0, 6);
    // convertir la cadena de fecha en un objeto Date
    let año = parseInt(fechaNacStr.substring(0, 2)) + 1900;
    let mes = parseInt(fechaNacStr.substring(2, 4)) - 1;
    let día = parseInt(fechaNacStr.substring(4, 6));
    let fechaNac = new Date(año, mes, día);
    let hoy = new Date();
    // calcular la diferencia en años
    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    // ajustar la edad si aún no ha llegado el cumpleaños del año actual
    if (
      hoy.getMonth() < fechaNac.getMonth() ||
      (hoy.getMonth() === fechaNac.getMonth() &&
        hoy.getDate() < fechaNac.getDate())
    ) {
      edad--;
    }
    // siglo XIX  9
    // siglo XX 0-5
    // siglo XXI 6-8
    const siglo = parseInt(ci.at(6) ?? "10");
    if (edad >= 100 && siglo >= 6 && siglo <= 8) {
      edad -= 100;
    }
    return edad;
  } else {
    return 0;
  }
}

export const pnombre: IGenericControls = {
  type: "text",
  label: "Nombres",
  name: "pnombre",
  pattern: /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/,
  gridValues: { xl: 6, lg: 6, md: 6, sm: 12, xs: 12 },
  validations: {
    required: { message: "Este campo es obligatorio" },
    tests: [
      {
        test: (values: any) => {
          return values.pnombre?.length >= 50;
        },
        message: "Límite máximo 50 caracteres",
      },
      {
        test: (values: any) => {
          const regex = /^[A-Za-záéíóúÁÉÍÓÚñÑ ]+$/;
          const isOnlyLetters = regex.test(values.pnombre);
          return !isOnlyLetters;
        },
        message: "Este campo solo permite caracteres alfabeticos",
      },
    ],
  },
};
// export const snombre: IGenericControls = {
//   type: "text",
//   label: "Segundo nombre",
//   name: "snombre",
//   pattern: /[A-z]/,
//   gridValues: { xl: 6, lg: 6, md: 6, sm: 12, xs: 12 },
// };
export const papellido: IGenericControls = {
  type: "text",
  label: "Apellidos",
  name: "papellido",
  pattern: /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/,
  gridValues: { xl: 6, lg: 6, md: 6, sm: 12, xs: 12 },
  validations: {
    required: { message: "Este campo es obligatorio" },
    tests: [
      {
        test: (values: any) => {
          return values.papellido?.length >= 50;
        },
        message: "Limite máximo 50 caracteres",
      },
      {
        test: (values: any) => {
          const regex = /^[A-Za-záéíóúÁÉÍÓÚñÑ ]+$/;
          const isOnlyLetters = regex.test(values.papellido);
          return !isOnlyLetters;
        },
        message: "Este campo solo permite caracteres alfabeticos",
      },
    ],
  },
};
// export const sapellido: IGenericControls = {
//   type: "text",
//   label: "Segundo apellido",
//   name: "sapellido",
//   pattern: /[A-z]/,
//   gridValues: { xl: 6, lg: 6, md: 6, sm: 12, xs: 12 },
//   validations: { required: { message: "Este campo es obligatorio" } },
// };
export const cidentidad: IGenericControls = {
  type: "text",
  label: "Carnet de identidad",
  name: "cidentidad",
  gridValues: { xl: 5, lg: 5, md: 5, sm: 11, xs: 11 },
  pattern: /[0-9]/,
  helperText: (values: any) => {
    const ci = values.cidentidad ?? "";
    if (ci.length === 11) {
      const regex =
        /^[0-9]{2}(?:0[0-9]|1[0-2])(?:0[1-9]|[12][0-9]|3[01])[0-9]{5}$/;
      if (regex.test(ci)) {
        const edad = calcularEdadByCi(ci);
        return `Edad: ${edad} ${edad === 1 ? "año" : "años"}`;
      }
    }
    return "";
  },
  validations: {
    required: { message: "Este campo es obligatorio" },
    tests: [
      {
        test: (values: any) => {
          const ci = values.cidentidad ?? "";
          return ci.length > 0 && ci.length !== 11;
        },
        message: "El carnet de identidad debe contener exactamente 11 dígitos.",
      },
      {
        test: (values: any) => {
          const ci = values.cidentidad ?? "";
          if (ci.length !== 11) return false;
          const regex =
            /^[0-9]{2}(?:0[0-9]|1[0-2])(?:0[1-9]|[12][0-9]|3[01])[0-9]{5}$/;
          return !regex.test(ci);
        },
        message: "El número de carnet de identidad ingresado no es válido. Por favor, revíselo e inténtelo de nuevo.",
      },
    ],
  },
};
export const edad: IGenericControls = {
  type: "number",
  label: "Edad",
  gridValues: { xl: 4, lg: 4, md: 4, sm: 12, xs: 12 },
  name: "edad",
  format: "other",
};
export const idcolorpiel: IGenericControls = {
  type: "select",
  label: "Color de piel",
  name: "idcolorpiel",
  gridValues: { xl: 6, lg: 6, md: 6, sm: 12, xs: 12 },
  url: "9280",
  validations: {
    required: { message: "Este campo es obligatorio" },
  },
};
export const nota: IGenericControls = {
  type: "component",
  component: () => (
    <Typography>
      <span>Nota aclaratoria:</span>
      <br></br>. El parentesco se establece con relación al jefe(a) de hogar
      <br></br>. Si al preguntar el sexo la persona no responde Femenino o
      Masculino selecciona la opción correspondiente en <i>Identidad sexual</i>
      <br></br>. Si es posible, respetuosamente, indagar qué otro elige y
       escribir en el campo de las Observaciones
    </Typography>
  ),
  label: "",
  name: "",
  gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
};
export const divider: IGenericControls = {
  type: "component",
  component: () => <Divider sx={{ mt: 0, mb: 1 }} />,
  label: "",
  name: "",
  gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
};
export const otrosDatos: IGenericControls = {
  type: "component",
  component: () => (
    <Typography>
      <b>Otros datos</b>
    </Typography>
  ),
  label: "",
  name: "",
  gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
};
export const titleEscolaridad: IGenericControls = {
  type: "component",
  component: () => (
    <Typography>
      <b>Datos de escolaridad</b>
    </Typography>
  ),
  label: "",
  name: "",
  gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
};
export const scanner: IGenericControls = {
  type: "scanner",
  name: "scan",
  closeOnScan: true,
  label: "scan",
  parseFunction: parseQrToCi,
};
export const datosGeneralesTitle: IGenericControls = {
  type: "component",
  component: () => (
    <Typography>
      <b>Datos generales</b>
    </Typography>
  ),
  label: "",
  name: "",
  gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
};
export const abrevNomenclador: any = {
  // parentesco
  "9270": "JH",
  "9271": "P",
  "9272": "M",
  "9273": "H",
  "9274": "N",
  "9275": "HE",
  "9276": "S",
  "9277": "NY",
  "9278": "OF",
  "9279": "NF",
  "10239": "E",
  // color piel
  "9281": "B",
  "9282": "N",
  "9283": "M",
  // sexo
  "9285": "F",
  "9286": "M",
  // escolaridad
  "9696": "N",
  "9697": "P",
  "9698": "SB",
  "9699": "OC",
  "9700": "PU",
  "9701": "PNM",
  "9702": "TM",
  "9704": "TS",
  "9705": "U",
};
export const idsexo: IGenericControls = {
  type: "select",
  label: "Sexo asignado al nacer",
  name: "idsexo",
  gridValues: { xl: 4, lg: 4, md: 4, sm: 12, xs: 12 },
  url: "9284",
  validations: { required: { message: "Este campo es obligatorio" } },
};
export const idorientacionsex: IGenericControls = {
  type: "select",
  label: "Identidad sexual",
  gridValues: { xl: 4, lg: 4, md: 4, sm: 12, xs: 12 },
  name: "idorientacionsex",
  url: "10210",
};
export const registroconsum: IGenericControls = {
  type: "select",
  label: "¿Usted es miembro de la libreta de abastecimientos de este hogar?",
  gridValues: { xl: 6, lg: 6, md: 6, sm: 12, xs: 12 },
  name: "registroconsum",
  options: [
    { idconcepto: "1", denominacion: "Sí" },
    { idconcepto: "2", denominacion: "No" },
  ],
  validations: {
    required: { message: "Este campo es obligatorio" },
  },
};
export const datosmoviles: IGenericControls = {
  type: "select",
  label: "¿Tiene plan de datos en el teléfono móvil?",
  gridValues: { xl: 6, lg: 6, md: 6, sm: 12, xs: 12 },
  name: "datosmoviles",
  options: [
    { idconcepto: "1", denominacion: "Sí" },
    { idconcepto: "2", denominacion: "No" },
  ],
  validations: { required: { message: "Este campo es obligatorio" } },
};
export const embarazada: IGenericControls = {
  type: "select",
  label: "¿Se encuentra embarazada?",
  gridValues: { xl: 3, lg: 3, md: 3, sm: 12, xs: 12 },
  name: "estaembarazada",
  hidden: (values: any) => values.idsexo != "9285",
  options: [
    { idconcepto: "1", denominacion: "Sí" },
    { idconcepto: "2", denominacion: "No" },
  ],
  validations: {
    required: {
      message: "Este campo es obligatorio",
      when: { name: "idsexo", expression: (value) => value[0] == "9285" },
    },
  },
};
export const lactando: IGenericControls = {
  type: "select",
  label: "¿Se encuentra lactando?",
  gridValues: { xl: 3, lg: 3, md: 3, sm: 12, xs: 12 },
  name: "lactando",
  options: [
    { idconcepto: "1", denominacion: "Sí" },
    { idconcepto: "2", denominacion: "No" },
  ],
  hidden: (values: any) => values.idsexo != "9285",
  validations: {
    required: {
      message: "Este campo es obligatorio",
      when: { name: "idsexo", expression: (value) => value[0] == "9285" },
    },
  },
};
export const madremenor19: IGenericControls = {
  type: "select",
  label: "¿Fue madre antes de los 19?",
  gridValues: { xl: 3, lg: 3, md: 3, sm: 12, xs: 12 },
  name: "madremenor19",
  options: [
    { idconcepto: "1", denominacion: "Sí" },
    { idconcepto: "2", denominacion: "No" },
  ],
  hidden: (values: any) => {
    const edad = calcularEdadByCi(values.cidentidad);
    return (
      values.idsexo?.[0] != "9285" ||
      (values.idsexo?.[0] == "9285" && (edad < 19 || edad > 25))
    );
  },
  validations: {
    // required: {
    //   message: "Este campo es obligatorio",
    //   when: { name: "idsexo", expression: (value) => value[0] == "9285" },
    // },
    tests: [
      {
        test: (values: any) => {
          const edad = calcularEdadByCi(values.cidentidad);
          if (values.idsexo?.[0] == "9285" && edad >= 19 && edad <= 25) {
            return !values.madremenor19.length;
          }
          return false;
        },
        message: "Este campo es obligatorio",
      },
    ],
  },
};
export const cantidadhijos: IGenericControls = {
  type: "number",
  label: "Cantidad de hijos menores de 17 años",
  format: "other",
  //pattern: /[0-9]/,
  gridValues: { xl: 3, lg: 3, md: 3, sm: 12, xs: 12 },
  name: "cantidadhijos",
  hidden: (values: any) => values.idsexo != "9285",
  validations: {
    tests: [
      {
        test: (values: any) => {
          return values.cantidadhijos?.length >= 3;
        },
        message: "Límite máximo 2 caracteres.",
      },
    ],
  },
};
export function getAbreviatura(idconcepto?: number, grado?: string) {
  if (typeof idconcepto === "undefined") {
    return "";
  } else {
    if (grado) {
      return `${abrevNomenclador[idconcepto.toString()]} (${grado})`;
    } else {
      return abrevNomenclador[idconcepto.toString()];
    }
  }
}
export async function unionNomenclador(arr: any) {
  const join = await Promise.all(
    arr.map(async (obj: any) => {
      // ;
      const colorpiel = await db.nom_concepto.get(
        parseInt(obj?.idcolorpiel[0] ?? 0),
      );
      const nivelescolar = await db.nom_concepto.get(
        parseInt(obj.idnivelescolar ? obj.idnivelescolar : 0),
      );
      const gradoscolar = await db.nom_concepto.get(
        parseInt(obj.idnivelescolargrado ? obj.idnivelescolargrado : 0),
      );
      const gradovencido = await db.nom_concepto.get(
        parseInt(obj.idgradovencido ? obj.idgradovencido : 0),
      );
      const parentesco = await db.nom_concepto.get(
        parseInt(obj?.idparentesco[0] ?? 0),
      );
      const sexo = await db.nom_concepto.get(parseInt(obj?.idsexo[0] ?? 0));
      return {
        ...obj,
        colorpiel: getAbreviatura(colorpiel?.idconcepto),
        nivelescolar: getAbreviatura(nivelescolar?.idconcepto),
        gradoscolar: getAbreviatura(
          gradoscolar?.idconcepto,
          gradovencido?.denominacion,
        ),
        parentesco:
          parentesco?.idconcepto == 9270
            ? parentesco?.denominacion
            : getAbreviatura(parentesco?.idconcepto),
        sexo: getAbreviatura(sexo?.idconcepto),
      };
    }),
  );
  return join;
}
