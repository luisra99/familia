import { Checkbox, FormControlLabel, Grid } from "@mui/material";
import { useCallback, useEffect, useState } from "react";

import { useFormikContext } from "formik";

export const BasicCheckFields = ({
  id,
  gridSx,
  defaultValue,
  gridValues,
  name,
  label,
  disabled,
  hidden,
  sx,
  labelPlacement,
  color,
  customIcons,
  onChange,
  disabledOnEdit,
  editMode,
  persist,
}: any) => {
  const { setFieldValue, setFieldTouched, values, touched, errors } =
    useFormikContext();

  const error = (touched as any)[name] && (errors as any)[name];
  const value = (values as any)[name];
  const [iconProps, setIconProps] = useState<any>({});
  const [style, setStyle] = useState<any>(sx ?? {});
  const handleChange = useCallback((event: any) => {
    onChange?.(event);
    setFieldValue(name, event?.target?.checked, false);
    setFieldTouched(name);
  }, []);

  useEffect(() => {
    setFieldValue(name, defaultValue ?? false, false);
  }, [defaultValue]);

  useEffect(() => {
    setStyle((style: any) => {
      style["&.Mui-checked"] = { color };
      return style;
    });
  }, [color]);

  return (
    <Grid
      item
      display={hidden?.(values) ? "none" : "unset"}
      xs={gridValues?.xs}
      sm={gridValues?.sm}
      md={gridValues?.md}
      lg={gridValues?.lg}
      xl={gridValues?.xl}
      sx={gridSx}
    >
      <FormControlLabel
        id={id ?? name}
        name={name}
        control={<Checkbox sx={style} {...iconProps} />}
        label={label}
        checked={value}
        disabled={(editMode && disabledOnEdit) || disabled?.(values)}
        onChange={handleChange}
        labelPlacement={labelPlacement}
      />
    </Grid>
  );
};
