import {
  Button,
  CircularProgress,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { useCallback, useEffect, useState } from "react";

import { useFormikContext } from "formik";
import { useLanguage } from "@/_pwa-framework/hooks/use-language";

export const GeoLocationField = ({
  id,
  gridSx,
  gridValues,
  name,
  label,
  disabled,
  hidden,
  sx,
  onChange,
  validations,
  persist,
  helperText,
  highAccuracy = true, // prop configurable: enableHighAccuracy del navigator
  timeout = 10000,
  maximumAge = 0,
}: any) => {
  const { t } = useLanguage();
  const { setFieldValue, setFieldTouched, values, touched, errors } =
    useFormikContext();

  const [loading, setLoading] = useState(false);
  const [geoError, setGeoError] = useState<string | null>(null);

  const fieldError = (touched as any)[name] && (errors as any)[name];
  const value = (values as any)[name];
  const valueRef = typeof value === "object" ? JSON.stringify(value) : value;

  const handleGetLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setGeoError("Tu navegador no soporta geolocalización");
      return;
    }

    setLoading(true);
    setGeoError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const coords = `${latitude}, ${longitude}`;
        setFieldValue(name, coords, true);
        setFieldTouched(name, true);
        onChange?.(coords);
        setLoading(false);
      },
      (error) => {
        let message =
          t("geolocation_error") || "No se pudo obtener la ubicación";
        if (error.code === error.PERMISSION_DENIED) {
          message = "Permiso de ubicación denegado";
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          message = "Ubicación no disponible";
        } else if (error.code === error.TIMEOUT) {
          message = "Se agotó el tiempo de espera";
        }
        setGeoError(message);
        setLoading(false);
      },
      {
        enableHighAccuracy: highAccuracy,
        timeout,
        maximumAge,
      },
    );
  }, [name, onChange, highAccuracy, timeout, maximumAge, t]);

  // Limpia el campo si se oculta y no debe persistir, igual que BasicTextFields
  useEffect(() => {
    if (hidden?.(values) && !persist) setFieldValue(name, "", false);
  }, [valueRef]);

  const helperMessage =
    typeof helperText === "function" ? helperText(values) : helperText;
  const displayedHelperText = geoError || fieldError || helperMessage;

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
        value={value}
        InputProps={{
          readOnly: true,
          endAdornment: (
            <InputAdornment position="end">
              {loading ? (
                <CircularProgress size={18} />
              ) : (
                <IconButton
                  aria-label={t("refresh_location") || "Actualizar ubicación"}
                  onClick={handleGetLocation}
                  disabled={loading}
                  edge="end"
                >
                  {loading ? <CircularProgress size={18} /> : <RefreshIcon />}
                </IconButton>
              )}
            </InputAdornment>
          ),
        }}
        placeholder="Ubicación"
        error={!!geoError || !!fieldError}
        helperText={displayedHelperText}
        disabled={disabled?.(values)}
        sx={sx}
      />
    </Grid>
  );
};
