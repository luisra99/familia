import { Box, Button, Stack, Tooltip, Typography } from "@mui/material";

import Grain from "@mui/icons-material/Grain";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import AddHomeIcon from "@mui/icons-material/AddHome";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { Link, useNavigate } from "react-router-dom";

import {
  cdr,
  circunscripcion,
  direccion,
  numero,
  planturquino,
  apto,
  edificio,
  sentrecalle,
  pentrecalle,
  tipovivienda,
  unionUnidadAlojamiento,
  zonaresidencial,
} from "./utils";
import {
  atomHogarActualDireccion,
  atomHogarActualJefe,
} from "@/_pwa-framework/sections/Sidebar/Sidebar";
import {
  crear,
  descartarHogares,
  eliminar,
  modificar,
  obtenerDatosPorLlave,
} from "@/app/user-interfaces/forms/models/controllers";
import { datico as db } from "@/app/user-interfaces/forms/models/model";
import {
  setDireccionHogar,
  setHogar,
  setJefeHogar,
  unsetHogar,
} from "@/app/hogarController/hogar.controller";
import { useCallback, useEffect, useState } from "react";

import { CustomTree } from "@/_pwa-framework/components/tree/tree.component";

import GenericForm from "@/_pwa-framework/genforms/components/form-components/form.generic";
import { IGenericControls } from "@/_pwa-framework/genforms/types/controls/controls.types";
import Meta from "@/_pwa-framework/components/Meta";
import NotificationProvider from "@/_pwa-framework/sections/Notifications/provider";
import TableView from "@/_pwa-framework/user-solicitudes/view";
import { useConfirm } from "material-ui-confirm";
import { useLocalStorage } from "@uidotdev/usehooks";
import useModalState from "@/_pwa-framework/hooks/form/use-form-manager";
import { useRecoilState } from "recoil";
import { crearArbolEstructura } from "../Welcome/utils/estructuras.service";
import { useLiveQuery } from "dexie-react-hooks";
import { mode } from "@/_pwa-framework/config";
import { useSession } from "@/_pwa-framework/session/state";

