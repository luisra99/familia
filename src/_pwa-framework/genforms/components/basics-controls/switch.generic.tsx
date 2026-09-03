import { FormControlLabel, Grid, Switch } from "@mui/material";
import { useCallback, useEffect } from "react";

import { useFormikContext } from "formik";

export const BasicSwitchFields = (props: any) => {
  const {
    id,
    name,
    gridSx,
    label,
    initialValue,
    disabled,
    sx,
    labelPlacement,
    color,
    gridValues,
    hidden,
  } = props;

  const style: any = {
    ...sx,
    "& .MuiSwitch-switchBase.Mui-checked": {
      color,
    },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
      backgroundColor: color,
    },
  };
  const { setFieldValue, setFieldTouched, values, touched, errors } =
    useFormikContext();

  const error = (touched as any)[name] && (errors as any)[name];
  const value = (values as any)[name];

  const handleChange = useCallback((event: any) => {
    setFieldValue(name, event?.target?.checked, false);
  }, []);
  useEffect(() => {
    setFieldValue(name, initialValue ?? false, false);
  }, [initialValue]);

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
        name={name}
        id={id ?? name}
        control={<Switch sx={style} />}
        label={label}
        checked={value}
        disabled={disabled?.(values)}
        onChange={handleChange}
        labelPlacement={labelPlacement}
      />
    </Grid>
  );
};
