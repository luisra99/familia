import { Box, Grid, Slider, Stack, Typography } from "@mui/material";
import { useCallback, useEffect } from "react";

import { useFormikContext } from "formik";

export const BasicSliderFields = ({
  name,
  label,
  disabled,
  initialValue,
  gridSx,
  hidden,
  sx,
  startIcon,
  endIcon,
  min,
  max,
  validations,
  gridValues,
}: any) => {
  const { setFieldValue, setFieldTouched, values, touched, errors } =
    useFormikContext();

  const error = (touched as any)[name] && (errors as any)[name];
  const value = (values as any)[name];

  const handleSliderChange = useCallback(
    (event: Event, newValue: number | number[]) => {
      setFieldValue(name, newValue, false);
    },
    []
  );
  useEffect(() => {
    setFieldValue(name, initialValue ?? 0, false);
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
      <Box sx={{ width: "90%" }}>
        <Typography id="input-slider" gutterBottom>
          {label}
        </Typography>
        <Stack spacing={2} direction="row" sx={{ m: 1 }} alignItems="center">
          {startIcon}
          <Slider
            name={name}
            min={min}
            max={max}
            value={(values as any)[name] ?? 0}
            onChange={handleSliderChange}
            valueLabelDisplay="auto"
            sx={sx}
            disabled={disabled?.(values)}
          />
          {endIcon}
        </Stack>
      </Box>
    </Grid>
  );
};
