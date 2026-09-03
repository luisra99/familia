import { Grid } from "@mui/material";

export const GridContainer = ({ hideButtons, sx, children }: any) => {
  return (
    <Grid container spacing={1} p={hideButtons ? 0 : 2} sx={sx}>
      {children}
    </Grid>
  );
};
