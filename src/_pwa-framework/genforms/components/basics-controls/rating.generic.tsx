import { Box, Grid, Rating, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";

import { useFormikContext } from "formik";

export const BasicRatingFields = ({
  id,
  gridSx,
  initialValue,
  gridValues,
  name,
  label,
  disabled,
  hidden,
  sx,
  customIcons,
  max,
  color,
  validations,
  persist,
}: any) => {
  const { setFieldValue, setFieldTouched, values, touched, errors } =
    useFormikContext();

  const error = (touched as any)[name] && (errors as any)[name];
  const value = (values as any)[name];
  const [iconProps, setIconProps] = useState<any>({});
  const [style, setStyle] = useState<any>(sx ?? {});
  const handleChange = useCallback(
    (event: Event, newValue: number | number[]) => {
      setFieldValue(name, newValue, true);
      setFieldTouched(name);
    },
    []
  );
  useEffect(() => {
    setFieldValue(name, initialValue ?? 0, false);
  }, [initialValue]);
  useEffect(() => {
    setStyle((style: any) => {
      style["& .MuiRating-iconFilled"] = { color };
      style["& .MuiRating-iconHover"] = { color };
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
      <Box
        sx={{
          "& > legend": { mt: 2 },
        }}
      >
        <Typography component="legend">{label}</Typography>
        <Rating
          value={value}
          name={name}
          id={id ?? name}
          onChange={handleChange}
          sx={style}
          max={max}
          precision={0.5}
          disabled={disabled?.(values)}
          {...iconProps}
        />
      </Box>
    </Grid>
  );
};
