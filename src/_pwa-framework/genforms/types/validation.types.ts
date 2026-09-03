import { EControlsForValidate } from "./common.types";
import { Schema } from "yup";

export interface ITestFunction {
  /**
   * @param values Valore del formulario.
   * @returns Define si la validación se cumple o no.
   */
  (values?: any): boolean | void;
}
/**
 * Prueba para validar el campo
 */
export type ITest = {
  /**
   * Mensaje que se mostrará en el error.
   *
   * @type {string}
   */
  message: string;

  /**
   * Función que valida el campo.
   *
   * @type {ITestFunction}
   */
  test: ITestFunction;
};
export type ICustomValidation = {
  tests?: ITest[];
};

export type ITextValidation = {
  required?: IRequiredValidation;
  regex?: IRegexValidation;
  email?: IEmailValidation;
  url?: IUrlValidation;
  lowercase?: ILowerCaseValidation;
  uppercase?: IUppercaseValidation;
  trim?: ITrimValidation;
  length?: ILimitsProps;
} & ILimitsValidation &
  ICustomValidation;

export type IPhoneOrEmail = {
  required?: IRequiredValidation;
  regex?: IRegexValidation;
  email?: IEmailValidation;
} & ILimitsValidation;

export type IWhenValidation = {
  when?: { name: string; expression: (value: any) => boolean };
};

export type INumberValidation = {
  required?: IRequiredValidation;
  length?: ILimitsProps;
  positive?: IPositiveValidation;
  negative?: INegativeValidation;
  integer?: IIntegerValidation;
} & IComparativeValidations &
  ILimitsValidation &
  ICustomValidation;

export type IDateValidation = {
  required?: IRequiredValidation;
} & ILimitsValidation &
  ICustomValidation;

export type IRadioValidations = {
  required?: IRequiredValidation;
} & ICustomValidation;

export type IGeoValidations = {
  required?: IRequiredValidation;
} & ICustomValidation;

export type ISelectValidation = {
  required?: IRequiredValidation;
} & ILimitsValidation &
  ICustomValidation;

export type IMultiSelectValidation = {
  length?: IArrayLengthValidation;
  required?: IRequiredValidation;
} & ILimitsValidation &
  ICustomValidation;

export type IRatingValidations = ILimitsValidation &
  IComparativeValidations &
  ICustomValidation;
export type ISliderValidations = IRatingValidations & ICustomValidation;

type IRequiredValidation = ICommonValidationsProps;
type IEmailValidation = ICommonValidationsProps;
type IUrlValidation = ICommonValidationsProps;
type ILowerCaseValidation = ICommonValidationsProps;
type IUppercaseValidation = ICommonValidationsProps;
type ITrimValidation = ICommonValidationsProps;
type INegativeValidation = ICommonValidationsProps;
type IPositiveValidation = ICommonValidationsProps;
type IIntegerValidation = ICommonValidationsProps;

type IRegexValidation = {
  reference?: string;
  value: RegExp;
} & ICommonValidationsProps;

type IArrayLengthValidation = {
  reference?: string;
  value: number;
} & ICommonValidationsProps;

type ICommonValidationsProps = {
  message: string;
} & IWhenValidation;

type ILimitsProps = {
  reference?: string;
  value: number;
} & ICommonValidationsProps;

type ILessThanValidations = {
  reference?: string;
  value: number;
} & ICommonValidationsProps;

type IMoreThanValidations = {
  reference?: string;
  value: number;
} & ICommonValidationsProps;

type ILimitsValidation = {
  min?: ILimitsProps;
  max?: ILimitsProps;
};

type IComparativeValidations = {
  lessThan?: ILessThanValidations;
  moreThan?: IMoreThanValidations;
};
export type IValidationMap = Record<EControlsForValidate, Schema>;
export type IValidationSchemaMap = {
  required: IRequiredSchema;
  length: ILengthSchema;
  min: IMinSchema;
  max: IMaxSchema;
  moreThan: IMoreThanSchema;
  lessThan: ILessThanSchema;
  integer: IIntegerSchema;
  positive: IPositiveSchema;
  negative: INegativeSchema;
  regular_expression: IRegExpSchema;
  email: IEmailSchema;
  url: IUrlSchema;
  oneOf: IOneOfSchema;
  tests: ITestsSchema;
};

export type EValidations =
  | "required"
  | "length"
  | "email"
  | "url"
  | "regular_expression"
  | "min"
  | "max"
  | "integer"
  | "moreThan"
  | "lessThan"
  | "positive"
  | "negative"
  | "tests"
  | "oneOf";
export type IValidationFunctions = Record<
  string,
  (schema: any, params: any) => any
>;
export type IRequiredSchema = {
  required: (schema: any, { message }: any) => any;
};
export type ILengthSchema = {
  length: (schema: any, { message, value, ref }: any) => any;
};
export type IMinSchema = {
  min: (schema: any, { message, value, ref }: any) => any;
};
export type IMaxSchema = {
  max: (schema: any, { message, value, ref }: any) => any;
};
export type IMoreThanSchema = {
  moreThan: (schema: any, { message, value, ref }: any) => any;
};
export type ILessThanSchema = {
  lessThan: (schema: any, { message, value, ref }: any) => any;
};
export type IIntegerSchema = {
  integer: (schema: any, { message }: any) => any;
};
export type IPositiveSchema = {
  positive: (schema: any, { message }: any) => any;
};
export type INegativeSchema = {
  negative: (schema: any, { message }: any) => any;
};
export type IRegExpSchema = {
  regular_expression: (schema: any, { message, value, ref }: any) => any;
};
export type IEmailSchema = { email: (schema: any, { message }: any) => any };
export type IUrlSchema = { url: (schema: any, { message }: any) => any };
export type IOneOfSchema = {
  oneOf: (schema: any, { message, value, ref }: any) => any;
};
export type ITestsSchema = {
  tests: (schema: any, tests: ITest[]) => any;
};
