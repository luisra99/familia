import {
  IDisableFunction,
  IGridValues,
  IOnChangeFunction,
} from "@/_pwa-framework/genforms/types/common.types";
import {
  obtenerMiembros,
  obtenerMiembrosMayoresDe15,
  obtenerMiembrosMayoresDe18,
  obtenerMiembrosMenoresDe18,
} from "@/app/user-interfaces/forms/models/controllers.miembrohogar";
import { useEffect, useState } from "react";

import { IGenericControls } from "@/_pwa-framework/genforms/types/controls/controls.types";
import { ISelectValidation } from "@/_pwa-framework/genforms/types/validation.types";
import { SxProps } from "@mui/system";

export function SelectMiembros(args: {
  validations?: ISelectValidation;
  checkValues?: any[];
  useRef?: any;
  multiple?: "native" | "check" | "chips";
  group?: boolean;
  defaultValue?: string | string[];
  url?: string;
  name: string;
  label: string;
  id?: string;
  placeholder?: string;
  sx?: SxProps;
  gridValues?: IGridValues;
  disabled?: IDisableFunction;
  hidden?: IDisableFunction;
  onChange?: IOnChangeFunction;
}): IGenericControls {
  const [miembros, setMiembros] = useState<any>(null);
  useEffect(() => {
    obtenerMiembros().then((data) => {
      setMiembros(data);
    });
  }, []);

  return (
    miembros && {
      ...args,
      type: "select",
      options: miembros,
    }
  );
}
export function SelectMiembrosMayores18(
  label: string,
  name: string,
  gridValues: IGridValues,
  checkValues?: any
): IGenericControls {
  const [miembros, setMiembros] = useState<any>(null);
  useEffect(() => {
    obtenerMiembrosMayoresDe18().then((data) => {
      setMiembros(data);
    });
  }, []);

  return (
    miembros && {
      type: "select",
      label,
      name,
      gridValues,
      options: miembros,
      checkValues,
    }
  );
}
export function SelectMiembrosMenores18(
  label: string,
  name: string,
  gridValues: IGridValues,
  checkValues?: any
): IGenericControls {
  const [miembros, setMiembros] = useState<any>(null);
  useEffect(() => {
    obtenerMiembrosMenoresDe18().then((data) => {
      setMiembros(data);
    });
  }, []);

  return (
    miembros && {
      type: "select",
      label,
      name,
      gridValues,
      options: miembros,
      checkValues,
    }
  );
}
export function SelectMiembrosMayores15(
  label: string,
  name: string,
  gridValues: IGridValues,
  checkValues?: any
): IGenericControls {
  const [miembros, setMiembros] = useState<any>(null);
  useEffect(() => {
    obtenerMiembrosMayoresDe15().then((data) => {
      setMiembros(data);
    });
  }, []);

  return (
    miembros && {
      type: "select",
      label,
      name,
      gridValues,
      options: miembros,
      checkValues,
    }
  );
}
