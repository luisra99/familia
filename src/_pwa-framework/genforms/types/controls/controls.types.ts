// src / _pwa - framework / genforms / types / controls / controls.types.ts;
import {
  IChecks,
  ICommonProps,
  ICustomIcons,
  IInputProps,
  IOnChangeFunction,
  IOptionsProps,
  IRadios,
  ITimeControls,
  IconColor,
  IconNames,
} from "../common.types";
import {
  IDateValidation,
  IMultiSelectValidation,
  INumberValidation,
  IRadioValidations,
  IRatingValidations,
  ISelectValidation,
  ISliderValidations,
  ITextValidation,
} from "../validation.types";

export type IGenericControls =
  | IScanner
  | ITextField
  | ISelect
  | IMultiSelect
  | INumberField
  | IAutocomplete
  | IDatePicker
  | ITimePicker
  | IRadio
  | ICheck
  | ISwitch
  | ISlider
  | IRating
  | ICustomComponent
  | IGeoField;

export type ITextField = {
  /**
   * Tipo de control que desea crear.
   */
  type: "text";
  pattern?: RegExp;
  validations?: ITextValidation;
  hidden?: any;
  multiline?: multiline;
  helperText?: string | ((values: any) => string); // ← nueva propiedad
} & IInputProps;

export type IGeoField = {
  /**
   * Tipo de control que desea crear.
   */
  type: "geo";
  hidden?: any;
  helperText?: string | ((values: any) => string); // ← nueva propiedad
} & IInputProps;

type multiline =
  | {
      minRows?: number;
      maxRows?: number;
    }
  | boolean;

export type IScanner = {
  /**
   * Tipo de control que desea crear.
   */
  type: "scanner";
  parseFunction: (scannerResult: any) => Record<string, any>;
  closeOnScan: boolean;
} & ICommonProps;

export type IPhoneOrEmail = {
  /**
   * Tipo de control que desea crear.
   */
  type: "phoneOrEmail";
  validations?: IPhoneOrEmail;
} & IInputProps;

export type INumberField = {
  /**
   * Tipo de control que desea crear.
   */
  type: "number";
  format: "units" | "finance" | "other";
  mask?: string;
  decimalScale?: number;
  fixDecimalSeparator?: boolean;
  avoidSeparator?: boolean;
  prefix?: string;
  validations?: INumberValidation;
  negativeValues?: boolean;
} & IInputProps;

export type ISelect = {
  /**
   * Tipo de control que desea crear.
   */
  type: "select";
  validations?: ISelectValidation;
  checkValues?: any[];
  useRef?: any;
  showDelete?: boolean;
} & IOptionsProps;

export type IMultiSelect = {
  type: "multiselect";
  validations?: IMultiSelectValidation;
  checkValues?: any[];
  useRef?: any;
} & IOptionsProps;

export type IAutocomplete = {
  /**
   * Tipo de control que desea crear.
   */
  type: "autocomplete";
  validations?: ISelectValidation;
  loadingText?: string;
} & IOptionsProps;

export type IDatePicker = {
  /**
   * Tipo de control que desea crear.
   */
  type: "date";
  validations?: IDateValidation;
} & ITimeControls;

export type ITimePicker = {
  /**
   * Tipo de control que desea crear.
   */
  validations?: IDateValidation;
  type: "time";
} & ITimeControls;

export type IRadio = {
  /**
   * Tipo de control que desea crear.
   */
  type: "radio";
  direction?: "row" | "col";
  labelPlacement?: "top" | "start" | "bottom" | "end";
  radios?: IRadios[];
  validations?: IRadioValidations;
  url?: string;
  defaultValue?: string;
  onChangeCallback?: IOnChangeFunction;
} & ICommonProps;

export type ICheck = {
  /**
   * Tipo de control que desea crear.
   */
  type: "check";
} & IChecks &
  ICustomIcons;

export type ISwitch = {
  /**
   * Tipo de control que desea crear.
   */
  type: "switch";
} & IChecks;

export type IRating = {
  /**
   * Tipo de control que desea crear.
   */
  type: "rating";
  precision?: boolean;
  max?: number;
  color?: IconColor;
  defaultValue?: number;
  validations?: IRatingValidations;
} & ICommonProps &
  ICustomIcons;

export type ISlider = {
  /**
   * Tipo de control que desea crear.
   */
  type: "slider";
  startIcon?: IconNames;
  endIcon?: IconNames;
  step?: number;
  mark?: boolean;
  min: number;
  defaultValue?: number;
  max: number;
  validations?: ISliderValidations;
  valueLabelDisplay?: "auto" | "on" | "off";
} & ICommonProps;

export type ICustomComponent = {
  type: "component";
  // validations?:
  //   | ISliderValidations
  //   | IRatingValidations
  //   | ITextValidation
  //   | INumberValidation
  //   | ISelectValidation
  //   | IDateValidation
  //   | IRadioValidations;
  component: (props: {
    id?: any;
    initialValue?: any;
    gridValues?: any;
    name?: any;
    label?: any;
    disabled?: any;
    hidden?: any;
    sx?: any;
    component?: any;
    validations?: any;
    formValue?: any;
    error?: any;
    setFieldValue?: any;
    setFieldTouched?: any;
    values?: any;
  }) => any;
} & ICommonProps;
