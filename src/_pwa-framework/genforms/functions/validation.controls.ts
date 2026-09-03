import * as Yup from "yup";

import {
  ITest,
  IValidationFunctions,
  IValidationMap,
} from "../types/validation.types";

import { EControlsForValidate } from "../types/common.types";
import { IConnectionMode } from "../types/forms.types";
import { IGenericControls } from "../types/controls/controls.types";
import axios from "axios";
import { mode } from "@/_pwa-framework/config";

export const defaultValueMap: Record<
  EControlsForValidate,
  string | number | string[] | boolean | {} | null
> = {
  component: null,
  autocomplete: "",
  check: null,
  date: "",
  number: "",
  radio: "",
  rating: 0,
  select: [],
  multiselect: [],
  slider: 0,
  switch: false,
  text: "",
  time: "",
  geo: "",
};

Yup.addMethod(
  Yup.array,
  "customMore",
  function (value: number, message: string, ref: string) {
    return this.test("custom-more", message, function (args: any) {
      const { path, createError } = this;
      const valueForValidate = Array.isArray(args)
        ? args.length
        : parseFloat(args);
      const forCompare = ref ? parseFloat(this.parent[ref]) : value;
      if (valueForValidate > forCompare) return true;
      else return createError({ path, message });
    });
  },
);
Yup.addMethod(Yup.array, "customRequired", function (message: string) {
  return this.test("custom-required", message, function (args: any) {
    const { path, createError } = this;
    const condition =
      args === null ||
      args === undefined ||
      args.length === 0 ||
      args === false;
    if (!condition) return true;
    else return createError({ path, message });
  });
});
Yup.addMethod(Yup.boolean, "customRequired", function (message: string) {
  return this.test("custom-required", message, function (args: any) {
    const { path, createError } = this;
    const condition =
      args === null ||
      args === undefined ||
      args.length === 0 ||
      args === false;
    if (!condition) return true;
    else return createError({ path, message });
  });
});
Yup.addMethod(Yup.string, "customRequired", function (message: string) {
  return this.test("custom-required", message, function (args: any) {
    const { path, createError } = this;
    const condition =
      args === null ||
      args === undefined ||
      args.length === 0 ||
      args === false;
    if (!condition) return true;
    else return createError({ path, message });
  });
});
Yup.addMethod(Yup.number, "customRequired", function (message: string) {
  return this.test("custom-required", message, function (args: any) {
    const { path, createError } = this;
    const condition =
      args === null ||
      args === undefined ||
      args.length === 0 ||
      args === false;
    if (!condition) return true;
    else return createError({ path, message });
  });
});

