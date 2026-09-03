import {
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  RadioGroup,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";

import { Radios } from "../auxiliar-components/radios-items.auxiliar";
import useFormDataSource from "@/_pwa-framework/hooks/form/use-form-data-source";
import { useFormikContext } from "formik";

export const BasicRadioFields = ({
  id,
  gridSx,
  initialValue,
  gridValues,
  name,
  label,
  disabled,
  hidden,
  sx,
  radios,
  options,
  direction,
  labelPlacement,
  validations,
  disabledOnEdit,
  editMode,
  onChangeCallback,
  persist,
}: any) => {
  const [dataSource] = useFormDataSource();
  const [items, setItems] = useState(dataSource?.[name] ?? options ?? radios);
  const ref = useFormikContext();
  const { setFieldValue, setFieldTouched, values, touched, errors } =
    useFormikContext();

  const error = (touched as any)[name] && (errors as any)[name];
  const value = (values as any)[name] ?? "";

  const handleChange = useCallback((event: any) => {
    onChangeCallback?.(event, ref);
    console.log(event.target.value);
    setFieldValue(name, event.target.value, true);
    setFieldTouched(name);
  }, []);

  useEffect(() => {
    setFieldValue(name, initialValue ?? "", false);
  }, [initialValue]);

  useEffect(() => {
    console.log(
      "Persist",
      name,
      hidden?.(values),
      persist,
      values,
      hidden?.(values) && !persist
    );
    if (hidden?.(values) && !persist) {
      setFieldValue(name, initialValue ?? "", false);
    }
  }, [value]);

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
      <FormControl
        id={id ?? name}
        disabled={(editMode && disabledOnEdit) || disabled?.(values)}
      >
        <FormLabel>{label}</FormLabel>
        <RadioGroup
          name={name}
          row={direction === "row"}
          value={value}
          onChange={handleChange}
          sx={sx}
        >
          <Radios items={items} labelPlacement={labelPlacement} />
        </RadioGroup>
        <FormHelperText sx={{ color: "#d32f2f" }}>{error}</FormHelperText>
      </FormControl>
    </Grid>
  );
};
