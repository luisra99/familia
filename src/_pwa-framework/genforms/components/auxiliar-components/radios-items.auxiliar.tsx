import { FormControlLabel, Radio } from "@mui/material";

export const Radios = ({ items, labelPlacement }: any) =>
  items?.map((option: any) => (
    <FormControlLabel
      key={option.idconcepto}
      value={option.idconcepto}
      control={<Radio />}
      label={option.denominacion}
      labelPlacement={labelPlacement}
    />
  ));
