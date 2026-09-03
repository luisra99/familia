import { FC } from "react";
import type { SvgIconProps } from "@mui/material/SvgIcon";

export type ISpeedDialAction = {
  icon: FC<SvgIconProps>;
  name: string;
  action: () => void;
  modal?: string;
};
export type ISpeedDialActions = ISpeedDialAction[];
