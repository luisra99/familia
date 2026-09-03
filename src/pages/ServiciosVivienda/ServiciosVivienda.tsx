import { Typography } from "@mui/material";
import { controles, obtenerServiciosVivienda } from "./helpers";

import GenericForm from "@/_pwa-framework/genforms/components/form-components/form.generic";
import Meta from "@/_pwa-framework/components/Meta";
import NotificationProvider from "@/_pwa-framework/sections/Notifications/provider";
import { CreateOrModify } from "@/app/user-interfaces/forms/models/controllers";
import { getHogar } from "@/app/hogarController/hogar.controller";
import useModalState from "@/_pwa-framework/hooks/form/use-form-manager";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";

function ServiciosVivienda() {
  const idhogar = getHogar() ?? 0;
  const { modalActions } = useModalState();
  const [id, setid] = useState<any>(idhogar ?? null);
  const [listo, setListo] = useState<any>(false);
  const notificar = NotificationProvider();
  const navegar = useNavigate();

  const siguiente = () => navegar("/servicios-equipamientos/mobiliario");
  const anterior = () => navegar("/servicios-equipamientos/locales");

  const checkListo = useCallback(async (id: string) => {
    const datos: any = await obtenerServiciosVivienda(id);

    setListo(!!datos?.iddesague?.length);
  }, []);
  const nextDisabled = useCallback((): boolean => !listo, [listo]);
  const submitFunction = useCallback(
    (values: any) => {
      const {
        idcodigohogar,
        iddesague,
        idelectricidad,
        idfrecsumagua,
        idinstalacionacueducto,
        idprocedenciaagua,
        idtipomanejo,
        nautahogar,
      } = values;
      CreateOrModify(
        "dat_seviciosvivienda",
        { idcodigohogar: idhogar },
        {
          idcodigohogar: idhogar,
          iddesague,
          idelectricidad,
          idfrecsumagua,
          idinstalacionacueducto,
          idprocedenciaagua,
          idtipomanejo,
          nautahogar,
        },
        "idcodigohogar"
      ).then(() => {
        notificar({
          type: "success",
          title:
            "Se han adicionado los servicios a la vivienda satisfactoriamente.",
          content: "",
        });
        if (id) {
          checkListo(id);
        }
      });
    },
    [id]
  );

  useEffect(() => {
    if (id) {
      checkListo(id);
    }
  }, [id, listo]);

  return (
    <>
      <Meta title="Controles" />
      {idhogar ? (
        <GenericForm
          name="2"
          controls={controles}
          title="Servicios de la vivienda"
          description=""
          endpointPath="persona"
          nextButton={{ text: "Siguiente", action: siguiente }}
          prevButton={{ text: "Anterior", action: anterior }}
          nextDisabledFunction={nextDisabled}
          showSpecificDescription={false}
          idForEdit={id}
          saveButton="Guardar"
          setIdFunction={setid}
          submitFunction={submitFunction}
          getByIdFunction={(id) => obtenerServiciosVivienda(id)}
          applyButton={false}
        />
      ) : (
        <Typography variant="h6" p={2}>
          No existe un hogar seleccionado
        </Typography>
      )}
    </>
  );
}

export default ServiciosVivienda;
