import { Dialog, DialogContent, Grid, IconButton } from "@mui/material";
import { Scanner as ScannerComp, centerText } from "@yudiel/react-qr-scanner";

import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import { useFormikContext } from "formik";
import { useState } from "react";

export const ScannerGeneric = ({
  disabled,
  hidden,
  gridValues,
  parseFunction,
  closeOnScan,
}: any) => {
  const { setFieldValue, values } = useFormikContext();

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <Grid
      item
      display={hidden?.(values) ? "none" : "unset"}
      xs={gridValues?.xs ?? 1}
      sm={gridValues?.sm ?? 1}
      md={gridValues?.md ?? 1}
      lg={gridValues?.lg ?? 1}
      xl={gridValues?.xl ?? 1}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Dialog open={open} onClose={handleClose}>
        <DialogContent sx={{ padding: 1 }}>
          <ScannerComp
            formats={[
              "qr_code",
              "micro_qr_code",
              "rm_qr_code",
              "maxi_code",
              "pdf417",
              "aztec",
              "data_matrix",
              "matrix_codes",
              "dx_film_edge",
              "databar",
              "databar_expanded",
              "codabar",
              "code_39",
              "code_93",
              "code_128",
              "ean_8",
              "ean_13",
              "itf",
              "linear_codes",
              "upc_a",
              "upc_e",
            ]}
            onScan={(detectedCodes: any) => {
              const values: any = parseFunction(detectedCodes[0].rawValue);
              const names = Object.keys(values);
              if (closeOnScan) handleClose();
              if (names.length) {
                names.forEach((key: string) => {
                  setFieldValue(key, values[key]);
                });
              }
            }}
            components={{
              // audio: true,
              onOff: true,
              torch: true,
              zoom: true,
              finder: true,
              tracker: centerText,
            }}
            allowMultiple={true}
            scanDelay={2000}
          />
        </DialogContent>
      </Dialog>
      <IconButton
        onClick={handleOpen}
        color="primary"
        sx={{ marginLeft: { sm: 2, xs: 2, md: 0 } }}
      >
        <QrCodeScannerIcon />
      </IconButton>
    </Grid>
  );
};
