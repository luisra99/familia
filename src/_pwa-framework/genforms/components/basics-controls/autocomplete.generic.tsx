import { Autocomplete, Grid, TextField } from "@mui/material";
import { useCallback, useEffect, useState } from "react";

import useFormDataSource from "@/_pwa-framework/hooks/form/use-form-data-source";
import { useFormikContext } from "formik";

export const BasicAutocompleteFields = ({
  id,
  gridSx,
  initialValue,
  gridValues,
  name,
  label,
  disabled,
  hidden,
  placeholder,
  sx,
  multiple,
  options,
  validations,
  formValue,
  disabledOnEdit,
  editMode,
  persist,
}: any) => {
  const [dataSource] = useFormDataSource();

  const [items, setItems] = useState(dataSource?.[name] ?? options ?? []);
  const { setFieldValue, setFieldTouched, values, touched, errors } =
    useFormikContext();

  const error = (touched as any)[name] && (errors as any)[name];
  const value = (values as any)[name];

  useEffect(() => {
    setFieldValue(name, initialValue, false);
  }, [initialValue]);

  const handleChange = useCallback(
    (e: any, newValue: any, reason: any, details: any) => {
      if (multiple && !!details) {
        const cloned = structuredClone(formValue);
        const selectedOption = JSON.stringify(details.option);
        const index = cloned.findIndex(
          (option: any) => JSON.stringify(option) == selectedOption
        );
        if (index === -1) {
          cloned.push(details.option);
        } else {
          cloned.splice(index, 1);
        }
        setFieldValue(name, cloned, true);
        return;
      }
      setFieldValue(name, newValue, true);
    },
    []
  );

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
      <Autocomplete
        id={id ?? name}
        fullWidth
        options={items}
        multiple={!!multiple}
        autoComplete
        disabled={(editMode && disabledOnEdit) || disabled?.(values)}
        onChange={handleChange}
        value={formValue}
        sx={sx}
        autoHighlight
        getOptionLabel={(option: any) => option?.label ?? ""}
        renderInput={(params: any) => (
          <TextField
            {...params}
            label={
              <label>
                {label}
                {validations?.required && <b style={{ color: "red" }}> * </b>}
              </label>
            }
            placeholder={placeholder}
          />
        )}
      />
    </Grid>
  );
};
