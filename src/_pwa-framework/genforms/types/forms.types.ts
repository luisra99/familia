import { IGenericControls } from "./controls/controls.types";
import { SetStateAction } from "react";
import { SxProps } from "@mui/system";

export type IGForm = {
  name: string;
  title?: string;
  editTitle?: string;
  createTitle?: string;
  endpointPath: string;
  controls: IGenericControls[];
  showSpecificDescription?: boolean;
  idForEdit?: string | number |any| null;
  modalType?: "xs" | "sm" | "md" | "lg" | "xl" | "fullWith";
  description?: string;
  descriptionOnCreate?: string;
  descriptionOnEdit?: string;
  applyButton?: boolean;
  connectionMode?: IConnectionMode;
  setIdFunction?: (idForEdit: any) => void;
  submitFunction?: (
    values: any,
    name: string,
    idForEdit: any,
    event: any
  ) => void;
  getByIdFunction?: (idForEdit: any) => any;
  hideButtons?: boolean;
  nextButton?: IFormAction;
  prevButton?: IFormAction;
  saveOnDirty?: boolean;
  saveButton?: string;
  updateButton?: string;
  dataAction?: { label: string; action: (values: any) => void }[];
  notifyValidation?: (values?: any) => Promise<string | void> | string | void;
  applyDisabledFunction?: (values?: any) => boolean;
  acceptDisabledFunction?: (values?: any) => boolean;
  submitDisabledFunction?: (values?: any) => boolean;
  nextDisabledFunction?: (values?: any) => boolean;
  prevDisabledFunction?: (values?: any) => boolean;
  setExternalErrors?: SetStateAction<any>;
  sx?: SxProps;
  gridContainerSx?: SxProps;
};
export type IConnectionMode =
  | "multiple"
  | "unified"
  | "grouped"
  | "onDemand"
  | undefined;
type IFormAction = {
  text: string;
  action: (values?: any) => void;
  submitOnAction?: boolean;
};
