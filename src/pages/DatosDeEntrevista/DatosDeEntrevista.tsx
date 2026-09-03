import {
  CreateOrModify,
  modificar,
  obtenerDatosPorLlave,
} from "@/app/user-interfaces/forms/models/controllers";

import GenericForm from "@/_pwa-framework/genforms/components/form-components/form.generic";
import Meta from "@/_pwa-framework/components/Meta";
import NotificationProvider from "@/_pwa-framework/sections/Notifications/provider";
import { SelectMiembros } from "@/utils/components/miembro";
import { Typography } from "@mui/material";
import { formulario6 } from "@/app/user-interfaces/forms/forms.config";
import { getHogar } from "@/app/hogarController/hogar.controller";
import useModalState from "@/_pwa-framework/hooks/form/use-form-manager";
import { useNavigate } from "react-router-dom";
import BasicSpeedDial from "@/_pwa-framework/speedDial/speedDial";

function DatosDeEntrevista() {
  const { modalActions } = useModalState();
  const idhogar = getHogar() ?? 0;
  const notificar = NotificationProvider();
  const navegar = useNavigate();

  const obtenerObservaciones = async (id: any) => {
    const observ = await obtenerDatosPorLlave(
      "dat_hogar",
      "idcodigohogar",
      parseInt(id)
    );
    const datCarac = await obtenerDatosPorLlave(
      "dat_caracterizacion",
      "idcodigohogar",
      id
    );
    let result: any = {};
    if (datCarac.length) {
      result = datCarac[0];
      result.idmiembrohogar=[result.idmiembrohogar]
      result.editMode = true;
    } else {
      result = {
        idmiembrohogar: [],
        hfin: "",
        hinicio: "",
        fechaentrev: "",
        observaciones: "",
        editMode: false,
      };
    }

    if (observ.length) {
      result = { ...result, ...observ[0] };
    }
    return result;
  };
  const siguiente = () => {
    modalActions.open("BasicSpeedDial");
  };
  const miembros = SelectMiembros({
    label: "Miembro del hogar",
    name: "idmiembrohogar",
    gridValues: {
      xl: 3,
      lg: 3,
      md: 3,
      sm: 6,
      xs: 12,
    },
    validations: { required: { message: "Este campo es obligatorio." } },
  });

  const anterior = () => navegar("/estrategia/programas_situacion_social");



  return (
    <>
      <Meta title="Controles" />
      {idhogar && miembros ? (
        <GenericForm
          name="test"
          controls={[miembros, ...formulario6]}
          title="Datos de la entrevista"
          description=""
          endpointPath="persona"
          showSpecificDescription={false}
          idForEdit={idhogar}
          saveButton="Guardar"
          prevButton={{ text: "Anterior", action: anterior }}
          nextButton={{ text: "Finalizar caracterización", action: siguiente }}
          applyButton={false}
          notifyValidation={(values) => {
            if (!values.idmiembrohogar.length) {
              return "Debe seleccionar un miembro.";
            }
            if (!values.fechaentrev.length) {
              return "Debe seleccionar una fecha.";
            }
            if (!values.hinicio.length) {
              return "Debe seleccionar la hora de inicio.";
            }
            if (!values.hfin.length) {
              return "Debe seleccionar la hora de fin.";
            }
          }}
          submitFunction={async (values: any) => {
            try {
              console.log(values)
              delete values.editMode;
              CreateOrModify("dat_caracterizacion", { idmiembrohogar: values.idmiembrohogar[0] }, {
                ...values,
                idmiembrohogar: values.idmiembrohogar[0],
                tipo: 1,
                idcodigohogar: idhogar,
                fregistro: values.fechaentrev,
              }, "idmiembrohogar");
              if (idhogar) {
                await modificar("dat_hogar", "idcodigohogar", parseInt(idhogar), {
                  observaciones: values.observaciones,
                });
              }
              notificar({
                type: "success",
                title:
                  "Se han guardado los datos de la entrevista satisfactoriamente.",
              });
            } catch (error) {
              console.error("Datos de la entrevista", error)
            }
          }
          }
          getByIdFunction={obtenerObservaciones}
        />
      ) : (
        <Typography variant="h6" p={2}>
          <b>No existe un hogar seleccionado</b>
        </Typography>
      )}
      <BasicSpeedDial modalName="BasicSpeedDial" />
    </>
  );
}

export default DatosDeEntrevista;
