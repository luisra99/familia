import { FormControl, FormHelperText, Grid } from "@mui/material";
import { useCallback, useEffect } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { MobileTimePicker } from "@mui/x-date-pickers";
import { esES } from "@mui/x-date-pickers/locales";
import dayjs, { Dayjs } from "dayjs";
import { useFormikContext } from "formik";

export const BasicTimeFields = (props: any) => {
  const {
    name,
    gridSx,
    label,
    disabled,
    hidden,
    sx,
    validations,
    gridValues,
    disabledOnEdit,
    editMode,
    initialValue,
    persist,
  } = props;

  const { setFieldValue, setFieldTouched, values, touched, errors } =
    useFormikContext();

  const error = (touched as any)[name] && (errors as any)[name];
  const value = (values as any)[name];

  const handleChange = useCallback(
    (newValue: Dayjs | null) => {
      if (newValue && newValue.isValid()) {
        setFieldValue(name, newValue.format("HH:mm:ss"), false);
      } else {
        setFieldValue(name, "", false);
      }
      setFieldTouched(name, true, false);
    },
    [name, setFieldValue, setFieldTouched]
  );

  useEffect(() => {
    if (initialValue) {
      const dayjsTime = dayjs(initialValue, "HH:mm:ss");
      setFieldValue(name, dayjsTime.isValid() ? initialValue : "", false);
    }
  }, [initialValue, name, setFieldValue]);

  // Convert the string value to Dayjs object for the picker
  const dayjsValue =
    value && dayjs(value, "HH:mm:ss").isValid()
      ? dayjs(value, "HH:mm:ss")
      : null;
      const valueRef=typeof value=="object"?JSON.stringify(value):value
      
  useEffect(() => {
    if (hidden?.(values) && !persist) {
      const dayjsTime = dayjs(initialValue, "HH:mm:ss");
      setFieldValue(name, dayjsTime.isValid() ? initialValue : "", false);
    }
  }, [valueRef]);

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
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        localeText={
          esES.components.MuiLocalizationProvider.defaultProps.localeText
        }
      >
        <FormControl sx={{ ...sx, width: "100%" }}>
          <MobileTimePicker
            label={
              <label>
                {label}
                {validations?.required && <b style={{ color: "red" }}> * </b>}
              </label>
            }
            name={name}
            value={dayjsValue}
            disabled={(editMode && disabledOnEdit) || disabled?.(values)}
            onChange={handleChange}
            format="HH:mm:ss"
            slotProps={{
              textField: {
                error: false, // Explicitly disable error styling
              },
            }}
          />
          {error && (
            <FormHelperText sx={{ color: "#d32f2f" }}>{error}</FormHelperText>
          )}
        </FormControl>
      </LocalizationProvider>
    </Grid>
  );
};
