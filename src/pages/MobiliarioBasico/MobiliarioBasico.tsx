import {
  CreateOrModify,
  deleteIfExist,
} from "@/app/user-interfaces/forms/models/controllers";
import { Divider, Typography } from "@mui/material";
import { useCallback, useState } from "react";

import GenericForm from "@/_pwa-framework/genforms/components/form-components/form.generic";
import Meta from "@/_pwa-framework/components/Meta";
import NotificationProvider from "@/_pwa-framework/sections/Notifications/provider";
import { datico } from "@/app/user-interfaces/forms/models/model";
import { getHogar } from "@/app/hogarController/hogar.controller";
import { obtenerMobiliarios } from "./utils";
import { useLiveQuery } from "dexie-react-hooks";
import { useNavigate } from "react-router-dom";
import { IGenericControls } from "@/_pwa-framework/genforms/types/controls/controls.types";
import { useLocalStorage } from "@uidotdev/usehooks";

function Condicion_de_vivienda() {
  const [idHogar] = useLocalStorage<string>("hogarActual");
  const navegar = useNavigate();
  const siguiente = () => navegar("/servicios-equipamientos/vehiculos");
  const anterior = () => navegar("/servicios-equipamientos/servicios");
  const [mobiliarioBasico, setmobiliarioBasico] = useState([]);
  const [configuraciónMobiliarioBasico, setConfiguracionMobiliarioBasico] =
    useState({});

  const findByIdMobiliarioSetConfiguracion =
    (setFieldValue: any, name: any) => async (id: any) => {
      const result = await obtenerMobiliarios(
        id,
        setConfiguracionMobiliarioBasico
      );
      if (result?.cantidad) {
        setConfiguracionMobiliarioBasico((prev: any) => {
          prev[id] = {
            ...prev[id],
            cantidad: result.cantidad,
            idmobiliarioequipo: id,
          };
          if (result.tipomobiliario)
            prev[id].tipomobiliario = result.tipomobiliario;
          if (result.estado) prev[id].estado = result.estado;

          setFieldValue(name, prev);
          return prev;
        });
      }
      return result;
    };
    const submitFunction = useCallback(
      (values: any) => {
        let hayError = false;
    
        Object.values(configuraciónMobiliarioBasico).forEach((mobiliario: any) => {
          const cantidad = Number(mobiliario.cantidad);
    
          if (cantidad > 99) {
            hayError = true;
          }
        });
    
        if (hayError) {
          notificar({
            type: "warning",
            title: "Uno o más campos tienen una cantidad superior al máximo permitido.",
            content: "",
          });
          return; // Detener envío
        }
    
        Object.values(configuraciónMobiliarioBasico).forEach((mobiliario: any) => {
          const cantidad = Number(mobiliario.cantidad);
          if (cantidad > 0) {
            CreateOrModify(
              "dat_hogarmobiliarioequipos",
              {
                idcodigohogar: getHogar(),
                idmobiliarioequipo: mobiliario.idmobiliarioequipo,
              },
              {
                ...mobiliario,
                idcodigohogar: getHogar(),
              },
              "idhogarmobiliarioequipo"
            );
          } else {
            deleteIfExist(
              "dat_hogarmobiliarioequipos",
              {
                idcodigohogar: getHogar(),
                idmobiliarioequipo: mobiliario.idmobiliarioequipo,
              },
              "idhogarmobiliarioequipo"
            );
          }
        });
    
        notificar({
          type: "success",
          title: "Los datos de mobiliario básico y equipos funcionando se han adicionado satisfactoriamente.",
          content:"",
        });
      },
      [configuraciónMobiliarioBasico]
    );
    const notifyValidation = useCallback(
      (values: any) => {
        let hayError = false;
    
        const error=Object.values(configuraciónMobiliarioBasico).map((mobiliario: any) => {
          const cantidad = Number(mobiliario.cantidad);
    
          if (cantidad <1) {
          return "Las cantidades no pueden ser cero"
          }
        });
        if(error.length)
          return error[0]
      },
      [configuraciónMobiliarioBasico]
    );
    

  const data = useLiveQuery(async () => {
    const prueba = await (datico as any)["nom_concepto"]
      .where("idpadre")
      .equals("9759")
      .toArray();

    setmobiliarioBasico(prueba);
    return prueba;
  });

  const notificar = NotificationProvider();
  const controles = useCallback(
    (): IGenericControls[] => [
      {
        type: "component",
        component: () => (
          <Typography variant="h5" sx={{ mt: 0, mb: 2 }}>
            Mobiliario básico y equipos funcionando
          </Typography>
        ),
        label: "",
        name: "",
        gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
      },
      {
        type: "component",
        component: () => (
          <Typography>
            <b>Nota aclaratoria: </b>La información solicitada se refiere al
            mobiliario básico y a equipos que comparten en el hogar si se usan
            cotidianamente, o en caso de necesidad para el bien común aunque
            sean propiedad.
          </Typography>
        ),
        label: "",
        name: "",
        gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
      },
      {
        type: "component",
        component: () => (
          <Typography sx={{ mt: 4, mb: 0 }}>
            <b>Muebles/Equipos</b>
          </Typography>
        ),
        label: "",
        name: "",
        gridValues: { xs: 5, lg: 5, md: 5, sm: 5, xl: 5 },
      },
      {
        type: "component",
        component: () => <Divider sx={{ mt: 0, mb: 0 }} />,
        label: "",
        name: "",
        gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
      },
      {
        type: "component",
        component: ({ setFieldValue, name }: any) =>
          mobiliarioBasico.map((mobiliarioBasico: any) => (
            <GenericForm
              name="test"
              sx={{ p: 1 }}
              controls={[
                {
                  type: "component",
                  component: () => (
                    <Typography sx={{ mt: 2 }}>
                      {mobiliarioBasico.denominacion}
                    </Typography>
                  ),
                  label: "",
                  name: "",
                  gridValues: { xs: 8, lg: 4, md: 4, sm: 4, xl: 4 },
                },
                {
                  type: "number",
                  label: "Cuántos",
                  gridValues: { xs: 4, lg: 4, md: 4, sm: 4, xl: 4 },
                  name: "cantidad",
                  format: "units",
                  negativeValues: false,
                  onChange: (event) => {
                    let value = Number(event.value);
                    if (value < 1) {
                      value = 0
                    }

                    // if (value > 99) {
                    //   notificar({
                    //     type: "warning",
                    //     title: "Límite máximo 2 caracteres",
                    //     content: "",
                    //   });
                    //   return; 
                    // }

                    setConfiguracionMobiliarioBasico((prev: any) => {
                      prev[mobiliarioBasico.idconcepto] = {
                        ...prev[mobiliarioBasico.idconcepto],
                        cantidad: event.value,
                        idmobiliarioequipo: mobiliarioBasico.idconcepto,
                      };
                      setFieldValue(name, prev);
                      return prev;
                    });
                  },
                  validations:{
                    min:{value: 1, message: "No puedes introducir el valor cero"},
                    max:{value: 99, message: "Límite máximo 2 caracteres"}
                  },
                },
              ]}
              idForEdit={mobiliarioBasico.idconcepto}
              getByIdFunction={findByIdMobiliarioSetConfiguracion(
                setFieldValue,
                name
              )}
              endpointPath="/"
              title=""
              hideButtons={true}
            />
          )),
        label: "",
        name: "mobiliario",
        gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
      },
    ],
    [mobiliarioBasico]
  );
  return (
    <>
      <Meta title="Controles" />
      {idHogar ? (
        <GenericForm
          name="test"
          controls={controles()}
          title=""
          description=""
          endpointPath="persona"
          showSpecificDescription={false}
          saveButton="Guardar"
          notifyValidation={notifyValidation}
          submitFunction={submitFunction}
          nextButton={{ text: "Siguiente", action: siguiente }}
          prevButton={{ text: "Anterior", action: anterior }}
          applyButton={false}
          acceptDisabledFunction={(values) => {
            const mobiliario = values.mobiliario || {};
            const hayAlgunaModificacion = Object.keys(mobiliario).length > 0;
            return !hayAlgunaModificacion;
          }}
        />
      ) : (
        <Typography variant="h6" margin={2}>
          No existe un hogar seleccionado
        </Typography>
      )}
    </>
  );
}

export default Condicion_de_vivienda;