Yup.addMethod(
  Yup.array,
  "customMax",
  function (value: number, message: string, ref: string) {
    return this.test("custom-max", message, function (args: any) {
      const { path, createError } = this;
      const valueForValidate = Array.isArray(args)
        ? args.length
        : parseFloat(args);
      const forCompare = ref ? parseFloat(this.parent[ref]) : value;
      if (valueForValidate <= forCompare) return true;
      else
        return createError({
          path,
          message,
        });
    });
  },
);
Yup.addMethod(
  Yup.array,
  "customMin",
  function (value: number, message: string, ref: string) {
    return this.test("custom-min", message, function (args: any) {
      const { path, createError } = this;
      const valueForValidate = Array.isArray(args)
        ? args.length
        : parseFloat(args);
      const forCompare = ref ? parseFloat(this.parent[ref]) : value;
      if (valueForValidate >= forCompare) return true;
      else
        return createError({
          path,
          message,
        });
    });
  },
);
Yup.addMethod(
  Yup.array,
  "customLess",
  function (value: number, message: string, ref: string) {
    return this.test("custom-less", message, function (args: any) {
      const { path, createError } = this;
      const valueForValidate = Array.isArray(args)
        ? args.length
        : parseFloat(args);

      const forCompare = ref ? parseFloat(this.parent[ref]) : value;
      if (valueForValidate < forCompare) return true;
      else
        return createError({
          path,
          message,
        });
    });
  },
);
Yup.addMethod(
  Yup.string,
  "customMore",
  function (value: number, message: string, ref: string) {
    return this.test("custom-more", message, function (args: any) {
      const { path, createError } = this;
      const valueForValidate = Array.isArray(args)
        ? args.length
        : parseFloat(args);
      const forCompare = ref ? parseFloat(this.parent[ref]) : value;
      if (valueForValidate > forCompare) return true;
      else return createError({ path, message });
    });
  },
);
Yup.addMethod(
  Yup.string,
  "customMax",
  function (value: number, message: string, ref: string) {
    return this.test("custom-max", message, function (args: any) {
      const { path, createError } = this;
      const valueForValidate = Array.isArray(args)
        ? args.length
        : parseFloat(args);
      const forCompare = ref ? parseFloat(this.parent[ref]) : value;
      if (valueForValidate <= forCompare) return true;
      else
        return createError({
          path,
          message,
        });
    });
  },
);
Yup.addMethod(
  Yup.string,
  "customMin",
  function (value: number, message: string, ref: string) {
    return this.test("custom-min", message, function (args: any) {
      const { path, createError } = this;
      const valueForValidate = Array.isArray(args)
        ? args.length
        : parseFloat(args);
      const forCompare = ref ? parseFloat(this.parent[ref]) : value;
      if (valueForValidate >= forCompare) return true;
      else
        return createError({
          path,
          message,
        });
    });
  },
);
Yup.addMethod(
  Yup.string,
  "customLess",
  function (value: number, message: string, ref: string) {
    return this.test("custom-less", message, function (args: any) {
      const { path, createError } = this;
      const valueForValidate = Array.isArray(args)
        ? args.length
        : parseFloat(args);

      const forCompare = ref ? parseFloat(this.parent[ref]) : value;
      if (valueForValidate < forCompare) return true;
      else
        return createError({
          path,
          message,
        });
    });
  },
);
export const typeValidationMap: IValidationMap = {
  component: Yup.mixed().nullable(),
  text: Yup.string(),
  select: Yup.array(),
  multiselect: Yup.array(),
  date: Yup.string(),
  number: Yup.string(),
  autocomplete: Yup.array(),
  check: Yup.string(),
  radio: Yup.string(),
  rating: Yup.number(),
  slider: Yup.number(),
  switch: Yup.boolean(),
  time: Yup.string(),
  geo: Yup.string(),
};

