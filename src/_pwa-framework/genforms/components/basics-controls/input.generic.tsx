import { Grid, TextField } from "@mui/material";
import { useCallback, useEffect } from "react";

import { useFormikContext } from "formik";
import { useLanguage } from "@/_pwa-framework/hooks/use-language";

export const BasicTextFields = ({
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
  pattern,
  sx,
  onChange,
  validations,
  multiline,
  disabledOnEdit,
  editMode,
  persist,
  helperText,
}: any) => {
  const { t } = useLanguage();
  const { setFieldValue, setFieldTouched, values, touched, errors } =
    useFormikContext();

  const error = (touched as any)[name] && (errors as any)[name];
  const value = (values as any)[name];

  const handleChange = useCallback((e: any) => {
    onChange?.(typeof e === "string" ? e.trim() : e);
    setFieldValue(name, e.target.value?.trimStart(), true);
    setFieldTouched(name);
  }, []);

  useEffect(() => {
    setFieldValue(name, initialValue ?? "", false);
  }, [initialValue]);
  const valueRef=typeof value=="object"?JSON.stringify(value):value

  useEffect(() => {
    if (hidden?.(values) && !persist)
      setFieldValue(name, initialValue ?? "", false);
  }, [valueRef]);

function blocksInvalidChars(text: string) {
  for (const ch of text) if (!pattern.test(ch)) return true;
  return false;
}

  const helperMessage =
    typeof helperText === "function"
      ? helperText(values)
      : helperText;
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
  multiline={!!multiline}
  minRows={multiline?.minRows}
  maxRows={multiline?.maxRows}
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
  value={value ?? ""}
  error={error}
  helperText={error || helperMessage}
  onKeyDown={(e) => {
    // Evita usar keyCode (deprecado). Permite teclas de control.
    if (e.key.length === 1 && !pattern.test(e.key)) {
      e.preventDefault();
    }
  }}
  onBeforeInput={(e) => {
    // Cubre entradas compuestas (IME) y pegados en algunos navegadores
    const data = (e as any).data as string | undefined;
    if (data && blocksInvalidChars(data)) e.preventDefault();
  }}
  onPaste={(e) => {
    const text = e.clipboardData.getData("text");
    if (blocksInvalidChars(text)) {
      e.preventDefault(); // bloquea pegado si trae algo inv�lido
    }
  }}
  onDrop={(e) => {
    // Evita que arrastren texto inv�lido dentro del campo
    const text = e.dataTransfer?.getData("text") ?? "";
    if (blocksInvalidChars(text)) {
      e.preventDefault();
    }
  }}
  onChange={handleChange}
/>

    </Grid>
  );
};