function DatosHogar() {
  const [user] = useSession();
  const [idhogar] = useLocalStorage<any>("hogarActual");

  const [estructuras] = useLocalStorage<any>("estructuras");
  const [estructuraSeleccionada] = useLocalStorage<any>(
    "estructuraSeleccionada",
  );
  const [denominacionEstructuraTree, setDenominacionEstructura] =
    useLocalStorage<any>("denominacionEstructura");

  const confirm = useConfirm();
  const navegar = useNavigate();
  const notificar = NotificationProvider();
  const { modalActions } = useModalState();

  const [filtroEstructura, setFiltroEstructura] = useState<number | null>(null);
  const [checkdatos, checkSetdatos] = useState<any>([]);
  const [id, setid] = useState<any>(null);
  const [hogares, setHogares] = useState<any>([]);
  const [idzonavulnerable, setIdZonaVulnerable] = useState<any>(true);
  const [titleForm, setTitleForm] = useState<any>("");
  const [selected, setSelected] = useState<any[]>([]);
  const [conceptos, setConceptos] = useState<any[]>([]);
  const [mostrarZonasVulnerables, setMostrarZonasVulnerables] =
    useState<boolean>(false);

  const [, setHogarActualDireccion] = useRecoilState(atomHogarActualDireccion);

  const [, setHogarActualJefe] = useRecoilState(atomHogarActualJefe);

  const titleSeleccionarHogar = "Seleccionar Consejo Popular";

  const [unidadAlojamientoEstructura, setUnidadAlojamientoEstructura] =
    useState<number>(0);

  useEffect(() => {
    if (estructuraSeleccionada) {
      setFiltroEstructura(parseInt(estructuraSeleccionada));
    }
  }, [estructuraSeleccionada]);

  const mainForm = useCallback(
    (): IGenericControls[] => [
      {
        type: "component",
        component: () => {
          // console.log(denominacionEstructuraTree);
          const textoEstructura =
            denominacionEstructuraTree === undefined ||
            denominacionEstructuraTree.length == 0
              ? titleSeleccionarHogar
              : denominacionEstructuraTree;
          return (
            <Stack
              direction="row"
              display={"inline-list-item"}
              justifyContent="flex-start"
              sx={{ width: "100%" }}
            >
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                width={"100%"}
                alignItems={"center"}
              >
                <Button
                  onClick={() => {
                    setTitleForm("Adicionar datos del hogar");
                    modalActions.open("formularioHogar");
                  }}
                  variant="contained"
                  disabled={!(conceptos.length && estructuraSeleccionada)}
                >
                  Adicionar
                </Button>
                <Box sx={{ flexGrow: 1 }} />
                <Typography variant="h6" sx={{ marginRight: 2 }}>
                  {textoEstructura}
                </Typography>
                <Button
                  onClick={() => modalActions.open("estructura")}
                  variant="contained"
                  disabled={!conceptos.length}
                >
                  <HomeWorkIcon />
                </Button>
              </Box>
            </Stack>
          );
        },
        label: "",
        name: "",
        gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
      },
      {
        type: "component",
        component: ({ name, setFieldValue }: any) => (
          <TableView
            values={hogares}
            search={true}
            headers={[
              { name: "detalles", align: "left", label: "Detalles" },
              { name: "direccion", align: "center" },
              { name: "jefehogar", align: "center" },
              { name: "idEstado", align: "center" },
              { name: "idcodigohogar", align: "center" },
              { name: "cantmiembros", align: "center", label: "Miembros" },
              { name: "estado", align: "center" },
              { name: "estadotext", align: "center", label: "Estado" },
            ]}
            idKey="idcodigohogar"
            setFieldValue={setFieldValue}
            useCheckBox={true}
            multiSelect={false}
            disableCheckBox={(row) =>
              mode || user?.PI?.idpi == "iportela" ? false : row.idestado == "2"
            }
            setState={setSelectedFunction}
            name={name}
            defaultValues={idhogar ? [parseInt(idhogar)] : []}
            rowActions={[
              {
                label: "Modificar hogar",
                action: (values: any) => {
                  setid(values.idcodigohogar);
                  setTitleForm("Modificar datos del hogar");
                  modalActions.open("formularioHogar");
                },
                icon: EditIcon,
                disabled: (data) => {
                  return data.idEstado == "2";
                },
              },
              {
                label: "Modificar Consejo Popular",
                action: (values: any) => {
                  setid(values.idcodigohogar);
                  setTitleForm("Modificar consejo popular");
                  // valor de idunidadalojamiento para modificar la estructura del hogar
                  setUnidadAlojamientoEstructura(values.idunidaddealojamiento);
                  modalActions.open("estructura");
                },
                icon: DriveFileRenameOutlineIcon,
                disabled: (data) => {
                  return data.idEstado == "2";
                },
              },
              {
                label: "Adicionar otro hogar",
                action: (values: any) => {
                  const dat_hogar = {
                    idunidaddealojamiento: values.idunidaddealojamiento,
                    idestado: 1,
                  };
                  crear("dat_hogar", dat_hogar).then(() => {
                    notificar({
                      type: "success",
                      title:
                        "Se ha adicionado un nuevo hogar a la vivienda satisfactoriamente.",
                      content: "",
                    });
                    loadHogares();
                  });
                },
                icon: AddHomeIcon,
              },
              {
                icon: DeleteIcon,
                label: "Eliminar hogar",
                action: (values: any) => {
                  // console.log(values);
                  confirm({
                    title: "Eliminar",
                    confirmationText: "Aceptar",
                    cancellationText: "Cancelar",
                    description: `¿Está seguro que desea eliminar el hogar?`,
                  })
                    .then(async () => {
                      // const respuesta = await checkMultipleHogares();
                      // if (respuesta) {
                      //   notificar({
                      //     type: "warning",
                      //     title: respuesta,
                      //     content: "",
                      //   });
                      // }
                      unsetHogar();
                      // eliminar unidaddealojamiento sino tiene + hogares
                      const arrHogares = await obtenerDatosPorLlave(
                        "dat_hogar",
                        "idunidaddealojamiento",
                        values.idunidaddealojamiento,
                      );
                      // console.log(arrHogares);
                      if (arrHogares.length == 1) {
                        eliminar(
                          "dat_unidaddealojamiento",
                          "idunidaddealojamiento",
                          values.idunidaddealojamiento,
                        );
                      }
                      descartarHogares(values.idcodigohogar).then(() => {
                        // db.dat_hogar
                        //   .where("idcodigohogar")
                        //   .equals(values.idcodigohogar)
                        //   .modify({ idestado: 3 });
                        if (values.idcodigohogar == idhogar) {
                          setHogar("");
                          setJefeHogar("");
                          setHogarActualJefe("");
                          setDireccionHogar("");
                        }
                        loadHogares();
                      });
                      notificar({
                        type: "success",
                        title: "El hogar ha sido eliminado satisfactoriamente.",
                        content: "",
                      });
                    })
                    .catch(() => {
                      notificar({
                        type: "warning",
                        title: "Acción cancelada",
                        content: "",
                      });
                    });
                },
                disabled: (data) => {
                  return data.idEstado == "2";
                },
              },
              // {
              //   icon: PlaylistAddCheckCircleRounded,
              //   label: "Finalizar caracterización",
              //   action: (values: any) => modalActions.open("estadoEntrevista"),
              // },
            ]}
          />
        ),
        label: "",
        name: "",
        gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
        hidden: () => !conceptos.length,
      },
    ],
    [conceptos, hogares, idhogar, estructuraSeleccionada],
  );

  const siguiente = () => navegar("/nucleo-info");
  useLiveQuery(async () => {
    await loadHogares();
  });
  const loadHogares = async () => {
    const hogares = await db.dat_hogar
      .where("idestado")
      .notEqual(4)
      .sortBy("idcodigohogar");
    let data = await unionUnidadAlojamiento(hogares);

    if (filtroEstructura) {
      data = data.filter((item) => item.idestructura === filtroEstructura);
    }

    const conceptos = await db.nom_concepto.toArray();
    setConceptos(conceptos);
    const zonas_vulnerables = conceptos.filter(
      (item) => item.idpadre == 999999999,
    );
    setMostrarZonasVulnerables(zonas_vulnerables.length === 0);
    setHogares([...data]);
  };

  function UpdateDatos(selected: any) {
    const hogarselected = selected.length
      ? hogares.find((hogar: any) => hogar.idcodigohogar == selected[0])
      : false;
    if (hogarselected) {
      setHogar(hogarselected?.idcodigohogar);
      setJefeHogar(hogarselected?.jefehogar);
      setDireccionHogar(hogarselected?.direccion);
      setHogarActualJefe(hogarselected?.jefehogar);
      setHogarActualDireccion(hogarselected?.direccion);
    } else {
      setHogar("");
      setJefeHogar("");
      setDireccionHogar("");
      setHogarActualJefe("");
      setHogarActualDireccion("");
    }
    setSelected(selected);
  }

  useEffect(() => {
    loadHogares().then(() => setSelected(idhogar ? [parseInt(idhogar)] : []));
  }, [filtroEstructura]);

  const buscarDenominacionEstructura = (tree: any, id: number) => {
    tree.forEach((element: any) => {
      if (element.id.toString() == id) {
        setDenominacionEstructura(element.denominacion);
        return;
      } else {
        if (element.children) {
          buscarDenominacionEstructura(element.children, id);
        }
      }
    });
  };

  const submitEstructura = useCallback(
    (values: any) => {
      localStorage.setItem("estructuraSeleccionada", values.estructura);
      setFiltroEstructura(parseInt(values.estructura));
      buscarDenominacionEstructura(estructuras, values.estructura);
      // modificar estructura a hogar/unidad de alojamiento
      const idunidaddealojamiento = unidadAlojamientoEstructura;
      // console.log(idunidaddealojamiento);
      modificar(
        "dat_unidaddealojamiento",
        "idunidaddealojamiento",
        idunidaddealojamiento,
        { idestructura: parseInt(values.estructura) },
      ).then(() => loadHogares());
      setUnidadAlojamientoEstructura(0);
    },
    [estructuras],
  );

  useEffect(() => {
    UpdateDatos(selected);
  }, [hogares]);

  const getByIdFunction = useCallback(
    (id: any) => {
      return {
        estructura: id,
      };
    },
    [denominacionEstructuraTree],
  );

  const controls = useCallback((): IGenericControls[] => {
    return [
      {
        type: "component",
        component: (props: any) => (
          <CustomTree
            data={crearArbolEstructura(estructuras ?? "{}")}
            parentIcon={HomeWorkIcon}
            onlyChild={true}
            childrenIcon={Grain}
            checkBox={true}
            multiSelect={false}
            onClick={(e: any) => {
              setFiltroEstructura(parseInt(e.target.name));
              props.field?.onChange(e);
            }}
            defaultValues={props.formValue}
            {...props}
          />
        ),
        label: "estructura",
        name: "estructura",
        gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
      },
    ];
  }, [estructuras]);

  const setSelectedFunction = (selected: any) => {
    setSelected(selected);
    UpdateDatos(selected);
  };

  const formularioHogar = useCallback(
    (): IGenericControls[] => [
      tipovivienda,
      direccion,
      numero,
      apto,
      edificio,
      pentrecalle,
      sentrecalle,
      circunscripcion,
      cdr,
      zonaresidencial,
      planturquino,
      {
        type: "select",
        label: "Comunidad en situación de vulnerabilidad",
        name: "zonavulnerable",
        checkValues: checkdatos,
        gridValues: { xl: 4, lg: 4, md: 4, sm: 12, xs: 12 },
        options: [
          { idconcepto: "1", denominacion: "Sí" },
          { idconcepto: "2", denominacion: "No" },
        ],
        validations: {
          required: { message: "Este campo es obligatorio" },
        },
        onChange: (e) => {
          const { value } = e.target;
          setIdZonaVulnerable(value == "2");
        },
      },
      {
        type: "select",
        name: "idzonavulnerable",
        label: "Comunidad",
        url: "999999999",
        gridValues: { xl: 4, lg: 4, md: 4, sm: 12, xs: 12 },
        hidden: (values: any) => values.zonavulnerable != "1",
        validations: {
          required: {
            message: "Este campo es obligatorio",
            when: {
              name: "zonavulnerable",
              expression: (value) => value[0] == "1",
            },
          },
        },
      },
      {
        type: "component",
        component: () =>
          mostrarZonasVulnerables && !idzonavulnerable ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                p: 1.5,
                borderRadius: 1,
                backgroundColor: "#fff3e0",
                border: "1px solid #ff9800",
              }}
            >
              <Typography variant="body2" sx={{ color: "#e65100" }}>
                Actualmente no existen comunidades en situación de
                vulnerabilidad registradas en el sistema de gestión. Para
                agregar una nueva, debe comunicarse con su superior del
                ministerio, ya que son ellos quienes tienen la facultad para
                realizar esta alta.
              </Typography>
            </Box>
          ) : null,
        label: "",
        name: "warningZonas",
        gridValues: { xl: 12, lg: 12, md: 12, sm: 12, xs: 12 },
      },
      { type: "geo", name: "ubicacion", label: "Ubicación del hogar" },
    ],
    [idzonavulnerable, checkdatos, mostrarZonasVulnerables],
  );

  const checkMultipleHogares = useCallback(async () => {
    const hogar = id
      ? await obtenerDatosPorLlave("dat_hogar", "idcodigohogar", id)
      : [];
    if (hogar?.length > 0) {
      const hogares = await obtenerDatosPorLlave(
        "dat_hogar",
        "idunidaddealojamiento",
        hogar[0].idunidaddealojamiento,
      );
      if (hogares?.length > 1) {
        const respuesta = await confirm({
          title: "Alerta",
          confirmationText: "Si",
          cancellationText: "No",
          description: `El hogar tiene varios hogares, está seguro que desea continuar?`,
        }).catch(() => "Operación cancelada");
        return respuesta;
      }
    }
  }, [id]);

  return (
    <>
      <Meta title="Datos del hogar" />
      <GenericForm
        controls={controls()}
        endpointPath=""
        name="estructura"
        modalType="fullWith"
        applyButton={false}
        idForEdit={estructuraSeleccionada}
        getByIdFunction={getByIdFunction}
        submitFunction={submitEstructura}
        title={titleSeleccionarHogar}
        acceptDisabledFunction={(values) => {
          return !(values.estructura?.length > 0);
        }}
      />
      {conceptos.length ? (
        <>
          <GenericForm
            controls={mainForm()}
            endpointPath=""
            name=""
            title={"Información general de la vivienda"}
            hideButtons={true}
          />
        </>
      ) : (
        <Stack
          direction="row"
          display={"inline-list-item"}
          justifyContent="flex-start"
          sx={{ width: "100%" }}
        >
          {" "}
          <Typography>
            No se ha realizado la carga inicial de los nomencladores.{" "}
            <Link to={"/nomencladores"}>Ir a nomencladores.</Link>
          </Typography>
        </Stack>
      )}

      <GenericForm
        name="formularioHogar"
        controls={formularioHogar()}
        title={titleForm}
        description=""
        endpointPath="/"
        showSpecificDescription={true}
        idForEdit={id}
        setIdFunction={setid}
        modalType="fullWith"
        notifyValidation={checkMultipleHogares}
        submitFunction={async (values, name, idForEdit, event) => {
          if (id) {
            const hogar = await obtenerDatosPorLlave(
              "dat_hogar",
              "idcodigohogar",
              id,
            );
            const idunidaddealojamiento = hogar[0].idunidaddealojamiento;
            modificar(
              "dat_unidaddealojamiento",
              "idunidaddealojamiento",
              idunidaddealojamiento,
              { ...values, idestructura: filtroEstructura }, // Cambio clave aquí
            ).then(() => {
              loadHogares();
              notificar({
                type: "success",
                title:
                  "Los datos del hogar han sido modificados satisfactoriamente.",
                content: "",
              });
            });
          } else {
            const idunidaddealojamiento = await crear(
              "dat_unidaddealojamiento",
              { ...values, idestructura: filtroEstructura }, // Cambio clave aquí
            );
            const dat_hogar = {
              idunidaddealojamiento: idunidaddealojamiento,
              idestado: 1,
            };
            const idcodigohogar = await crear("dat_hogar", dat_hogar);
            notificar({
              type: "success",
              title: "El hogar ha sido adicionado satisfactoriamente.",
              content: "",
            });
            if (event.target.textContent == "Aceptar") {
              setHogar(idcodigohogar);
              setDireccionHogar(values.direccion);
              navegar("/nucleo-info");
            }
          }
          loadHogares();
        }}
        getByIdFunction={async (id) => {
          const hogar = await obtenerDatosPorLlave(
            "dat_hogar",
            "idcodigohogar",
            id,
          );
          const idunidaddealojamiento = hogar[0].idunidaddealojamiento;
          const unidaddealojamiento = await obtenerDatosPorLlave(
            "dat_unidaddealojamiento",
            "idunidaddealojamiento",
            idunidaddealojamiento,
          );
          const obj = {
            ...hogar[0],
            ...unidaddealojamiento[0],
            editMode: true,
          };
          return obj;
        }}
      />
      <Stack
        direction="row"
        mx={"auto"}
        my={2}
        px={3}
        display={"inline-list-item"}
        justifyContent="flex-end"
        sx={{ width: "100%" }}
      >
        <Tooltip open={!selected?.length} title="" placement="bottom">
          <Button
            onClick={siguiente}
            variant="contained"
            disabled={!selected?.length}
            sx={{ visibility: !selected?.length ? "hidden" : "unset" }}
          >
            Siguiente
          </Button>
        </Tooltip>
      </Stack>
    </>
  );
}

export default DatosHogar;