export const validationFunctions: IValidationFunctions = {
  required: (schema: any, { message, when, reference }: any) =>
    when
      ? schema.when(when.name, {
          is: when.expression,
          then: (schema: any) => schema.customRequired(message),
          otherwise: (schema: any) => schema,
        })
      : schema.customRequired(message),
  length: (schema: any, { message, value, when, reference }: any) =>
    when
      ? schema.when(when.name, {
          is: when.expression,
          then: (schema: any) =>
            schema.length(reference ? Yup.ref(reference) : value, message),
          otherwise: (schema: any) => schema,
        })
      : schema.length(reference ? Yup.ref(reference) : value, `${message}`),
  min: (schema: any, { message, value, when, reference }: any) =>
    when
      ? schema.when(when.name, {
          is: when.expression,
          then: (schema: any) => schema.customMin(value, message, reference),
          otherwise: (schema: any) => schema,
        })
      : schema.customMin(value, message, reference),
  max: (schema: any, { message, value, when, reference }: any) =>
    when
      ? schema.when(when.name, {
          is: when.expression,
          then: (schema: any) => schema.customMax(value, message, reference),
          otherwise: (schema: any) => schema,
        })
      : schema.customMax(value, message, reference),
  moreThan: (schema: any, { message, value, when, reference }: any) =>
    when
      ? schema.when(when.name, {
          is: when.expression,
          then: (schema: any) => schema.customMore(value, message, reference),
          otherwise: (schema: any) => schema,
        })
      : schema.customMore(value, message, reference),
  lessThan: (schema: any, { message, value, when, reference }: any) =>
    when
      ? schema.when(when.name, {
          is: when.expression,
          then: (schema: any) => schema.customLess(value, message, reference),
          otherwise: (schema: any) => schema,
        })
      : schema.customLess(value, message, reference),
  integer: (schema: any, { message, when, reference }: any) =>
    when
      ? schema.when(when.name, {
          is: when.expression,
          then: (schema: any) => schema.integer(message),
          otherwise: (schema: any) => schema,
        })
      : schema.integer(message),
  positive: (schema: any, { message, when, reference }: any) =>
    when
      ? schema.when(when.name, {
          is: when.expression,
          then: (schema: any) => schema.positive(message),
          otherwise: (schema: any) => schema,
        })
      : schema.positive(message),
  negative: (schema: any, { message, when, reference }: any) =>
    when
      ? schema.when(when.name, {
          is: when.expression,
          then: (schema: any) => schema.negative(message),
          otherwise: (schema: any) => schema,
        })
      : schema.negative(message),
  regex: (schema: any, { message, value, when, reference }: any) =>
    when
      ? schema.when(when.name, {
          is: when.expression,
          then: (schema: any) =>
            schema.matches(reference ? Yup.ref(reference) : value, message),
          otherwise: (schema: any) => schema,
        })
      : schema.matches(reference ? Yup.ref(reference) : value, message),
  email: (schema: any, { message, when, reference }: any) =>
    when
      ? schema.when(when.name, {
          is: when.expression,
          then: (schema: any) => schema.email(message),
          otherwise: (schema: any) => schema,
        })
      : schema.email(message),
  url: (schema: any, { message, when, reference }: any) =>
    when
      ? schema.when(when.name, {
          is: when.expression,
          then: (schema: any) => schema.url(message),
          otherwise: (schema: any) => schema,
        })
      : schema.url(message),
  oneOf: (schema: any, { message, value, when, reference }: any) =>
    when
      ? schema.when(when.name, {
          is: when.expression,
          then: (schema: any) =>
            schema.oneOf(reference ? Yup.ref(reference) : value, message),
          otherwise: (schema: any) => schema,
        })
      : schema.oneOf(reference ? Yup.ref(reference) : value, message),
  tests: (schema: any, tests: ITest[]) => {
    let tempSchema = schema;
    tests.forEach(({ message, test }: ITest, index) => {
      tempSchema = tempSchema.test(
        `test-${index}`,
        message,
        (args: any, context: any) => {
          const { path, createError } = context;
          const result = test(context.parent);
          if (result) {
            return createError({
              path,
              message,
            });
          }
          return !result;
        },
      );
    });
    return tempSchema;
  },
};

export const initForm = (
  controls: IGenericControls[],
  endpointPath: string,
  idForEdit: any,
  connectionMode: IConnectionMode,
) => {
  const initialFormData: any = {};
  const validationSchema: any = {};
  let dataSet: any = {};
  controls
    .filter((control) => control.name.length)
    .forEach(
      ({
        name,
        type,
        defaultValue,
        validations,
        url,
        options,
        multiple,
      }: any) => {
        initialFormData[name] = defaultValue ?? defaultValueMap[type as never];
        if (optionsComponents.includes(type) && url) {
          if (options)
            mode &&
              console.log(
                Date.now(),
                `El control ${name} tiene url y opciones, los datos que mostrará vendrán del servicio correspondiente`,
              );
          dataSet[name] = url;
        }
        if (validations) {
          validationSchema[name] = typeValidationMap[type as never];
          Object.keys(validations).forEach((validatorKey) => {
            const validator = validationFunctions[validatorKey];
            if (validator) {
              validationSchema[name] = validator(validationSchema[name], {
                ...validations[validatorKey],
                type,
              });
            }
          });
        }
        // dataset = fillDataset(dataset, connectionMode);
      },
    );
  return { initialFormData, validationSchema, dataSet };
};
const optionsComponents = ["select", "multiselect", "autocomplete", "radio"];
const fillDataset = (dataset: any, connectionMode: IConnectionMode) => {
  Object.keys(dataset).map((key) => {
    axios.get(dataset[key]).then(({ data }: any) => (dataset[key] = data));
  });
  return dataset;
};
