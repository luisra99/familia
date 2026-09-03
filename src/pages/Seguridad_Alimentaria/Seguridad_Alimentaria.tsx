import {
  message,
  midElements,
  topElements,
  useSeguridadAlimentaria,
} from "./utils";

import GenericForm from "@/_pwa-framework/genforms/components/form-components/form.generic";
import Meta from "@/_pwa-framework/components/Meta";
import { Typography } from "@mui/material";
import { getHogar } from "@/app/hogarController/hogar.controller";
import {
  obtenerPrimero,
  obtenerDatosPorLlave,
} from "@/app/user-interfaces/forms/models/controllers";
import { useState } from "react";
import { useEffect } from "react";

function Seguridad_Alimentaria() {
  const [
    submitFunction,
    getByIdFunction,
    notifyValidation,
    siguiente,
    anterior,
    cereales,
    estrategias,
    setListo,
    listo,
  ] = useSeguridadAlimentaria();
  const hogar = getHogar();

  const [, setConfiguracionAlimentos] = useState({});
  const [, setConfiguracionEstrategias] = useState({});

  const checkListo = async (id: string | number) => {
    const datos: any = await obtenerDatosPorLlave(
      "dat_hogardiversidadalimentaria",
      "idcodigohogar",
      id
    );
    console.log("check listo",datos);
    setListo(!!datos?.length);
  };

  useEffect(() => {
    if (hogar) {
      checkListo(hogar);
    }
  }, [hogar]);

  return (
    <>
      <Meta title="Controles" />
      {hogar ? (
        <GenericForm
          name="test"
          controls={[
            ...topElements,
            {
              type: "component",
              component: ({ setFieldValue, name }) =>
                cereales.map((estrategia: any) => (
                  <GenericForm
                    key={estrategia.idconcepto}
                    sx={{ p: 1 }}
                    name="test"
                    controls={[
                      {
                        type: "component",
                        component: () => (
                          <Typography sx={{ mt: 2 }}>
                            {estrategia.denominacion}
                          </Typography>
                        ),
                        label: "",
                        name: "",
                        gridValues: { xs: 5, lg: 5, md: 5, sm: 5, xl: 5 },
                      },
                      {
                        type: "select",
                        label: "¿Le gustan?",
                        name: "legustan",
                        options: [
                          { idconcepto: "1", denominacion: "Si" },
                          { idconcepto: "2", denominacion: "No" },
                        ],
                        validations: {
                          required: { message: "Este campo es requerido" },
                        },
                        gridValues: { xl: 2, lg: 2, md: 2, sm: 2, xs: 2 },
                        onChange: (event) => {
                          //#region Raul
                          //Se actualiza una variable con la configuración de los alimentos
                          setConfiguracionAlimentos((prev: any) => {
                            prev[estrategia.idconcepto] = {
                              ...prev[estrategia.idconcepto],
                              idtipoalimento: estrategia.idconcepto,
                              legustan: event.target.value,
                            };
                            setFieldValue(name, prev);
                            return prev;
                          });
                          //#endregion
                        },
                      },
                      {
                        type: "select",
                        label: "¿Los encontró?",
                        name: "losencontro",
                        validations: {
                          required: { message: "Este campo es requerido" },
                        },
                        options: [
                          { idconcepto: "1", denominacion: "Si" },
                          { idconcepto: "2", denominacion: "No" },
                        ],
                        gridValues: { xl: 3, lg: 3, md: 3, sm: 3, xs: 3 },
                        onChange: (event) => {
                          //#region Raul
                          //Se actualiza una variable con la configuración de los alimentos
                          setConfiguracionAlimentos((prev: any) => {
                            prev[estrategia.idconcepto] = {
                              ...prev[estrategia.idconcepto],
                              idtipoalimento: estrategia.idconcepto,
                              losencontro: event.target.value,
                            };
                            setFieldValue(name, prev);

                            return prev;
                          });
                          //#endregion
                        },
                      },
                      {
                        type: "select",
                        label: "Frecuencia",
                        name: "frecuencia",
                        validations: {
                          required: { message: "Este campo es requerido" },
                        },
                        url: "9619",
                        gridValues: { xl: 2, lg: 2, md: 2, sm: 2, xs: 2 },
                        onChange: (event) => {
                          //#region Raul
                          //Se actualiza una variable con la configuración de los alimentos
                          setConfiguracionAlimentos((prev: any) => {
                            prev[estrategia.idconcepto] = {
                              ...prev[estrategia.idconcepto],
                              idtipoalimento: estrategia.idconcepto,
                              frecuencia: event.target.value,
                            };
                            setFieldValue(name, prev);

                            return prev;
                          });
                          //#endregion
                        },
                      },
                    ]}
                    getByIdFunction={async () => {
                      const _alimentos = await obtenerPrimero(
                        "dat_hogardiversidadalimentaria",
                        {
                          idtipoalimento: estrategia.idconcepto,
                          idcodigohogar: hogar,
                        }
                      );

                      if (_alimentos) {
                        setConfiguracionAlimentos((prev: any) => {
                          prev[estrategia.idconcepto] = {
                            ...prev[estrategia.idconcepto],
                            legustan: _alimentos.legustan,
                            losencontro: _alimentos.losencontro,
                            frecuencia: _alimentos.frecuencia,
                          };
                          setFieldValue(name, prev);
                          return prev;
                        });
                        return _alimentos;
                      }
                      return {
                        legustan: "",
                        losencontro: "",
                        frecuencia: "",
                      };
                    }}
                    endpointPath="/"
                    hideButtons={true}
                    idForEdit={hogar}
                  />
                )),
              label: "",
              name: "alimentos",
              gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
            },
            ...midElements,
            {
              type: "component",
              component: ({ setFieldValue, name }) =>
                estrategias.map((estrategia: any) => (
                  <GenericForm
                    key={estrategia.idconcepto}
                    name="test"
                    sx={{ p: 1 }}
                    controls={[
                      {
                        type: "component",
                        component: () => (
                          <Typography sx={{ mt: 2 }}>
                            {estrategia.denominacion}
                          </Typography>
                        ),
                        label: "",
                        name: "",
                        gridValues: { xs: 8, lg: 8, md: 8, sm: 8, xl: 8 },
                      },

                      {
                        type: "number",
                        label: "Días",
                        name: "dias",
                        format: "units",
                        gridValues: { xl: 3, lg: 3, md: 3, sm: 3, xs: 3 },
                        validations: {
                          min: {
                            value: 1,
                            message: "Los valores deben de estar entre 1 y 7",
                          },
                          max: {
                            value: 7,
                            message: "Los valores deben de estar entre 1 y 7",
                          },
                        },
                        onChange: (event) => {
                          //#region Raul
                          //Se actualiza una variable con la configuración de los alimentos
                          setConfiguracionEstrategias((prev: any) => {
                            prev[estrategia.idconcepto] = {
                              ...prev[estrategia.idconcepto],
                              dias: event.value,
                              estrategia: estrategia.idconcepto,
                            };
                            setFieldValue(name, prev);
                            return prev;
                          });
                          //#endregion
                        },
                      },
                    ]}
                    getByIdFunction={async () => {
                      const _estrategia = await obtenerPrimero(
                        "dat_hogarestrategias",
                        {
                          idestrategia: estrategia.idconcepto,
                          idcodigohogar: hogar,
                        }
                      );

                      if (_estrategia) {
                        setConfiguracionEstrategias((prev: any) => {
                          prev[estrategia.idconcepto] = {
                            ...prev[estrategia.idconcepto],
                            dias: _estrategia.dias,
                            estrategia: estrategia.idconcepto,
                          };
                          setFieldValue(name, prev);
                          return prev;
                        });
                        return _estrategia;
                      }
                      return { dias: "" };
                    }}
                    endpointPath="/"
                    hideButtons={true}
                    idForEdit={hogar}
                  />
                )),
              label: "",
              name: "estrategia",
              gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
            },
          ]}
          title="Grupos de alimentos y estrategias de afrontamiento en el hogar"
          endpointPath="persona"
          showSpecificDescription={false}
          saveOnDirty={false}
          submitFunction={submitFunction}
          getByIdFunction={getByIdFunction}
          notifyValidation={notifyValidation}
          nextButton={{ text: "Siguiente", action: siguiente }}
          prevButton={{ text: "Anterior", action: anterior }}
          nextDisabledFunction={(values) => !listo}
          saveButton="Guardar"
          applyButton={false}
        />
      ) : (
        message
      )}
    </>
  );
}

export default Seguridad_Alimentaria;
