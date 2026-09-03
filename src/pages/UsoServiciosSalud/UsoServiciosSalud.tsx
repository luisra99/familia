import {
  crear,
  deleteRowsIfExist,
  eliminar,
  modificar,
  obtenerDatosPorLlave,
} from "@/app/user-interfaces/forms/models/controllers";
import { obtenerMiembroPorEncuesta, obtenerMotivoNoAtencion } from "./helpers";
import { useCallback, useEffect, useState } from "react";

import GenericForm from "@/_pwa-framework/genforms/components/form-components/form.generic";
import Meta from "@/_pwa-framework/components/Meta";
import NotificationProvider from "@/_pwa-framework/sections/Notifications/provider";
import { Typography } from "@mui/material";
import { datico } from "@/app/user-interfaces/forms/models/model";
import { getHogar } from "@/app/hogarController/hogar.controller";
import { obtenerMiembros } from "@/app/user-interfaces/forms/models/controllers.miembrohogar";
import { useLiveQuery } from "dexie-react-hooks";
import { useNavigate } from "react-router-dom";
import { IGenericControls } from "@/_pwa-framework/genforms/types/controls/controls.types";

function UsoServiciosSalud() {
  const [id, setid] = useState<any>(null);
  const [idMiembro, setIdMiembro] = useState<any>(null);
  const idhogar = getHogar() ?? 0;
  const [miembros, setMiembros] = useState<any>([]);
  const [respuestaMotivos, setConfiguracionRespuestaMotivos] = useState({});
  const [checkUso, checkSetUso] = useState<any>([]);
  const [checkHogar, setCheckHogar] = useState<any>([]);
  const [hogar, setHogar] = useState<any>([]);
  const notificar = NotificationProvider();
  const navegar = useNavigate();
  const siguiente = () => navegar("/proteccion");
  const anterior = () => navegar("/autonomia/enfermedades");
  const [datosGuardados, setDatosGuardados] = useState(false);

  const nextDisabledFunction = useCallback(
    (values?: any) => {
      if (
        hogar?.problemasalud?.[0] === "9833" ||
        hogar?.problemasalud?.[0] === "9834"
      )
        return false;

      const problemasalud = values?.problemasalud?.[0];
      const atendido = values?.atendido?.[0];
      const miembroSeleccionado = values?.idmiembrohogar?.[0];

      if (!problemasalud) return true;

      if (problemasalud === "9832") {
        if (!miembroSeleccionado || !atendido) return true;

        if (
          atendido === "9833" &&
          (!respuestaMotivos || Object.keys(respuestaMotivos).length === 0)
        ) {
          return true;
        }

        if (checkUso.includes(miembroSeleccionado)) {
          return false;
        }

        return true;
      }

      return true;
    },
    [respuestaMotivos, datosGuardados, miembros, checkUso, hogar],
  );

  useEffect(() => {
    setDatosGuardados(false);
  }, [respuestaMotivos, idMiembro]);

  useEffect(() => {
    setConfiguracionRespuestaMotivos({});
  }, [idMiembro]);

  useEffect(() => {
    obtenerDatosPorLlave(
      "dat_hogar",
      "idcodigohogar",
      parseInt(getHogar() ?? ""),
    ).then((datosHogar) => {
      if (datosHogar.length) {
        if (
          JSON.stringify(datosHogar[0].problemasalud) ===
          JSON.stringify(["9832"])
        ) {
          obtenerDatosPorLlave(
            "dat_miembroencuesta",
            "idcodigohogar",
            getHogar(),
          ).then((registrosUsuarios) => {
            if (registrosUsuarios.length) {
              setIdMiembro(registrosUsuarios[0].idmiembrohogar);
            }
          });
        } else {
          setIdMiembro("0");
        }
      }
    });
  }, []);

  async function tieneUso(arr: any) {
    const result = await Promise.all(
      arr.map(async (obj: any) => {
        const uso = await datico.dat_miembroencuesta
          .where({ idmiembrohogar: obj.idconcepto.toString() })
          .count();
        if (uso > 0) {
          return obj.idconcepto;
        } else {
          return 0;
        }
      }),
    );
    const _result = result.filter((item) => item != 0);
    return _result.toString();
  }

  const submitUsoServiciosSalud = async (values: any) => {
    const hogar = getHogar();
    if (hogar) {
      await modificar("dat_hogar", "idcodigohogar", parseInt(hogar), {
        problemasalud: values.problemasalud,
      });

      if (values?.idmiembrohogar?.length) {
        const currentMemberId = values.idmiembrohogar[0];
        const existemiembroencuesta = await datico.dat_miembroencuesta
          .where({ idmiembrohogar: currentMemberId })
          .toArray();

        if (existemiembroencuesta?.length) {
          if (values.atendido[0] == "9832") {
            await datico.dat_motivonoatencion
              .where("idmiembrohogar")
              .equals(currentMemberId)
              .delete();
          }
          if (values.atendido[0] == "9834") {
            await datico.dat_motivonoatencion
              .where("idmiembrohogar")
              .equals(currentMemberId)
              .delete();
          }

          let _values = structuredClone(values);
          delete _values.editMode;
          await modificar(
            "dat_miembroencuesta",
            "idmiembrohogar",
            currentMemberId,
            {
              ..._values,
              idmiembrohogar: currentMemberId,
              idcodigohogar: hogar,
            },
          );

          if (values.atendido[0] == "9833") {
            await datico.dat_motivonoatencion
              .where("idmiembrohogar")
              .equals(currentMemberId)
              .delete();

            await Promise.all(
              Object.values(respuestaMotivos).map(async (motivo: any) => {
                await crear("dat_motivonoatencion", {
                  ...motivo,
                  idmiembrohogar: currentMemberId,
                  idcodigohogar: hogar,
                });
              }),
            );
          }
        } else {
          await crear("dat_miembroencuesta", {
            idmiembrohogar: currentMemberId,
            atendido: values.atendido,
            idcodigohogar: hogar,
          });

          if (values.atendido == "9833") {
            await Promise.all(
              Object.values(respuestaMotivos).map(async (respuesta: any) =>
                crear("dat_motivonoatencion", {
                  ...respuesta,
                  idmiembrohogar: currentMemberId,
                  idcodigohogar: hogar,
                }),
              ),
            );
          }
        }
      }

      if (values.problemasalud[0] !== "9832") {
        await datico.dat_motivonoatencion
          .where("idcodigohogar")
          .equals(hogar)
          .delete();
        await datico.dat_miembroencuesta
          .where("idcodigohogar")
          .equals(hogar)
          .delete();
      }
      notificar({
        type: "success",
        title:
          "Se han adicionado los datos de servicio de salud a la persona satisfactoriamente",
        content: "",
      });
      setDatosGuardados(true);
    }
  };

  useLiveQuery(async () => {
    const hogar = await obtenerDatosPorLlave(
      "dat_hogar",
      "idcodigohogar",
      Number(idhogar),
    );
    const data = await obtenerMiembros();
    const usito = await tieneUso(data);
    setMiembros(data);
    checkSetUso(usito);
    setHogar(hogar?.[0]);
  });

  const motivosNoAtencionMedica = useLiveQuery(async () => {
    const prueba = await (datico as any)["nom_concepto"]
      .where("idpadre")
      .equals("9433")
      .toArray();
    return prueba;
  });

  const respuestasTipoUsoServiciosDeSalud = useLiveQuery(async () => {
    if (idhogar) {
      const _checkHogar = await obtenerMiembroPorEncuesta(idhogar.toString());
      setCheckHogar(_checkHogar);
    }

    const prueba = await (datico as any)["nom_concepto"]
      .where("idpadre")
      .equals("9831")
      .toArray();
    return prueba;
  });

  const controls = useCallback(
    (): IGenericControls[] => [
      {
        type: "component",
        component: () => (
          <Typography mt={"12px"}>
            ¿En los últimos 30 días algún miembro del hogar ha presentado algún
            problema de salud?
          </Typography>
        ),
        label: "",
        name: "",
        gridValues: { xs: 6, lg: 7, md: 6, sm: 6, xl: 6 },
      },
      {
        type: "select",
        label: "Seleccionar opción",
        name: "problemasalud",
        validations: {
          required: {
            message: "Este campo es obligatorio",
          },
        },
        gridValues: { xs: 6, lg: 6, md: 6, sm: 6, xl: 6 },
        options: respuestasTipoUsoServiciosDeSalud,
        onChange: (
          value: any,
          ref: {
            setFieldValue: (arg0: string, arg1: never[], arg2: boolean) => any;
          },
        ) => ref.setFieldValue("problemasalud", [], true),
      },
      {
        type: "select",
        name: "idmiembrohogar",
        label: "Miembro del hogar",
        validations: {
          required: {
            message: "Este campo es obligatorio",
            when: {
              name: "problemasalud",
              expression: (value: any) =>
                JSON.stringify(value) === JSON.stringify(["9832"]),
            },
          },
        },
        gridValues: { xs: 6, lg: 6, md: 6, sm: 6, xl: 6 },
        options: miembros,
        checkValues: checkUso,
        onChange: (
          e: any,
          ref: { setFieldValue: (arg0: string, arg1: never[]) => void },
        ) => {
          ref.setFieldValue("atendido", []);
          setIdMiembro(e.target.value);
        },
        hidden: (values: any) =>
          values.problemasalud == "" ||
          values.problemasalud == "9833" ||
          values.problemasalud == "9834",
      },
      {
        type: "select",
        gridValues: { xs: 6, lg: 6, md: 6, sm: 6, xl: 6 },
        label: "¿Fue atendido?",
        name: "atendido",
        url: "9831",
        validations: {
          required: {
            message: "Este campo es obligatorio",
            when: {
              name: "problemasalud",
              expression: (value: any) =>
                JSON.stringify(value) === JSON.stringify(["9832"]),
            },
          },
        },
        onChange: (event: { target: { value: string } }) => {
          event.target.value == "9832" && setConfiguracionRespuestaMotivos({});
        },
        hidden: (values: any) =>
          values.problemasalud == "" ||
          values.problemasalud == "9833" ||
          values.problemasalud == "9834",
      },
      {
        type: "component",
        component: () => (
          <Typography mt={"12px"}>
            <b>Especifique los motivos por lo que no fue atendido:</b>
          </Typography>
        ),
        label: "",
        name: "",
        gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
        hidden: (values: any) =>
          values.atendido == "9832" ||
          values.atendido == "9834" ||
          values.atendido == "" ||
          values.problemasalud == "" ||
          values.problemasalud == "9833" ||
          values.problemasalud == "9834",
      },
      {
        type: "component",
        component: (props: any) =>
          motivosNoAtencionMedica?.map((motivo: any) => {
            return (
              <GenericForm
                name="idmotivo"
                controls={[
                  {
                    type: "component",
                    component: () => (
                      <Typography sx={{ mt: 0.5 }}>
                        {motivo.denominacion}
                      </Typography>
                    ),
                    label: "",
                    name: "",
                    gridValues: { xs: 5, lg: 5, md: 5, sm: 5, xl: 2 },
                  },
                  motivo.idconcepto == 9441
                    ? {
                        type: "text",
                        name: "otrosmotivos",
                        label: "Especifique",
                        gridValues: {
                          xs: 6,
                          lg: 6,
                          md: 6,
                          sm: 6,
                          xl: 4,
                        },
                        onChange: (e: any) => {
                          const rawValue = e.target.value;
                          const sanitizedValue = rawValue.replace(
                            /[^A-Za-záéíóúüñÁÉÍÓÚÜÑ\s]/g,
                            "",
                          );
                          //.slice(0, 50);
                          e.target.value = sanitizedValue;

                          if (sanitizedValue) {
                            setConfiguracionRespuestaMotivos((prev: any) => ({
                              ...prev,
                              [motivo.idconcepto]: {
                                ...prev[motivo.idconcepto],
                                idmotivo: motivo.idconcepto,
                                otrosmotivos: sanitizedValue,
                              },
                            }));
                          } else {
                            setConfiguracionRespuestaMotivos((prev: any) => {
                              const newState = { ...prev };
                              delete newState[motivo.idconcepto];
                              return newState;
                            });
                          }
                        },

                        validations: {
                          tests: [
                            {
                              test: (values: any) => {
                                return values.otrosmotivos?.length >= 50;
                              },
                              message: "Límite máximo 50 caracteres.",
                            },
                          ],
                        },
                      }
                    : {
                        type: "select",
                        name: "idrespuesta",
                        label: "Seleccionar respuesta",
                        gridValues: {
                          xs: 6,
                          lg: 6,
                          md: 6,
                          sm: 6,
                          xl: 4,
                        },
                        onChange: (e: any) => {
                          if (e.target.value) {
                            setConfiguracionRespuestaMotivos((prev: any) => ({
                              ...prev,
                              [motivo.idconcepto]: {
                                ...prev[motivo.idconcepto],
                                idmotivo: motivo.idconcepto,
                                idrespuesta: `${e.target.value}`,
                              },
                            }));
                          } else {
                            setConfiguracionRespuestaMotivos((prev: any) => {
                              const newState = { ...prev };
                              delete newState[motivo.idconcepto];
                              return newState;
                            });
                          }
                          props.setFieldTouched(props.name);
                        },
                        options: respuestasTipoUsoServiciosDeSalud,
                      },
                ]}
                endpointPath="/"
                hideButtons={true}
                idForEdit={idMiembro}
                setIdFunction={setid}
                getByIdFunction={(idMiembro) =>
                  obtenerMotivoNoAtencion(
                    idMiembro,
                    motivo,
                    respuestaMotivos,
                    setConfiguracionRespuestaMotivos,
                  )
                }
              />
            );
          }),
        gridValues: { lg: 12, md: 12, sm: 12, xl: 12, xs: 12 },
        name: "",
        label: "",
        hidden: (values: any) =>
          values.problemasalud == "" ||
          values.atendido == "" ||
          values.atendido == "9832" ||
          values.atendido == "9834" ||
          values.idmiembrohogar == "" ||
          values.problemasalud == "9833" ||
          values.problemasalud == "9834",
      },
    ],
    [
      idMiembro,
      respuestasTipoUsoServiciosDeSalud,
      respuestaMotivos,
      motivosNoAtencionMedica,
      id,
      checkUso,
      miembros,
    ],
  );

  return (
    <>
      <Meta title="Controles" />
      {idhogar && respuestasTipoUsoServiciosDeSalud && miembros.length ? (
        <>
          <GenericForm
            name="4"
            applyButton={false}
            controls={controls()}
            title="Uso de servicios de salud"
            endpointPath="persona"
            showSpecificDescription={false}
            nextButton={{ text: "Siguiente", action: siguiente }}
            prevButton={{ text: "Anterior", action: anterior }}
            nextDisabledFunction={nextDisabledFunction}
            idForEdit={idMiembro}
            saveButton="Guardar"
            submitFunction={submitUsoServiciosSalud}
            notifyValidation={(values) => {
              if (
                !Object.keys(respuestaMotivos).length &&
                JSON.stringify(values?.atendido) === JSON.stringify(["9833"]) &&
                JSON.stringify(values?.problemasalud) ===
                  JSON.stringify(["9832"])
              ) {
                return "Debe seleccionar al menos un motivo";
              }
            }}
            getByIdFunction={obtenerMiembroPorEncuesta}
          />
        </>
      ) : (
        <Typography variant="h6" p={2}>
          {idhogar ? (
            <b>No existen miembros en el hogar seleccionado</b>
          ) : (
            <b>No existe un hogar seleccionado</b>
          )}
        </Typography>
      )}
    </>
  );
}

export default UsoServiciosSalud;
