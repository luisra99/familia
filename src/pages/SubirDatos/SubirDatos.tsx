import { useState } from "react";
import { MuiFileInput } from "mui-file-input";

import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import Meta from "@/_pwa-framework/components/Meta";
import GenericForm from "@/_pwa-framework/genforms/components/form-components/form.generic";
import NotificationProvider from "@/_pwa-framework/sections/Notifications/provider";

import axios from "axios";
import useModalState from "@/_pwa-framework/hooks/form/use-form-manager";
import { env } from "@/_pwa-framework/config";

function SubirDatos() {
  const notificar = NotificationProvider();
  const { modalActions } = useModalState();

  const [value, setValue] = useState(null);

  const handleChange = (newValue: any) => {
    setValue(newValue);
  };

  function uploadFile() {
    if (value) {
      let formData = new FormData();
      formData.append("file", value);
      formData.append("campodeprueba", "valor de prueba");
      formData.append("campodeprueba2", "valor de prueba2");
      axios
        .post(
          `${
            env.ENV_SERVER_URL
          }/gw/bk_familia_cubana/importar_datos/importar/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          const data = response.data;
          if (data.error || data.message) {
            notificar({
              type: "error",
              title: "Error",
              content: data.error ? data.error : data.message,
            });
          } else {
            notificar({
              type: "success",
              title: "Confirmación",
              content: "Fichero subido satisfactoriamente",
            });
            setValue(null);
          }
        })
        .catch((error) => {
          console.error(error);
          notificar({
            type: "error",
            title: "Error",
            content: error.message,
          });
        });
    }
  }

  return (
    <>
      <Meta title="Subir datos" />

      <GenericForm
        name="formularioSubirDatos"
        controls={[
          {
            type: "component",
            component: () => (
              <>
                <Typography>
                  <b>Seleccione el fichero:</b>
                </Typography>
                <MuiFileInput
                  value={value}
                  onChange={handleChange}
                  fullWidth={true}
                  inputProps={{ accept: ".json, .xlsx" }}
                  clearIconButtonProps={{
                    title: "Remove",
                    children: <CloseIcon fontSize="small" />,
                  }}
                />
              </>
            ),
            label: "",
            name: "",
            gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
          },
        ]}
        title="Subir datos"
        endpointPath="importar"
        hideButtons={false}
        applyButton={false}
        modalType="fullWith"
        submitFunction={() => uploadFile()}
      />

      <GenericForm
        controls={[
          {
            type: "component",
            component: () => (
              <Stack
                spacing={2}
                direction="row"
                display={"inline-list-item"}
                justifyContent="center"
                style={{ width: "100%" }}
              >
                <Button
                  variant="contained"
                  onClick={() => modalActions.open("formularioSubirDatos")}
                >
                  Abrir
                </Button>
              </Stack>
            ),
            label: "",
            name: "",
            gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
          },
        ]}
        name=""
        endpointPath=""
        hideButtons={true}
      ></GenericForm>
    </>
  );
}

export default SubirDatos;
