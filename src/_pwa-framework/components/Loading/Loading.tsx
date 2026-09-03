import CircularProgress from "@mui/material/CircularProgress";

import { FullSizeCenteredFlexBox } from "@/_pwa-framework/components/styled";

function Loading() {
  return (
    <FullSizeCenteredFlexBox>
      <CircularProgress />
    </FullSizeCenteredFlexBox>
  );
}

export default Loading;
