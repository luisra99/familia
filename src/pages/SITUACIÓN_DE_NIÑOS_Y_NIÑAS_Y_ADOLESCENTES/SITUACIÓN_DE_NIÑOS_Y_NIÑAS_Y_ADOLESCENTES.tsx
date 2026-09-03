import { Button, Divider, Typography } from "@mui/material";
import {
  crear,
  eliminar,
  modificar,
} from "@/app/user-interfaces/forms/models/controllers";
import { useCallback, useState } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import GenericForm from "@/_pwa-framework/genforms/components/form-components/form.generic";
import Meta from "@/_pwa-framework/components/Meta";
import NotificationProvider from "@/_pwa-framework/sections/Notifications/provider";
import { Stack } from "@mui/system";
import TableView from "@/_pwa-framework/user-solicitudes/view";
import { datico } from "@/app/user-interfaces/forms/models/model";
import { getHogar } from "@/app/hogarController/hogar.controller";
import { obtenerDatosByMiembro } from "./helpers";
import { obtenerMiembros } from "@/app/user-interfaces/forms/models/controllers.miembrohogar";
import { useConfirm } from "material-ui-confirm";
import { useLiveQuery } from "dexie-react-hooks";
import useModalState from "@/_pwa-framework/hooks/form/use-form-manager";
import { useNavigate } from "react-router-dom";
import { IGenericControls } from "@/_pwa-framework/genforms/types/controls/controls.types";

