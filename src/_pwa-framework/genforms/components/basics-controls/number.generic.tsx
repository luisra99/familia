import { Grid, InputAdornment, TextField } from "@mui/material";
import { useCallback, useEffect } from "react";
import { useFormikContext } from "formik";
import { useLanguage } from "@/_pwa-framework/hooks/use-language";

export const BasicNumberFields = ({
  id,
  gridSx,
  initialValue,
  gridValues,
  name,
  label,
  color,
  disabled,
  hidden,
  focused,
  placeholder,
  sx,
  onChange,
  validations,
  disabledOnEdit,
  editMode,
  persist,
  format,
  decimalScale,
  prefix = "",
  allowNegative = false,
  negativeValues,
}: any) => {
  const { t } = useLanguage();
  const { setFieldValue, setFieldTouched, values, touched, errors } =
    useFormikContext();

  const error = (touched as any)[name] && (errors as any)[name];
  const value = (values as any)[name] ?? "";

  const resolvedDecimalScale =
    format === "units" ? 0 : format === "finance" ? 2 : decimalScale ?? 2;
  const resolvedAllowNegative = negativeValues ?? allowNegative;

  const handleChange = useCallback(
    (e: any) => {
      let val = e.target.value;

      // Quitamos el prefijo si lo tiene visualmente
      if (prefix && val.startsWith(prefix)) {
        val = val.slice(prefix.length);
      }

      // Validación básica
      if (val !== "" && !/^-?\d*\.?\d*$/.test(val)) return;
      if (resolvedDecimalScale === 0) {
        val = val.replace(/\./g, "");
      }
      const [, decimalPart] = val.split(".");
      if (
        decimalPart !== undefined &&
        decimalPart.length > resolvedDecimalScale
      )
        return;
      setFieldValue(name, val);
      setFieldTouched(name);
      onChange?.({ ...e, value: val });
    },
    [resolvedDecimalScale, prefix, setFieldValue, setFieldTouched, onChange],
  );

  useEffect(() => {
    setFieldValue(name, initialValue ?? "", false);
  }, [initialValue]);

  useEffect(() => {
    const valueRef = typeof value === "object" ? JSON.stringify(value) : value;
    if (hidden?.(values) && !persist) {
      setFieldValue(name, initialValue ?? "", false);
    }
  }, [value]);

  const handleKeyDown = (e: any) => {
    const allowedKeys = [
      "Backspace",
      "Tab",
      "ArrowLeft",
      "ArrowRight",
      "Delete",
      "Home",
      "End",
    ];

    if (allowedKeys.includes(e.key)) return;

    const isNumber = /^[0-9]$/.test(e.key);
    const isDot = e.key === ".";
    const isNegative = e.key === "-";

    if (isNumber) return;

    if (
      isDot &&
      resolvedDecimalScale > 0 &&
      !e.currentTarget.value.includes(".")
    ) {
      return;
    }

    if (
      isNegative &&
      resolvedAllowNegative &&
      !e.currentTarget.value.includes("-") &&
      e.currentTarget.selectionStart === 0
    ) {
      return;
    }

    e.preventDefault();
  };

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
      <TextField
        fullWidth
        id={id ?? name}
        name={name}
        label={
          <label>
            {t(label)}
            {validations?.required && <b style={{ color: "red" }}> * </b>}
          </label>
        }
        color={color}
        focused={focused}
        placeholder={t(placeholder)}
        disabled={(editMode && disabledOnEdit) || disabled?.(values)}
        sx={sx}
        value={`${prefix}${value}`}
        error={!!error}
        helperText={error}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        InputProps={{
          startAdornment: prefix && (
            <InputAdornment position="start">{prefix}</InputAdornment>
          ),
        }}
        variant="outlined"
      />
    </Grid>
  );
};
