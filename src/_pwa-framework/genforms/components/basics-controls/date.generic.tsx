import { FormControl, FormHelperText, Grid } from "@mui/material";
import { useCallback, useEffect } from "react";
import "dayjs/locale/es";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { MobileDatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { esES } from "@mui/x-date-pickers/locales";
import { useFormikContext } from "formik";

export const BasicDateFields = ({
  name,
  gridValues,
  label,
  disabled,
  gridSx,
  hidden,disableFuture,
  sx,
  validations,
  disabledOnEdit,
  editMode,
  initialValue,
  persist,
}: any) => {
  const { setFieldValue, setFieldTouched, values, touched, errors } =
    useFormikContext();

  const error = (touched as any)[name] && (errors as any)[name];
  const value = (values as any)[name];

  const handleChange = useCallback(
    (newValue: Dayjs | null) => {
      if (newValue && newValue.isValid()) {
        setFieldValue(name, newValue.format("DD/MM/YYYY"), true);
      } else {
        setFieldValue(name, "", true);
      }
      setFieldTouched(name, true, false);
    },
    [name, setFieldValue, setFieldTouched]
  );

  useEffect(() => {
    if (initialValue) {
      const dayjsDate = dayjs(initialValue, "DD/MM/YYYY");
      setFieldValue(name, dayjsDate.isValid() ? initialValue : "", false);
    }
  }, [initialValue, name, setFieldValue]);

  // Convert the string value to Dayjs object for the picker
  const dayjsValue =
    value && dayjs(value, "DD/MM/YYYY").isValid()
      ? dayjs(value, "DD/MM/YYYY")
      : null;
      const valueRef=typeof value=="object"?JSON.stringify(value):value
  useEffect(() => {
    if (hidden?.(values) && !persist) {
      const dayjsDate = dayjs(initialValue, "DD/MM/YYYY");
      setFieldValue(name, dayjsDate.isValid() ? initialValue : "", false);
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
        adapterLocale="es"
        localeText={
          esES.components.MuiLocalizationProvider.defaultProps.localeText
        }
      >
        <FormControl sx={{ ...sx, width: "100%" }} error={!!error}>
          <MobileDatePicker
            label={
              <label>
                {label}
                {validations?.required && <b style={{ color: "red" }}> * </b>}
              </label>
            }
            disableFuture={disableFuture}
            name={name}
            disabled={(editMode && disabledOnEdit) || disabled?.(values)}
            value={dayjsValue}
            onChange={handleChange}
            format="DD/MM/YYYY"
            slotProps={{
              textField: {
                error: !!error,
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