function SITUACIÓN_DE_NIÑOS_Y_NIÑAS_Y_ADOLESCENTES() {
  const idhogar = getHogar() ?? 0;
  const { modalActions } = useModalState();
  const [idmiembrohogar, setIdMiembroHogar] = useState<any>(null);
  const [datatable, setDatatable] = useState<any>([]);
  const [miembros, setMiembros] = useState<any>([]);
  const [allmiembros, setAllMiembros] = useState<any>([]);
  const [miembrosmenor16, setMiembrosmenor16] = useState<any>([]);
  const [actividadfiltradas, setActividadFiltradas] = useState<any>([]); //
  const [allActividades, setAllActividades] = useState<any>([]);
  const [miembrosConDatos, setMiembrosConDatos] = useState<any>([]);
  const [id, setid] = useState<any>(null);
  const [idnna, setidnna] = useState<any>(null);
  const confirm = useConfirm();

  const actividades = async (id: any) => {
    const datos = await datico.nom_concepto
      .where({ idpadre: "9501" })
      .toArray();
    setAllActividades(datos);
    let all_nnaocupacion;
    id
      ? (all_nnaocupacion = await datico.dat_nnaocupacion
          .where({ idmiembrohogar: [id.toString()] })
          .toArray())
      : (all_nnaocupacion = await datico.dat_nnaocupacion.toArray());

    const idsExcluidos = all_nnaocupacion?.map((obj: any) => {
      return parseInt(obj.idtipoactividad[0]);
    });

    const arrayFiltrado = datos.filter((obj: any) => {
      return !idsExcluidos.includes(obj.idconcepto);
    }); // Filtrar arrayUno
    // Actualizar el estado con el array filtrado
    return arrayFiltrado;
  };

  async function unionNomenclador(arr: any) {
    const join = await Promise.all(
      arr.map(async (obj: any) => {
        const actividad = await datico.nom_concepto.get(
          parseInt(obj?.idtipoactividad[0] ?? 0)
        );
        const horas = await datico.nom_concepto.get(
          parseInt(obj?.idcanthoras[0] ?? 0)
        );
        const horarios = await datico.nom_concepto.get(
          parseInt(obj?.idhorario[0] ?? 0)
        );
        const autori = parseInt(obj?.autorizadomtss[0]);
        return {
          ...obj,
          actividad: actividad?.denominacion,
          horas: horas?.denominacion,
          horarios: horarios?.denominacion,
          autorizacion: parseInt(obj?.autorizadomtss[0]) == 1 ? "Sí" : "No",
        };
      })
    );
    return join;
  }
  async function obtenerDatos(idmiembro: any) {
    const data = await datico.dat_nnaocupacion //idcodigohogar:"1"
      .where({ idmiembrohogar: [idmiembro.toString()] })
      .toArray();

    const result = await unionNomenclador(data);
    return result;
  }
  async function tieneDatos(arr: any) {
    const result = await Promise.all(
      arr.map(async (obj: any) => {
        const dato = await datico.dat_situacnnaj
          .where({ idmiembrohogar: [obj.idmiembrohogar.toString()] })
          .count();

        if (dato > 0) {
          return obj.idmiembrohogar.toString();
        } else {
          return 0;
        }
      })
    );

    return result.filter((item) => item != 0);
  }
  const obtenerDatosNNAOcupacion = async (idnna: string, idpersona: string) => {
    const existe = await datico.dat_nnaocupacion
      .where({ idnnaocupacion: idnna })
      .toArray();
    const elementos = existe?.length
      ? {
          ...existe[0],
          idmiembrohogar: [idpersona],
          editMode: true,
        }
      : {
          idmiembrohogar: [idpersona], //
          // idcodigohogar
          idtipoactividad: [], //
          idcanthoras: [], //
          idhorario: [], //
          autorizadomtss: ["0"], //
          // idsituacnnaj,
          editMode: false,
        };

    return elementos;
  };
  const setIdFunction = (id: any) => {
    actividades(id).then((elementofiltrados) => {
      setActividadFiltradas(elementofiltrados);
    });
    setidnna(id);
  };

  /*llenar el combo d elos miembros*/
  useLiveQuery(async () => {
    const data = await obtenerMiembros();
    setAllMiembros(data);
    const miembros = data.filter((item) => item.edad < 18);
    const menor16 = data.filter((item) => item.edad < 16);
    setMiembrosmenor16(menor16);
    setMiembros(miembros);
    const datos = await tieneDatos(miembros);
    setMiembrosConDatos(datos);
  });

  const onChangeMiembro = useCallback(
    async (id: any) => {
      const _datos = await tieneDatos(miembros);
      setMiembrosConDatos(_datos);

      const datos = await obtenerDatos(id);
      setDatatable(datos);

      // Obtener las actividades filtradas disponibles para el miembro seleccionado
      const actividadesFiltradas = await actividades(id);
      setActividadFiltradas(actividadesFiltradas);

      // NUEVO: Si no quedan más actividades por asignar, cerrar el modal (si estaba abierto)
      if (actividadesFiltradas.length === 0) {
        modalActions.close();
      }
    },
    [actividades]
  );

  const notificar = NotificationProvider();
  const navegar = useNavigate();
  const siguiente = () => navegar("/servicios-equipamientos/materiales");
  const anterior = () => navegar("/proteccion");
  const formControls = useCallback(
    (): IGenericControls[] => [
      {
        type: "select",
        label: "Miembro del hogar",
        name: "idmiembrohogar",
        gridValues: { xs: 12, lg: 8, md: 8, sm: 8, xl: 8 },
        options: miembros,
        onChange: (e: any, ref: any) => {
          const { value } = e.target;
          setIdMiembroHogar(value);
          setid(value);
          onChangeMiembro(value);
          if (Number(value) > 7 || Number(value) < 1) e.preventDefault();
        },
        validations: {
          required: { message: "Este campo es obligatorio" },
        },
        checkValues: miembrosConDatos,
      },
      {
        type: "select",
        label:
          "Situación educativa de niños, niñas, adolecentes y jóvenes del hogar",
        name: "idsituacioneduc",
        gridValues: { md: 12, lg: 12, sm: 12, xl: 12, xs: 12 },
        url: "9472",
        validations: {
          required: {
            message: "Este campo es obligatorio",
          },
        },
      },
      {
        type: "select",
        label: "Escoja la opción", //Educacion y cuidado en la primera infancia
        name: "idcuidadoprimerainf",
        url: "9473",
        gridValues: { xl: 12, lg: 12, md: 12, sm: 12, xs: 12 },
        validations: {
          required: {
            message: "Este campo es obligatorio",
            when: {
              name: "idsituacioneduc",
              expression: (value: any) => {
                return value[0] === "9473";
              },
            },
          },
        },
        hidden: (values: any) => values.idsituacioneduc?.[0] != "9473",
      },
      {
        type: "select",
        label: "Escoja la opción",
        name: "idsne",
        gridValues: { xl: 12, lg: 12, md: 12, sm: 12, xs: 12 },
        hidden: (values: any) => values.idsituacioneduc?.[0] != "9474",
        url: "9474",
        validations: {
          required: {
            message: "Este campo es obligatorio",
            when: {
              name: "idsituacioneduc",
              expression: (value: any) => value[0] == "9474",
            },
          },
        },
      },
      {
        type: "select",
        label: "Escoja la opción", // Educacion y cuidado en el hogar
        name: "idcuidadohogar",
        gridValues: { xl: 12, lg: 12, md: 12, sm: 12, xs: 12 },
        validations: {
          tests: [
            {
              test: (values: any) => {
                return (
                  values.idcuidadoprimerainf?.[0] == "9478" &&
                  values.idcuidadohogar?.length == 0
                );
              },
              message: "Este campo es obligatorio",
            },
            {
              test: (values: any) => {
                return (
                  values.idcuidadoprimerainf?.[0] == "9473" &&
                  values.idcuidadohogar?.length == 0
                );
              },
              message: "Este campo es obligatorio",
            },
          ],
        },
        hidden: (values: any) => {
          return (
            values.idcuidadoprimerainf?.[0] != "9478" ||
            values.idsituacioneduc?.[0] != "9473"
          );
        },
        url: "9478",
        onChange: (value: any, ref: any) => {
          ref.setFieldValue("idetp", [], false);
        },
      },
      {
        type: "select",
        label: "Escoja la opción",
        name: "idetp",
        gridValues: { xl: 12, lg: 12, md: 12, sm: 12, xs: 12 },
        validations: {
          tests: [
            {
              test: (values: any) => {
                return (
                  values.idsne[0] == "9486" &&
                  values.idsituacioneduc[0] == "9474" &&
                  values.idetp?.length == 0
                );
              },
              message: "Este campo es obligatorio",
            },
          ],
        },
        hidden: (values: any) =>
          values.idsne?.[0] != "9486" || values.idsituacioneduc?.[0] != "9474",
        url: "9486",
      },
      {
        type: "multiselect",
        label: "Causas",
        name: "idcausadesv",
        url: "9475",

        gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
        validations: {
          required: {
            message: "Este campo es obligatorio",
            when: {
              name: "idsituacioneduc",
              expression: (value: any) => {
                return value[0] == "10134";
              },
            },
          },
        },
        hidden: (values: any) => values.idsituacioneduc[0] != "10134",
        // onChange: (value, ref) =>
        //   ref.setFieldValue("otrascausas", "", false),
      },
      {
        type: "text",
        label: "Explicite otras razones",
        name: "otrascausas",
        multiline: { minRows: 1 },
        gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
        pattern: /^[a-zA-Z0-9 ]+$/,
        validations: {
          tests: [
            {
              message: "Este campo es requerido",
              test: (values: any) => {
                const active = Array.isArray(values.idcausadesv)
                  ? values.idcausadesv?.findIndex(
                      (causa: any) => causa === "9500"
                    ) != -1
                  : values.idsituacioneduc == "10134";

                return active ? values.otrascausas?.length <= 0 : false;
              },
            },
          ],
        },
        hidden: (values: any) =>
          (Array.isArray(values.idcausadesv)
            ? values.idcausadesv?.findIndex((causa: any) => causa === "9500") ==
              -1
            : values.idsituacioneduc?.[0] != "10134") ||
          values.idsituacioneduc?.[0] === "9473" ||
          values.idsituacioneduc?.[0] === "9474",
      },
      {
        type: "component",
        component: () => <Divider sx={{ my: 1 }} />,
        label: "",
        name: "",
        gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
        // hidden: () => idmiembrohogar == 0,
      },
      {
        type: "component",
        component: () => (
          <>
            <Typography variant="subtitle2" marginX={""} mt={5}>
              Niños, niñas y adolescentes ocupados/as
            </Typography>
            <Stack
              spacing={2}
              direction="row"
              my={2}
              textAlign={"left"}
              // px={5}
              display={"inline-list-item"}
            >
              <Button
                disabled={!actividadfiltradas?.length} // Se desactiva si no hay actividades
                onClick={async () => {
                  modalActions.open("formulario");
                }}
                variant="contained"
              >
                Adicionar
              </Button>{" "}
            </Stack>
            <TableView
              values={id ? datatable : []}
              headers={[
                {
                  name: "actividad",
                  align: "left",
                  label: "Actividad",
                },
                {
                  name: "horas",
                  align: "left",
                  label: "Cantidad de horas",
                },
                { name: "horarios", align: "left", label: "Horarios" },
                {
                  name: "autorizacion",
                  align: "center",
                  label: "Autorización  el MTSS",
                },
              ]}
              idKey="idnnaocupacion"
              multiSelect={false}
              useCheckBox={false}
              rowActions={[
                {
                  label: "Modificar",
                  action: (values: any) => {
                    setActividadFiltradas(allActividades);
                    setidnna(values.idnnaocupacion);
                    modalActions.open("formulario");
                    // setid(values.idnnaocupacion);
                    // modalActions.open("1");
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
                      description: `¿Está seguro que desea eliminar lo seleccionado?`,
                    }).then(() =>
                      eliminar(
                        "dat_nnaocupacion",
                        "idnnaocupacion",
                        values.idnnaocupacion
                      ).then(() => {
                        notificar({
                          type: "success",
                          title:
                            "La ocupación de niños, niñas y adolescentes ha sido eliminado satisfactoriamente.",
                          content: "",
                        });
                        onChangeMiembro(idmiembrohogar);
                      })
                    );
                  },
                },
              ]}
            />
          </>
        ),
        label: "",
        name: "",
        gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
        // hidden: () => idmiembrohogar == 0,
      },
      {
        type: "component",
        component: () => (
          <Typography variant="subtitle2" marginX={""} mt={5}>
            Situación de NNA que cometen hechos que la ley tipifica como delito,
            con comportamiento social inadecuado y/o víctimas de violencia.
          </Typography>
        ),
        label: "",
        name: "",
        gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
        // disabled: () => idmiembrohogar == 0,
      },
      {
        type: "component",
        component: () => <Divider sx={{ m: 2 }} />,
        label: "",
        name: "",
        gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
        // disabled: () => idmiembrohogar == 0,
      },
      {
        type: "component",
        component: () => (
          <Typography>
            <b>Nota aclaratoria: </b> Esta información no se pregunta se
            completa con información previa.
          </Typography>
        ),
        label: "",
        name: "",
        gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
        // disabled: () => idmiembrohogar == 0,
      },
      {
        type: "multiselect",
        label:
          "Situación de NNA que cometen hechos que la ley tipifica como delito",
        name: "idtiposituacion",

        gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
        url: "9421",
      },
    ],
    [
      idmiembrohogar,
      allActividades,
      id,
      datatable,
      actividadfiltradas,
      miembrosConDatos,
      miembros,
    ]
  );
  const modalControls = useCallback(
    (): IGenericControls[] => [
      {
        type: "select",
        label: "Actividad",
        name: "idtipoactividad",
        gridValues: { xs: 12, sm: 6, lg: 6, md: 6, xl: 6 },
        options: actividadfiltradas ? actividadfiltradas : [],
        validations: {
          required: { message: "Este campo es obligatorio" },
        },
        disabledOnEdit: true,
      },
      {
        type: "select",
        label: "Cantidad de horas",
        name: "idcanthoras",
        gridValues: { xs: 12, sm: 6, lg: 6, md: 6, xl: 6 },
        url: "10136",
        validations: {
          required: { message: "Este campo es obligatorio" },
        },
      },
      {
        type: "select",
        label: "Horarios",
        name: "idhorario",
        gridValues: { xs: 12, sm: 6, lg: 6, md: 6, xl: 6 },
        url: "10140",
        validations: {
          required: { message: "Este campo es obligatorio" },
        },
      },
      {
        type: "select",
        label: "Autorización del MTSS",
        name: "autorizadomtss",
        gridValues: { xs: 12, sm: 6, lg: 6, md: 6, xl: 6 },
        options: [
          { idconcepto: "1", denominacion: "Sí" },
          { idconcepto: "2", denominacion: "No" },
        ],
        defaultValue: ["2"],
        disabled: () => {
          const miembro = allmiembros.find(
            (item: any) => String(item.idmiembrohogar) === String(id)
          );
          if (!miembro) return true;
          return miembro.edad < 15;
        },
        validations: {
          required: {
            message: "Este campo es obligatorio",
          },
        },
      },
    ],
    [miembrosmenor16, actividadfiltradas]
  );
  const nextDisabledFunction = useCallback(() => {
    const miembrosCheck = miembrosConDatos.includes(",")
      ? miembrosConDatos?.split?.(",")?.length
      : miembrosConDatos.length;

    // const miembrosCheck = miembrosConDatos[0]
    // ? miembrosConDatos?.length
    // : miembrosConDatos.length > 0
    //   ? 1
    //   : 0;

    return miembros?.length !== miembrosCheck;
  }, [miembrosConDatos, miembros]);

  const ModalForm = useCallback(
    () => (
      <>
        {id && idmiembrohogar && (
          <GenericForm
            name="formulario"
            controls={modalControls()}
            createTitle="Adicionar situación de niños ,niñas y adolecentes ocupados"
            editTitle="Modificar situación de niños ,niñas y adolecentes ocupados"
            endpointPath="persona"
            showSpecificDescription={true}
            idForEdit={idnna}
            setIdFunction={setIdFunction}
            modalType="fullWith"
            getByIdFunction={() => obtenerDatosNNAOcupacion(idnna, id)}
            submitFunction={(values: any) => {
              let edit = values.editMode;
              delete values.editMode;
              edit
                ? modificar("dat_nnaocupacion", "idnnaocupacion", idnna, {
                    ...values,
                    idmiembrohogar: [id.toString()],
                    idcodigohogar: getHogar(),
                  }).then(() => {
                    notificar({
                      type: "success",
                      title:
                        "La ocupación de niños, niñas y adolescentes ha sido modificada satisfactoriamente.",
                      content: "",
                    });
                    onChangeMiembro(id);
                  })
                : crear("dat_nnaocupacion", {
                    ...values,
                    idmiembrohogar: [id.toString()],
                    idcodigohogar: getHogar(),
                  }).then(() => {
                    notificar({
                      type: "success",
                      title:
                        "La ocupación de niños, niñas y adolescentes ha sido adicionada satisfactoriamente. ",
                      content: "",
                    });
                    // Luego de agregar, actualizar actividades
                    onChangeMiembro(id).then(() => {
                      // Si ya no hay más actividades, cerrar el modal
                      if (actividadfiltradas.length === 0) {
                        modalActions.close();
                      }
                    });
                  });
            }}
          />
        )}
      </>
    ),
    [actividadfiltradas, idnna]
  );
  return (
    <>
      <Meta title="Controles" />
      {miembros?.length || miembrosmenor16?.length ? (
        <GenericForm
          name="test"
          controls={formControls()}
          // Niños, niñas y adolescentes ocupados/as
          title="Situación de niños, niñas y adolescentes"
          description=""
          endpointPath="persona"
          showSpecificDescription={false}
          nextButton={{ text: "Siguiente", action: siguiente }}
          prevButton={{ text: "Anterior", action: anterior }}
          nextDisabledFunction={nextDisabledFunction}
          idForEdit={id}
          saveButton="Guardar"
          setIdFunction={setid}
          submitFunction={async (values) => {
            const {
              idsituacioneduc,
              idmiembrohogar,
              idcuidadoprimerainf,
              idsne,
              idetp,
              idcausadesv,
              idcuidadohogar,
              idtiposituacion,
              otrascausas,
            } = values;
            const existesituacnnaj = await datico.dat_situacnnaj
              .where({ idmiembrohogar: [id.toString()] })
              .toArray();
            const existesitdelictiva = existesituacnnaj[0]?.idsituacnnaj
              ? await datico.dat_nnasitdelictiva
                  .where({ idsituacnnaj: existesituacnnaj[0].idsituacnnaj })
                  .toArray()
              : "";
            const existencausas = existesituacnnaj[0]?.idsituacnnaj
              ? await datico.dat_causadesvnnaj
                  .where({ idsituacnnaj: existesituacnnaj[0].idsituacnnaj })
                  .toArray()
              : "";
            const existennaocupacion = await datico.dat_nnaocupacion
              .where({ idmiembrohogar: [id.toString()] })
              .toArray();

            existennaocupacion?.length &&
              existesituacnnaj?.length &&
              (await (datico as any)["dat_nnaocupacion"]
                .where("idmiembrohogar")
                .equals([id.toString()])
                .modify({ idsituacnnaj: existesituacnnaj[0].idsituacnnaj }));

            existesituacnnaj?.length
              ? modificar(
                  "dat_situacnnaj",
                  "idsituacnnaj",
                  existesituacnnaj[0].idsituacnnaj,
                  values
                ).then((idsituacnnaj: any) => {
                  existesitdelictiva?.length
                    ? modificar(
                        "dat_nnasitdelictiva",
                        "idsituacnnaj",
                        idsituacnnaj,
                        {
                          idtiposituacion,
                          idcodigohogar: idhogar,
                        }
                      )
                    : crear("dat_nnasitdelictiva", {
                        idtiposituacion,
                        idsituacnnaj: idsituacnnaj,
                        idcodigohogar: idhogar,
                        idmiembrohogar: [id.toString()],
                      });
                  existencausas?.length
                    ? modificar(
                        "dat_causadesvnnaj",
                        "idsituacnnaj",
                        idsituacnnaj,
                        {
                          otrascausas,
                          idcausadesv,
                        }
                      )
                    : crear("dat_causadesvnnaj", {
                        otrascausas,
                        idcausadesv,
                        idsituacnnaj: idsituacnnaj,
                        idmiembrohogar: [id.toString()],
                      });

                  notificar({
                    type: "success",
                    title:
                      "Los datos de niños, niñas y adolescentes se han adicionado satisfactoriamente.",
                    content: "",
                  });
                })
              : await crear("dat_situacnnaj", {
                  idsituacioneduc,
                  idcodigohogar: idhogar,
                  idmiembrohogar,
                  idcuidadoprimerainf,
                  idcuidadohogar,
                  idsne,
                  idetp,
                }).then((id_situacnnaj: any) => {
                  idtiposituacion?.length &&
                    crear("dat_nnasitdelictiva", {
                      idtiposituacion,
                      idsituacnnaj: id_situacnnaj,
                      idcodigohogar: idhogar,
                      idmiembrohogar: [id.toString()],
                    });
                  idcausadesv?.length &&
                    crear("dat_causadesvnnaj", {
                      otrascausas,
                      idcausadesv,
                      idsituacnnaj: id_situacnnaj,
                      idmiembrohogar: [id.toString()],
                    });
                  notificar({
                    type: "success",
                    title:
                      "Los datos de niños, niñas y adolescentes se han adicionado satisfactoriamente.",
                    content: "",
                  });
                });
          }}
          getByIdFunction={() => obtenerDatosByMiembro(id)}
          applyButton={false}
        />
      ) : (
        <Typography variant="h6" p={2}>
          {idhogar
            ? "No existen miembros menores de edad"
            : "No existe un hogar seleccionado"}
        </Typography>
      )}
      <ModalForm />
    </>
  );
}
export default SITUACIÓN_DE_NIÑOS_Y_NIÑAS_Y_ADOLESCENTES;
