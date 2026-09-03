import { Button, Stack, Typography } from "@mui/material";
import { Vehiculo, unionNomenclador } from "./utils";
import {
  crear,
  eliminar,
  modificar,
  obtenerPrimero,
  obtenerDatosPorLlave,
  obtenerTodos,
} from "@/app/user-interfaces/forms/models/controllers";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import GenericForm from "@/_pwa-framework/genforms/components/form-components/form.generic";
import Meta from "@/_pwa-framework/components/Meta";
import NotificationProvider from "@/_pwa-framework/sections/Notifications/provider";
import TableView from "@/_pwa-framework/user-solicitudes/view";
import { datico } from "@/app/user-interfaces/forms/models/model";
import { getHogar } from "@/app/hogarController/hogar.controller";
import { useConfirm } from "material-ui-confirm";
import { useLiveQuery } from "dexie-react-hooks";
import useModalState from "@/_pwa-framework/hooks/form/use-form-manager";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

function Vehiculos() {
  const { modalActions } = useModalState();
  const confirm = useConfirm();
  const notificar = NotificationProvider();
  const [listo, setListo] = useState<any>(false);
  const [id, setid] = useState<any>(null);
  const [vehiculos, setVehiculos] = useState<any>([]);
  const hogar = getHogar();
  useLiveQuery(async () => {
    if (hogar) {
      const prueba = await (datico as any)["dat_hogarmobiliariovehiculos"]
        .where({
          tipomobiliario: 2,
          idcodigohogar: parseInt(hogar),
        })
        .toArray();
      const result = await unionNomenclador(prueba);
      setVehiculos(result);
      return result;
    }
  });

  const checkListo = async (id: string | number) => {
    const datos: any = await obtenerDatosPorLlave(
      "dat_hogarmobiliariovehiculos",
      "idcodigohogar",
      id
    );
    setListo(!!datos?.length);
  };

  useEffect(() => {
    if (hogar) {
      checkListo(parseInt(hogar));
    }
  }, [hogar]);

  const navegar = useNavigate();
  const siguiente = () => navegar("/estrategia/gastos");
  const anterior = () => navegar("/servicios-equipamientos/mobiliario");

  return (
    <>
      <Meta title="Controles" />
      {hogar ? (
        <>
          <GenericForm
            name="test"
            controls={[
              {
                type: "component",
                component: () => (
                  <Typography>
                    <b>Nota aclaratoria: </b> La información solicitada se
                    refiere a vehículos que comparten en el hogar si se usan
                    cotidianamente, o en caso de necesidades para el bien común
                    aunque sean propiedad o estén asignados a un miembro en
                    particular.
                  </Typography>
                ),
                label: "",
                name: "",
                gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
              },
              {
                type: "component",
                component: () => (
                  <>
                    <Stack
                      spacing={2}
                      direction="row"
                      my={2}
                      textAlign={"left"}
                      px={5}
                      display={"inline-list-item"}
                    >
                      <Button
                        onClick={() => modalActions.open("1")}
                        variant="contained"
                      >
                        Adicionar
                      </Button>{" "}
                    </Stack>
                    <TableView
                      values={vehiculos?.map((item: any) => {
                        return {
                          ...item,
                          estado:
                            item.estado[0] === "0" ? "Propio" : "Asignado",
                        };
                      })}
                      headers={[
                        { name: "mobiliario", label: "Vehículo" },
                        { name: "cantidad", label: "Cantidad" },
                        { name: "estado", label: "Asig/Propio" },
                      ]}
                      idKey="idtipodenominacion"
                      multiSelect={true}
                      useCheckBox={false}
                      rowActions={[
                        {
                          label: "Modificar",
                          action: (values: any) => {
                            setid(values.idhogarmobiliariovehiculo);

                            modalActions.open("1");
                          },
                          icon: EditIcon,
                        },
                        {
                          icon: DeleteIcon,
                          label: "Eliminar",
                          action: (values: any) => {
                            confirm({
                              title: "Eliminar",
                              confirmationText: "Aceptar",
                              cancellationText: "Cancelar",
                              description: `¿Está seguro que desea eliminar el vehículo seleccionado?`,
                            }).then(() => {
                              eliminar(
                                "dat_hogarmobiliariovehiculos",
                                "idhogarmobiliariovehiculo",
                                values.idhogarmobiliariovehiculo
                              ).then(() => {
                                notificar({
                                  type: "success",
                                  title:
                                    "El vehículo ha sido eliminado satisfactoriamente.",
                                });
                              });
                              // setListo(true);
                            });
                          },
                        },
                      ]}
                    />
                  </>
                ),
                label: "",
                name: "",
                gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
              },
            ]}
            title="Vehículos de que dispone el hogar"
            description=""
            endpointPath="persona"
            showSpecificDescription={false}
            idForEdit={id}
            setIdFunction={setid}
            nextButton={{ text: "Siguiente", action: siguiente }}
            prevButton={{ text: "Anterior", action: anterior }}
            nextDisabledFunction={(values) => !listo}
            saveButton="Guardar"
            applyButton={false}
            hideButtons={true}
          />
          <GenericForm
            name="1"
            controls={Vehiculo}
            editTitle="Modificar vehículo"
            createTitle="Adicionar vehículo"
            description=""
            endpointPath="persona"
            showSpecificDescription={true}
            idForEdit={id}
            modalType="fullWith"
            setIdFunction={setid}
            notifyValidation={async (values) => {
              const existe = values?.idhogarmobiliariovehiculo
                ? await obtenerPrimero("dat_hogarmobiliariovehiculos", {
                    idhogarmobiliariovehiculo:
                      values?.idhogarmobiliariovehiculo,
                    estado: values.estado,
                    idmobiliariovehiculo: values.idmobiliariovehiculo,
                  }).catch((error) => console.error("existe ", error))
                : null;
              const algun = await obtenerTodos("dat_hogarmobiliariovehiculos",   {
                estado: values.estado,
                idmobiliariovehiculo: values.idmobiliariovehiculo,
                idcodigohogar: parseInt(hogar),
              });

              if (existe) return; //modificar
              if (algun.length) {
                return `Ya se declaró este vehículo con la categoría "${
                  values.estado[0] === "0" ? "Propio" : "Asignado"
                }".`;
              }
            }}
            submitFunction={(values: any) => {
              if (id && hogar) {
                delete values.editMode;
                modificar(
                  "dat_hogarmobiliariovehiculos",
                  "idhogarmobiliariovehiculo",
                  id,
                  {
                    ...values,
                    idcodigohogar: parseInt(hogar),
                  }
                ).then(() => {
                  notificar({
                    type: "success",
                    title: "El vehículo ha sido modificado satisfactoriamente.",
                  });
                });
              } else {
                delete values.editMode;
                hogar &&
                  crear("dat_hogarmobiliariovehiculos", {
                    ...values,
                    tipomobiliario: 2,
                    idcodigohogar: parseInt(hogar),
                  }).then(() =>
                    notificar({
                      type: "success",
                      title:
                        "El vehículo ha sido adicionado satisfactoriamente.",
                    })
                  );
                setListo(true);
              }
            }}
            getByIdFunction={async (id) => {
              const data = await obtenerDatosPorLlave(
                "dat_hogarmobiliariovehiculos",
                "idhogarmobiliariovehiculo",
                parseInt(id)
              );
              data[0].editMode = true;
              return data[0];
            }}
          />

          <Stack
            direction="row"
            mx={"auto"}
            my={2}
            px={5}
            display={"inline-list-item"}
            justifyContent="flex-end"
            sx={{ width: "100%" }}
          >
            <Button
              onClick={anterior}
              variant="contained"
              sx={{ marginRight: "5px" }}
            >
              Anterior
            </Button>
            <Button onClick={siguiente} variant="contained">
              Siguiente
            </Button>
          </Stack>
        </>
      ) : (
        <Typography variant="h6" p={2} flex={1} flexDirection={"row"}>
          No existe un hogar seleccionado
        </Typography>
      )}
    </>
  );
}

export default Vehiculos;
